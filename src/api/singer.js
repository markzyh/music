import {
  commonParams,
  options
} from '@/api/config'
import jsonp from '@/js/jsonp'
export function getSingerList() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    //callback:'getUCGI07585997900934505',
    g_tk: 5381,
    jsonpCallback:'getUCGI07585997900934505',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: {
      comm: {
        ct: 24,
        cv: 10000
      },
      singerList: {
        module: "Music.SingerListServer",
        method: "get_singer_list",
        param: {
          area: -100,
          sex: -100,
          genre: -100,
          index: -100,
          sin: 0,
          cur_page: 1
        }
      }
    }
  })
  return jsonp(url, data, options)
}
