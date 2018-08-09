const fs = require('fs');
const savaFile = function(data){
    data.forEach(videos => {
        let name = getFileName(videos);
        let pathName = `./videos/${name}.txt`;
        let data = JSON.stringify(videos);
        fs.writeFileSync(pathName,data,{flag:'w+'});
    });
}

function getFileName(videos){
    let name = videos[0].name;
    return name;
}

module.exports = {
    savaFile
}