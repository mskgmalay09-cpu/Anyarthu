const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const PAGE_ACCESS_TOKEN = 'EAANw5phuolEBRZATSinvklp0yhMZBOmD13zoGmB2pW67llYx0rMSXVSm74wGh3APa5vfyHGCDuhzD429AIO8ZAwZAmAtemHdBP6D8wFvgRa8w2eSZC9gKirj5gpj7wCoPeXYpisf1wUmlNSS7ybZAzVGZC8vFtz82snA6Ch0MBudYYGHSSJdPxY5WybJnoepf8p257QhMMufGSmBg78S2GtPCXL'
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  const body = req.body;
  if (body.object === 'page') {
    for (const entry of body.entry) {
      const event = entry.messaging[0];
      const senderId = event.sender.id;
      if (event.message?.text) {
       const msg = event.message.text;
        let reply = 'မင်္ဂလာပါ! ဘာများကူညီပေးရမလဲ?';
        if (msg.includes('ဈေး') || msg.includes('price')) {
          reply = 'ဈေးနှုန်းသိဖို့ 09-XXXXXXXXX ဆက်သွယ်ပါ';
        } else if (msg.includes('hello') || msg.includes('မင်္ဂလာ')) {
          reply = 'မင်္ဂလာပါ! Express Cargo Service မှ ကြိုဆိုပါတယ် 😊';
         } else if (msg.includes('ဂျပန်') || msg.includes('japan') || msg.includes('Japan')) {
  reply = '✈️ မြန်မာ - ဂျပန် ပို့ဆောင်ရေး ဖလိုက် ၃ မျိုး ရှိပါတယ်။\n\n' +
    '1️⃣ EMS Flight\n' +
    '• ၅ကီလို - ၂၆၂,၅၀၀ ကျပ်\n' +
    '• ၁၀ကီလို - ၄၂၅,၀၀၀ ကျပ်\n' +
    '• ၁၅ကီလို - ၆၄၅,၀၀၀ ကျပ်\n' +
    '• ၂၀ကီလို - ၈၂၀,၀၀၀ ကျပ်\n' +
    '• ကြာချိန် ၇-၁၀ ရက်\n\n' +
    '2️⃣ Group Flight\n' +
    '• ၁ကီလို - ၃၅,၀၀၀ ကျပ် (ပုံမှန်)\n' +
    '• ၁ကီလို - ၃၉,၅၀၀ ကျပ် (အဝတ်အစား၊စာအုပ်၊အလှကုန်)\n' +
    '• ကြာချိန် ၁၀-၁၄ ရက်\n\n' +
    '3️⃣ ရိုးရိုး Flight\n' +
    '• ၅ကီလို - ၂၀၅,၀၀၀ ကျပ်\n' +
    '• ၁၀ကီလို - ၄၀၅,၀၀၀ ကျပ်\n' +
    '• ၁၅ကီလို - ၅၅၅,၀၀၀ ကျပ်\n' +
    '• ၂၀ကီလို - ၆၈၀,၀၀၀ ကျပ်\n' +
    '• ကြာချိန် ဖလိုက်တင်ပြီး ၁၄ ရက်\n\n' +
    '📞 အသေးစိတ် - 09-780 955 565';
        }
        await axios.post(
          `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
          { recipient: { id: senderId }, message: { text: reply } }
        );
      }
    }
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
