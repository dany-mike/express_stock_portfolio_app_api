async function sendDailyNotif() {

  const nodemailer = require("nodemailer");
  const Favorite = require("../models/Favorite.model");
  const User = require("../models/User.model");

  const marketstack = require("../services/marketstack.service");
  const tipranksApi = require("tipranks-api-v2");

  const favorites = await Favorite.find();

  for await (const favorite of favorites) {
    const user = await User.findOne({
      _id: favorite.user,
    });

    const stockPrice = await marketstack.get(
      `/eod?access_key=${process.env.API_KEY_MARKETSTACK}&symbols=${favorite.symbol}`
    );

    const forecastPrice = await tipranksApi
      .getPriceTargets(favorite.symbol)
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error));

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL_NODEMAILER}`,
        pass: `${process.env.PASSWORD_NODEMAILER}`,
      },
    });

    const mailOptions = {
      from: `${process.env.EMAIL_NODEMAILER}`,
      to: `${user.email}`,
      subject: `${favorite.companyName} daily notification`,
      html: `<p>Hello ${user.username},</p>
            <p>Today ${favorite.symbol} price share at the open was 
            $${stockPrice.data[0].open}</p>
            <p>The ${
              favorite.symbol
            } forecast price for one year is $${forecastPrice.priceTargets.mean.toFixed(
        2
      )}</p>
            <p>You'll receive a daily report of the ${
              favorite.symbol
            } stock price and stock forecast</p>
            <p>Remove ${
              favorite.symbol
            } of your favorites to stop receiving daily report</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

module.exports = sendDailyNotif;
