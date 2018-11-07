import originJsonp from 'jsonp'

export default function jsonp(url,data,options){
  url += urlData(data)
  console.log(url)
  return new Promise((resolve,reject) =>{
      originJsonp(url,options,(err,data) =>{
          if(!err){
              console.log('resolve')
              resolve(data)
          }else{
              reject(err)
          }
      })
  })
}
function urlData(data){
  let url = ''
  for(var k in data){
      if(data[k] == undefined){
          data[k] = ''
      }
      url += `&${k}=${encodeURIComponent(data[k])}`
  }
  if(url.indexOf('?') == -1){
      url = '?' + url.substring(1)
  }
  return url
}