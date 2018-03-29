const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const basePath = 'https://m.douban.com/'
function getData(url,data,types){
     if (types==undefined||type==false){
          types=='GET'
     }else{
          types == 'POST'
     };
     return new Promise(function(resolve,reject){
          wx.request({
               url: basePath + url,
               method:types,
               data:data,
               header:{

               },
               success:function(res){
                    resolve(res)
               },
               fail:function(res){
                    reject(res)
               },
               complete:function(){

               }
          })
     })
};
function redata(){
     return data1 = { 'dataa': 'hulalahulalalwawakula' }
};
function compileVal(data){
     return JSON.parse(data.data.substring(8).slice(0, -2))
};
module.exports = {
     formatTime: formatTime,
     getData: getData,
     data1: redata,
     compileVal: compileVal
}