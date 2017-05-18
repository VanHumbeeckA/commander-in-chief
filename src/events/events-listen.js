import builder from 'botbuilder'
import log4js from 'log4js'
const logger = log4js.getLogger("[events-listen]")

export const setupEventListeners = (bot) => {
    bot.on("event", function (event) {
        var msg = new builder.Message().address(event.address);
        msg.textLocale("en-us");
        
        logger.debug("EVENT TRIGGERED")
        
        if (event.name === "packageDelivered") {
            logger.trace("triggering action closeBoxDialog..")
            // logger.trace(bot)
            // bot.send(msg)
            // logger.trace(bot)
            // session.beginDialog(closeBoxDialogRoute)
            // bot.dialogAction(closeBoxDialogRoute)
            bot.beginDialog(event.address, boxOptionDialogRoute)
            // bot.triggerAction(closeBoxDialogRoute)
        } else {
            if (event.name === "buttonClicked") {
                msg.text("I see that you just pushed that button");
            } else if (event.name === "dropOffSelect") {
                msg.text("You clicked on a drop off point, with value " + event.value)
            } else if (event.name === "startup") {
                msg.text("Welcome newcomer!")
            }
            bot.send(msg);
        }
    })
}

