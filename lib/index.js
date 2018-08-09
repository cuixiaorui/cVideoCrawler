// 命令行搜索电影或者电视剧 搜索到后获取到链接 结合 免费解析接口 然后保存到本地
// 1.命令行的输入
// 2.支持输入url的逻辑
// 暂时只支持 电视剧
const movieName = '延禧攻略'; //支持名称 或者url链接（特定链接）
let videoWebsite = require('./website/index.js');  //可以通过配置 也可以通过命令行输入的参数 控制搜索的视频网站

if(!videoWebsite)return;

(function(){
    searchMovie();
})()


function searchMovie(){
    videoWebsite.search(movieName);
}
