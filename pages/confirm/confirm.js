function a(a, t, e) {
  return t in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a;
}
const urlList = require('../../config.js')

var t, e, o = require("../../qqmap-wx-jssdk.min.js"), n = getApp();

Page({
  data: {
    indicatorDots: !0,
    autoplay: !1,
    interval: 3e3,
    duration: 500,
    current: 0,
    currentNum: 0,
    room_num: "",
    estate_name: "",
    imgSrc: "../images/zk.png",
    height: "100rpx",
    Zindex: 1,
    hidden: !1,
    fixed: 1,
    show_back: !1,
    save: 1,
    showLandType: !1,
    img: [],
    estArr: [],
    title: '',
    text: '',
    url: '',
    msg: 'tips:可点击图片查看大图，复制url到浏览器查看原文哟',
   
    count:''
  },
  onLoad: function (a) {
     this.setData({
       count: a.count
     })

    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 1e4
    })
    var that = this
    wx.request({
      url: urlList.queryone,
      data: {
        rentid: a.rid,
      },
      success: function (a) {
        console.log(a.data.data)
        that.setData({ 
          img: a.data.data.image_urls,
          title: a.data.data.title,
          url: a.data.data.url,
          text: a.data.data.houseinfo.text,
        })
        wx.hideToast();
      }
    });
  },


  swiperSlide: function (a) {
    this.setData({
      current: a.detail.current
    }), e = a.detail.current;
  },


  bigPic: function (a) {

    var imgurls = [];

    for (var i = 0; i < this.data.img.length; i++) {
      imgurls.push(this.data.img[i].url)
    }

    wx.previewImage({
      current: this.data.img[e],
      urls: imgurls,
      complete: function (a) {
        console.log(a);
      }
    }), console.log(this.data.img[e]);
  },
  subscribeMessage: function () {
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
});