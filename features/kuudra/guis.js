import Settings from '../../config';
import Skyblock from "../../../BloomCore/Skyblock";
import { registerWhen } from "../../utils/functions/reg";
import { sendDebugmsg } from '../../utils/functions/debug';
import { sleep } from '../../utils/functions/cooldown';
import { getPhase } from './splits';

let guiProcessed = false;
let cannonbought = false;

register('worldUnload', () => {
  resetConstants();
})

// const thread = new Thread(() => {
//   if (Player?.getContainer()?.getName() != "Perk Menu") return;
//   if (!Player?.getContainer()?.getStackInSlot(13)?.getName()?.includes("Ballista Mechanic")) return;
//   guiProcessed = true;
//   Thread.sleep(delays[1]);
//   Player.getContainer().click(13);
//   Thread.sleep(delays[2]);
//   Player.getContainer().click(13);
//   Thread.sleep(delays[3]);
//   Client.currentGui.close();
// })

function resetConstants() {
  guiProcessed = false;
  cannonbought = false;
}



/**
 * Block clicks
 */

const blockslot = [12,14,16,34,43];

registerWhen(register("guiMouseClick", (mouseX, mouseY, mouseButton, gui, event) => {

if (Player.getContainer()?.getName() === "container" || !Player.getContainer()?.getName()?.includes("Perk Menu")) return;
    const slotUnderMouse = Client.currentGui.getSlotUnderMouse();
    
    if (!slotUnderMouse) return;

    const slotString = slotUnderMouse.toString().match(/Slot (\d+) of/)[1];
    if (!slotString) return;

    const slot = parseInt(slotString, 10);

    if(Player.getContainer().getStackInSlot(slot) == "1xitem.swordDiamond@0") return;

    // Check for left-click (mouseButton === 0)
    if (mouseButton === 0) {
        if (blockslot.includes(slot)) {
            //sendDebugmsg(`Triggered for slot: ${slot}`);
            cancel(event);
        } else if (Settings.enableBlockFrenzy && slot === 22) {
            //sendDebugmsg("Triggered for slot 22 with Block Mining Frenzy enabled");
            cancel(event);
        } else {
            return;
            //sendDebugmsg(blockslot.includes(slot));
        }
    }
}), () => Settings.enableBlockClick && Skyblock.subArea === "Kuudra's Hollow")