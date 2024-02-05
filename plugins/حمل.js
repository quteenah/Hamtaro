import fetch from "node-fetch"
import ytdl from "ytdl-core"
import yts from "yt-search"
import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"

let limit = 100
let handler = async (m, {
    conn,
    command,
    text,
    args,
    usedPrefix
}) => {
    if (!text) throw `مثـال *${usedPrefix + command}* أنشودة يارب العالمين`
    const combinedRegex = /^(play|song)$/i;
    const isMP3 = combinedRegex.test(command);

    try {
        let vid = await searchAndFilterVideos(text)
        if (!vid) throw "لم يتـم العثور على الفيديو! جرب كتابه اسم اخر"
        let {
            title,
            thumbnail,
            timestamp,
            views,
            ago,
            url
        } = vid
        let dla = "𝑨𝒍𝒊 𝒒𝒖𝒕𝒆𝒆𝒏𝒂𝒉"
        let dls = "𝑨𝒍𝒊 𝒒𝒖𝒕𝒆𝒆𝒏𝒂𝒉"

        let captvid = `📺 *الاسـم:* ${title ? title : 'not know'}
⌛ *المـده:* ${timestamp ? timestamp : 'not know'}
👀 *المشاهدات:* ${formatNumber(views) ? formatNumber(views) : 'not know'}
📅 *النشر:* ${ago ? ago : 'not know'}
🔗 *الرابط:* ${url}

*_إنتـظــر يتم تحميـل مقطع صوتي او فيديو_*
`
        let ytthumb = await (await conn.getFile(thumbnail)).data
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: captvid,
                jpegThumbnail: ytthumb,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        body: dla,
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: url,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceId: "lua ser ofc",
                        sourceType: "PDF",
                        previewType: "PDF",
                        sourceUrl: url,
                        thumbnail: ytthumb,
                        thumbnailUrl: thumbnail,
                        title: " Y O U T U B E "
                    }
                }
            }
        }, {
            quoted: m
        })
        await conn.relayMessage(m.chat, msg.message, {})

        if (isMP3) {
            let Ytdl = await ytmp3(url)
            let dls = "Play audio succes"
            let ytthumb = await (await conn.getFile(Ytdl.meta.image)).data
            let doc = {
                audio: Ytdl.buffer,
                mimetype: "audio/mp4",
                fileName: Ytdl.meta.title,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: url,
                        title: Ytdl.meta.title,
                        body: dls,
                        sourceUrl: url,
                        thumbnail: ytthumb
                    }
                }
            }
            await conn.sendMessage(m.chat, doc, {
                quoted: m
            })
        } else {
            let q = args[1] || "360p"
            let item = await ytmp4(url, q.split("p")[0])
            if ((item.contentLength).split("MB")[0] >= limit) return m.reply(` ≡  *YT Downloader*\n\n*⚖️Size* : ${item.contentLength}\n*🎞️Quality* : ${item.quality}\n\n_The file exceeds the download limit_ *+${limit} MB*\n\n*Link:*\n${await shortUrl(item.videoUrl)}`)
            let captvid = `🔍 *[ النتيـجـة ]*

📷 *الصوره:* ${item.thumb.url || 'not know'}
📚 *الاسـم:* ${item.title || 'not know'}
📅 *التـاريخ:* ${item.date || 'not know'}
⏱️ *المـدة:* ${item.duration || 'not know'}
📺 *القنـاة:* ${item.channel || 'not know'}
🔒 *الجـودة:* ${item.quality || 'not know'}
📦 *طول المحتوى:* ${item.contentLength || 'not know'}
📝 *الوصـف:* ${item.description || 'not know'}
`.trim()
            let dls = "Play video succes"
            let doc = {
                video: {
                    url: item.videoUrl
                },
                mimetype: "video/mp4",
                caption: captvid,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: url,
                        title: item.title,
                        body: dls,
                        sourceUrl: url,
                        thumbnail: await (await conn.getFile(item.image)).data
                    }
                }
            }
            await conn.sendMessage(m.chat, doc, {
                quoted: m
            })
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["play"].map(v => v + " <search>")
handler.tags = ["downloader"]
handler.command = /^(song|play)$/i

export default handler

function formatNumber(num) {
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const numString = Math.abs(num).toString();
    const numDigits = numString.length;

    if (numDigits <= 3) {
        return numString;
    }

    const suffixIndex = Math.floor((numDigits - 1) / 3);
    let formattedNum = (num / Math.pow(1000, suffixIndex)).toFixed(1);

    // Menghapus desimal jika angka sudah bulat
    if (formattedNum.endsWith('.0')) {
        formattedNum = formattedNum.slice(0, -2);
    }

    return formattedNum + suffixes[suffixIndex];
}

async function searchAndFilterVideos(query, maxResults = 100, similarityThreshold = 0.5) {
    try {
        const res = await yts(query);
        const videos = res.videos
            .slice(0, maxResults)
            .filter(video => {
                const titleWords = video.title.toLowerCase().split(" ");
                const queryWords = query.toLowerCase().split(" ");
                const matchCount = titleWords.filter(word => queryWords.includes(word)).length;
                return matchCount / titleWords.length >= similarityThreshold;
            });

        if (videos.length > 0) {
            return videos[0];
        } else if (res.videos.length > 0) {
            return res.videos[0];
        } else {
            return {};
        }
    } catch (e) {
        console.error(e);
        return {};
    }
}

async function ytmp3(url) {
    try {
        const {
            videoDetails
        } = await ytdl.getInfo(url, {
            lang: "id"
        });

        const stream = ytdl(url, {
            filter: "audioonly",
            quality: 140
        });
        const chunks = [];

        stream.on("data", (chunk) => {
            chunks.push(chunk);
        });

        await new Promise((resolve, reject) => {
            stream.on("end", resolve);
            stream.on("error", reject);
        });

        const buffer = Buffer.concat(chunks);

        return {
            meta: {
                title: videoDetails.title,
                channel: videoDetails.author.name,
                seconds: videoDetails.lengthSeconds,
                description: videoDetails.description,
                image: videoDetails.thumbnails.slice(-1)[0].url,
            },
            buffer: buffer,
            size: buffer.length,
        };
    } catch (error) {
        throw error;
    }
};

async function shortUrl(url) {
    let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
    return await res.text()
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedDuration = [];

    if (hours > 0) {
        formattedDuration.push(`${hours} hour`);
    }

    if (minutes > 0) {
        formattedDuration.push(`${minutes} minute`);
    }

    if (remainingSeconds > 0) {
        formattedDuration.push(`${remainingSeconds} second`);
    }

    return formattedDuration.join(' ');
}

function formatBytes(bytes) {
    if (bytes === 0) {
        return '0 B';
    }
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function ytmp4(query, quality = 134) {
    try {
        const videoInfo = await ytdl.getInfo(query, {
            lang: 'id'
        });
        const format = ytdl.chooseFormat(videoInfo.formats, {
            format: quality,
            filter: 'videoandaudio'
        })
        let response = await fetch(format.url, {
            method: 'HEAD'
        });
        let contentLength = response.headers.get('content-length');
        let fileSizeInBytes = parseInt(contentLength);
        return {
            title: videoInfo.videoDetails.title,
            thumb: videoInfo.videoDetails.thumbnails.slice(-1)[0],
            date: videoInfo.videoDetails.publishDate,
            duration: formatDuration(videoInfo.videoDetails.lengthSeconds),
            channel: videoInfo.videoDetails.ownerChannelName,
            quality: format.qualityLabel,
            contentLength: formatBytes(fileSizeInBytes),
            description: videoInfo.videoDetails.description,
            videoUrl: format.url
        }
    } catch (error) {
        throw error
    }
}
