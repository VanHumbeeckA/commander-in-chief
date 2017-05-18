console.log("starting script..")

import builder from 'botbuilder'
import restify from 'restify'
import {smallTalkIntentDialog} from "./intents/smalltalk";

import _ from 'lodash'
import {setupEventListeners} from "./events/events-listen";
import {moveDialog, moveDialogRoute} from "./dialogs/move-dialog";

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
  (session) => {
    session.send("Hello there!")
  }
])

intents.matches('move.soldier', [
  (session) => {
    session.beginDialog(moveDialogRoute)
  }
])

intents.onDefault(session => {
  session.send("I don't understand..")
})
