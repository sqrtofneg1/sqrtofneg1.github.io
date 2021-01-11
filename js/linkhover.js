$(document).ready(function () {
  $(".button").mouseenter(function () {
    $(this).animate({
      fontSize: '125%'
    }, 350);
  })
  $(".button").mouseleave(function () {
    $(this).animate({
      fontSize: '100%'
    }, 350);
  })
});