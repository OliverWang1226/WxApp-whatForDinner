var app = getApp()
var reload_condition
var reload_type
// pages/menu/menu.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        src: [],
        name: [],
        id: [],
        from_page: [],
        menu_type: [],
        detail_pos: "static",
        detail_top: "auto",
        reload_pos: "static",
        reload_top: "auto"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        var type_code, max_page
        //获取页面来源
        this.setData({
            from_page: options.from_page
        })
        //生成menuType
        //  来自main页面的随机生成
        //  来自type页面的直接赋值
        if (this.data.from_page == 'main') {
            reload_condition = 'main_reload'
            var num = this.getRandomNum(0, 11)
            that.setData({
                menu_type: num
            })
        } else if (this.data.from_page == 'type') {
            reload_condition = 'type_reload'
            reload_type = options.type
            that.setData({
                menu_type: options.type
            })
        }

        var type_info = this.getTypeCode(parseInt(this.data.menu_type))
        type_code = type_info[0]
        max_page = type_info[1]
        this.getMenuRequest(type_code, max_page)
    },
    //获取随机数from min to max
    getRandomNum: function (min, max) {
        var range = max - min
        var rand = Math.random()
        var num = Math.floor(rand * range)
        return num
    },
    //生成菜单种类
    getTypeCode: function (cur_type) {
        var type_info = []
        switch (cur_type) {
            case 0://荤
                type_info[0] = '0010001007';
                type_info[1] = '887';
                break
            case 1://素
                type_info[0] = '0010001008';
                type_info[1] = '387';
                break
            case 2://红烧
                type_info[0] = '0010001015';
                type_info[1] = '70';
                break
            case 3://油炸
                type_info[0] = '0010001018';
                type_info[1] = '80';
                break
            case 4://煎
                type_info[0] = '0010001017';
                type_info[1] = '116';
                break
            case 5://炒
                type_info[0] = '0010001016';
                type_info[1] = '602';
                break
            case 6://蒸
                type_info[0] = '0010001021';
                type_info[1] = '154';
                break
            case 7://炖
                type_info[0] = '0010001020'
                type_info[1] = '168';
                break
            case 8://炝
                type_info[0] = '0010001026';
                type_info[1] = '5';
                break
            case 9://煮
                type_info[0] = '0010001025';
                type_info[1] = '407';
                break
            case 10://焖
                type_info[0] = '0010001019';
                type_info[1] = '57';
                break
            case 11://烩
                type_info[0] = '0010001022';
                type_info[1] = '12';
                break
        }
        return type_info
    },
    //通过request调用api获取数据
    getMenuRequest: function (type_code, max_page) {
        var that = this
        var get_img, get_name, get_id
        var page_num = this.getRandomNum(1, max_page); //四舍五入得到随机数
        var cur_url = 'https://apicloud.mob.com/v1/cook/menu/search?key=262353c6a5540&cid=' +
            type_code + '&page=' + page_num + '&size=20'
        wx.request({
            url: cur_url,
            method: 'GET',
            header: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            success: function (res) {
                var i = Math.floor(Math.random() * 19)
                var get_data = res.data.result.list[i]
                var method_json
                //无法处理为json格式的菜谱不要
                try {
                    method_json = JSON.parse(get_data.recipe.method)
                } catch (e) {
                    that.getMenuRequest(type_code, max_page)
                    console.log(e)
                    return
                }
                //做法中没有图片的菜谱不要
                if(!method_json[0].img) {
                    that.getMenuRequest(type_code, max_page)
                    return
                }
                if (get_data.recipe.img)
                    get_img = get_data.recipe.img
                else if(get_data.recipe.thumbnail)
                    get_img = get_data.thumbnail
                else {
                    that.getMenuRequest(type_code, max_page)
                    return
                }
                get_name = get_data.name
                get_id = get_data.menuId
                that.setData({
                    src: get_img,
                    name: get_name,
                    id: get_id
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
    reloadBtn: function () {
        
    },
    detailTouchStart: function() {
        this.setData({
            detail_pos: "relative",
            detail_top: "3px"
        })
    },
    detailTouchEnd: function() {
        this.setData( {
            detail_pos: "static",
            detail_top: "auto"
        })
        wx.navigateTo({
            url: '../recipe/recipe?menu_id=' + this.data.id,
        })
    },
    reloadTouchStart: function() {
        this.setData({
            reload_pos: "relative",
            reload_top: "3px"
        })
    },
    reloadTouchEnd: function() {
        this.setData({
            relaod_pos: "static",
            reload_top: "auto"
        })
        var options
        if (reload_condition == 'main_reload') {
            options = {
                "from_page": "main"
            }
        } else {
            options = {
                "from_page": "type",
                "type": reload_type
            }
        }
        this.onLoad(options)
    }
})