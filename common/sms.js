const fast2sms = require("fast-two-sms");

const sendSms = async function (phone) {
  let phoneNumber = [];
  phoneNumber.push(phone);
  // console.log(phoneNumber);

  var options = {
    authorization: process.env.SMS_API_KEY,
    sender_id: "clinic",
    language: "english",
    numbers: phoneNumber,
    message: "Sample text message success",
  };
  const msgResponse = await fast2sms.sendMessage(options);
  return msgResponse;
};

module.exports.sendSms = sendSms;
