let config = require('../../config/index.json');
const websiteName = config.website;
let websiteConfig = require('../../config/website.json').website[websiteName];
let WebsiteClass = null;

try{
    WebsiteClass =  require(`./${websiteName}`);
    WebsiteClass = new WebsiteClass(websiteConfig);
}catch(e){
    console.error(`暂时不支持此网站:${websiteName}`);
    console.trace(e);
}

module.exports = WebsiteClass;