$(function(){
  nav = $(".nav.navbar-nav.navbar-right");
  nav.find("li").attr("class", "");
  link = nav.find("a[href='"+window.location.pathname+"']");
  link.parent().attr("class","active");
})