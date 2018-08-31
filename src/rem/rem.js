// 设置 rem 函数
function setRem () {
  /*默认是750宽度的设计图 除以7.5也就说测量设计图的尺寸然后除以100 就得到rem的值 然后写在样式上*/

  var deviceWidth = document.documentElement.clientWidth; /*设备宽度*/

  if(deviceWidth > 750) deviceWidth = 750;
  /*当设备宽度大于750的时候按照750来显示*/


  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  /*
  * 注意这个缩放的比例：如果我们使用了postcss-px2rem插件来转换px为rem的话  则需要在vue-loader.conf.js中设置remUnit的值为我们这里的缩放值
  * */
  const scale = deviceWidth / 7.5
  /*如果的你页面设计宽度是750 这里计算出的缩放比例就是100 ，你在postcss-px2rem里设置的值就是100*/

  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = scale + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
