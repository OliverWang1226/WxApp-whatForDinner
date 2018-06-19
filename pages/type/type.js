// pages/type/type.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: ['荤菜', '素菜', '红烧', '油炸', '煎菜', '炒菜', '蒸菜', '炖菜', '炝爆',  '水煮', '焖菜', '烩菜'],
        index: 0,
        decide_pos: "static",
        decide_top: "auto",
        random_pos: "static",
        random_top: "auto"
    },
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
    decideTouchStart: function() {
        this.setData({
            decide_pos: "relative",
            decide_top: "3px"
        })
    },
    decideTouchEnd: function() {
        this.setData({
            decide_pos: "static",
            decide_top: "auto"
        })
        wx.navigateTo({
            url: '../menu/menu?type=' + this.data.index + '&from_page=type',
        })
    },
    randomTouchStart: function() {
        this.setData({
            random_pos: "relative",
            random_top: "3px"
        })

    },
    randomTouchEnd: function () {
        var randomInt = Math.floor(Math.random() * 10)
        this.setData({
            random_pos: "static",
            random_top: "auto",
            index: randomInt
        })
    },
})