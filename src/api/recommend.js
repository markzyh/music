import jsonp from '@/js/jsonp'
import {commonParams,options} from '@/api/config'
export function  getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({},commonParams,{//把一个或者多个对象复制到一个新的对象
        platform: 'h5',
        uin:0,
        needNewCode:1
    })
    return jsonp(url,data,options)
}