  const config = require('../../config/index.json');
  const fetch = require('../utils/fetch.js');
    /**
     * 处理视频url
     * 替换为免费的解析接口并压缩链接长度
     * @param {*} videos 
     */
    const handlerVideoURL = async function(videos){
        for(let i=0; i<videos.length; i++){
            let list = videos[i];
            for(let j=0; j<list.length; j++){
                let videoInfo = list[j];
                let sourceUrl = videoInfo.url;
                let parseUrl = config.parseAPI;
                let newUrl = `${parseUrl}${sourceUrl}`;
                let result = await fetch(`${config.compressUrlAPI}${newUrl}`);
                videoInfo.url = result;
            }
        }
        return videos;
    }

    module.exports = {
        handlerVideoURL
    }