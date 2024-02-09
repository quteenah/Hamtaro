import fetch from 'node-fetch'
import fg from 'api-dylux'


const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `✳️ يرجى إرسـال رابـط فيديو الفيسبـوك المراد تحميله\n\n📌 مثـال :\n*${usedPrefix + command}* https://www.facebook.com/quteenah`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  if (!urlRegex.test(args[0])) {
    throw '⚠️يبدو أن الرابط فيه خطأ او انه غير صالح.'
  }

 await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⌛'  }}, { messageId: m.key.id })

  try {
    const result = await fg.fbdl(args[0]);
    const tex = `
⊱ ─── {*𝑨𝒍𝒊𝒒𝒖𝒕𝒆𝒆𝒏𝒂𝒉*} ─── ⊰
↳ *عنوان الفيديو:* ${result.title}
⊱ ────── {⋆♬⋆} ────── ⊰`

    const response = await fetch(result.videoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)
    
    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
  } catch (error) {
    console.log(error)
    m.reply('⚠️ حـدث خطأ أثناء مراجعـة الطلب يرجى إعادة المحاوله.')
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((فيسبوك|fb)(downloder|dl)?)$/i

export default handler
