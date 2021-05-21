const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({ body: "Hi there!", from: "+15017122661", to: "+15558675310" })
  .then((message) => console.log(message.sid));