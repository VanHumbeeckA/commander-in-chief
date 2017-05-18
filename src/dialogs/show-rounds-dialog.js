// @flow

import builder from 'botbuilder'
import {getDeliveryRounds} from "../api-services/expected-delivery";
import type {RoundResponse} from "../types/flow-types";
import {createEvent} from "../events/events-push";
import {setAlternativeDeliveryDialogRoute} from "./set-alternative-delivery-dialog";

const printRoundPoints = (round: RoundResponse) => {
    let output = round.Points.map(p => (" - " + p.Name + "<br>"))
    return output.join("")
}

var temp;

export const showRoundsDialogRoute = "/showRoundsDialog"
export const showRoundsDialog = [
    (session, args, next) => {
        session.send("Hold on, searching for latest rounds updates..")
        session.sendTyping()
        getDeliveryRounds()
            .then(res => {
                temp = res
                session.send("Available delivery points are:<br>" +
                    printRoundPoints(res))
            })
            .catch(err => {
                session.send("Something went wrong. Could not fetch rounds from server.")
            })
            .then(() => {
                var reply = createEvent("roundsListed", "myparam", session.message.address);
                session.send(reply)
                
            }, () => {
                session.endDialog()
            }).then(() => {session.endDialog()})
    }
]