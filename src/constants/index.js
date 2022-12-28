import { PubSub } from "graphql-subscriptions"
import { v4 as uuidv4 } from "uuid"
let amqp = require("amqplib/callback_api")

const { RABBIT_DOM, RABBIT_URL, RABBIT_PASS, RABBIT_USER, RABBIT_ENV } = process.env
export const pubsub = new PubSub(),
  REPORT_CHANGE = "reportChange",
  PINBOARD_CHANGE = "pinboardChange",
  PINBOARD_ROLE_CHANGE = "pinboardChange",
  PINBOARD_ADDED = "pinboardAdded",
  DATA_CHANGE = "dataChange",
  RABBIT_NOTE = "rabbit"

//update this to use exclusive queues on a particular exchange rather than a predefined queue
amqp.connect(`${RABBIT_DOM}://${RABBIT_USER}:${RABBIT_PASS}@${RABBIT_URL}`, function (error, connection) {
  connection && connection.createChannel(function (error, channel) {
    var exchange = `${RABBIT_ENV}_pi_notifications`
    channel.assertExchange(exchange, "fanout", {
      durable: true
    })

    channel.assertQueue(
      `${RABBIT_ENV}_graphql_notifications_${uuidv4()}`,
      {
        exclusive: true
      },
      function (error2, queue) {
        channel.bindQueue(queue.queue, exchange, "")
        console.log(" [*] Waiting for messages in %s.", queue.queue)
        channel.consume(
          queue.queue,
          function (msg) {
            console.log(" [x] Received %s", msg.content.toString())
            let data = JSON.parse(msg.content.toString())
            channel.ack(msg)
            // if (data.notification !== undefined && data.notification.NotificationType == "new_message") {
            data = {
              id: data.notification.Id,
              entityId: data.notification.RelevantObjectId,
              originId: data.notification.OriginId,
              racf: data.notification.RecipientRacf,
              title: data.notification.Title,
              description: data.notification.Description,
              acked: data.notification.Acked,
              date: data.notification.NotificationDate.split(".")[0],
              type: data.notification.NotificationType,
              app: data.notification.AppName,
              url: data.notification.LaunchURL
            }
            pubsub.publish(RABBIT_NOTE, data)
          },
          {
            noAck: false
          }
        )
      }
    )
  })
  error && console.error("Rabbit "+error)
})

pubsub.ee.setMaxListeners(0)
