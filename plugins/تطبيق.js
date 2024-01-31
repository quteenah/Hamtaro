import {search, download} from 'aptoide-scraper';
const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
 if (!text) throw `*[❗] أدخل اسم ملف APK الذي تحاول البحث عنه #aliquteenah.*`;
  try {    
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    let response = `📲 *يتم تنزيل التطبيق #منشئ الملف الجنرال علوش* 📲\n\n📌 *اسم التطبيق:* ${data5.name}\n📦 *الحـزمة:* ${data5.package}\n🕒 *آخـر تحـديث:* ${data5.lastup}\n📥 *الحجم:* ${data5.size}`
    await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
 if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.sendMessage(m.chat, {text: '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*'}, {quoted: m});
    }
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m});
  } catch {
    throw `*[❗] حدث خطأ،لم يتم العثور على التطبيق الذي تحاول البحث عنه أعد المحاوله#aliquteenah.*`;
  }    
};
handler.command = /^(apkmod|apk|برنامج|لعبه|تطبيق)$/i;
export default handler;
