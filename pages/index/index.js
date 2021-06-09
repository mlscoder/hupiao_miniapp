//index.js
//获取应用实例
const app = getApp()
const urlList = require('../../config.js')
var t = Object.assign || function (t) {
  for (var a = 1; a < arguments.length; a++) {
    var e = arguments[a];
    for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
  }
  return t;
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    renttype: 0,
    pay: 0,
    onlyGirl: 0,
    station: '',
    price: '',
    count: '',
    title: '',
    cityArra: [],
    cityCode: 'sh',
    cityName: '上海',
    message: '马拉松程序员'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../confirm/confirm?rid=30568&count=2'
    })
  },
  help: function () {
    wx.navigateTo({
      url: '../help/help'
    })
  },

  onLoad: function () {
    var a = this
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: urlList.city,
      success(res) {
        console.log(res.data.data)
        a.setData({
          cityArra: res.data.data
        })
      }

    });
    this.getTitle();
    this.getcustom();

  },
  onShow: function () {
    // 页面出现在前台时执行
    this.getcustom();
  },
  onReady: function () {
    this.getcustom();
  },
  getnotice: function () {
    var that = this;
    wx.request({
      url: urlList.getnotice,
      success(res) {
        if (res.data.notice != null) {
          that.setData({
            title: res.data.notice,
          })
        }
      }
    })
  },

  cityChange: function (t) {
    this.setData({
      city_box: !0
    });
  },
  cityBoxHide: function (t) {
    this.setData({
      city_box: !1
    });
  },
  citySelect: function (a) {
    console.log(a);
    var e = this;
    a.currentTarget.dataset.code != e.data.cityCode && (wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 300
    }), e.setData({
      cityCode: a.currentTarget.dataset.code,
      cityName: a.currentTarget.dataset.city,
    }));
  },
  set_city: function () {
    var t = this;
    wx.setStorageSync("cityCode", t.data.cityCode), wx.setStorageSync("cityName", t.data.cityName),
      e.globalData.city_code = wx.getStorageSync("cityCode"), e.globalData.city_name = wx.getStorageSync("cityName");
  },

  message: function () {
    wx.navigateTo({
      url: '../weixinlink/weixinlink'
    })
  },
  getTitle: function () {
    var that = this

    wx.request({
      url: urlList.message,
      success(res) {
        that.setData({
          message: res.data.data.message,
          url: res.data.data.url
        })

      }
    })

  },
  getcustom: function () {
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
            if (res.data.custom != null) {
              that.setData({
                cityCode: res.data.custom.city,
                renttype: res.data.custom.renttype,
                pay: res.data.custom.pay,
                onlyGirl: res.data.custom.onlyGirl,
                station: res.data.custom.station,
                price: res.data.custom.price,
              })
            }
          }
        })
      },
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    var a = this
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        a.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  submit: function (e) {

    var that = this;
    var city = that.data.cityCode;
    var renttype = e.detail.value.renttype;
    var pay = e.detail.value.pay;
    var onlyGirl = e.detail.value.onlyGirl;
    var station = e.detail.value.station;
    var price = e.detail.value.price;

    if (station == '' || station == null) {
      wx.showToast({
        title: '至少填写一个地铁站，不然无法给你推荐哟！',
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          wx.showLoading({
            title: '加载中',
            icon: 'loading',
            duration: 10000
          });
          wx.request({
            url: urlList.custom,
            data: {
              userId: res.data,
              city: city,
              rentType: renttype,
              pay: pay,
              onlyGirl: onlyGirl,
              station: station,
              price: price,
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
                  title: '提交成功，需要您点击开启订阅！',
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
  subscribeMessage: function () {
    console.log("subscribeMessage")
    wx.requestSubscribeMessage({
      tmplIds: ['CyDG40S2wfX-i8rVPbQxmD8C3Tcr0dYQwUqOcDV0Wcw'],
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
        })
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

  query2: function () {
    wx.navigateTo({
      url: '../confirm/confirm'
    })
  },
  query: function () {
    wx.navigateToMiniProgram({
      appId: 'wxc65aae34ad768873',
      path: 'pages/query/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '租房搜索助手',
      imageUrl: '/image/superman.jpg',
      path: '/pages/query/index'
    }
  },


})