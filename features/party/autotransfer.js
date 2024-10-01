import Settings from "../../config";
import { derank } from "../../utils/functions/derank";
import { sendDebugmsg } from "../../utils/functions/debug";
import { sleep } from "../../utils/functions/cooldown";
import { registerWhen } from "../../utils/functions/reg";

registerWhen(register("chat", (sender, receiver) => {
	if (derank(sender) == Player.getName() && Settings.autoTransfer) {
        sleep(200, () => {
            //sendDebugmsg(`transfering back to ${receiver}!`)
            ChatLib.command(`p transfer ${derank(receiver)}`);
        })
	} else if (derank(sender) == Player.getName() && !Settings.autoTransfer) {

        sleep(200, () => {
         //sendDebugmsg("Auto transfer is turned &coff! &fNot transfering back.");
        });
    }
}).setChatCriteria("The party was transferred to ${sender} by ${receiver}"), () => Settings.autoTransfer)