// pages/recipe/recipe.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        method: [],
        id: null,
        name: null,
        ingredients: [],
        star_pos: "static",
        star_top: "auto"

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        this.setData({
            id: options.menu_id
        })
        var menu_id = this.data.id
        this.getMenurecipe(menu_id)
    },
    getMenurecipe(menu_id) {
        var that = this
        wx.request({
            url: 'https://apicloud.mob.com/v1/cook/menu/query?key=262353c6a5540&id=id',
            method: 'GET',
            async: 'false',
            data: {
                "id": menu_id
            },
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            success: function (res) {
                var get_recipe = res.data.result.recipe
                var method_json
                try {
                    method_json = JSON.parse(get_recipe.method)
                } catch (e) {
                    menu_id = menu_id.substr(0, menu_id.length - 1) + '1'
                    that.getMenurecipe(menu_id)
                    return
                }
                var menu_method = []
                var ingr = get_recipe.ingredients
                if (ingr) {
                    ingr = get_recipe.ingredients.split('[')[1].split(']')[0].replace(/\"/g, "")
                    ingr = ingr.split((/、(?![^（]*?）)/) || ";" || " ")
                } else {
                    ingr = "在做法中提到的原料"
                }
                for (var i in method_json) {
                    menu_method[i] = {
                        "step": method_json[i].step,
                        "img": method_json[i].img
                    }
                }
                that.setData({
                    method: menu_method,
                    ingredients: ingr,
                    name: res.data.result.name
                })
            }
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
    starTouchStart: function() {
        this.setData({
            star_pos: "relative",
            star_top: "3px"
        })
    },
    starTouchEnd: function () {
        this.setData({
            star_pos: "static",
            star_top: "auto"
        })
        var that = this
        var _is_have_key = false
        var my_menu_items = []
        try {
            wx.getStorageInfo({
                success: function(res){
                    for(var i in res.keys) {
                        if(res.keys[i] == 'menu') {
                            _is_have_key = true
                            break;
                        }
                    }
                    if(!_is_have_key) {
                        wx.setStorage({
                            key: 'menu',
                            data: null
                        })
                    }
                }
            })
            wx.getStorage({
                key: 'menu',
                success: function (res) {
                    if(res.data == null) {
                        my_menu_items = []
                    }
                    else my_menu_items = res.data
                    var flag = false
                    if(my_menu_items) {
                        for(var i in my_menu_items) {
                            if(my_menu_items[i].id == that.data.id){
                                flag = true
                            }
                        }
                    }
                    if(flag) {
                        wx.showToast({
                            title: '已收藏过',
                            icon: 'none',
                            duration: 1000,
                            mask: true
                        })
                        return false
                    }
                    my_menu_items[my_menu_items.length] = {
                        "id": that.data.id,
                        "name": that.data.name
                    }
                    wx.setStorage({
                        key: 'menu',
                        data: my_menu_items,
                        success: function (res) {
                            wx.showToast({
                                title: '添加成功',
                                icon: 'succes',
                                duration: 1000,
                                mask: true
                            })
                        },
                        fail: function() {
                            wx.showToast({
                                title: '添加失败',
                                icon: 'none',
                                duration: 1000,
                                mask: true
                            })
                        }
                    })
                }
            })
        } catch (e) {
            console.log(e)
        }
        
    }
})