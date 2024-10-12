import Settings from '../../config';
import { getKuudraHP } from "./direction";
import { getPhase } from "./splits";
import { sendDebugmsg } from "../../utils/functions/debug";
import { registerWhen } from "../../utils/functions/reg";
import { formatHealth } from "../../utils/functions/h";
import { sendmsg } from "../../utils/functions/msg";
import { getKillTime } from './splits';
import { formatTimeMs } from '../../utils/functions/time';



/**
 *  Back bone notif thingy
 */

let count = 0

register('worldUnload', () => {
    count = 0;
})

registerWhen(register("SoundPlay", (a, b, c, d, e, f) => {

    if(!Player.getHeldItem()) return;

    let i = Player.getHeldItem().getName().removeFormatting().toLowerCase();
    if (i.includes("terminator") || i.includes("last")) return;

    if (count === 0) {
        //sendDebugmsg(`Front bone hit at ${formatTimeMs(getKillTime())} while holding ${Player.getHeldItem().getName()}`);
        count=1;
        //sendDebugmsg(`What the fuck? + ${i} | Count: ${count}`);
        return;
    }

    if (count === 1) {

        count=2;
        if (i.includes("volcano") || i.includes("fel")) {
            sendmsg(`Back bone hit at ${formatTimeMs(getKillTime())} while holding ${Player.getHeldItem().getName()}`);
            World.playSound("mob.cat.meow", 2, 0.5);
            cooldown=20;
            return;
        }

        //sendDebugmsg(`Back bone hit at ${formatTimeMs(getKillTime())} while holding ${Player.getHeldItem().getName()}`);
        return;
    }
  
}).setCriteria("tile.piston.out"), () => Settings.backBone, getPhase() === 7)


/**
 * Render
 */

let cooldown = 0
registerWhen(register("Tick", () => {
    cooldown = Math.max(0, cooldown - 1);
  }), () => Settings.backBone)

function render() {
    if (cooldown > 0) {
        let a = new Text('').setScale(3).setShadow(true).setAlign('CENTER');
      a.setString("&3Pull!");
      a.draw((Renderer.screen.getWidth()) / 2, (Renderer.screen.getHeight()) / 2 - 20);
    } 
    return;
}

registerWhen(register("renderOverlay", render), () => Settings.backBone && getPhase() === 7)



/**
 * Rend damage tracker thingy
 * - Calculated in 1000.
 * - Full health: 12,000 (300M)
 * - Threshold: 1666 (20M)
 */

let health = 24999;



function formatDamage(i) {
    if ( i >= 1666 && i <= 3333) return `&c`; // 20M-40M
    if ( i >= 3333 && i <= 6666) return `&e`; // 40M-80M
    if ( i > 6666 ) return `&a`; //80M+
    return `&f`;
}

function formatTime(t) {
    if ( t < 2.7 ) return `&a`; // Sub 2.7s
    if ( t >= 2.7 && t <= 3.5) return `&e`; // 2.7-3.5s
    if ( t > 3.5 ) return `&c`; // 3.5s+
    return `&f`;
}

registerWhen(register('packetReceived', () => {

    let diff = health - getKuudraHP();

    if(diff > 1666) {
        sendmsg(`Pull at ${formatTime(getKillTime())}${formatTimeMs(getKillTime())} for ${formatDamage(diff)}${formatHealth(diff*12000)}`);
        //sendmsg(`Someone pulled for ${formatColor(i)}${formatHealth(diff*12000)}`);
        health = getKuudraHP();
        return;
    }

    health = getKuudraHP();
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")), () => Settings.rendDamage && getPhase() === 7)





