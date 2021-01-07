$(document).ready(function () {

  $(function sidebarscroll() {

    var offset = $("#sidebar").offset();
    var topPadding = 100;

    $(window).scroll(function () {
        if ($(window).scrollTop() > offset.top) {
            $("#sidebar").stop().animate({
                marginTop: $(window).scrollTop() - offset.top + topPadding
            });
        } else {
            $("#sidebar").stop().animate({
                marginTop: 40
            });
        }
    });
  });
});