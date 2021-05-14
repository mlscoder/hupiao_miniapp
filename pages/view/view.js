//index.js
//获取应用实例
const app = getApp()
const urlList = require('../../config.js')
const util = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello World',
    avatarUrl:null,
    nickName: null,
    hasUserInfo: false,
    hiddenmodalput: true,
    hasUserPhone: false,
    listArras:[]
  },
  //事件处理函数
  onLoad: function () {

    if (app.globalData.userInfo != null && app.globalData.userInfo != 'undefined' ) {
      this.setData({
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickName: app.globalData.userInfo.nickName,
        hasUserInfo: true
      })
    } 
    wx.showToast({ title: '加载中', icon: 'loading', duration: 1e4 });
    this.getuserData();
  },

  onShow:function(){
    var that =this 
    if (app.globalData.hasUserInfo) {
      var info = app.globalData
      that.setData({
        avatarUrl: app.globalData.avatarUrl,
        nickName: app.globalData.nickName,
        hasUserInfo: true
      })
    }


  },

  godouban: function (event){
    console.log(event.currentTarget.dataset.gid)
    var url = event.currentTarget.dataset.gid
   wx.navigateTo({
     url: '../detail/detail?url=' +url,
 })
  },
  getuserData:function(){
    var that = this;
    var t = this ;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        wx.request({
          url: urlList.getcustomhistory,
          data: {
            userId: res.data
          },
        
          success: function (a) {
            if (a.data.customhistory != null) {
              console.log(a.data.customhistory)
              var o = a.data.customhistory || [];
              if (t.setData({
                loadingStatus: !1
              }), 0 == o.length ? 1 == t.data.pageNo ? t.setData({
                houseMess: 0
              }) : t.data.pageNo > 1 && t.setData({
                houseMess: 2
              }) : o.length > 0 && o.length < 10 ? t.setData({
                houseMess: 2
              }) : t.setData({
                houseMess: 1
              }), t.setData({
                statusTip: !0
              }), wx.hideToast(), true) {

                t.houseDataWast(o);
              }
            } else t.setData({
              houseMess: 0,
              loadingStatus: !1,
              statusTip: !0
            }), wx.hideToast();
          }
        }
        )
      },
    })
  },
  
  houseDataWast: function (a) {
    for (var e = this, o = [], i = 0; i < a.length; i++) {
      a[i].main_img_path = a[i].mainImgUrl + "?x-oss-process=style/w500", o.push(a[i]);
    }
    e.setData({
      listArras: o
    });
    wx.hideToast();
  },

  onPullDownRefresh: function () {

    //当逻辑执行完后关闭刷新    
    this.getuserData();
    wx.stopPullDownRefresh()
  },

  toDetail: function (t) {
    var e = t.currentTarget.dataset.roomid;
    wx.navigateTo({
      url: "/pages/result/detail?rentid=" + e
    });
  },

  touchS: function (t) { },
  touchM: function (t) { },
  touchE: function (t) { }
})
