const fs = require('fs');
const config = {
    name:'video',
    suffix:'txt'
}
class SaveFile{
    async apply(video,next){
        let name = video.options.name? video.options.name: config.name;
        let pathName = `./videos/${name}.${config.suffix}`;
        let data = JSON.stringify(video.data);
        fs.writeFileSync(pathName,data,{flag:'w+'});
        next();
    }
}

module.exports = (options)=>{
    return new SaveFile(options);
}