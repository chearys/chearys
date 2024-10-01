import Settings from '../../config';
import Skyblock from "../../../BloomCore/Skyblock";
import { registerWhen } from "../../utils/functions/reg";


/**
 * Variables used to track and display Kuudra HP and entity.
 */
const EntityMagmaCube = Java.type('net.minecraft.entity.monster.EntityMagmaCube');
let cubes = World.getAllEntitiesOfType(EntityMagmaCube.class);
let HPDisplay = ["100,000/100,0000 ❤", 0, 0, 0];
let currentHP = 0;

export function getKuudraHP() { return currentHP }; //Re


registerWhen(register("tick", () => {
    cubes = World.getAllEntitiesOfType(EntityMagmaCube.class);

    // Find Kuudra based off size and HP
    kuudra = cubes.find((cube) => cube.getWidth().toFixed(0) == 15 && cube.getEntity().func_110143_aJ() <= 100000);
    if (kuudra != undefined) {
        currentHP = kuudra.getEntity().func_110143_aJ().toFixed(0);
           
            HPDisplay = [`${currentHP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/100,000 ❤`, kuudra.getX(), kuudra.getY(), kuudra.getZ()];

        // KUUDRA SPAWN DETECT
        if (currentHP <= 25000 && currentHP > 24900) {
            x = kuudra.getX();
            z = kuudra.getZ();

            if (x < -128)
                Client.Companion.showTitle(`&c&lRIGHT!`, "", 0, 25, 5);
            else if (z > -84)
                Client.Companion.showTitle(`&2&lFRONT!`, "", 0, 25, 5);
            else if (x > -72)
                Client.Companion.showTitle(`&a&lLEFT!`, "", 0, 25, 5);
            else if (z < -132)
                Client.Companion.showTitle(`&4&lBACK!`, "", 0, 25, 5);
        }
    } else {
        HPDisplay = ["100,000/100,0000 ❤", 0, 0, 0];
    }
}), () => Skyblock.subArea === "Kuudra's Hollow" && Settings.enableKuudraDirection);



/**
 * Reset Kuudra's UUID on world exit.
 */
register('worldUnload', () => {
    HPDisplay = ["100,000/100,0000 ❤", 0, 0, 0];
});
