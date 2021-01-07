$(document).ready(function () {
  window.onscroll = function() {scrollIndicator()};

  function scrollIndicator() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("progBar").style.width = scrolled + "%";
  }
});