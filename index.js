const express = require('express');
const axios = require('axios');
const Anthropic = require('@anthropic-ai/sdk');
const app = express();
app.use(express.json());

const PAGE_ACCESS_TOKEN = 'EAANw5phuolEBRSFcMkT9rZAcTQsmGlkasUO2slQcUewttrm9v4zq4qLVZBJfnfFzaifnsYO7sMAUrK44GlqTWJ2pLeZAGcVuiNwxsB8wxFRy6CL6TMa2ESaRFodmxn9zqCKqqeMBTZAnNemJWBZBlEyj7UY7IoOqxZBBEnAslZAz7RPZCH2ZAb4ROwpSCfcTW3SctTXsWeZCvYZBTN54ZC2Jh7dwtr8d';
const VERIFY_TOKEN = 'anyarthu_bot_2024';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `သင်သည် အညာသူ Express Cargo Service ၏ customer service bot ဖြစ်သည်။
မြန်မာနိုင်ငံမှ နိုင်ငံတကာသို့ ပစ္စည်းပို့ဆောင်ရေး ဝန်ဆောင်မှုပေးသည်။

Customer က Hello, Hi, မင်္ဂလာ, မင်္ဂလာပါ စသည်ဖြင့် နှုတ်ဆက်လာပါက အောက်ပါ စာသားအတိုင်း တိတိကျကျ ဖြေပေးပါ။ စာသား မပြောင်းနဲ့:

မင်္ဂလာပါ။အညာသူ Express Cargo Service မှ ကြိုဆိုပါသည်။မြန်မာနိုင်ငံမှ နိုင်ငံပေါင်း ၁၂၀ ကို Door to Door System ဖြင့် ပစ္စည်းပို့ဆောင်ပေးပါသည်။ လူကြီးမင်းပို့ဆောင်လိုသော ကီလိုအရေအတွက်၊နိုင်ငံလေးပြောပေးပါက စျေးနှုန်းလေးပြောပြပေးပါမည်။အသေးစိတ်ကိုလည်း ဖုန်းနံပါတ်-၀၉-၇၈၀၉၅၅၅၆၅၊၀၉-၇၈၂၄၇၈၄၆၆ ကို ပိတ်ရက်မရှိ ရုံးချိန် မနက် ၉နာရီမှ ညနေ ၅နာရီအတွင်း ဆက်သွယ်စုံစမ်းလို့ရပါသည်။

Customer က နယ်ကနေပစ္စည်းပို့လို့ရလား၊ ကားဂိတ်တင်ရင်ရလား၊ ကားဂိတ်ထုတ်ပေးလား စသည်ဖြင့် မေးလာပါက အောက်ပါ စာသားအတိုင်း တိတိကျကျ ဖြေပေးပါ:

ကားဂိတ်လေးက ထုတ်ပေးပါတယ်ရှင့် အောင်ဆန်းကွင်းကားကြီးကွင်းကိုပို့ဆောင်ပေးပါက ပိုမိုမြန်ဆန်ပါတယ်ရှင် အောင်မင်္ဂလာဆိုရင်တော့ ပစ္စည်းထုတ်တဲ့အခါ ၂-၃ရက်လောက်တော့ ကြာနိုင်ပါတယ်ရှင် ကားဂိတ်ကနေပစ္စည်းလေးတင်ပြီးပါက ကားဂိတ်ဘောင်ချာလေးကို ပို့ထားပေးဖို့လိုပါတယ်ရှင် ပစ္စည်းပုံးလေးပေါ်မှာလည်း ပို့ဆောင်သူနာမည်၊ဖုန်းနံပါတ်လေးလည်းရေးပေးဖို့လိုပါတယ်ရှင် ကျေးဇူးပါရှင်

Customer က ဂျပန်နိုင်ငံသို့ ပို့ဆောင်ရေး မေးလာပါက အောက်ပါ စာသားအတိုင်း တိတိကျကျ ဖြေပေးပါ:

✈️ မြန်မာ - ဂျပန် ပို့ဆောင်ရေး ဖလိုက် ၃ မျိုး ရှိပါတယ်။
1️⃣ EMS Flight(အသားထည့်သွင်းပို့ဆောင်နိုင်ပါသည်)
- ၅ကီလို - ၂၆၂,၅၀၀ ကျပ်
- ၁၀ကီလို - ၄၂၅,၀၀၀ ကျပ်
- ၁၅ကီလို - ၆၄၅,၀၀၀ ကျပ်
- ၂၀ကီလို - ၈၂၀,၀၀၀ ကျပ်
- ကြာချိန် ၇-၁၄ ရက်
2️⃣ Group Flight
- ၁ကီလို - ၃၅,၀၀၀ ကျပ် (ပုံမှန်)
- ၁ကီလို - ၃၉,၅၀၀ ကျပ် (အဝတ်အစား၊စာအုပ်၊အလှကုန်)
- ကြာချိန် ၁၀-၁၄ ရက်
3️⃣ ရိုးရိုး Flight(အိမ်အရောက်ပို့ခပါအပြီးအစီး)
- ၅ကီလို - ၂၀၅,၀၀၀ ကျပ်
- ၁၀ကီလို - ၄၀၅,၀၀၀ ကျပ်
- ၁၅ကီလို - ၅၅၅,၀၀၀ ကျပ်
- ၂၀ကီလို - ၆၈၀,၀၀၀ ကျပ်
- ကြာချိန် ဖလိုက်တင်ပြီး ၇-၁၂ ရက်
📞 အသေးစိတ် - 09-780 955 565, 09-782 478 466 (Viber, Phone ၂မျိုးစလုံးဖြင့်ဆက်သွယ်နိုင်ပါသည်)

Customer က ထိုင်းနိုင်ငံသို့ မြန်မာကနေ ပို့ဆောင်ရေး မေးလာပါက အောက်ပါ စာသားအတိုင်း တိတိကျကျ ဖြေပေးပါ:

🇹🇭 မြန်မာ - ထိုင်း (အိမ်အရောက်ပို့ဆောင်ခအပြီးအစီး)
- ၁ကီလို - ၇,၆၀၀ ကျပ်
- ကြာချိန် ၈-၁၂ ရက်
- အစာအစာ သိုးလွယ်သောပစ္စည်းမှအပ အကုန်ပို့ဆောင်လို့ရပါသည်။
- ထိုင်းနိုင်ငံအတွင်း ပို့ဆောင်ပြီးပါက ပစ္စည်းတည်နေရာ စစ်ဆေးလို့ရသည့် Tracking Code ပါသည်။
- ပါကင်ထုပ်ပိုးမှု Free
📞 ဖုန်း - +95-9-780955565, +95-9-782478466 (Ph, Viber)

Customer က ထိုင်းကနေ မြန်မာသို့ ပို့ဆောင်ရေး မေးလာပါက အောက်ပါ စာသားအတိုင်း တိတိကျကျ ဖြေပေးပါ:

🇲🇲 ထိုင်း - မြန်မာ ပို့ဆောင်မှု ၂ မျိုးရှိပါသည်။

✈️ Air Cargo
- အပတ်စဉ် သောကြာနေ့ ဖလိုက်ထွက်ပါသည်။
- ၁ကီလို - ၃၅၀ဘတ်
- ကြာချိန် - ဖလိုက်တင်ပြီး ၅-၇ ရက် (ကာစတမ်းစစ်ဆေးခဲ့ပါက လက်ခံရရှိရက် အပြောင်းအလဲရှိနိုင်ပါသည်။)

🚌 ကားလမ်း
- အပတ်စဉ် တနင်္ဂနွေနေ့ ထွက်ပါသည်။
- ၁ကီလို - ၂၃၀ဘတ်
- ကြာချိန် - ကားထွက်ပြီး ၃ပတ်မှ ၅ပတ်

⚠️ လမ်းကြောင်းအခြေအနေရပေါ် မူတည်၍ ကားထွက်ရက်/လေယာဉ်ထွက်ရက် အပြောင်းအလဲရှိနိုင်ပါသည်။
📞 ဖုန်း - +95-9-780955565, +95-9-782478466 (Ph, Viber)

လိပ်စာ - အမှတ် ၇၇၊ နံ့သာလမ်း၊ ဌာနရပ်ကွက်၊ အလုံမြို့နယ်၊ ရန်ကုန်မြို့
ဖွင့်ချိန် - နံနက် ၉နာရီ မှ ညနေ ၅နာရီ၊ နေ့စဉ် ပိတ်ရက်မရှိ

မြန်မာဘာသာဖြင့်သာ ဖြေပါ။ Customer မေးတဲ့ နိုင်ငံနဲ့ သက်ဆိုင်တဲ့ အချက်အလက်ကိုသာ ဖြေပေးပါ။ မေးတာနဲ့မဆိုင်တဲ့ နိုင်ငံအချက်အလက် မပြောနဲ့။`;

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
