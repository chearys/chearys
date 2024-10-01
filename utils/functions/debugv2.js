import Settings from "../../config";

export function harddebug(message) {
    if (Settings.debugEnabled) {
        ChatLib.chat(`&7[chearys] &7&o${message}`);
    }
}