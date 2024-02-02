import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "البلد",
        "الرقم",
        "الكود"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("هذا الامر يعطيك ارقام وهمية راسـل المطـور لتعرف كيفية استخدامة \n https://api.whatsapp.com/send?phone=+966578700193" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {
    
        if (feature == "البلد") {
            try {
                let res = await listCountry()
                let teks = res.map((item, index) => {
                    return `*[ النتيجـة🔍 ${index + 1} ]*
*الدولة🌏:* ${item.name}
*الرابط✅:* ${item.link}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "الرقم") {
        if (!inputs) return m.reply("طـريقــة الادخــال خطأ مثال: *.وهمي|الرقم*")
            try {
                let res = await listNumber(inputs, inputs_ = '')
                let teks = res.map((item, index) => {
                    return `*[ النتيجـة🔍 ${index + 1} ]*
*الدولة🌏:* ${item.name}
*الرابط✅:* ${item.link}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        
        if (feature == "الكود") {
        if (!inputs) return m.reply("طـريقــة الادخـال خطأ مثال: *.وهمي|الرقم")
            try {
                let res = await listCode(inputs)
                let teks = res.map((item, index) => {
                    return `*[ النتيـجة🔍 ${index + 1} ]*
*التطبيق📱:* ${item.title}
*الوقـت⏳:* ${item.time}
*الرسـالة📨:* ${item.message}
*الكود🎁:* ${item.code}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }
        
    }
}
handler.help = ["receivesms"]
handler.tags = ["internet"]
handler.command = /^(phonenumber|وهمي|num)$/i
export default handler

/* New Line */
async function listCountry() {
const url = 'https://receive-sms.cc/Countries/'
  try {
    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);
    const elements = $('.row.mt-auto');

    return elements.map((index, element) => ({
      link: "https://receive-sms.cc" + $(element).find('a').attr('href').trim(),
      name: ("https://receive-sms.cc" + $(element).find('a').attr('href').trim()).split("/")[3].split("-")[0]
    })).get();
  } catch (error) {
    console.error(error);
  }
}

async function listNumber(url, page = '') {
if (page !== '') {
      url += `/Page/${page}`; // Menambahkan query parameter "page" jika parameter page tidak kosong
    }
  try {
    const response = await fetch(url);
    const body = await response.text();

    const $ = cheerio.load(body);
    const elements = $('.row.mt-auto');

    return elements.map((index, element) => ({
      link: "https://receive-sms.cc" + $(element).find('a').attr('href').trim(),
      name: ("https://receive-sms.cc" + $(element).find('a').attr('href').trim()).split("/")[3].split("-")[0]
    })).get();
  } catch (error) {
    console.error(error);
  }
}

async function listCode(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const result = [];

  $('.row.border-bottom.border-temps.table-hover.bg-messages').each((index, element) => {
    const row = $(element);
    const titleElement = row.find('.col-xs-12.col-md-2 a');
    const title = titleElement.text();
    const time = row.find('.col-xs-0.col-md-2.mobile_hide').text();
    const message = row.find('.col-xs-12.col-md-8').text().trim();
    const codeElement = row.find('.col-xs-12.col-md-8 .btn1 b');
    const code = codeElement.text();

    const item = {
      title: title || 'Nothing',
      time: time || 'Nothing',
      message: message || 'Nothing',
      code: code || 'Nothing'
    };

    result.push(item);
  });

  return result;
                                    }
