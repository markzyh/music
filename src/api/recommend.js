import jsonp from '@/js/jsonp'
import {commonParams,options} from '@/api/config'

export function getRecommend(){//jsonp取值
    //originJsonp(url,options,fn)
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    /* const data = {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1
    } */
    const data = Object.assign({},commonParams,{//es6语法,把一个或者多个对象合并
        format: 'jsonp',
        platform: 'h5',
        needNewCode: 1
    })
    return jsonp(url,data,options)
}
/* function jsonp(url,data,options){
    url += urlData(data)
    return new Promise((resolve,reject) =>{
        originJsonp(url,options,(err,data) =>{
            if(!err){
                resolve(data)
            }else{
                reject(err)
            }
        })
    })
}
function urlData(data){
    let url =''
    for(var k in data){
        if(data[k] == undefined){
            data[k] = ''
        }
        url += `&${k}=${encodeURIComponent(data[k])}`//拼接url
    }
    url = '?'+url.substring(1)
    return url
} */