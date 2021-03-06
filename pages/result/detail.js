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
        img:[],
        estArr: [],
        title:'',
      text:'',
      url:'',
      msg:'tips:可点击图片查看大图，复制链接到浏览器查看原文哟',
      message:'免责声明：信息来源于互联网公开信息，本工具不对真实性和时效性负责，若侵犯您的权益，请联系客服删除'
    },
    onLoad: function(a) {
      console.log(a.rentid)
       wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4
        })
      var that = this
        wx.request({
          url: urlList.queryone,
            data: {
              rentid: a.rentid,
            },
            success: function(a) {
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


    swiperSlide: function(a) {
        this.setData({
            current: a.detail.current
        }), e = a.detail.current;
    },

    bigPic: function(a) {
      
       var imgurls=[];
      
      for (var i = 0; i < this.data.img.length; i++) {
        imgurls.push(this.data.img[i].url)
      }
       
        wx.previewImage({
            current: this.data.img[e],
            urls: imgurls,
            complete: function(a) {
                console.log(a);
            }
        }), console.log(this.data.img[e]);
    },
    copy:function(e){
      var code = e.currentTarget.dataset.copy;
      wx.setClipboardData({
        data: code,
        success: function (res) {
          wx.showToast({
            title: '复制成功',
          });
        },
        fail:function(res){
          wx.showToast({
            title: '复制失败',
          });
        }
      })
    },

    onShareAppMessage: function() {
      return {
          title: "我发现一个不错的房子在出租",
          desc: "一个租房信息查询整合工具！"
      };
  },
});