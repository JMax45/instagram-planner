module.exports = {
    name: 'start',
    description: 'Receive a greeting from the bot',
    public: true, 
    execute(ctx){
        ctx.replyWithMarkdown("Hi! I'm a bot to schedule your Instagram posts. To get started write /schedule.");
    }
}