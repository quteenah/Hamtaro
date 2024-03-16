let handler  = async (m, { conn }) => { 
 let name = conn.getName(m.sender) 
 let teks = ` 
 ${pickRandom([`
  ⚠️*سيتم نقل البوت الى الرقم الجديد👇🏻👇🏻👇🏻*
+966558513424
*كل ماعليك سوا الظغط ع الرقم*
*اذا كنت محظور من البوت الثاني*
*تواصل مع المطور لرفع الحظر*
👇🏻
+966578700193
╯ ───═┅─┅─┅═─── ╰`])} 
 `.trim() 
 conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }}) 
 } 
 handler.customPrefix = /علي|المطور|.|مرحبا|بوت/i 
 handler.command = new RegExp 
  
 export default handler 
  
 function pickRandom(list) { 
     return list[Math.floor(Math.random() * list.length)] 
 }
