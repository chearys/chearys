import Settings from '../../config';


const C0EPacketClickWindow = Java.type(
    "net.minecraft.network.play.client.C0EPacketClickWindow"
  );


register("guiKey", (char, key, gui, event) => {
    if (!Settings.enableWd) return;
    if (Player.getContainer()?.getName() === "container" || !Player.getContainer()?.getName()?.includes("Wardrobe")) return;
    
   // const keyString = String(key);
    const charString = String(char);
    //sendDebugmsg(`char: ${charString} key: ${keyString} gui: ${gui} event: ${event}`);
    //sendDebugmsg(`char: ${charString} key: ${keyString}`);
    //fix logic
    switch(charString) {
        case (Settings.wd_1): {
            cancel(event);
            Client.sendPacket(new C0EPacketClickWindow(Player.getContainer().getWindowId(), 36, 0, 0, null, 0));
            break;
        }
        case (Settings.wd_2): {
            cancel(event);
            Client.sendPacket(new C0EPacketClickWindow(Player.getContainer().getWindowId(), 37, 0, 0, null, 0));
            break;
        }
        case (Settings.wd_3): {
            cancel(event);
            Client.sendPacket(new C0EPacketClickWindow(Player.getContainer().getWindowId(), 38, 0, 0, null, 0));
            break;
        }
        case (Settings.wd_4): {
            cancel(event);
            Client.sendPacket(new C0EPacketClickWindow(Player.getContainer().getWindowId(), 39, 0, 0, null, 0));
            break;
        }
        case (Settings.wd_5): {
            cancel(event);
            Client.sendPacket(new C0EPacketClickWindow(Player.getContainer().getWindowId(), 40, 0, 0, null, 0));
            break;
        }
        case (Settings.wd_6): {
            cancel(event);
            Client.sendPacket(new C0EPacketClickWindow(Player.getContainer().getWindowId(), 41, 0, 0, null, 0));
            break;
        }
        case (Settings.wd_7): {
            cancel(event);
            Client.sendPacket(new C0EPacketClickWindow(Player.getContainer().getWindowId(), 42, 0, 0, null, 0));
            break;
        }
        case (Settings.wd_8): {
            cancel(event);
            Client.sendPacket(new C0EPacketClickWindow(Player.getContainer().getWindowId(), 43, 0, 0, null, 0));
            break;
        }
        case (Settings.wd_9): {
            cancel(event);
            Client.sendPacket(new C0EPacketClickWindow(Player.getContainer().getWindowId(), 44, 0, 0, null, 0));
            break;
        }
       

    }

});