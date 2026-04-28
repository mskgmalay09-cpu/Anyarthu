const express = require('express');
const axios = require('axios');
const Anthropic = require('@anthropic-ai/sdk');
const app = express();
app.use(express.json());

const PAGE_ACCESS_TOKEN = 'EAANw5phuolEBRSFcMkT9rZAcTQsmGlkasUO2slQcUewttrm9v4zq4qLVZBJfnfFzaifnsYO7sMAUrK44GlqTWJ2pLeZAGcVuiNwxsB8wxFRy6CL6TMa2ESaRFodmxn9zqCKqqeMBTZAnNemJWBZBlEyj7UY7IoOqxZBBEnAslZAz7RPZCH2ZAb4ROwpSCfcTW3SctTXsWeZCvYZBTN54ZC2Jh7dwtr8d'
const VERIFY_TOKEN = 'anyarthu_bot_2024';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `သင်သည် အစည်သူ Express Cargo Service ၏ customer service bot ဖြစ်သည်။
မြန်မာနိုင်ငံမှ ဂျပန်နိုင်ငံသို့ ပစ္စည်းပို့ဆောင်ရေး ဝန်ဆောင်မှုပေးသည်။

ဖလိုက် ၃ မျိုး ရှိသည်:
1. EMS Flight - ၅ကီလို ၂၆၂,၅၀၀ကျပ်၊ ၁၀ကီလို ၄၂၅,၀၀၀ကျပ်၊ ၁၅ကီလို ၆၄၅,၀၀၀ကျပ်၊ ၂၀ကီလို ၈၂၀,၀၀၀ကျပ်၊ ကြာချိန် ၇-၁၀ရက်
2. Group Flight - ၁ကီလို ၃၅,၀၀၀ကျပ် (ပုံမှန်)၊ ၁ကီလို ၃၉,၅၀၀ကျပ် (အဝတ်အစား၊စာအုပ်၊အလှကုန်)၊ ကြာချိန် ၁၀-၁၄ရက်
3. ရိုးရိုး Flight - ၅ကီလို ၂၀၅,၀၀၀ကျပ်၊ ၁၀ကီလို ၄၀၅,၀၀၀ကျပ်၊ ၁၅ကီလို ၅၅၅,၀၀၀ကျပ်၊ ၂၀ကီလို ၆၈၀,၀၀၀ကျပ်၊ ကြာချိန် ဖလိုက်တင်ပြီး ၁၄ရက်

လိပ်စာ - အမှတ် ၇၇၊ နံ့သာလမ်း၊ ဌာနရပ်ကွက်၊ အလုံမြို့နယ်၊ ရန်ကုန်မြို့
ဖုန်း - 09-780 955 565၊ 09-782 478 466
ဖွင့်ချိန် - နံနက် ၉နာရီ မှ ညနေ ၅နာရီ၊ နေ့စဉ် ပိတ်ရက်မရှိ

မြန်မာဘာသာဖြင့် ဖြေပါ။ တိုတိုရှင်းရှင်း ဖြေပါ။`;

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
        const userMessage = event.message.text;
        try {
          const response = await client.messages.create({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 500,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: userMessage }]
          });
          const reply = response.content[0].text;
          await axios.post(
            `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
            { recipient: { id: senderId }, message: { text: reply } }
          );
        } catch (error) {
        console.error('Error details:', JSON.stringify(error.response?.data || error.message));
        }
      }
    }
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
