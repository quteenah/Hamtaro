import yts from 'yt-search'
import fs from  'fs'
let handler = async (m, {conn, text }) => {
  if (!text) throw ' هذا الامر خاص بالبحث في اليوتوب وأخذ رابط الفيديو \n مثلا :\n *.يوتيوب*   سورة نوح اجمل صوت'
  await conn.reply(m.chat, global.wait, m)
  let results = await yts(text)
  let tes = results.all
  let teks = results.all.map(v => {
    switch (v.type) {
      case  'video' : return `
° *${v.title}*
↜ 🫐 *الرابـط:* ${v.url}
↜ 🕒 *دقيقـه:* ${v.timestamp}
↜ 📥 *أصـدر في:* ${v.ago}
↜ 👁 *المشاهـدات:* ${v.views}`}}).filter(v => v).join('\n\n────═┅─🎬─┅═────\n\n' )
  conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg' , teks, m)
}
handler.help = [ 'ytsearch *<texto>*' ] 
handler.tags = [ 'search']
handler.command = [ 'يوتيوب' ,  'yts' ] 
export default handler
