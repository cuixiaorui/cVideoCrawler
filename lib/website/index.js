module.exports = {
    /**
     * 获取视频解析实例
     * @param {string} website 视频网站 （暂时只支持爱奇艺）
     */
    create(website){
        //movie 暂时只是 电视剧名
        try{
            WebsiteClass = require(`./${website}`);
            WebsiteClass = new WebsiteClass();
        }catch(e){
            console.error(`暂时不支持此网站:${websiteName}`);
            console.trace(e);
        }
        return WebsiteClass;
    }
}