import { toDataURL } from 'qrcode'
let handler = async (m, { text, conn }) => {
if (!text) throw `*اكتب الرابط او النص المراد تحويله لكود بعد الامر*`
conn.sendFile(m.chat, await toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '💙الباركـود جاهـــز💙', m)
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <text>')
handler.tags = ['tools']
handler.command = /^qr(كود)?$/i
export default handler
