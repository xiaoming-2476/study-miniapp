import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
     swiperList:[],
    //导航栏数据
    catesList:[],
    //楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1 发送异步请求
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   method: 'GET',
    //   success: function(res) {
    //     console.log(res);
    //   },
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })

    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
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
  //获取轮播图数据
  getSwiperList: function(){
    request({
      url:"/home/swiperdata"
    })
      .then(result=>{
        this.setData({
          swiperList:result
        })
      })
  },
  //获取导航栏数据
  getCatesList: function(){
    request({
      url:"/home/catitems"
    })
      .then(result=>{
        this.setData({
          catesList:result
        })
      })
  },
  //获取楼层数据
  getFloorList: function(){
    request({
      url:"/home/floordata"
    })
      .then(result=>{
        this.setData({
          floorList:result
        })
      })
  }
})