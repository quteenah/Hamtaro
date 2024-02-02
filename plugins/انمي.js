import {translate} from '@vitalets/google-translate-api';
import { Anime } from '@shineiichijo/marika';

const client = new Anime();

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) return m.reply(`*[❗] يرجى ادخال اسم انمي للبحث عن معلومات عنه يفضل كتابة اسم الانمي بالإنجليزية .*`);
  try {
    let anime = await client.searchAnime(text);
    let result = anime.data[0];
    let resultes = await translate(`${result.background}`, { to: 'ar', autoCorrect: true });
    let resultes2 = await translate(`${result.synopsis}`, { to: 'ar', autoCorrect: true });
    let AnimeInfo = `
🎀 • *الانمي:* ${result.title}
🎋 • *التنسيق:* ${result.type}
📈 • *الحالة:* ${result.status.toUpperCase().replace(/\_/g, ' ')}
🍥 • *عددالحلقـات:* ${result.episodes}
🎈 • *المـده: ${result.duration}*
✨ • *المصدر:* ${result.source.toUpperCase()}
💫 • *تم إطلاقة:* ${result.aired.from}
🎗 • *نهايته:* ${result.aired.to}
🎐 • *شعبيتـه:* ${result.popularity}
🎏 • *المفضلة:* ${result.favorites}
🎇 • *التقييم:* ${result.rating}
🏅 • *الرتبـه:* ${result.rank}
♦ • *مقطوره:* ${result.trailer.url}
🌐 • *الرابط:* ${result.url}
🎆 • *الخلفيـة:* ${resultes.text}
❄ • *القصـة:* ${resultes2.text}`;

    conn.sendFile(m.chat, result.images.jpg.image_url, 'error.jpg', AnimeInfo, m);
  } catch {
    throw `*[❗] حدث خطأ جرب كتابة اسم الانمي باللغة الإنجليزية او اعد المحاوله لاحقا.*`;
  }
};

handler.help = ['anime']
handler.tags = ['anime']
handler.command = /^(anime|انمي)$/i;
export default handler;
