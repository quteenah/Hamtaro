import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `*أعــطيـني رابــــط !*`;
  m.reply(wait);

  let res;
  try {
    res = await fetch(`https://inrl-web.onrender.com/api/insta?url=${text}`);
  } catch (error) {
    throw `*حـدث خــطأ !:* ${error.message}`;
  }

  let api_response = await res.json();
  if (!api_response || !api_response.result || api_response.result.length === 0) {
    throw `*لــم اجـد الـفيديــو !!*`;
  }

  let cap = `*╮ ───═┅─┅─┅═─── ╭*
 •🇾🇪_ *الجنہـــــرال_بــوت*
*تـم تحميل الفيديو*
*╯ ───═┅─┅─┅═─── ╰*`;

  conn.sendFile(m.chat, api_response.result[0], 'instagram.mp4', cap, m);
}

handler.help = ['instagram']
handler.tags = ['downloader']
handler.command = /^(انستقرام|انستغرام|ig|انستجرام)$/i

export default handler
