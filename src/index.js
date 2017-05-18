console.log("starting script..")

import restify from 'restify'
import {smallTalkIntentDialog} from "./intents/smalltalk";
import {baseOptionDialog, baseOptionDialogRoute} from "./dialogs/base-option-dialog";
import {showRoundsDialog, showRoundsDialogRoute} from "./dialogs/show-rounds-dialog";
import {
    setAlternativeDeliveryDialog,
    setAlternativeDeliveryDialogRoute
} from "./dialogs/set-alternative-delivery-dialog";
import builder from 'botbuilder'
import _ from 'lodash'
import {setupEventListeners} from "./events/events-listen";
import {parcelLocationDialog, parcelLocationDialogRoute} from "./dialogs/parcel-location-dialog";
import {meetDriverDialog, meetDriverDialogRoute} from "./dialogs/meet-driver-dialog";
import {openBoxDialog, openBoxDialogRoute} from "./dialogs/open-box-dialog";
import {closeBoxDialog, closeBoxDialogRoute} from "./dialogs/close-box-dialog";
import {boxOptionDialog, boxOptionDialogRoute, moveDialog, moveDialogRoute} from "./dialogs/move-dialog";
var apiairecognizer = require('api-ai-recognizer')

//=========================================================
// Bot Setup
//=========================================================

import * as keys from './config/keys'
const recognizer = new apiairecognizer(keys.APIAI_CLIENT_KEY)
const intents = new builder.IntentDialog({
    recognizers: [recognizer]
})

const connector = new builder.ChatConnector({
    appId: keys.MBF_APP_ID,
    appPassword: keys.MBF_APP_PASSWORD
})

const bot = new builder.UniversalBot(connector)

const server = restify.createServer()
server.listen(keys.PORT, () => {
    console.log('%s listening to %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());


//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', intents)
bot.dialog(moveDialogRoute, moveDialog)

setupEventListeners(bot)

intents.matches('welcome', [
    (session, args, next) => {
        session.send("Hello there!")
    }
]

intents.matches('move.soldier', [
    (session) => {
        session.beginDialog(moveDialogRoute)
    }
])

intents.onDefault(session => {
    session.send("I don't understand..")
})
