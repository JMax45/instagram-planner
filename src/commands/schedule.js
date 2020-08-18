module.exports = {
    name: 'schedule',
    description: 'Start planning a post',
    public: true,
    access: 'private',
    execute(ctx){
        ctx.scene.enter('schedule');
    }
}