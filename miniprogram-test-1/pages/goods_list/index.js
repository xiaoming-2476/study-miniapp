/**
 * 1 用户上滑 自动加载下一页
 * 2 用户下滑 重新刷新页面
 *  1 触发下拉刷新事假 需要在页面的json文件中开启一个配置项
 *  2 重置 数据 数组
 *  3 重置页码 设置为1
 * 3 数据请求前，显示加载中图片，数据请求完成后，关闭加载中图片
 */
import { request } from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  //获取商品列表数据
  getGoodsList(){
    request({url:"/goods/search",data:this.QueryParams})
    .then(res=>{
      console.log(res);
      //获取 总条数
      const total = res.total;
      //计算总页数
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
      
      this.setData({
        //数组拼接
        goodsList:[...this.data.goodsList,...res.goods]
      })
    })
  },
  // 标题的点击事件 ，从子组件传递过来的
  handleTabsItemChange: function(e){
    const {index} = e.detail;
    // 2 修改源数组
    let {tabs} = this.data;
    tabs.forEach((v,i) => {return i===index?v.isActive=true:v.isActive=false});
    // 3 赋值到data中
    this.setData({
      tabs
    })
  },
  //页面上滑 滑动条触底事件
  onReachBottom(){
    //判断还有没有下一页
    if(this.QueryParams.pagenum>=this.totalPages){
      //没有下一页数据
      wx.showToast({
        title:'没有下一页数据了'
      });
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //下拉刷新事件
  onPullDownRefresh(){
    // 1 重置数组
    this.setData({
      goodsList:[]
    });
    //重置页码
    this.QueryParams.pagenum=1;
    //3 发送请求
    this.getGoodsList();
    //4 数据请求回来了，手动关闭请求等待的效果
    //如果没有调用下拉刷新的窗口，直接关闭也不会报错
    wx.stopPullDownRefresh();
  }
})