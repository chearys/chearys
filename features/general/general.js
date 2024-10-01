import Settings from '../../config';
import { sendDebugmsg } from '../../utils/functions/debug';
import { sleep } from '../../utils/functions/cooldown';
import { derank } from '../../utils/functions/derank';
import { harddebug } from '../../utils/functions/debugv2';
import { sendmsg } from '../../utils/functions/msg';
import { getTabList } from '../../utils/functions/tab';
import Skyblock from "../../../BloomCore/Skyblock";
import Party from '../../../BloomCore/Party';
import { registerWhen } from '../../utils/functions/reg';
import splitgui from '../kuudra/splitgui';


/**
 * Config
 */

const items = [
  "Ender Pearl"
];

registerWhen(register("playerInteract", (action, pos, event) => {
  if (action.toString() !== "RIGHT_CLICK_BLOCK") return;
  let itemName = Player.getHeldItem()?.getName();
  if (!itemName || !items.some(a => itemName.includes(a))) return;
  cancel(event);
}), () => Settings.enablePearlConfig && Skyblock.inSkyblock);


