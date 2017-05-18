import builder from 'botbuilder'

export const smallTalkIntentDialog = (intent) => {
    return [
        function(session, args) {
            session.dialogData.lastIntent = intent
            var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment')
            if (fulfillment) {
                var speech = fulfillment.entity
                session.send(speech)
            } else {
                session.send("Are you having a laugh with me?")
            }
        }
    ]
}
