// pages/detail/detail.js
const utils = require('../../utils/util.js');
const app = getApp()
Page({

     /**
      * 页面的初始数据
      */
     data: {
          movie:{},//电影信息
          stars:1,//电影的星级
          medias:null,//媒体库
     },

     /**
      * 生命周期函数--监听页面加载
      */
     onLoad: function (options) {
          wx.setNavigationBarTitle({//设置标题
               title: app.globalData.movieInf.title,
          });
          this.setData({//获取全局变量
               movie: app.globalData.movieInf,
               stars: Math.ceil(app.globalData.movieInf.rating.value)
          });
          this.rendPage();//渲染页面
     },
     rendPage:function(dizhi){
          var _this = this;
          utils.getData("rexxar/api/v2/subject_collection/filter_movie_score_hot/items",{
               os: 'ios',
               for_mobile: '1',
               callback: 'jsonp1',
               start: 0,
               count: 18,
               loc_id: '108288',
               _: 1521021809241
          }).then(function(res){
               _this.setData({
                    medias: utils.compileVal(res).subject_collection_items
               }) 
          })
     },
     movieDetail:function(e){
          var _this = this
          app.globalData.movieInf = e.currentTarget.dataset.movieinf
          _this.setData({//获取全局变量
               movie: app.globalData.movieInf,
               stars: Math.ceil(app.globalData.movieInf.rating.value)
          });
     },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})