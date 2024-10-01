import Settings from "../../config";

export function sendDebugmsg(message) {

  if (!Settings.debugEnabled) return;


  if (!message || typeof message !== 'string') {
    //return ChatLib.chat(`&7[DEBUG] &4[chearys] &cMessage is NULL or Invalid`);
  }
  
  ChatLib.chat(`&7[DEBUG] &4[chearys] &f${message}`);

  } 
