let handler  = async (m, { conn }) => { 
 let name = conn.getName(m.sender) 
 let teks = ` 
 ${pickRandom([` ⚠️ تم الكشـف عن كلمـات محظـوره سيتم حظـرك واعاده توجيه جميع رسائلك للمطـور 🚫📵
`])} 
 `.trim() 
 conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }}) 
 } 
 handler.customPrefix = /سكس|sex|جنس|السكس|الجنس|زب|sexe/i 
 handler.command = new RegExp 
  
 export default handler 
  
 function pickRandom(list) { 
     return list[Math.floor(Math.random() * list.length)] 
 }
