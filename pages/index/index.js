//index.js
//获取应用实例
var app = getApp();
var utils = require('../../utils/util.js')
console.log(utils.redata)
Page({
     data: {
          scrollTop:0,
          toView:'lunbo',
          topnum:'0',
          tabs:["影片","影院"],
          movietype:['热映','经典','冷门佳片','豆瓣高分','动作','喜剧','爱情','悬疑'],//电影类型
          objectType:[//电影的id
               {    
                    url:'movie_showing',
                    id: 1521021710580,
                    name:'热映'
               },
               {
                    url:'filter_movie_classic_hot',
                    id: 1521021755725,
                    name: '经典'
               },
               {
                    url:'filter_movie_unpopular_hot',
                    id: 1521021783896,
                    name: '冷门佳片'
               },
               {
                    url:'filter_movie_score_hot',
                    id: 1521021809241,
                    name: '豆瓣高分'
               },
               {
                    url:'filter_movie_action_hot',
                    id: 1521021832407,
                    name: '动作'
               },
               {
                    url:'filter_movie_comedy_hot',
                    id: 1521021876533,
                    name: '喜剧'
               },
               {
                    url:'filter_movie_love_hot',
                    id: 1521021902830,
                    name: '爱情'
               },
               {
                    url:'filter_movie_mystery_hot',
                    id: 1521084269214,
                    name: '悬疑'
               },
          ],
          index:0,
          indexurl:'movie_showing',
          activetab:0,
          movieorca:0,//判断是显示影片还是影院
          moviesData:null,//热门电影资源
          hotMovies:null,//轮播图电影区域
          region:['天津'],
          stageNum:0,//数据加载的起始
          nextNum:1,//jsonp的第几个
          lowerFlag:true,//判断是否需要上拉
     },
     onLoad: function () {
          this.refresh(0,'movie_showing');
          wx.setTopBarText({
               text: 'hello, world!'
          });
     },
     movieType:function(){//电影的类型
          utils.getData("")
     },
     switchTab:function(event){
         this.setData({
              movieorca:event.currentTarget.dataset.idx 
         })
     },
     movieDetail:function(e){
          wx.navigateTo({
               url: '../detail/detail'
          });
          app.globalData.movieInf = e.currentTarget.dataset.movieinf
     },
     typeChange:function(event){//选择地址
          this.setData({
               index: event.detail.value,
               indexurl: this.data.objectType[event.detail.value].url
          });
          this.refresh(this.data.objectType[event.detail.value].id, this.data.objectType[event.detail.value].url);
     },
     upper:function(){
          wx.showNavigationBarLoading();
          this.refresh(this.data.objectType[this.data.index].id, this.data.objectType[this.data.index].url);//刷新当前页面
          wx.showLoading({
               title: '正在刷新',
          })
          setTimeout(function(){
               wx.hideNavigationBarLoading();
               wx.stopPullDownRefresh();
               wx.hideLoading()
          },2000)
     },
     lower:function(){//下拉加载更多
          if (this.data.lowerFlag){//判断是否需要上拉
               wx.showLoading({
                    title:'玩命加载中',
                    mask:true,
                    success:function(res){
                    }
               });
               var _this = this;
               setTimeout(function(){
                    _this.setData({
                         stageNum: _this.data.stageNum+18,
                         nextNum: _this.data.nextNum+1
                    });
                    _this.nextRefresh(_this.data.stageNum, _this.data.nextNum, _this.data.objectType, _this.data.indexurl);//加载更多
                    wx.hideLoading();
               },2000)               
          }
     },
     refresh: function (datatype,dataurl){
          var _this = this;
          utils.getData('rexxar/api/v2/subject_collection/' + dataurl+'/items',{
               os:'ios',
               for_mobile:'1',
               callback:'jsonp1',
               start:0,
               count:18,
               loc_id:'108288',
               _:datatype
          }).then(function(res){
               var datas = utils.compileVal(res)
               let zanshi = [];
               for (let i = 0; i < 4; i++) {
                    zanshi.push(datas.subject_collection_items[i])
               };
               _this.setData({
                    moviesData: datas.subject_collection_items,
                    hotMovies: zanshi,
                    lowerFlag: true,
                    toView:'lunbo'
               });
               setTimeout(function () {
                    wx.hideNavigationBarLoading();
                    wx.stopPullDownRefresh();
                    wx.hideLoading()
               }, 2000)
          })
     },
     nextRefresh: function (startstage, next, datatype, dataurl){//加载更多的数据
          var _this = this;
          utils.getData("rexxar/api/v2/subject_collection/"+dataurl+"/items",{
               os: 'ios',
               for_mobile: '1',
               callback: 'jsonp'+next,
               start: startstage,
               count: 18,
               loc_id: '108288',
               _: datatype
          }).then(function(res){//成功
               var datas2 = utils.compileVal(res)
               if (datas2.subject_collection_items.length==0){
                    wx.showToast({
                         title:'无更多数据',
                    });
                    _this.setData({
                         lowerFlag:false
                    });
                    return;
               }else{
                    _this.setData({
                         lowerFlag: true
                    });
               }
              _this.setData({
                   moviesData: _this.data.moviesData.concat(datas2.subject_collection_items)
              })
          }).then(function(res){//失败
               console.log(res)
          })
     }
})
