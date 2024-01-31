import ytdl from 'ytdl-core';
import yts from 'yt-search';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';

const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `مثال : \n ${usedPrefix}${command} سورة الملك`;

  let search = await yts(text);
  let vid = search.videos[Math.floor(Math.random() * search.videos.length)];
  if (!search) throw 'الفديو غير موجود, جرب عنوان ثاني';
  let { title, thumbnail, timestamp, views, ago, url } = vid;
  let wm = ' 💝𝑨𝒍𝒊𝒒𝒖𝒕𝒆𝒆𝒏𝒂𝒉💝';

  let captvid = `💝 جاري التحميل ♥\n╮ ───═┅─┅─┅═─── ╭
 •🇾🇪_ الجنہـــــرال
╯ ───═┅─┅─┅═─── ╰\n╮ ──═┅─┅─┅═── ╭
 انتظـــر لا تكـرر الطلـب
╯ ──═┅─┅─┅═── ╰`;

  conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captvid, footer: author }, { quoted: m });


  const audioStream = ytdl(url, {
    filter: 'audioonly',
    quality: 'highestaudio',
  });

  // Get the path to the system's temporary directory
  const tmpDir = os.tmpdir();

  // Create writable stream in the temporary directory
  const writableStream = fs.createWriteStream(`${tmpDir}/${title}.mp3`);

  // Start the download
  await streamPipeline(audioStream, writableStream);

  let doc = {
    audio: {
      url: `${tmpDir}/${title}.mp3`
    },
    mimetype: 'audio/mp4',
    fileName: `${title}`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 2,
        mediaUrl: url,
        title: title,
        body: wm,
        sourceUrl: url,
        thumbnail: await (await conn.getFile(thumbnail)).data
      }
    }
  };

  await conn.sendMessage(m.chat, doc, { quoted: m });

  // Delete the audio file
  fs.unlink(`${tmpDir}/${title}.mp3`, (err) => {
    if (err) {
      console.error(`Failed to delete audio file: ${err}`);
    } else {
      console.log(`Deleted audio file: ${tmpDir}/${title}.mp3`);
    }
  });
};

handler.help = ['play'].map((v) => v + ' <query>');
handler.tags = ['downloader'];
handler.command = ['موسيقي', 'اغنيه', 'تحميل']

handler.exp = 0;
handler.diamond = false;

export default handler;
