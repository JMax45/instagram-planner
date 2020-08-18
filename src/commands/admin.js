module.exports = {
    name: 'admin',
    description: 'Make yourself an admin',
    public: false, 
    execute(ctx, params){
        const { jmongo } = params;
        jmongo.loadAll('admins', (result) => {
            if(result.length === 0){
                jmongo.insertDocument('admins', ctx.from);
                ctx.reply('You have been registered as an administrator');
            }
            else{
                ctx.reply('An admin is already registered');
            }
        })
    }
}