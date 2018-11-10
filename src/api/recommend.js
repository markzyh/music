import {
  commonParams,
  options
} from '@/api/config'
import jsonp from '@/js/jsonp'
import axios from 'axios';
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json',
  })
  return axios.get(url,{
      params:data
  }).then(res =>{
    //console.log(res.data)
    //return Promise.resolve(res.data)
    return res.data
  })
}
