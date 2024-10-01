import Settings from "../../config";
import { registerWhen } from "../../utils/functions/reg";

let cooldown = 0;

registerWhen(register("Tick", () => {
  cooldown = Math.max(0, cooldown - 1);
}), () => Settings.enableRagnarock)

registerWhen(register("ActionBar", (event) => {
  let actionMessage = ChatLib.getChatMessage(event).removeFormatting().toLowerCase();

  if (actionMessage.includes("casting") && !actionMessage.includes("in 3s") && !actionMessage.includes("in 2s") && !actionMessage.includes("in 1s")) {

    if (!Settings.enableRagnarock) return;
    if (cooldown === 0) {
      cooldown = 70;
      World.playSound("mob.cat.meow", 2, 0.5);
      return;
    } 

  } else if (actionMessage.includes("cancelled")) return;
}), () => Settings.enableRagnarock)

registerWhen(register("renderOverlay", render), () => Settings.enableRagnarock);

function render() {
    if (cooldown > 50) {
      let a = new Text('').setScale(Settings.ragnarockscale).setShadow(true).setAlign('CENTER');
      a.setString(Settings.overlayText);
      a.draw((Renderer.screen.getWidth()) / 2, (Renderer.screen.getHeight()) / 2 - 20);
    } else return;
 
}
