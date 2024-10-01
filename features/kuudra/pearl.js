import Settings from '../../config';
import { registerWhen } from "../../utils/functions/reg";
import { sendDebugmsg } from '../../utils/functions/debug';
import { getPhase } from './splits';
import Skyblock from '../../../BloomCore/Skyblock';

/**
 * Pearl
 */

function pearl() {

    if (!Skyblock.inSkyblock) return;
    
    const inv = Player.getInventory()?.getItems()?.filter(item => item?.getName()?.includes("Ender Pearl"));
    if (!inv) return;

    let pearls = 0;
    let i = inv.length;
    while (i--) {
        pearls += inv[i].getStackSize();
    }

    const targetPearls = parseInt(Settings.pearlAmount);

    if (pearls !== 0 && pearls % targetPearls === 0) return;

    // Calc the needed pearls
    const neededPearls = targetPearls - (pearls % targetPearls);
    ChatLib.command(`gfs ender_pearl ${neededPearls}`);
}
register("command", () => {
    if (!Settings.pearlAmount || Settings.pearlAmount <= 0) return;
    pearl();
}).setName("testpearl");
