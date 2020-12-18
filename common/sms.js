const fast2sms= require('fast-two-sms');
var url = 'http://majalgaonphysiotherapy.in/';
let phoneNumber = [];
var options = { 
    authorization : '', 
    sender_id: 'clinic',
    language: 'english',
    numbers : [], 
    message : ''
};

const sendSms = async function(phone){
    phoneNumber.push(phone);
    return send('Sample text message success', phoneNumber);
}

const sendCredentials = async function(password, phone) {
    phoneNumber.push(phone);
    return send(`Your password is ${password}. Use this password and click on this link to continue ${url}`, phoneNumber);
}

const send = async function(message, phone) {
    options.authorization = process.env.SMS_API_KEY;
    options.message = message;
    options.numbers = phone;

    const msgResponse = await fast2sms.sendMessage(options);
    return msgResponse;
}

module.exports.sendSms = sendSms;
module.exports.sendCredentials = sendCredentials;
