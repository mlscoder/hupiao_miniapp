function a(a, t, e) {
  return t in a ? Object.defineProperty(a, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[t] = e, a;
}
const urlList = require('../../config.js')

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
    count: '',
    message:'免责声明：信息来源于互联网公开信息，本工具不对真实性和时效性负责，若侵犯您的权益，请联系客服删除'

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
          title: a.data.data.houseinfo.title,
          url: a.data.data.url,
          text: a.data.data.houseinfo.text,
        })
        wx.hideToast();
      }
    });
  },
  copy: function (e) {
    var code = e.currentTarget.dataset.copy;
    wx.setClipboardData({
      data: code,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '复制失败',
        });
      }
    })
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
});