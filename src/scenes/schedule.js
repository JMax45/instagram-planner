const WizardScene = require('telegraf/scenes/wizard');
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
      ctx.reply("Send me the caption of the post");
      return ctx.wizard.next();
    }
  },
  ctx => {
    ctx.wizard.state.data.caption = ctx.message.text;
    console.log(ctx.wizard.state.data);
    return ctx.scene.leave();
  }
);

module.exports = schedule;