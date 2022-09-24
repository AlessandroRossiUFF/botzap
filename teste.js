const accountSid = 'ACa8cf937dc029e87f429a13a309a27c66';
const authToken = 'd8c641cfd0b010031c51151cbd21451f';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Testando o node',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5522997831291'
  })
  .then(message => console.log(message.sid))
  .done();

client.messages
 .create({
   from: 'whatsapp:+14155238886',
   to: 'whatsapp:+5522997831291',
   body: 'Ahoy from Twilio',
   mediaUrl: 'https://i.postimg.cc/1zGhGtp2/marj.png',
 })
 .then(message => {
   console.log(message.sid);
 })
 .catch(err => {
   console.error(err);
 });
// https://drive.google.com/file/d/1iKDUTxuvtHMO218no0A_1tVHE8gHv1Zp/view?usp=sharing