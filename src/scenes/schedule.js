const WizardScene = require('telegraf/scenes/wizard');
const Telegraf = require('telegraf');
const { Router, Markup, Extra } = Telegraf;

const schedule = new WizardScene(
  'schedule',
  ctx => {
    ctx.reply("Send me the media of the post");
    ctx.wizard.state.data = {};
    return ctx.wizard.next();
  },
  ctx => {
    const { photo, video } = ctx.message;
    ctx.wizard.state.data.media = photo ? { type: 'photo', file: photo[photo.length-1] } : { type: 'video', file: video };

    if(ctx.wizard.state.data.media.file===undefined){
      ctx.reply('Invalid media. Please retry');
    }
    else{
      ctx.reply('Send me the caption of the post');
      return ctx.wizard.next();
    }
  },
  ctx => {
    ctx.wizard.state.data.caption = ctx.message.text;
    ctx.reply('Send me a publication time').then( ctx.reply('Use on of the following formats:\n23-02 18:00 | today 18:00 | tomorrow 18:00 | now') );
    return ctx.wizard.next();
  },
  ctx => {
    const publication = {};
    publication.unparsed = ctx.message.text;

    const separators = [' ', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?'];
    publication.split = publication.unparsed.split(new RegExp(separators.join('|'), 'g'));

    const { split } = publication;
    const today = new Date();
    if(split[0]==='today'){
      publication.parsed = { year: today.getFullYear(), day: today.getDate(), month: today.getMonth(), hour: split[1], minute: split[2] };
    }
    else if(split[0]==='tomorrow'){
      publication.parsed = { year: today.getFullYear(), day: today.getDate()+1, month: today.getMonth(), hour: split[1], minute: split[2] };
    }
    else if(split[0]==='now'){
      publication.parsed = { year: today.getFullYear(), day: today.getDate(), month: today.getMonth(), hour: today.getHours(), minute: today.getMinutes() };
      publication.now = true;
    }
    else{
      publication.parsed = { year: today.getFullYear(), day: split[0], month: split[1]-1, hour: split[2], minute: split[3] };
    }

    const { parsed } = publication;
    publication.date = new Date(parsed.year, parsed.month, parsed.day, parsed.hour, parsed.minute);

    ctx.wizard.state.data.date = publication.date;

    const extra = Extra.markup(Markup.inlineKeyboard([
      Markup.callbackButton('Confirm', 'confirm'),
      Markup.callbackButton('Cancel', 'cancel')
    ]))
    extra.caption = ctx.wizard.state.data.caption;

    const { type } = ctx.wizard.state.data.media;
    if(type==='photo'){
      ctx.replyWithPhoto(ctx.wizard.state.data.media.file.file_id, extra).then((result) => {
        ctx.wizard.state.data.dashboard = { chat_id: ctx.message.chat.id, message_id: result.message_id };
        return ctx.wizard.next();
      });
    }
    else if(type==='video'){
      ctx.replyWithVideo(ctx.wizard.state.data.media.file.file_id, extra).then((result) => {
        ctx.wizard.state.data.dashboard = { chat_id: ctx.message.chat.id, message_id: result.message_id };
        return ctx.wizard.next();
      });
    }  
  },
  ctx => {
    const callbackData = ctx.update.callback_query != undefined ? ctx.update.callback_query.data : undefined;
    if(callbackData==='confirm'){
      ctx.answerCbQuery('Post successfully planned');
      const { date } = ctx.wizard.state.data;
      const newCaption = `${ctx.wizard.state.data.caption}\n\n${date.getDate()}/${date.getMonth()}/2020 ${date.getHours()}:${date.getMonth()}`;
      ctx.telegram.editMessageCaption(ctx.from.id, ctx.wizard.state.data.dashboard.message_id, null, newCaption);
      return ctx.scene.leave();
    }
    else if(callbackData==='cancel'){
      ctx.answerCbQuery('Post cancelled');
      const newCaption = `${ctx.wizard.state.data.caption}\n\nPost cancelled`;
      ctx.telegram.editMessageCaption(ctx.from.id, ctx.wizard.state.data.dashboard.message_id, null, newCaption);
      return ctx.scene.leave();
    }
    else{
      ctx.reply('Please confirm or cancel');
    }
  }
);

module.exports = schedule;