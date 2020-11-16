import { request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单的数据
    leftMenuList:[],
    //右侧的商品数据
    rightContent:[],
    //被点击的菜单
    currentIndex:0,
    //右侧内容的滚动条距离顶部距离
    scrollTop:0
  },
  //接口返回的数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**1 先判断一下本地存储中有没有旧的数据
     * ｛time:Date.new(),data:[...]｝
     * 2没用旧数据，直接发生新请求
     * 3 有旧数据 同时 旧数据没有过期
     */
    //1 获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    //2 判断
    if(!Cates){
      //不存在 发送请求获取数据
      this.getCates();
    }else{
      //有旧数据 ，判断有没有过期 过期时间 10s 改成5分钟
      if(Date.now()-Cates.time>1000*10){
        //重新发生请求
        this.getCates();
      }else{
        //可以使用旧的数据
        this.Cates = Cates.data;
        //左侧菜单栏数据
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        //构造右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },

  //获取分类数据
  getCates: function(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"})
    .then(res=>{
      this.Cates = res.data.message;
      // 把接口的数据存入到本地存储中
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
      //左侧菜单栏数据
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      //构造右侧商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  //左侧菜单的点击事假
  handleItemTap(e){
    /*1获取被点击的标题身上的索引，
    2给data中的currentIndex赋值 
    3 根据不同索引，切换不同展示*/
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      //重新设置 右侧内容的scroll-view标签的距离顶部的距离
      scrollTop:0
    })
    
  }
})