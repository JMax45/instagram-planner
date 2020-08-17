module.exports = {
    name: 'schedule',
    description: 'Start planning a post',
    public: true,
    execute(ctx){
        ctx.scene.enter('schedule');
    }
}