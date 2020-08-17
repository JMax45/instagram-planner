const WizardScene = require('telegraf/scenes/wizard');
const exampleWizard = new WizardScene(
  'schedule',
  ctx => {
    ctx.reply("This function is yet to be implemented");
    ctx.wizard.state.data = {};
    return ctx.scene.leave();
  }
);

module.exports = exampleWizard;