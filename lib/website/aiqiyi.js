
const fetch = require('../utils/fetch.js');
const utils = require('../utils/index.js');
const jsdom = require("jsdom");
const config = require('../../config/website.json')['aiqiyi'];
const { JSDOM } = jsdom;
let self = null;
class Aiqiyi {
    constructor() {
        self = this;
    }
    async apply(video,next){
        if(video.options.url){
            console.log("TODO直接解析 url");
        }else if(video.options.name){
            //基于视频名称 生成电视数据
            let parsedData = await self.search(video.options.name);
            let videoData = await self.parse(parsedData);
            //最终生成的电影数据都要挂载到 video 的 data 属性上
            video.data = videoData;
        }
        next();
    }

    /**
     * 搜索可解析的链接
     * 返回可用于解析的url
     * @param {*} movieNames 
     */
    async search(movieNames) {
        let resultList = await Promise.all(this.getSearchResult(movieNames));
        let parsedData = this.parseSearchResult(resultList); 
        return parsedData;
    }

    getSearchResult(movieNames) {
        movieNames = movieNames.split(',');
        return movieNames.map(name => {
            return fetch(`${config.searchUrl}${name}`)
        })
    }

    parseSearchResult(dataList) {
        const dom = new JSDOM(utils.mergeStr(dataList));
        let alist = Array.from(dom.window.document.querySelectorAll(".mod_result_list > li:nth-child(1) > a"));
        return alist.map((a) => {
            return {
                href: a.href
            }
        })
    }

    /**
     * 解析链接
     * @param {*} urlList 
     */
    async parse(urlList) {
        if (typeof urlList === 'string') {
            urlList = urlList.slice(',');
        }
        let resultList =  await Promise.all(this.fetchHandler(urlList));
        let dataList = this.parseVideoURL(resultList);
        return dataList;
    }

    fetchHandler(urlList){
        const fetchs = data => fetch(data.href);
        return urlList.map(fetchs)
    }

    parseVideoURL(htmlList) {
        return htmlList.map((html) => {
            const dom = new JSDOM(html);
            let nameDom = dom.window.document.getElementById('j-album-title');
            let lilist = Array.from(dom.window.document.querySelectorAll('.piclist-wrapper .site-piclist-12068 li'));
            //去除预告片
            lilist = lilist.filter(d => !d.innerHTML.includes("icon-yugao-new"));
            return lilist.map((li) => {
                let describeNode = li.querySelector('.site-piclist_info_describe a');
                let titleNode = li.querySelector('.site-piclist_info_title a');
                return {
                    title: titleNode.text,
                    describe: describeNode.title,
                    url: describeNode.href,
                    name: nameDom? nameDom.text : '无名'
                }
            })
        })
    }
}

module.exports = Aiqiyi;