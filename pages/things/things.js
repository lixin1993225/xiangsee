var app = getApp()
Page({
     data:{
          personInf:null,
          mapInf:null,
          markes:[]
     },
     onLoad:function(){
          var _this = this
          app.getUserInfo(this.infs);
          wx.getLocation({
               type: 'gcj02', //返回可以用于wx.openLocation的经纬度
               altitude:true,
               success: function (res) {
                    var latitude = res.latitude
                    var longitude = res.longitude
                    _this.setData({
                         mapInf: res,
                         markes:new Array({
                              iconPath: '../../images/position.png',
                              latitude: res.latitude,
                              longitude: res.longitude,
                              width: 20,
                              height: 20,
                              callout:{
                                   content:'儿子',
                                   color: '#000',
                                   fontSize:'40rpx',
                                   display: 'ALWAYS',
                                   bgColor:'#73CDEB',
                              },
                              label:{
                                   content:'大大大',
                                   color:'#ffffff',
                                   bgColor:'#000'
                              }
                         }),
                         circles:{
                              content:'圆圆圆',
                              color:'red'
                         }
                    })
                    console.log(_this.data.mapInf)
               }
          })
     },
     infs:function(res){
          console.log(res)
          this.setData({
               personInf: res
          })
     }
})