import Settings from '../../config';
import { registerWhen } from "../../utils/functions/reg";
import { getPhase } from './splits';
import Skyblock from '../../../BloomCore/Skyblock';
import { sendmsg } from '../../utils/functions/msg';

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
    sendmsg(`Got ${neededPearls} pearls`);
    ChatLib.command(`gfs ender_pearl ${neededPearls}`);
}
register("command", () => {
    if (!Settings.pearlAmount || Settings.pearlAmount <= 0) return;
    pearl();
}).setName("testpearl");

/**
 * Pearl check every tick
 */
let lastPearlTime = 0; 

registerWhen(register("tick", () => {

    const now = Date.now();
    if (now - lastPearlTime < 1000) return;

    if (!Settings.autoPearl || Settings.autoPearl <= 0) return;

    const inv = Player.getInventory()?.getItems()?.filter(item => item?.getName()?.includes("Ender Pearl"));
    if (!inv || inv.length === 0) return;

    let totalPearls = inv.reduce((sum, item) => sum + item.getStackSize(), 0);

    if (totalPearls < Settings.autoPearl) {
        pearl();
        lastPearlTime = now;
    }

}), () => getPhase() === 1 && Settings.autoPearl);

 