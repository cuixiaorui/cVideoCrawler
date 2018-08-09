const Video = require('./Video');
const videoWebsite = require('./website/index.js');//视频网站的解析实例
const freeURL = require('./middleware/freeURL');//生成免费电影链接的插件
const shortenURL = require('./middleware/shortenURL');//生成短链接的插件
const saveFile = require('./middleware/saveFile');//保存到本地
// const sendMail = require('./middleware/sendMail');//发送邮件

const websiteName = process.argv.slice(2)[1] || 'aiqiyi';
const movieName = process.argv.slice(2)[0];

if(!movieName){
    console.log("请输入要查询的视频名");
    return;
}

const video = new Video({name:movieName});
video.use(videoWebsite.create(websiteName));
video.use(freeURL());
video.use(shortenURL());
video.use(saveFile());
// video.use(sendMail({
//     mailUser: 'cui_xiaorui@126.com'
// }));
video.execute();