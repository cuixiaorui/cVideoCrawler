class MiddleWareControl{
    constructor(){
        this._middlewareList = [];
        this._video; //用于在中间件中传输的视频对象
    }

    use(fn){
        this._middlewareList.push(fn);
    }

    execute(video){
        let self = this;
        self._video = video;
        function next(){
            if(self._middlewareList.length === 0){
                console.log('All the middleware is done');
                return;
            }
            let fn = self._middlewareList.shift();
            if(fn && fn.apply){
                fn.apply.call(fn,self._video,function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    next();
                });
                
            }else{
                console.error('Middleware requires a function called apply');
            }
        }
        next();
    }
}

module.exports = new MiddleWareControl();