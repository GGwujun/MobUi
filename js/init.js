/* global $:true */
/*jshint unused: false*/
+function ($) {
  "use strict";

  var getPage = function () {
    var $page = $(".page-current");
    if (!$page[0]) $page = $(".page").addClass("page-current");
    return $page;
  };

  //初始化页面中的JS组件
  $.initPage = function (page) {
    var $page = page ? $(page) : getPage();
    if (!$page[0]) $page = $(document.body);
    var $content = $page.hasClass("content") ? $page : $page.find(".content");

    //$.initPullToRefresh($content);//初始化下拉刷新
    //$.initInfiniteScroll($content);//初始化上拉加载

    $.initCalendar($content);//初始化日历
    $.initIndexList($content);//初始化首字母索引

    //extend
    if ($.initSwiper) $.initSwiper($content);//初始化swiper
    if ($.initSwipeout) $.initSwipeout();  //  初始化swipeout
  };


  if ($.smConfig.showPageLoadingIndicator) {
    //这里的 以 push 开头的是私有事件，不要用
    $(window).on("pageLoadStart", function () {
      $.showIndicator();
    });
    $(document).on("pageAnimationStart", function () {
      $.hideIndicator();
    });
    $(window).on("pageLoadCancel", function () {
      $.hideIndicator();
    });
    $(window).on("pageLoadError", function () {
      $.hideIndicator();
      $.toast("加载失败");
    });
  }



  $.init = function () {
    var $page = getPage();
    var id = $page[0].id;
    if ($page.hasClass("page-inited")) {
      $page.trigger("pageReinit", [id, $page]);
    } else {
      $.initPage();
      $page.addClass("page-inited");
      $page.trigger("pageInit", [id, $page]);
    }
  };

  $(function () {
    if ($.smConfig.autoInit) {
      $.init();
    }

    $(document).on("pageInitInternal", function (e, id, $page) {
      $.init();
    });
  });


}($);
