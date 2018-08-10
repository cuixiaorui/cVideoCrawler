//基于原始视频链接，生成免费视频链接
const url = 'http://vip.jlsprh.com/index.php?url=';
class FreeURL{
    apply(video,next){
        for(let i=0; i< video.data.length; i++){
            let list = video.data[i];
            for(let j=0; j<list.length; j++){
                let videoInfo = list[j];
                let sourceUrl = videoInfo.url;
                let newUrl = `${url}${sourceUrl}`;
                videoInfo.url = newUrl;
            }
        }
        next();
    }
}

module.exports = FreeURL;
