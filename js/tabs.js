/* ===============================================================================
************   Tabs   ************
=============================================================================== */
/* global $:true */
+function ($) {
  "use strict";

  var showTab = function (tab, tabLink, force) {
    var newTab = $(tab);

    var activeClass = newTab.hasClass("page") ? "page-current" : "active";
    if (arguments.length === 2) {
      if (typeof tabLink === 'boolean') {
        force = tabLink;
      }
    }
    if (newTab.length === 0) return false;
    if (newTab.hasClass(activeClass)) {
      if (force) newTab.trigger('show');
      return false;
    }
    var tabs = newTab.parent('.tabs');
    if (tabs.length === 0) return false;

  

    // Remove active class from old tabs
    var oldTab = tabs.children('.tab.'+activeClass).removeClass(activeClass);
    // Add active class to new tab
    newTab.addClass(activeClass);
    // Trigger 'show' event on new tab
    newTab.trigger('show');


    // Find related link for new tab
    if (tabLink) tabLink = $(tabLink);
    else {
      // Search by id
      if (typeof tab === 'string') tabLink = $('.tab-link[href="' + tab + '"]');
      else tabLink = $('.tab-link[href="#' + newTab.attr('id') + '"]');
      // Search by data-tab
      if (!tabLink || tabLink && tabLink.length === 0) {
        $('[data-tab]').each(function () {
          if (newTab.is($(this).attr('data-tab'))) tabLink = $(this);
        });
      }
    }
    if (tabLink.length === 0) return;

    // Find related link for old tab
    var oldTabLink;
    if (oldTab && oldTab.length > 0) {
      // Search by id
      var oldTabId = oldTab.attr('id');
      if (oldTabId) oldTabLink = $('.tab-link[href="#' + oldTabId + '"]');
      // Search by data-tab
      if (!oldTabLink || oldTabLink && oldTabLink.length === 0) {
        $('[data-tab]').each(function () {
          if (oldTab.is($(this).attr('data-tab'))) oldTabLink = $(this);
        });
      }
    }

    // Update links' classes
    if (tabLink && tabLink.length > 0) tabLink.addClass('active');
    if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');

    return true;
  };

  var old = $.showTab;
  $.showTab = showTab;

  $.showTab.noConflict = function () {
    $.showTab = old;
    return this;
  };


  $(document).on("click", ".tab-link", function(e) {
    e.preventDefault();
    var clicked = $(this);
    showTab(clicked.data("tab") || clicked.attr('href'), clicked);
  });
}($);
