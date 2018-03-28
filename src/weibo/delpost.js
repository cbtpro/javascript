/*
* 1、登陆你的微博账号 xxxxx是你的账户登录
* 2、打开你的微博首页 如：http://weibo.com/xxxxx
* 3、打开开发者调试工具，在控制台中执行这段代码
*
*/
var waitTime = 10000;
var delOptInterval = 1000;
var jscript = document.createElement('script');
jscript.setAttribute(
  'src',
  'https://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js'
);
var start = function() {
  var timer = setTimeout(function() {
    if($('a[action-type="feed_list_delete"]').length > 0) {
      var deletes = $('a[action-type="feed_list_delete"]');
      deletes[deletes.length-1].click();
      $('a[action-type="ok"]')[0].click();
      setTimeout('start()', delOptInterval);
    } else if($('a.next').length = 1 && $('a.next').is(':visible')) {
      $('a.next')[0].click();
      setTimeout('start()', waitTime);
    } else if($('a.prev').length = 1 && $('a.prev').is(':visible')) {
      $('a.prev')[0].click();
      setTimeout('start()', waitTime);
    }
  }, 200);
};
jscript.onload = start();
document.head.appendChild(jscript);
setInterval(function() {
  $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
}, 4000);