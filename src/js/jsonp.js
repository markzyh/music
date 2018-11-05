import originJsonp from 'jsonp'

export default function jsonp(url,data,options){
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
}