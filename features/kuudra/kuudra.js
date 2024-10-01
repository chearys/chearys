import Settings from "../../config";
import Skyblock from "../../../BloomCore/Skyblock";
import { registerWhen } from "../../utils/functions/reg";
import RenderLib from "../../../RenderLib"

const EntityMagmaCube = Java.type('net.minecraft.entity.monster.EntityMagmaCube');

const SMA = Java.type('net.minecraft.entity.SharedMonsterAttributes');
function getMaxHP(entity) {
  return entity.getEntity().func_110148_a(SMA.field_111267_a).func_111125_b();
}

registerWhen(register("renderWorld", () => {
  const boss = World.getAllEntitiesOfType(EntityMagmaCube.class).find(e =>
    getMaxHP(e) === 100_000
  )
  if (!boss) return;

  RenderLib.drawEspBox(
    boss.getRenderX(), boss.getRenderY(), boss.getRenderZ(),
    boss.getWidth(), boss.getHeight(),
    1, 1, 0, 0.5,
    true
  );
}), () => Settings.enableKuudraESP && Skyblock.subArea === "Kuudra's Hollow")