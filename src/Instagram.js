const Telegraf = require('telegraf');
const { Router, Markup, Extra } = Telegraf;
const InstagramApi = require('instagram-web-api');

class Instagram {
    constructor(){

    }
    postPicture(telegraf, post){
        const username = process.env.IG_USERNAME;
        const password = process.env.IG_PASSWORD;
        
        const client = new InstagramApi({ username, password })
        
        ;(async () => {  
        await client.login()
        
        // Upload Photo to feed or story, just configure 'post' to 'feed' or 'story'
        client.uploadPhoto({ photo: post.media.url, caption: post.caption, post: 'feed' })
            .then((status) => {
                const newKeyboard = Extra.markup(Markup.inlineKeyboard([
                    Markup.urlButton('Posted successfully', `https://www.instagram.com/p/${status.media.code}/`)
                ]))
                
                telegraf.telegram.editMessageCaption(post.dashboard.chat_id, post.dashboard.message_id, null, post.caption, newKeyboard);
            })
            .catch((error) => {
                console.log(error);
                telegraf.telegram.sendPhoto(post.dashboard.chat_id, post.media.file_id, { caption: 'There was an error regarding this image: '+error });
            })
        })()
    }
}

module.exports = Instagram;