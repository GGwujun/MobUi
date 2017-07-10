/* global $:true */
+function ($) {
  "use strict";

  //全局配置
  var defaults = {
    autoInit: false, //自动初始化页面
    showPageLoadingIndicator: true, //push.js加载页面的时候显示一个加载提示
    router: true, //默认使用router
    swipePanel: "left", //滑动打开侧栏
    swipePanelOnlyClose: false,  //只允许滑动关闭，不允许滑动打开侧栏
    pushAnimationDuration: 400  //不要动这个，这是解决安卓 animationEnd 事件无法触发的bug
  };

  $.smConfig = $.extend(defaults, $.config);

}($);
