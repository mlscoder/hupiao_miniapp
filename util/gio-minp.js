function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return e && e.$attrs ? e.$attrs.mpcomid : "0";
}

function n(e, n) {
    void 0 === n && (n = []);
    var i = n.slice(1);
    return i.length ? i.reduce(function(e, n) {
        for (var i = e.$children.length, r = 0; i > r; r++) {
            var s = e.$children[r];
            if (t(s) === n) return e = s;
        }
        return e;
    }, e) : e;
}

function i(e, t, n) {
    void 0 === n && (n = []);
    var r = [];
    if (!e || !e.tag) return r;
    var s = e || {}, o = s.data;
    void 0 === o && (o = {});
    var a = s.children;
    void 0 === a && (a = []);
    var u = s.componentInstance;
    u ? Object.keys(u.$slots).forEach(function(e) {
        var s = u.$slots[e];
        (Array.isArray(s) ? s : [ s ]).forEach(function(e) {
            r = r.concat(i(e, t, n));
        });
    }) : a.forEach(function(e) {
        r = r.concat(i(e, t, n));
    });
    var h = o.attrs, l = o.on;
    return h && l && h.eventid === t && n.forEach(function(e) {
        var t = l[e];
        "function" == typeof t ? r.push(t) : Array.isArray(t) && (r = r.concat(t));
    }), r;
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, s = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), o = function() {
    function t(n, i) {
        e(this, t), this.host = "https://wxapi.growingio.com", this.messageQueue = [], this.uploadingQueue = [], 
        this.uploadTimer = null, this.projectId = n, this.appId = i, this.url = this.host + "/projects/" + this.projectId + "/apps/" + this.appId + "/collect";
    }
    return s(t, [ {
        key: "setHost",
        value: function(e) {
            0 != e.indexOf("http") && (this.host = "https://" + e), this.url = this.host + "/projects/" + this.projectId + "/apps/" + this.appId + "/collect";
        }
    }, {
        key: "upload",
        value: function(e) {
            var t = this;
            this.messageQueue.push(e), this.uploadTimer || (this.uploadTimer = setTimeout(function() {
                t._flush(), t.uploadTimer = null;
            }, 1e3));
        }
    }, {
        key: "forceFlush",
        value: function() {
            this.uploadTimer && (clearTimeout(this.uploadTimer), this.uploadTimer = null), this._flush();
        }
    }, {
        key: "_flush",
        value: function() {
            var e = this;
            this.uploadingQueue = this.messageQueue.slice(), this.messageQueue = [], this.uploadingQueue.length > 0 && wx.request({
                url: this.url + "?stm=" + Date.now(),
                header: {
                    "content-type": "application/json"
                },
                method: "POST",
                data: this.uploadingQueue,
                success: function() {
                    e.messageQueue.length > 0 && e._flush();
                },
                fail: function() {
                    e.messageQueue = e.uploadingQueue.concat(e.messageQueue);
                }
            });
        }
    } ]), t;
}(), a = {
    sdkVer: "0.9",
    devVer: 1,
    guid: function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16);
        });
    },
    getScreenHeight: function(e) {
        return Math.round(e.screenHeight * e.pixelRatio);
    },
    getScreenWidth: function(e) {
        return Math.round(e.screenWidth * e.pixelRatio);
    },
    getOS: function(e) {
        if (e) {
            var t = e.toLowerCase();
            return -1 != t.indexOf("android") ? "Weixin-Android" : -1 != t.indexOf("ios") ? "Weixin-iOS" : e;
        }
    },
    getOSV: function(e) {
        return "Weixin " + e;
    },
    isEmpty: function(e) {
        for (var t in e) if (e.hasOwnProperty(t)) return !1;
        return !0;
    }
}, u = function() {
    function t() {
        e(this, t), this.queries = {};
    }
    return s(t, [ {
        key: "touch",
        value: function(e) {
            this.path = e.route, this.time = Date.now(), this.query = this.queries[e.route] ? this.queries[e.route] : void 0;
        }
    }, {
        key: "addQuery",
        value: function(e, t) {
            this.queries[e.route] = t ? this._getQuery(t) : null;
        }
    }, {
        key: "_getQuery",
        value: function(e) {
            return Object.keys(e).map(function(t) {
                return t + "=" + e[t];
            }).join("&");
        }
    } ]), t;
}(), h = {
    tap: [ "tap", "click" ],
    longtap: [ "longtap" ],
    input: [ "input" ],
    blur: [ "change", "blur" ],
    submit: [ "submit" ],
    focus: [ "focus" ]
}, l = function() {
    function t(n) {
        e(this, t), this.vueVM = n;
    }
    return s(t, [ {
        key: "getHandle",
        value: function(e) {
            var t = e.type, r = e.target;
            void 0 === r && (r = {});
            var s = (e.currentTarget || r).dataset;
            void 0 === s && (s = {});
            var o = s.comkey;
            void 0 === o && (o = "");
            var a = s.eventid, u = n(this.vueVM, o.split(","));
            if (u) {
                var l = i(u._vnode, a, h[t] || [ t ]);
                return l.length ? l[0].name : void 0;
            }
        }
    } ]), t;
}(), c = function() {
    function t(n) {
        e(this, t), this.growingio = n, this.weixin = n.weixin, this.currentPage = new u(), 
        this.scene = null, this.sessionId = null, this.cs1 = null, this.lastPageEvent = void 0, 
        this.isOnShareAppMessage = !1, this.CLICK_TYPE = {
            tap: "clck",
            longpress: "lngprss",
            longtap: "lngprss"
        };
    }
    return s(t, [ {
        key: "setUserId",
        value: function(e) {
            var t = e + "";
            t && 100 > t.length && (this.cs1 = t, this.lastPageEvent && this._sendEvent(this.lastPageEvent));
        }
    }, {
        key: "clearUserId",
        value: function() {
            this.cs1 = null;
        }
    }, {
        key: "appListener",
        value: function(e, t, n) {
            this.isOnShareAppMessage || (this.growingio.debug && console.log("App.", t, Date.now()), 
            "onShow" == t ? (this.sessionId = a.guid(), this.lastPageEvent = void 0, this.sendVisitEvent(n)) : "onHide" == t ? (this.growingio.forceFlush(), 
            this.weixin.syncStorage(), this.isOnShareAppMessage || this.sendVisitCloseEvent()) : "onError" == t && this.sendErrorEvent(n));
        }
    }, {
        key: "pageListener",
        value: function(e, t, n) {
            if (this.growingio.debug && console.log("Page.", e.route, "#", t, Date.now()), "onShow" === t) this.isOnShareAppMessage ? this.isOnShareAppMessage = !1 : (this.currentPage.touch(e), 
            this.sendPage(e)); else if ("onLoad" === t) a.isEmpty(i = n[0]) || this.currentPage.addQuery(e, i); else if ("onShareAppMessage" === t) {
                var i = null, r = null;
                2 > n.length ? 1 === n.length && (n[0].from ? i = n[0] : n[0].title && (r = n[0])) : (i = n[0], 
                r = n[1]), this.isOnShareAppMessage = !0, this.sendPageShare(e, i, r);
            } else "onTabItemTap" === t && this.sendTabClick(n[0]);
        }
    }, {
        key: "actionListener",
        value: function(e, t) {
            if ("handleProxy" === t && this.growingio.vueRootVMs && this.growingio.vueRootVMs[this.currentPage.path]) {
                var n = new l(this.growingio.vueRootVMs[this.currentPage.path]).getHandle(e);
                n && (t = n);
            }
            this.growingio.debug && console.log("Click on ", t, Date.now()), "tap" === e.type || "longpress" === e.type ? this.sendClick(e, t) : -1 !== [ "change", "confirm", "blur" ].indexOf(e.type) ? this.sendChange(e, t) : "getuserinfo" === e.type && (this.sendClick(e, t), 
            e.detail && e.detail.userInfo && this.setVisitor(e.detail.userInfo));
        }
    }, {
        key: "track",
        value: function(e, t) {
            if (null !== e && void 0 !== e && 0 !== e.length) {
                var n = {
                    t: "cstm",
                    ptm: this.currentPage.time,
                    p: this.currentPage.path,
                    q: this.currentPage.query,
                    n: e
                };
                null !== t && "object" == (void 0 === t ? "undefined" : r(t)) && (n.var = t), this._sendEvent(n);
            }
        }
    }, {
        key: "identify",
        value: function(e, t) {
            void 0 !== e && 0 !== e.length && (this.growingio.login(e), this._sendEvent({
                t: "vstr",
                var: {
                    openid: e,
                    unionid: t
                }
            }));
        }
    }, {
        key: "setVisitor",
        value: function(e) {
            this._sendEvent({
                t: "vstr",
                var: e
            });
        }
    }, {
        key: "setUser",
        value: function(e) {
            this._sendEvent({
                t: "ppl",
                var: e
            });
        }
    }, {
        key: "setPage",
        value: function(e) {
            this._sendEvent({
                t: "pvar",
                ptm: this.currentPage.time,
                p: this.currentPage.path,
                q: this.currentPage.query,
                var: e
            });
        }
    }, {
        key: "setEvar",
        value: function(e) {
            this._sendEvent({
                t: "evar",
                var: e
            });
        }
    }, {
        key: "sendVisitEvent",
        value: function(e) {
            var t = this, n = this.weixin.systemInfo, i = {
                t: "vst",
                tm: Date.now(),
                av: a.sdkVer,
                db: n.brand,
                dm: n.model.replace(/<.*>/, ""),
                sh: a.getScreenHeight(n),
                sw: a.getScreenWidth(n),
                os: a.getOS(n.platform),
                osv: a.getOSV(n.version),
                l: n.language
            };
            if (this.growingio.appVer && (i.cv = this.growingio.appVer + ""), e.length > 0) {
                var r = e[0];
                i.p = r.path, a.isEmpty(r.query) || (i.q = this.currentPage._getQuery(r.query)), 
                i.ch = "scn:" + r.scene, r.referrerInfo && r.referrerInfo.appId && (i.rf = r.referrerInfo.appId), 
                this.scene = r.scene;
            }
            this.weixin.requestLocation().then(function() {
                null != t.weixin.location && (i.lat = t.weixin.location.latitude, i.lng = t.weixin.location.longitude), 
                t.weixin.getNetworkType().then(function(e) {
                    e && (i.nt = e.networkType), t._sendEvent(i);
                });
            });
        }
    }, {
        key: "sendVisitCloseEvent",
        value: function() {
            this._sendEvent({
                t: "cls",
                p: this.currentPage.path,
                q: this.currentPage.query
            });
        }
    }, {
        key: "sendErrorEvent",
        value: function(e) {
            if (e.length > 0) {
                var t = e[0].split("\n");
                if (t.length > 1) {
                    var n = t[1].split(";");
                    if (n.length > 1) {
                        var i = n[1].match(/at ([^ ]+) page (.*) function/), r = {
                            key: t[0],
                            error: n[0]
                        };
                        i.length > 2 && (r.page = i[1], r.function = i[2]), this._sendEvent({
                            t: "cstm",
                            ptm: this.currentPage.time,
                            p: this.currentPage.path,
                            q: this.currentPage.query,
                            n: "onError",
                            var: r
                        });
                    }
                }
            }
        }
    }, {
        key: "sendPage",
        value: function(e) {
            var t = {
                t: "page",
                tm: this.currentPage.time,
                p: this.currentPage.path,
                q: this.currentPage.query
            };
            t.rp = this.lastPageEvent ? this.lastPageEvent.p : this.scene ? "scn:" + this.scene : null, 
            e.data && e.data.pvar && (t.var = e.data.pvar);
            var n = this.weixin.getPageTitle(e);
            n && n.length > 0 && (t.tl = n), this._sendEvent(t), this.lastPageEvent = t;
        }
    }, {
        key: "sendPageShare",
        value: function(e, t, n) {
            this._sendEvent({
                t: "cstm",
                ptm: this.currentPage.time,
                p: this.currentPage.path,
                q: this.currentPage.query,
                n: "onShareAppMessage",
                var: {
                    from: t ? t.from : void 0,
                    target: t && t.target ? t.target.id : void 0,
                    title: n ? n.title : void 0,
                    path: n ? n.path : void 0
                }
            });
        }
    }, {
        key: "sendClick",
        value: function(e, t) {
            var n = {
                t: this.CLICK_TYPE[e.type],
                ptm: this.currentPage.time,
                p: this.currentPage.path,
                q: this.currentPage.query
            }, i = e.currentTarget, r = {
                x: i.id + "#" + t
            };
            i.dataset.title ? r.v = i.dataset.title : i.dataset.src && (r.h = i.dataset.src), 
            void 0 !== i.dataset.index && (r.idx = i.dataset.index), n.e = [ r ], this._sendEvent(n);
        }
    }, {
        key: "sendChange",
        value: function(e, t) {
            var n = {
                t: "chng",
                ptm: this.currentPage.time,
                p: this.currentPage.path,
                q: this.currentPage.query
            }, i = e.currentTarget, r = {
                x: i.id + "#" + t
            };
            if (-1 !== [ "blur", "change", "confirm" ].indexOf(e.type) && i.dataset.growingTrack) {
                if (!e.detail.value || 0 === e.detail.value.length) return;
                "string" == typeof e.detail.value ? r.v = e.detail.value : "[object Array]" === Object.prototype.toString.call(e.detail.value) && (r.v = e.detail.value.join(","));
            }
            n.e = [ r ], this._sendEvent(n);
        }
    }, {
        key: "sendTabClick",
        value: function(e) {
            this._sendEvent({
                t: "clck",
                ptm: this.currentPage.time,
                p: this.currentPage.path,
                q: this.currentPage.query,
                elem: [ {
                    x: "#onTabItemTap",
                    v: e.text,
                    idx: e.index,
                    h: e.pagePath
                } ]
            });
        }
    }, {
        key: "_sendEvent",
        value: function(e) {
            e.u = this.weixin.uid, e.s = this.sessionId, e.tm = e.tm || Date.now(), e.d = this.growingio.appId, 
            e.b = "MinP", null !== this.cs1 && (e.cs1 = this.cs1), this.growingio.upload(e);
        }
    } ]), t;
}(), g = function() {
    function t(n) {
        e(this, t), this._location = null, this._systemInfo = null, this._uid = wx.getStorageSync("_growing_uid_"), 
        this._uid && 36 !== this._uid.length && (n.forceLogin = !1), this._esid = wx.getStorageSync("_growing_esid_");
    }
    return s(t, [ {
        key: "syncStorage",
        value: function() {
            wx.getStorageSync("_growing_uid_") || wx.setStorageSync("_growing_uid_", this._uid);
        }
    }, {
        key: "requestLocation",
        value: function() {
            var e = this;
            return new Promise(function(t) {
                e._getSetting().then(function(n) {
                    if (!(n && n.authSetting && n.authSetting["scope.userLocation"])) return t(null);
                    e._getLocation().then(function(n) {
                        return e._location = n, t(n);
                    });
                });
            });
        }
    }, {
        key: "getNetworkType",
        value: function() {
            return new Promise(function(e) {
                wx.getNetworkType({
                    success: function(t) {
                        return e(t);
                    },
                    fail: function() {
                        return e(null);
                    }
                });
            });
        }
    }, {
        key: "getPageTitle",
        value: function(e) {
            var t = "";
            try {
                if (e.data.title && e.data.title.length > 0 && (t = Array.isArray(e.data.title) ? e.data.title.join(" ") : e.data.title), 
                0 === t.length && __wxConfig) {
                    if (__wxConfig.tabBar) {
                        var n = __wxConfig.tabBar.list.find(function(t) {
                            return t.pathPath == e.route || t.pagePath == e.route + ".html";
                        });
                        n && n.text && (t = n.text);
                    }
                    if (0 == t.length) {
                        var i = __wxConfig.page[e.route] || __wxConfig.page[e.route + ".html"];
                        t = i ? i.window.navigationBarTitleText : __wxConfig.global.window.navigationBarTitleText;
                    }
                }
            } catch (e) {}
            return t;
        }
    }, {
        key: "_getSetting",
        value: function() {
            return new Promise(function(e) {
                wx.getSetting({
                    success: e,
                    fail: e
                });
            });
        }
    }, {
        key: "_getLocation",
        value: function() {
            return new Promise(function(e) {
                wx.getLocation({
                    success: e,
                    fail: function() {
                        return e(null);
                    }
                });
            });
        }
    }, {
        key: "location",
        get: function() {
            return this._location;
        }
    }, {
        key: "systemInfo",
        get: function() {
            return null == this._systemInfo && (this._systemInfo = wx.getSystemInfoSync()), 
            this._systemInfo;
        }
    }, {
        key: "esid",
        set: function(e) {
            this._esid = e, wx.setStorageSync("_growing_esid_", this._esid);
        },
        get: function() {
            return this._esid || (this._esid = 1), this._esid;
        }
    }, {
        key: "uid",
        set: function(e) {
            this._uid = e, wx.setStorageSync("_growing_uid_", this._uid);
        },
        get: function() {
            return this._uid || (this.uid = a.guid()), this._uid;
        }
    } ]), t;
}(), p = {
    defaultPageCallbacks: {},
    defaultAppCallbacks: {},
    appHandlers: [ "onShow", "onHide", "onError" ],
    pageHandlers: [ "onLoad", "onShow", "onShareAppMessage", "onTabItemTap" ],
    actionEventTypes: [ "tap", "longpress", "blur", "change", "confirm", "getuserinfo" ],
    originalPage: Page,
    originalApp: App,
    hook: function(e, t) {
        return function() {
            var n, i = arguments ? arguments[0] : void 0;
            if (i && i.currentTarget && -1 != p.actionEventTypes.indexOf(i.type)) try {
                p.observer.actionListener(i, e);
            } catch (e) {
                console.error(e);
            }
            if (this._growing_page_ && -1 !== [ "onShow", "onLoad", "onTabItemTap" ].indexOf(e) || (n = t.apply(this, arguments)), 
            this._growing_app_ && -1 != p.appHandlers.indexOf(e)) try {
                p.defaultAppCallbacks[e].apply(this, arguments);
            } catch (e) {
                console.error(e);
            }
            if (this._growing_page_ && -1 != p.pageHandlers.indexOf(e)) {
                var r = Array.prototype.slice.call(arguments);
                n && r.push(n);
                try {
                    p.defaultPageCallbacks[e].apply(this, r);
                } catch (e) {
                    console.error(e);
                }
                -1 != [ "onShow", "onLoad", "onTabItemTap" ].indexOf(e) && (n = t.apply(this, arguments));
            }
            return n;
        };
    },
    instrument: function(e) {
        for (var t in e) "function" == typeof e[t] && (e[t] = this.hook(t, e[t]));
        return e._growing_app_ && p.appHandlers.map(function(t) {
            e[t] || (e[t] = p.defaultAppCallbacks[t]);
        }), e._growing_page_ && p.pageHandlers.map(function(t) {
            e[t] || "onShareAppMessage" === t || (e[t] = p.defaultPageCallbacks[t]);
        }), e;
    },
    GrowingPage: function(e) {
        e._growing_page_ = !0, p.originalPage(p.instrument(e));
    },
    GrowingApp: function(e) {
        e._growing_app_ = !0, p.originalApp(p.instrument(e));
    },
    initInstrument: function(e) {
        p.observer = e, p.pageHandlers.forEach(function(e) {
            p.defaultPageCallbacks[e] = function() {
                this.__route__ && p.observer.pageListener(this, e, arguments);
            };
        }), p.appHandlers.forEach(function(e) {
            p.defaultAppCallbacks[e] = function() {
                p.observer.appListener(this, e, arguments);
            };
        }), Page = function() {
            return p.GrowingPage(arguments[0]);
        }, App = function() {
            return p.GrowingApp(arguments[0]);
        };
    }
}, d = new (function() {
    function t() {
        e(this, t), this.uploadingMessages = [];
    }
    return s(t, [ {
        key: "init",
        value: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            this.projectId = e, this.appId = t, this.appVer = n.version, this.debug = n.debug || !1, 
            this.forceLogin = n.forceLogin || !1, this.weixin = new g(this), this.esid = this.weixin.esid, 
            this.uploader = new o(this.projectId, this.appId), this.observer = new c(this), 
            n.vue && (this.vueRootVMs = {}, this._proxyVue(n.vue)), this._start();
        }
    }, {
        key: "setHost",
        value: function(e) {
            this.uploader.setHost(e);
        }
    }, {
        key: "setVue",
        value: function(e) {
            this.vueRootVMs || (this.vueRootVMs = {}), this._proxyVue(e);
        }
    }, {
        key: "login",
        value: function(e) {
            if (this.forceLogin) {
                var t = !0, n = !1, i = void 0;
                try {
                    for (var r, s = (this.weixin.uid = e, this.forceLogin = !1, this.uploadingMessages)[Symbol.iterator](); !(t = (r = s.next()).done); t = !0) {
                        var o = r.value;
                        o.u = e, this._upload(o);
                    }
                } catch (e) {
                    n = !0, i = e;
                } finally {
                    try {
                        !t && s.return && s.return();
                    } finally {
                        if (n) throw i;
                    }
                }
            }
        }
    }, {
        key: "upload",
        value: function(e) {
            this.forceLogin ? this.uploadingMessages.push(e) : this._upload(e);
        }
    }, {
        key: "forceFlush",
        value: function() {
            this.weixin.esid = this.esid, this.uploader.forceFlush();
        }
    }, {
        key: "proxy",
        value: function(e, t) {
            try {
                "setVue" === e ? this.setVue(t[0]) : this.observer && this.observer[e] && this.observer[e].apply(this.observer, t);
            } catch (e) {
                console.error(e);
            }
        }
    }, {
        key: "_start",
        value: function() {
            p.initInstrument(this.observer);
            try {
                global && global["__core-js_shared__"] && (global.App = App, global.Page = Page);
            } catch (e) {
                console.error(e);
            }
        }
    }, {
        key: "_upload",
        value: function(e) {
            e.esid = this.esid++, this.debug && console.info("generate new event", JSON.stringify(e, 0, 2)), 
            this.uploader.upload(e);
        }
    }, {
        key: "_proxyVue",
        value: function(e) {
            if (void 0 !== e.mixin) {
                var t = this;
                e.mixin({
                    created: function() {
                        if (this.$options.methods) {
                            var e = Object.keys(this.$options.methods), t = !0, n = !1, i = void 0;
                            try {
                                for (var r, s = Object.keys(this)[Symbol.iterator](); !(t = (r = s.next()).done); t = !0) {
                                    var o = r.value;
                                    0 > e.indexOf(o) || Object.defineProperty(this[o], "name", {
                                        value: o
                                    });
                                }
                            } catch (e) {
                                n = !0, i = e;
                            } finally {
                                try {
                                    !t && s.return && s.return();
                                } finally {
                                    if (n) throw i;
                                }
                            }
                        }
                    },
                    beforeMount: function() {
                        var e = this.$root;
                        e.$mp && "page" === e.$mp.mpType && (t.vueRootVMs[e.$mp.page.route] = e);
                    }
                });
            }
        }
    } ]), t;
}())();

console.log("init growingio..."), module.exports = function() {
    var e = arguments[0];
    if (e) {
        var t = 2 > arguments.length ? [] : [].slice.call(arguments, 1);
        if ("init" === e) {
            if (2 > t.length) return void console.log("初始化 GrowingIO SDK 失败。请使用 gio('init', '你的GrowingIO项目ID', '你的微信APP_ID', options);");
            d.init(t[0], t[1], t[2]);
        } else d.proxy(e, t);
    }
};