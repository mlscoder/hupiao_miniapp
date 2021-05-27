//app.js
const urlList = require('/config.js')

App({
  globalData: {
    hasPhone: false,
    userInfo: null,
    hasuserInfo:false,
    version: "2.6",
    cityCode:'sh'
  },
  onLaunch: function () {
    // 登录
    var that =this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: urlList.loginUrl, 
          data: {
            code: res.code,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
            that.globalData.hasPhone = res.data.hasPhone
            wx.setStorage({
              key: 'userId',
              data: res.data.userId,
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.getStorage({
                key: 'userId',
                success: function (data) {
                  wx.request({
                    url: urlList.userInfo,
                    data: {
                      rawData: res.rawData,
                      userId: data.data
                    },
                    success(res) {
                      console.log('已经授权更新信息')
                    }
                  }
                  )
                }
              })
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    this.getSelectData();
    this.getCityData();
  }, 
  getSelectData: function (t) {
    console.log(wx.getStorageSync("cityCode"))
   t= wx.getStorageSync("cityCode") ? wx.getStorageSync('cityCode'):"sh"
    console.log(t)
   var e = this;
    return new Promise(function (o, n) {
      wx.request({
        url: urlList.config,
        data: {
          cityCode: t
        },
        success: function (n) {
          wx.setStorageSync("select" + t + e.globalData.version, n), o(n);
        }
      });
    });
  },
 
  getCityData: function (t) {
    if(wx.getStorageSync('cityCode')==null){
      wx.setStorageSync('cityCode','sh')
      wx.setStorageSync('cityName','上海')
    }
   }
})