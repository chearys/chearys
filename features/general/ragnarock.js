import Settings from "../../config";
import { sendDebugmsg } from "../../utils/functions/debug";
import { registerWhen } from "../../utils/functions/reg";

let cooldown = 0;
let lastCancelledTime = Date.now();

registerWhen(register("Tick", () => {
  cooldown = Math.max(0, cooldown - 1);
}), () => Settings.enableRagnarock)

registerWhen(register("ActionBar", (event) => {
  let actionMessage = ChatLib.getChatMessage(event).removeFormatting().toLowerCase();

  if (actionMessage.includes("casting") && !actionMessage.includes("in 3s") && !actionMessage.includes("in 2s") && !actionMessage.includes("in 1s")) {
    if (!Settings.enableRagnarock) {
      //sendDebugmsg("Ragnarock overlay is disabled");
      return;
    }

    if (cooldown === 0) {
      World.playSound("mob.cat.meow", 2, 0.5);
      //sendDebugmsg("Casting");
      cooldown = 70;

      register("renderOverlay", renderOverlayFunction);
    }
  } else if (actionMessage.includes("cancelled")) {
    if (Date.now() - lastCancelledTime >= 1000) {
      //sendDebugmsg("&cCANCELLED");
      World.playSound("note.pling", 2, 0.5);
      lastCancelledTime = Date.now(); 
    }
  }
}), () => Settings.enableRagnarock)


function renderOverlayFunction() {
  if (cooldown > 50) {
    let a = new Text('').setScale(Settings.ragnarockscale).setShadow(true).setAlign('CENTER');
    a.setString(Settings.overlayText);
    a.draw((Renderer.screen.getWidth()) / 2, (Renderer.screen.getHeight()) / 2 - 20);
  } else return; 
}
