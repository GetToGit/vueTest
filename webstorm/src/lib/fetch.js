const Fly=require('flyio/dist/npm/wx') 

const fly = new Fly
fly.config.baseURL = 'https://wxapp.sit.caikuai100.com'
fly.config.headers = {
	'content-type': 'application/json;charset=UTF-8'
}
fly.interceptors.request.use((config,promise)=>{
    //给所有请求添加自定义header
    config.headers["content-type"]="application/json;charset=UTF-8";
    return config;
})

export default fly
