import builder from 'botbuilder'

export const createEvent = (eventName, value, address) => {
    var msg = new builder.Message().address(address)
    msg.data.type = "event"
    msg.data.name = eventName
    msg.data.value = value
    return msg
}