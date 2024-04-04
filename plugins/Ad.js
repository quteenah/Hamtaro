import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => {
try {
let vn = './media/menu3.mp3'
let pp = imagen4
let img = await(await fetch('https://www.instagram.com/ali_quteenah')).buffer()
let d = new Date(new Date + 3600000)
let locale = 'ar'
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
let _uptime = process.uptime() * 1000
let uptime = clockString(_uptime)
let user = global.db.data.users[m.sender]
let { money, joincount } = global.db.data.users[m.sender]
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850)   
let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let str = `
╮───────────────╭ـ
│「❥❤️ *إسلامية* ✨👑❥」
│───────────────╰ـ
*╮ ───═┅─┅─┅═─── ╭*
*│⚝ ⃟✨❯ ${usedPrefix}الله*
*│⚝ ⃟✨❯ ${usedPrefix}سوره*
*│⚝ ⃟✨❯ ${usedPrefix}السوره*
*│⚝ ⃟✨❯ ${usedPrefix}القران*
*│⚝ ⃟✨❯ ${usedPrefix}قران*
*│⚝ ⃟✨❯ ${usedPrefix}اذكار المساء*
*│⚝ ⃟✨❯ ${usedPrefix}اذكار الصباح*
*│⚝ ⃟✨❯ ${usedPrefix}ادعيه*
*│⚝ ⃟✨❯ ${usedPrefix}ايه*
︎╯───────────────╰ـ
`.trim()
let buttonMessage = {
image: pp,
caption: str.trim(),
mentions: [m.sender],
footer: `*${wm}*`,
headerType: 4,
contextInfo: {
mentionedJid: [m.sender],
externalAdReply: {
showAdAttribution: true,
mediaType: 'VIDEO',
mediaUrl: null,
title: '『👑𝕜𝕚𝕟𝕘┇🤖┇𝕓𝕠𝕥┇👑』',
body: null,
thumbnail: img,
sourceUrl: `https://www.instagram.com/ali_quteenah`
}}}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
//await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
} catch {
conn.reply(m.chat, '*القائمة بها خطأ  ، يرجى إخبار مالك الروبوت بذلك‼️❗*', m)
}}
handler.command = /^(المزيد|m|a|انجليزي|help|info|انجلش|انجليش|إنجليزي|قائمة|الاوامر2|القائمة2|menu2|ali)$/i
handler.exp = 50
handler.fail = null
export default handler
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
