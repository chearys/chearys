import Settings from "../../config";
import { sendDebugmsg } from "../..//utils/functions/debug";
import { sleep } from "../../utils/functions/cooldown";
import { registerWhen } from "../../utils/functions/reg";
import { harddebug } from "../../utils/functions/debugv2";
import Party from '../../../BloomCore/Party';

//Variables
let coords = [0, 0, 0, "Biome not found"];
let invited = 0;
let successful_invites = 0;
let spawned = false;
let waiting_for_invite = false;


function inParty() {
    if (Object.keys(Party.members).length > 0 || Party.leader == undefined) {
        ChatLib.command("p leave");
    }
}

/*const vanqtrigger = */register("chat", () => {
    if(spawned) return;
    
    spawned = true;

    appendCoordinates();

    switch(Settings.VA_options) {
        case(0): {
            //sendDebugmsg("Announce Vanquisher is off!");
            resetConstants();
            break; }
        case(1): {
            ChatLib.command(`ac x: ${coords[0]}, y: ${coords[1]}, z: ${coords[2]} | ${coords[3]}`);
            resetConstants();
            break;
        }
        case(2): {
            ChatLib.command(`pc x: ${coords[0]}, y: ${coords[1]}, z: ${coords[2]} | ${coords[3]}`);
            resetConstants();
            break;
        }
        case(3): {
            if(Settings.VA_list.length == 0) {
                //sendDebugmsg("No one to party?..");
                resetConstants();
                return;
            } 

            inParty(); //Leave the party you're cuurently in
            sleep(250, () => {
                partyEveryone();
                checkInvite();
            });
            
            break;
        }
    }
}).setCriteria("A Vanquisher is spawning nearby!")/*.unregister();*/

function appendCoordinates() {
    coords[0] = Math.round(Player.getX());
    coords[1] = Math.round(Player.getY());
    coords[2] = Math.round(Player.getZ());
    coords[3] = biome();
    //harddebug(`x: ${coords[0]}, y: ${coords[1]}, z: ${coords[2]} | ${coords[3]}`);
}

/**
 * Get the current biome
 * @returns {string} - The current biome
 * @example
 * let biome = biome();
 * console.log(biome);
 * // => "The End"
 */
function biome() {
    let zoneLine = Scoreboard?.getLines()?.find((line) => line.getName().includes("⏣"));
    return zoneLine === undefined ? "Biome not found" : zoneLine.getName().removeFormatting();
}

/**
 * Party everyone in the VA list
 * @returns {void}
 * @example
 * partyEveryone();
 * // => "Inviting everyone in the chearys_gui.crimson_isle.vanquisher_auto_warp list to the party."
 * // => "Host invited xRqse to the party."
 * // => "Host invited [MVP++] sparkerer to the party."
 * // => "Host invited [MEOW] chearys to the party."
 * // => "Host invited [VIP+] spark2 to the party."
 */
function partyEveryone() {
    waiting_for_invite = true;
    let party_igns = Settings.VA_list.split(",");
    let filler  = Array(party_igns.length).fill(0);
    invited = party_igns.length;

    party_igns.forEach((ign, index) => {
        setTimeout(() => {
            ChatLib.command(`p invite ${ign}`);
        }, index * 500);
    });

    if (filler.length <= 0) {
        //sendDebugmsg("No one to invite..?");
    }
}


function resetConstants() {
    successful_invites = 0;
    invited = 0;
    spawned = false;
    coords = [0, 0, 0, "Biome not found"];
    waiting_for_invite = false;
    //harddebug("Constants resetted");
}

function checkInvite() {
    if(!spawned) return;

    //sendDebugmsg("successful_invites: "+ successful_invites);
    //sendDebugmsg("invited: "+ invited);

    if(successful_invites === invited) {
        if(successful_invites === 0) {
            //sendDebugmsg("No one is in party");
            resetConstants();
            return;
        }
        
        warpParty()
        return;
    }

}

function warpParty() {

    sleep(500, () => {
        ChatLib.command(`p warp`)
    });
    sleep(1200, () => {
        ChatLib.command(`pc x: ${coords[0]}, y: ${coords[1]}, z: ${coords[2]} | ${coords[3]}`);
    });
    sleep(2000, () => {
        ChatLib.command(`p disband`);
    });
    sleep(2500, () => {
        resetConstants();
    })
}

/**
 * Updates whether an invite is successful or not based on the chat message
 * @returns {void}
 */

register("chat", () => {
    if(Settings.VA_options != 3 || !waiting_for_invite) return;
    successful_invites++;
    checkInvite()
}).setCriteria("${player} joined the party.")

register("chat", () => {
    if(Settings.VA_options != 3 || !waiting_for_invite) return;
    invited--;
    sleep(250, () => {
        checkInvite();
    });
}).setCriteria("The party invite to ${player} has expired")
register("chat", () => {
    if(Settings.VA_options != 3 || !waiting_for_invite) return;
    invited--;
    sleep(250, () => {
        checkInvite();
    });
}).setCriteria("Couldn't find a player with that name!")
register("chat", () => {
    if(Settings.VA_options != 3 || !waiting_for_invite) return;
    invited--;
    sleep(250, () => {
        checkInvite();
    });
}).setCriteria("You cannot invite that player since they're not online.")
register("chat", () => {
    if(Settings.VA_options != 3 || !waiting_for_invite) return;
    invited--;
    sleep(250, () => {
        checkInvite();
    });
}).setCriteria("You cannot party yourself!")
register("chat", () => {
    if(Settings.VA_options != 3 || !waiting_for_invite) return;
    resetConstants();
}).setCriteria("The party was disbanded because all invites expired and the party was empty.")

register("chat", () => {
    resetConstants();
}).setCriteria("RARE DROP! Nether Star")

// export function load() {
//     vanqtrigger.register();
// }

// export function unload() {
//     vanqtrigger.unregister();
// }

