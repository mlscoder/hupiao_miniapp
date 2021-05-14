//index.js
//获取应用实例
const app = getApp();
const urlList = require('../../config.js')
Page({
  data: {
    url: '',
  },
  onLoad: function (res) {
    var that =this 
    wx.request({
      url: urlList.message,
      success(res) {
        console.log(res.data.data.url)
        that.setData({
          url: res.data.data.url
        })
      }
    })
  },
  
})
