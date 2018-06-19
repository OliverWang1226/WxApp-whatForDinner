// pages/myMenu/myMenu.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        local_menu : []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.getStorage({
            key: 'menu',
            success: function(res) {
                that.setData({
                    local_menu : res.data
                })
            },
        })

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
    menuBtn: function(e) {
        var cur_id = e.target.dataset.param
        wx.navigateTo({
            url: '../recipe/recipe?menu_id=' + cur_id
        })
    }
})