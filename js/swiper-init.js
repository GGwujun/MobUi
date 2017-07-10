/*===========================
Framework7 Swiper Additions
===========================*/
/* global $:true */
+function($){
    'use strict';
    $.Swiper.prototype.defaults.pagination = '.swiper-pagination';

    $.swiper = function (container, params) {
        return new $.Swiper(container, params);
    };
    $.fn.swiper = function (params) {
        return new $.Swiper(this, params);
    };
    $.initSwiper = function (pageContainer) {
        var page = $(pageContainer || document.body);
        var swipers = page.find('.swiper-container');
        if (swipers.length === 0) return;
        for (var i = 0; i < swipers.length; i++) {
            var swiper = swipers.eq(i);
            var params;
            if (swiper.data('swiper')) {
                swiper.data("swiper").update(true);
                continue;
            }
            else {
                params = swiper.dataset();
            }
            $.swiper(swiper[0], params);
        }
    };
    $.reinitSwiper = function (pageContainer) {
        var page = $(pageContainer);
        var sliders = page.find('.swiper-container');
        if (sliders.length === 0) return;
        for (var i = 0; i < sliders.length; i++) {
            var sliderInstance = sliders[0].swiper;
            if (sliderInstance) {
                sliderInstance.update(true);
            }
        }
    };

}($);
