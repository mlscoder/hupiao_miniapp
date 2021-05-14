Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: {},
    listOp: {
        toDetail: function(t) {
          var e = t.currentTarget.dataset.roomid;
           wx.navigateTo({
                url: "/pages/result/detail?rentid=" + e 
            });
        }
    }
};