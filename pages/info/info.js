//index.js
//获取应用实例
const app = getApp();
const urlList = require('../../config.js')
Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: true,
 
    phone: '',
    code: '',
    btnValue:'获取验证码',
    second: 60,
  },
  onLoad: function () {

  },
  toview:function(){
    wx.redirectTo({
      url: '../view/view'
    })
  },

  //手机号输入
  bindPhoneInput(e) {
    var val = e.detail.value;
    this.setData({
      btnDisabled: false
    })
    if (val != '') {
      this.setData({
        phone: val
      })
    }
  },
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },
  //获取短信验证码
  getCode(e) {
    console.log('点击了获取验证码')
    var myreg = /^((1[3-9])+\d{9})$/;
    var that = this;
    
    if (!myreg.test(that.data.phone)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        wx.request({
          url: urlList.sendsms,
          data: {
            phone: that.data.phone,
            userId: res.data
          },
          success(res) {
            console.log(res)
            if (res.data.status==0) {
              wx.showToast({
                title: '发送成功！',
                icon: 'success',
                duration: 2000
              })
             wx.setStorage({
               key: 'number',
               data: res.data.number,
             })
             
            }else{
              wx.showToast({
                title: '发送失败，稍后再试！',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      },
    })
  },
  timer() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  //保存
  save(e) {
    //检验验证码
     var that =this;
    if (that.data.code == '' || that.data.code.length  != 6){
       wx.showToast({
         title: '请输入6位验证码！',
         icon: 'none',
         duration: 1500
       })
       return false;
     }
     
    wx.getStorage({
      key: 'number',
      success: function(res) {
        if (that.data.code != res.data){
          wx.showToast({
            title: '验证码输入错误',
            icon: 'none',
            duration: 1500
          })
          return false
        }else{
          wx.getStorage({
            key: 'userId',
            success: function(res) {
              wx.request({
                url: urlList.verify,
                data: {
                  userId: res.data,
                  phone: that.data.phone,
                },
                success(res) {
                  console.log(res)
                 if(res.data.status==0){
                   wx.showToast({
                     title: '验证成功',
                     icon: 'success',
                     duration: 1500
                   })
                   app.globalData.hasPhone=true
                   setTimeout(function () {
                     wx.navigateBack({
                       delta: 1
                     })
                   }, 1500)
                   
                 }else{
                   wx.showToast({
                     title: '验证失败，稍后再试',
                     icon: 'none',
                     duration: 1500
                   })
                 }
                }
              })
            },
          })
        
        }   
  
    },
    })
 
  }
})
