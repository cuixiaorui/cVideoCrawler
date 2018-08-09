
const fetch = require('../utils/fetch.js');
const utils = require('../utils/index.js');
const url = require('../utils/url.js');
const fs = require('../utils/fs.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
class Aiqiyi {
    constructor(config) {
        this._config = config;
    }
    /**
     * 搜索可解析的链接
     * @param {*} movieNames 
     */
    search(movieNames) {
        Promise.all(this.getSearchResult(movieNames))
            .then(this.parseSearchResult)
            .then(this.parse.bind(this))
            .catch((err) => {
                console.log(err);
            })
    }

    getSearchResult(movieNames) {
        movieNames = movieNames.split(',');
        return movieNames.map(name => {
            return fetch(`${this._config.searchUrl}${name}`)
        })
    }

    parseSearchResult(html) {
        const dom = new JSDOM(utils.mergeStr(html));
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
    parse(urlList) {
        if (typeof urlList === 'string') {
            urlList = urlList.slice(',');
        }
       
        Promise.all(this.fetchHandler(urlList))
            .then(this.parseVideoURL.bind(this))
            .then(async (d)=>{
                return await url.handlerVideoURL(d);
            })
            .then(fs.savaFile)
            .catch((err) => {
                console.log(err);
            })
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