/**
 * 合并数组内的字符串
 * @param {*} strList 
 */
const mergeStr = function(strList) {
    return strList.reduce((t,s)=>{return t+s});
}

module.exports = {
    mergeStr
}