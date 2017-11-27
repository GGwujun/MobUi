"use strict";

/* global $:true */
+function ($) {
  var modal = $.modal.prototype.defaults;
  modal.modalButtonOk = "ok";
  modal.modalButtonCancel = "cancel";
  modal.modalPreloaderTitle = "Loading...";

  var calendar = $.fn.calendar.prototype.defaults;

  calendar.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  calendar.monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  calendar.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  calendar.dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}($);
