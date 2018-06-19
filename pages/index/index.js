// pages/main/main.js
const app = getApp()
var wxDraw = require('../../utils/wxdraw.js').wxDraw
var Shape = require('../../utils/wxdraw.js').Shape
Page({

    /**
     * 页面的初始数据
     */
    data: {
        wxCanvas: null,
        speed: null,
        enter_pos: "static",
        enter_top: "auto",
        type_pos: "static",
        type_top:"auto",
        favor_pos: "static",
        favor_top: "auto"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.speed = 1500
        this.index = 0
        var side_size = "60"
        var back_size = "30"
        var fronte_size = "120"
        var ctx = wx.createCanvasContext("myCanvas", this)
        this.wxCanvas = new wxDraw(ctx, 0, 0, 400, 300)
        var img1 = new Shape('image', {
            x: 50,
            y: 100,
            w: 60,
            h: 60,
            file: "../../img/img1.png"
        })
        var img2 = new Shape('image', {
            x: 150,
            y: 120,
            w: 120,
            h: 120,
            file: "../../img/img2.png"
        })
        var img3 = new Shape('image', {
            x: 250,
            y: 100,
            w: 60,
            h: 60,
            file: "../../img/img3.png"
        })
        var img4 = new Shape('image', {
            x: 150,
            y: 80,
            w: 30,
            h: 30,
            file: "../../img/img4.png"
        })

        this.wxCanvas.add(img1)
        this.wxCanvas.add(img4)
        this.wxCanvas.add(img2)
        this.wxCanvas.add(img3)
        img4.updateLayer("-10")

        img1.animate({
            "w": back_size,
            "h": back_size,
            "x": "150",
            "y": "80"
        }, {
                onStart: function () {
                    img3.updateLayer("+10")
                    img1.updateLayer("-10")
                },
                onEnd: function () {
                    img4.updateLayer("+10")
                    img2.updateLayer("-10")
                },
                duration: this.speed
            }).animate({
                "w": side_size,
                "h": side_size,
                "x": "250",
                "y": "100"
            }, {
                onEnd: function () {
                    img3.updateLayer("-10")
                    img1.updateLayer("+10")
                },
                duration: this.speed
            }).animate({
                "w": fronte_size,
                "h": fronte_size,
                "x": "150",
                "y": "120"
            }, {
                onEnd: function () {
                    img3.updateLayer("-10")
                    img2.updateLayer("+10")
                },
                duration: this.speed
            }).animate({
                "w": side_size,
                "h": side_size,
                "x": "50",
                "y": "100"
            }, {
                onEnd: function () {
                    img1.updateLayer("-10")
                    img3.updateLayer("+10")
                },
                duration: this.speed
            }).start(true)

        img2.animate({
            "w": side_size,
            "h": side_size,
            "x": "50",
            "y": "100"
        },
            {
                duration: this.speed
            }).animate({
                "w": back_size,
                "h": back_size,
                "x": "150",
                "y": "80"
            },
            {
                duration: this.speed
            }).animate({
                "w": side_size,
                "h": side_size,
                "x": "250",
                "y": "100"

            }, {
                duration: this.speed
            }).animate({
                "w": fronte_size,
                "h": fronte_size,
                "x": "150",
                "y": "120"
            },
            {
                duration: this.speed
            }).start(true)

        img3.animate({
            "w": fronte_size,
            "h": fronte_size,
            "x": "150",
            "y": "120"
        }, {
                duration: this.speed
            }).animate({
                "w": side_size,
                "h": side_size,
                "x": "50",
                "y": "100"
            }, {
                duration: this.speed
            }).animate({
                "w": back_size,
                "h": back_size,
                "x": "150",
                "y": "80"
            }, {
                duration: this.speed
            }).animate({
                "w": side_size,
                "h": side_size,
                "x": "250",
                "y": "100"
            }, {
                duration: this.speed
            }).start(true)

        img4.animate({
            "w": side_size,
            "h": side_size,
            "x": "250",
            "y": "100"
        },
            {
                duration: this.speed
            }).animate({
                "w": fronte_size,
                "h": fronte_size,
                "x": "150",
                "y": "120"
            },
            {
                duration: this.speed
            }).animate({
                "w": side_size,
                "h": side_size,
                "x": "50",
                "y": "100"

            }, {
                duration: this.speed
            }).animate({
                "w": back_size,
                "h": back_size,
                "x": "150",
                "y": "80"
            },
            {
                duration: this.speed
            }).start(true)




    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    enterTouchStart: function () {
        this.setData({
            enter_pos : "relative",
            enter_top : "3px"
        })

    },
    enterTouchEnd: function(e) {
        this.setData({
            enter_pos : "static",
            enter_top : "auto"
        })
        wx.navigateTo({
             url: '../menu/menu?from_page=main'
        })
    },
    typeTouchStart: function (e) {
        this.setData({
            type_pos: "relative",
            type_top: "3px"
        })

    },
    typeTouchEnd: function (e) {
        this.setData({
            type_pos: "static",
            type_top: "auto"
        })
            wx.navigateTo({
            url: '../type/type',
        })
    
    },  
    favorTouchStart: function (e) {
        this.setData({
            favor_pos: "relative",
            favor_top: "3px"
        })

    },
    favorTouchEnd: function (e) {
        this.setData({
            favor_pos: "static",
            favor_top: "auto"
        })
        wx.navigateTo({
            url: '../myMenu/myMenu',
        })

    },  
})