import builder from 'botbuilder'

export const moveDialogRoute = "/moveDialog"
export const moveDialog = [
    (session, args, next) => {
        session.send("MOVE!")
        session.endDialog()
    }
]