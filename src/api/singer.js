import {
  commonParams,
  options
} from '@/api/config'
import jsonp from '@/js/jsonp'
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needneedNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744,

  })
  return jsonp(url, data, options)
}
