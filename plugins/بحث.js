import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
async function wikipedia(querry) {
try {
const link = await axios.get(`https://ar.wikipedia.org/wiki/${querry}`)
const $ = cheerio.load(link.data)
let judul = $('#firstHeading').text().trim()
let thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`
let isi = []
$('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
let penjelasan = $(Ra).find('p').text().trim() 
isi.push(penjelasan)})
for (let i of isi) {
const data = {
status: link.status,
result: {
judul: judul,
thumb: 'https:' + thumb,
isi: i}}
return data}
} catch (err) {
var notFond = {
status: link.status,
Pesan: eror}
return notFond}}
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*هذا الامر خاص بالبحث في ويكيبيديا \n مثال \n .بحث اليمن*`
wikipedia(`${text}`).then(res => {
m.reply(`*هذا ما وجده بـ،ـوت الجنہـــــرال حول البحث الخاص بك instagram.com/ali_quteenah:*\n\n` + res.result.isi)
}).catch(() => { m.reply('*هذا الامر خاص بالبحث في ويكيبيديا اذا وقع معك خطأ تواصل مع  instagram.com/ali_quteenah*') })}
handler.help = ['wikipedia'].map(v => v + ' <apa>')
handler.tags = [ 'internet']
handler.command = /^(wiki|بحث)$/i
export default handler
