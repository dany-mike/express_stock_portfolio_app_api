const User = require('../../models/User.model')
const Company = require('../../models/Company.model')
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({ body: "Hi there!", from: "+15017122661", to: "+15558675310" })
//   .then((message) => console.log(message.sid));

async function sendMessageSubscription(req, res, next) {
    const user = await User.find({
        username: req.params.username
    })

    console.log(user)

    const company = await Company.findOne({
        symbol: req.params.symbol
    })

    console.log(company)
    // try {       
    //     res.rawStatus = 200;
    //     res.rawResponse = "Company saved into the wallet successfully";
    //     return next();
    // } catch(err) {
    //     res.rawStatus = 400;
    //     res.rawResponse = "An error occured";
    //     return next();
    // }
}

module.exports = sendMessageSubscription;