const MiddleWareControl = require('./middleware/MiddleWareControl');//中间件的管理器

/**
 * video对象是中间件的代理，并且在中间件之间流动
 */
class Video{
    constructor(options) {
        this._options = options;
        this._data = {};
    }

    use(fn){
        MiddleWareControl.use(fn);
    }

    execute(){
        MiddleWareControl.execute(this);
    }

    get options(){
        return this._options;
    }

    get data(){
       return this._data; 
    }

    set data(value){
        this._data = value;
    }

}


module.exports = Video;