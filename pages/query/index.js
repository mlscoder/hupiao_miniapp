const urlList = require('../../config.js')
var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, a = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../util/list/index.js")), e = getApp(), o = require("../../qqmap-wx-jssdk.min.js"), i = {
    showfilter: !1,
    city_box: !1,
    statusTip: !1,
    houseMess: 0,
    dataStadus: "数据加载中···",
    loadingStatus: !1,
    showfilterindex: 0,
    showareaindex: 0,
    sqArray: [],
    dtArray: [],
    pageNo: 0,
    money_max: 999999,
    money_min: 0,
    //合整租类型
    logicSort: "0",
    logicPay: "0",
    logicgril: "0",
    logicCount: "0",
    region_id: "",
    plate_id: "",
    line_id: 0,
    stand_id: 0,
    key: "",
    key_self: "0",
    type_no: 0,
    search_id: "",
    latitude: "",
    longitude: "",
    distance: "0",
    update_time: 0,
    other_ids: "",
    listArras: [],
    idx: 0,
    idx1: 0,
    area: "区域",
    zu: "租金",
    sort: "类型",
    more: "更多",
    count:"次数",
    pay: "付款",
    gril: "性别",
      renttype: [ {
        id: "0",
        content: "不限"
     }, {
         id: "1",
         content: "合租"
       }, {
         id: "2",
         content: "整租"
       } ],
  griltype: [{
    id: "0",
    content: "全部"
  }, {
    id: '1',
    content: "仅限女生"
  }],

  paytype: [{
    id: "0",
    content: "不限"
  }, {
    id: "1",
    content: "付一"
  }, {
    id: "3",
    content: "付三"
  }],
  counttype: [{
    id: "0",
    content: "不限"
  }, {
    id: "1",
    content: "6次以下"
  }, {
    id: "2",
    content: "10次以下"
    }, {
      id: "3",
      content: "20次以下"
    }],

    nearByArr: [],
    otherData: {},
    price: [],
    cur1: 0,
    cur2: 0,
    cur3: 0,
    cur4: 0,
    data1: 0,
    data2: 0,
    data3: 0,
    data4: 0,
    typeArr: [],
    onLoading: !1,
    moreDataActive: {},
    selectMoreData: [],
    nLocation: 0,
    message:'',
    url:''
};


Page(t({}, a.default.listOp, {
    data: t({}, a.default.data, i, {
      cityCode: '001009001',
    }),
    onLoad: function(t) {
      wx.showToast({
        title: "加载中...",
        icon: "loading",
        duration: 1e4
      })

      this.getTitle();
   this.getHouseData();

    },

    getTitle:function(){
      var that =this
        wx.request({
          url: urlList.message,
          success(res){
            that.setData({
              message: res.data.data.message,
              url: res.data.data.url
              })

          }
        })

    },
    reload: function() {
        var a = this;
         wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4
        }), a.setData(t({
            listArras: []
        }, i, {
            index23: -2,
            hxindex: -2,
            index3: -2,
            index2: -2,
            index22: -2,
            index4: -2,
            index5: -2,
            showarea: !1,
            showtext1: 0,
            showtext2: 0,
            showtext3: 0,
            showtext4: 0,
            showtext5: 0,
            showtext6: 0,
            houseMess: 0,
            loadingStatus: !1
        })), a.onLoad(), a.onReady();
    },
 

  message:function(){
    var that = this;
    
    wx.navigateTo({
      url: '../weixinlink/weixinlink'

    })

  },
    getHouseData: function() {
        var t = this;
        t.data.pageNo++;
        var a = {
            pageno: t.data.pageNo,
            city_code: t.data.cityCode,
            limit: 10,
            sort: -1,
            money_max: t.data.money_max,
            money_min: t.data.money_min,
            logicSort: t.data.logicSort,
            logicPay: t.data.logicPay,
            logicGirl: t.data.logicgril,
            logicCount: t.data.logicCount,
            region_id: t.data.region_id,
            plate_id: t.data.plate_id,
            line_id: t.data.line_id,
            stand_id: t.data.stand_id,
            type_no: t.data.type_no,
            search_id: t.data.search_id,
            key: t.data.key,
            key_self: t.data.key_self

        };
        console.log(a)
        wx.request({
          url: urlList.querylist,
            data: a,
            success: function(a) {
                if (console.log(a), "200" == a.data.status) {
                  console.log(a.data.data.house_list)
                    var o = a.data.data.house_list || [];
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
                    }), wx.hideToast(),true) {

                        t.houseDataWast(o);
                    } 
                } else t.setData({
                    houseMess: 0,
                    loadingStatus: !1,
                    statusTip: !0
                }), wx.hideToast();
            }
        });
    },
    houseDataWast: function(a) {
        for (var e = this, o = [], i = 0; i < a.length; i++) {
          a[i].main_img_path = a[i].mainImgUrl + "?x-oss-process=style/w500", o.push(a[i]);
        }
        e.setData({
            listArras: e.data.listArras.concat(o)
        });
    },
    catchtouchmove: function(t) {
        return !1;
    },
    nearby: function() {
        var t = this;
        if (t.setData({
            showareaindex: 1,
            showarea: !1
        }), wx.getStorageSync("select" + t.data.cityCode + e.globalData.version)) {
            var a = wx.getStorageSync("select" + t.data.cityCode + e.globalData.version);
            t.setNearByData(a);
        } else e.getSelectData(t.data.cityCode).then(function(a) {
            t.setNearByData(a);
        });
    },
    setDistance: function(t) {},
    setNearByData: function(t) {
        this.getLocationCallBack(t);
    },
    getLocationCallBack: function(t) {
        var a = this, e = wx.getStorageSync("lat"), o = wx.getStorageSync("locationTip");
        "" == e && "" != o && wx.showToast({
            title: o,
            icon: "none",
            duration: 1e3
        });
        var i = [];
        a.setData({
            nearByArr: i.concat(t.data.data.nearby),
            showareaindex2: 4
        }), console.log(a.data.nearByArr);
    },
    locationInfoPromise: function() {
        var t = this;
        return new Promise(function(a, e) {
            wx.getLocation({
                type: "gcj02",
                success: function(e) {
                    var o = e.latitude.toFixed(6), i = e.longitude.toFixed(6);
                    t.geoconv(o + "," + i).then(function(t) {
                        a();
                    }).catch(function(t) {
                        a();
                    });
                },
                fail: function(a) {
                    t.setLocation(a), e(a);
                }
            });
        });
    },
    sortDistance: function(t) {
        var a = this, e = t.currentTarget.dataset.item, o = t.currentTarget.dataset.id, i = t.currentTarget.dataset.index;
        a.showToast(), a.setData({
            area: e,
            distance: o,
            nearIndex: i,
            showfilter: !1,
            pageNo: 0,
            listArras: [],
            showfilterindex: 0,
            showtext1: 1,
            region_id: "",
            plate_id: "",
            line_id: 0,
            stand_id: 0
        }), a.locationInfoPromise().then(function(e) {
            a.sortData(t);
        }).catch(function(e) {
            a.sortData(t);
        });
    },
   
    getPlate: function(t) {
        var a = this, o = t.currentTarget.dataset.index, i = t.currentTarget.dataset.mess, n = t.currentTarget.dataset.mes;
        a.setData({
            index2: o,
            region_id: i,
            index4: -2,
            mess: n
        }), wx.request({
            url: e.globalData.http + "/scopes.html",
            data: {
                city_code: a.data.cityCode,
                region_id: i
            },
            success: function(t) {
                for (var e = [], o = t.data.data.length, i = 0; i < o; i++) e.push(t.data.data[i]);
                a.setData({
                    showarea: !0,
                    showareaindex2: 2,
                    sqArray2: e
                });
            }
        });
    },
    getPlate2: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.index, o = t.currentTarget.dataset.mes;
        this.showTabBar();
        var i = this;
        "不限" == o ? i.setData({
            index4: -1,
            area: i.data.mess,
            plate_id: "",
            showtext1: 0
        }) : i.setData({
            plate_id: a,
            index4: e,
            area: o
        }), i.setData({
            showfilter: !1,
            pageNo: 0,
            listArras: [],
            showfilterindex: 0,
            showtext1: 1,
            statusTip: !1,
            houseMess: 0,
            loadingStatus: !1,
            distance: "0",
            nLocation: 0
        }), i.showToast(), i.getHouseData();
    },
    showToast: function() {
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4
        });
    },
    setdtPanel: function(t) {
        var a = this, o = [];
       
        var i;
        wx.getStorageSync("select" + a.data.cityCode + e.globalData.version) ? (i = wx.getStorageSync("select" + a.data.cityCode + e.globalData.version), 
        a.setdt_panel_data(i, o)) : e.getSelectData(a.data.cityCode).then(function(t) {
            a.setdt_panel_data(t, o);
        });
    },
    setdt_panel_data: function(t, a) {
        for (var e = this, o = t.data.data.weight_subways, i = 0; i < o.length; i++) a.push(o[i]);
        e.setData({
            showarea: !0,
            showareaindex: 3,
            dtArray: a,
            showareaindex2: 0,
            nearIndex: -2,
            region_id: "",
            plate_id: "",
            index2: -1,
            index4: -1
        });
    },
    getdtpanel: function(t) {
      for (var a = this, o = wx.getStorageSync("select" + a.data.cityCode + e.globalData.version), i = t.currentTarget.dataset.id, n = t.currentTarget.dataset.index, s = t.currentTarget.dataset.mess, r = [], d = 0; d < o.data.data.subways.length; d++) i == o.data.data.subways[d].subwayline_id && r.push(o.data.data.subways[d]);
        a.setData({
            showareaindex2: 3,
            showarea: !0,
            subwayState: r,
            index22: n,
            dtMess: s,
            index5: -3,
            line_id: i
        });
    },
    getdtpanel2: function(t) {
        var a = this;
        this.showTabBar();
      var e = t.currentTarget.dataset.index, o = t.currentTarget.dataset.mess, i = t.currentTarget.dataset.mess;
      console.log(t.currentTarget.dataset)
        "不限" == o ? a.setData({
            index5: -1,
            area: a.data.dtMess,
            stand_id: 0,
            showtext1: 0
        }) : a.setData({
            stand_id: i,
            index5: e,
            area: o
        }), a.setData({
            showfilter: !1,
            pageNo: 0,
            listArras: [],
            showfilterindex: 0,
            showtext1: 1,
            statusTip: !1,
            houseMess: 0,
            loadingStatus: !1,
            distance: "0",
            nLocation: 0
        }), wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4
        }), a.getHouseData();
    },
    Panelnone: function(t) {
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4
        }),  this.showTabBar(), this.setData({
            showfilter: !1,
            showarea: !1,
            showareaindex: 0,
            showfilterindex: 0,
            showareaindex2: 0,
            area: "区域",
            showtext1: 2,
            listArras: [],
            pageNo: 0,
            region_id: "",
            plate_id: "",
            index2: -1,
            index4: -1,
            nearIndex: -2,
            line_id: 0,
            stand_id: 0,
            index22: -1,
            index5: -1,
            showtet1: 0,
            showtet2: 0,
            showtet3: 0,
            showtet4: 0,
            houseMess: 1,
            distance: "0",
            nLocation: 0
        }), this.getHouseData();
    },
    handleMoreClick: function(t) {
        var a = this, e = t.currentTarget.dataset.id, o = a.data.moreData;
      console.log(a.data);
        console.log(o);
        var i = !0, n = !1, s = void 0;
        try {
            for (var r, d = o[Symbol.iterator](); !(i = (r = d.next()).done); i = !0) {
                var c = r.value, l = !0, u = !1, h = void 0;
                try {
                    for (var g, y = c.data[Symbol.iterator](); !(l = (g = y.next()).done); l = !0) {
                        var w = g.value;
                        if (w.id === e) if (1 != a.data.moreDataActive[w.id]) a.data.moreDataActive[w.id] = 1, 
                        a.data.selectMoreData.push(w.id); else {
                            a.data.moreDataActive[w.id] = 0;
                            var x = a.data.selectMoreData.indexOf(w.id);
                            a.data.selectMoreData.splice(x, 1), console.log(a.data.selectMoreData);
                        }
                    }
                } catch (t) {
                    u = !0, h = t;
                } finally {
                    try {
                        !l && y.return && y.return();
                    } finally {
                        if (u) throw h;
                    }
                }
            }
        } catch (t) {
            n = !0, s = t;
        } finally {
            try {
                !i && d.return && d.return();
            } finally {
                if (n) throw s;
            }
        }
        console.log(o), console.log(a.data.selectMoreData);
        var f;
        f = a.data.selectMoreData.length > 0 ? 1 : 0, a.setData({
            showClearActive: f,
            moreDataActive: a.data.moreDataActive
        });
    },
    getOtherData: function(t) {
        var a = this, e = {}, o = !0, i = !1, n = void 0;
        try {
            for (var s, r = t[Symbol.iterator](); !(o = (s = r.next()).done); o = !0) {
                var d = s.value, c = {
                    id: d.id,
                    content: d.content,
                    data: []
                };
                void 0 === e[String(d.parent_id)] ? (e[String(d.parent_id)] = [], e[d.parent_id].push(c)) : e[d.parent_id].push(c);
            }
        } catch (t) {
            i = !0, n = t;
        } finally {
            try {
                !o && r.return && r.return();
            } finally {
                if (i) throw n;
            }
        }
        var l = !0, u = !1, h = void 0;
        try {
            for (var g, y = e[0][Symbol.iterator](); !(l = (g = y.next()).done); l = !0) {
                var w = g.value, x = !0, f = !1, _ = void 0;
                try {
                    for (var D, m = t[Symbol.iterator](); !(x = (D = m.next()).done); x = !0) {
                        var S = D.value;
                        w.id === S.parent_id && (S.isCheck = !1, w.data.push(S));
                    }
                } catch (t) {
                    f = !0, _ = t;
                } finally {
                    try {
                        !x && m.return && m.return();
                    } finally {
                        if (f) throw _;
                    }
                }
            }
        } catch (t) {
            u = !0, h = t;
        } finally {
            try {
                !l && y.return && y.return();
            } finally {
                if (u) throw h;
            }
        }
        console.log(e), a.setData({
            moreData: e[0]
        });
    },
    setFilterPanelResult: function(t, a) {
        var e = this;
        e.getOtherData(t.data.data.other_datas), this.setData({
            price: t.data.data.money,
            typeArr: t.data.data.other_datas
        }), this.data.showfilterindex == a ? this.setData({
            showfilter: !1,
            showfilterindex: 0
        }) : this.setData({
            showfilter: !0,
            showfilterindex: a
        });
    },
    setFilterPanel: function(t) {
        var a, o = this, i = t.currentTarget.dataset.findex;
        if (wx.getStorageSync("select" + o.data.cityCode + e.globalData.version)) return a = wx.getStorageSync("select" + o.data.cityCode + e.globalData.version), 
        o.setFilterPanelResult(a, i);
        e.getSelectData(o.data.cityCode).then(function(t) {
            return o.setFilterPanelResult(t, i);
        });
    },
    clearMore: function() {
        this.setData({
            moreDataActive: {},
            selectMoreData: [],
            showClearActive: 0
        });
    },
    hideFilter: function(t) {
        this.setData({
            showfilter: !1,
            showfilterindex: 0
        }), this.showTabBar();
    },
    sortSelect: function(t) {
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4
        }), this.showTabBar();
        var a = this, e = t.currentTarget.dataset.index;
        t.currentTarget.dataset.item;
        a.setData({
            index3: e,
            showfilter: !1,
            showfilterindex: 0,
            pageNo: 0,
            listArras: [],
            statusTip: !1,
            houseMess: 0,
            loadingStatus: !1,
            nLocation: 0
        }), "1" == e ? a.setData({
            sort: "合租",
            showtext3: 1,
            logicSort: "1"
        }) : "2" == e ? a.setData({
            sort: "整租",
            showtext3: 1,
            logicSort: "2"
        }) : a.setData({
            sort: "类型",
            showtext3: 0,
            logicSort: "0"
        }), a.getHouseData();
    },

  paySelect: function (t) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 1e4
    }), this.showTabBar();
    var a = this, e = t.currentTarget.dataset.index;
    t.currentTarget.dataset.item;
    a.setData({
      index3: e,
      showfilter: !1,
      showfilterindex: 0,
      pageNo: 0,
      listArras: [],
      statusTip: !1,
      houseMess: 0,
      loadingStatus: !1,
      nLocation: 0
    }), "1" == e ? a.setData({
      pay: "付一",
      showtext4: 1,
      logicPay: "1"
    }) : "3" == e ? a.setData({
      pay: "付三",
      showtext4: 1,
      logicPay: "2"
    }) : a.setData({
      pay: "付款",
      showtext4: 0,
      logicPay: "0"
    }), a.getHouseData();
  },

 grilSelect: function (t) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 1e4
    }), this.showTabBar();
    var a = this, e = t.currentTarget.dataset.index;
    t.currentTarget.dataset.item;
    a.setData({
      index3: e,
      showfilter: !1,
      showfilterindex: 0,
      pageNo: 0,
      listArras: [],
      statusTip: !1,
      houseMess: 0,
      loadingStatus: !1,
      nLocation: 0
    }), "1" == e ? a.setData({
      gril: "女生",
      showtext5: 1,
      logicgril: "1"
    }) : "2" == e ? a.setData({
      gril: "男女不限",
      showtext5: 1,
      logicgril: "2"
    }) : a.setData({
      gril: "性别",
      showtext5: 0,
      logicgril: "0"
    }), a.getHouseData();
  },

  countSelect: function (t) {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 1e4
    }), this.showTabBar();
    var a = this, e = t.currentTarget.dataset.index;
    t.currentTarget.dataset.item;
    a.setData({
      index3: e,
      showfilter: !1,
      showfilterindex: 0,
      pageNo: 0,
      listArras: [],
      statusTip: !1,
      houseMess: 0,
      loadingStatus: !1,
      nLocation: 0
    }), "1" == e ? a.setData({
      count: "6次",
      showtext6: 1,
      logicCount: "5"
    }) : "2" == e ? a.setData({
      count: "10次",
      showtext6: 1,
      logicCount: "9"
    }) : "3" == e ? a.setData({
      count: "20次",
      showtext6: 1,
      logicCount: "19"
    }) : a.setData({
      count: "次数",
      showtext6: 0,
      logicCount: "0"
    }), a.getHouseData();
  },

    priceSelect: function(t) {
        var a = this;
        a.showTabBar();
        var e = t.currentTarget.dataset.index, o = t.currentTarget.dataset.item;
        if (o.indexOf("以下") > -1) {
            n = o.replace("以下", "");
            a.setData({
                showtext2: 1,
                money_max: n,
                money_min: 0,
                zu: o
            });
        } else if (o.indexOf("-") > -1) {
            var i = o.split("-");
            a.setData({
                showtext2: 1,
                money_max: i[1],
                money_min: i[0],
                zu: o
            });
        } else if (o.indexOf("以上") > -1) {
            var n = o.replace("以上", "");
            a.setData({
                showtext2: 1,
                money_max: 999999,
                money_min: n,
                zu: o
            });
        } else "不限" == o && a.setData({
            showtext2: 0,
            index23: -1,
            money_max: 99999,
            money_min: 0,
            zu: "租金"
        });
        a.setData({
            index23: e,
            showfilter: !1,
            showfilterindex: 0,
            pageNo: 0,
            listArras: [],
            statusTip: !1,
            houseMess: 0,
            loadingStatus: !1,
            nLocation: 0
        }), wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4
        }), a.getHouseData();
    },
    showTabBar: function() {},
    onReachBottom: function() {
        this.data.houseMess > 0 && 2 != this.data.houseMess && (this.setData({
            loadingStatus: !0
        }), this.getHouseData());
    },
 

    searchPage: function(t) {
        wx.navigateTo({
            url: "/pages/search/search?cityCode=" + this.data.cityCode
        });
    },
    onShareAppMessage: function() {
        return {
            title: "沪漂小窝-租房信息查询定制小站",
            desc: "一个租房信息查询整合工具！",
            path: "/pages/query/index"
        };
    },
    onPullDownRefresh: function() {
        this.Panelnone();
    },

    touchS: function(t) {},
    touchM: function(t) {},
    touchE: function(t) {}
}));