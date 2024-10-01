const checkingTriggers = [] // [[trigger, func]]
export const registerWhen = (trigger, checkFunc) => checkingTriggers.push([trigger.unregister(), checkFunc])

register("tick", () => {
    for (let i = 0; i < checkingTriggers.length; i++) {
        let [trigger, func] = checkingTriggers[i]
        if (func()) trigger.register()
        else trigger.unregister()
    }
})