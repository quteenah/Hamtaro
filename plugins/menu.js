let handler  = async (m, { conn }) => { 
 let name = conn.getName(m.sender) 
 let teks = ` 
 ${pickRandom([` مرحباً بك/ي في بوت الجنہـــــرال يتم تحديث البوت ان شاء الله خلال ساعات سيتم اعاده تشغيل البـ؛ـوت على مدار الساعه
`])} 
 `.trim() 
 conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }}) 
 } 
 handler.customPrefix = /.|بوت|هلا|سلام|مرحبا|اوامر|menu|علي/i 
 handler.command = new RegExp 
  
 export default handler 
  
 function pickRandom(list) { 
     return list[Math.floor(Math.random() * list.length)] 
 }
