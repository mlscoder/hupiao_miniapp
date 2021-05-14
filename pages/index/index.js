//index.js
//获取应用实例
const app = getApp()
const urlList = require('../../config.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    renttype:0,
    pay: 0,
    onlygril: 0,
    station: '',
    price: '',
    count: '',
    title:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../confirm/confirm?rid=30568&count=2'
    })
  },
  help:function(){
    wx.navigateTo({
      url: '../help/help'
    })
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      
      wx.getUserInfo({
        success: res => {
          console.log(res.detail)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.getcustom();
  },
  onShow: function () {
    // 页面出现在前台时执行
    this.getcustom();
  },
  onReady:function(){
    
    this.getcustom();
  },

  getnotice:function(){
    var that = this;
    wx.request({
      url: urlList.getnotice,
      success(res){
        if(res.data.notice!=null){
          that.setData({
            title: res.data.notice,
            })
        }
      }
    })
  },


  getcustom:function(){
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        wx.request({
          url: urlList.getcustom,
          data: {
            userId: res.data
          },
          success(res) {
            console.log(res.data)
            if (res.data.custom != null) {
              that.setData({
                renttype: res.data.custom.renttype,
                pay: res.data.custom.pay,
                onlygril: res.data.custom.onlygril,
                station: res.data.custom.station,
                price: res.data.custom.price,
                count: res.data.custom.count
              })
            }
          }
        })
      },
    })
  },
  getUserInfo: function (e) {
    var that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
      
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              that.updateUserPhone(res.rawData);
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
       //   that.showSettingToast("请授权")
          wx.showToast({
            title: '无法为您提供完整的服务，需要授权使用',
            icon: 'none',
            duration: 3000
          })
        
        }
      }
    })
  },
  
  submit: function (e){

    var that = this;
    var renttype = e.detail.value.renttype; 
    var pay = e.detail.value.pay; 
    var onlygril = e.detail.value.onlygril; 
    var station = e.detail.value.station; 
    var price = e.detail.value.price;
    var count = e.detail.value.count; 

    if (station == '' || station==null){
      wx.showToast({
        title: '至少填写一个地铁站，不然无法给你推荐哟！',
        icon: 'none',
        duration: 3000
      })
    }else{
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          wx.showLoading({ title: '加载中', icon: 'loading', duration: 10000 });
          wx.request({
            url: urlList.custom,
            data: {
              userId: res.data,
              renttype: renttype,
              pay: pay,
              onlygril: onlygril,
              station: station,
              price: price,
              count: count
            },
            success(res) {
              console.log(res)
              if (res.data.status == 0) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 3000
                })
              }
              if (res.data.status == 1) {
                wx.showToast({
                  title: '提交成功，需要您同意开启订阅消息！',
                  icon: 'none',
                  duration: 3000
                })
              }
            }
          })
        },
      })
    }
  },
  subscribeMessage:function(){
 
    wx.requestSubscribeMessage({
      tmplIds: ['GekdKD-1b4tLPioWpDEbubE-Ml_NiakJ1uVy7KQylhI'],
      success(res) {
        console.log('订阅消息结果！')
        console.log(res)
        var jsonstr = JSON.stringify(res)
  
        if (jsonstr.indexOf("reject") != -1) {
          wx.showToast({
            title: '您取消了订阅，将不会为您推送消息！',
            icon: 'none',
            duration: 3000
          })
        }
        if (jsonstr.indexOf("accept") != -1) {
          wx.showToast({
            title: '订阅成功！',
            icon: 'success',
            duration: 3000
          })
        }
      }
    })
  },

  updateUserPhone: function (e) {
    wx.getStorage({
      key: 'userId',
      success: function (data) {
        wx.request({
          url: urlList.userInfo,
          data: {
            rawData: e,
            userId: data.data
          },
          success(res) {
            console.log('后台信息更新')
          }
        }
        )
      }
    })
    app.globalData.userInfo = e
    app.globalData.hasUserInfo = true
    var info = JSON.parse(e)
    app.globalData.avatarUrl = info['avatarUrl']
    app.globalData.nickName = info['nickName']
    this.setData({
      userInfo: e,
      hasUserInfo: true
      
    })
  },
  onShareAppMessage: function (res) {

    var shareimg = [
      '/image/superman.jpg',
      '/image/zufang.jpg',
      '/image/sh.jpg',
    ]
 
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    var randomImg = shareimg[Math.floor(Math.random() * shareimg.length)];

    return {
      title: '助力沪漂一族有个温馨的小窝',
      imageUrl: randomImg,
      path: '/pages/index/index'
    }
  },


})
