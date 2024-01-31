import fg from 'api-dylux';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `💠 يرجى ارسال رابط فيـديو الفيسبـوك\n\n📌 مثـال :\n*${usedPrefix + command}* https://www.facebook.com/quteenah`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  if (!urlRegex.test(args[0])) {
    throw '⚠️ هنـاك خطأ في رابط الفيديو او انه غير صالح.';
  }

  m.react(rwait);

  try {
    const result = await fg.fbdl(args[0]);
    const tex = `
⊱ ─── {*𝑨𝒍𝒊𝒒𝒖𝒕𝒆𝒆𝒏𝒂𝒉*} ─── ⊰
↳ *عنوان الفيديو:* ${result.title}
⊱ ────── {⋆♬⋆} ────── ⊰`;

    const response = await fetch(result.videoUrl);
    const arrayBuffer = await response.arrayBuffer();
    const videoBuffer = Buffer.from(arrayBuffer);

    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m);
    m.react(done);
  } catch (error) {
    console.log(error);
    m.reply('⚠️ حدث خطأ أثناء معالجة الطلـب قم باعاده المحاوله لاحقا او راسل صاحب البوت واخبره بالمشكله\n Facebook.com/quteenah.');
  }
};

handler.help = ['facebook <url>'];
handler.tags = ['downloader'];
handler.command = /^((facebook|fb)(فيسبوك|dl)?)$/i;
handler.diamond = true;

export default handler;
