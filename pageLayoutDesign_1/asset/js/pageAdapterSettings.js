/**
 * desc: 该js文件用于对页面适配设置, 例如动态计算rem、设置页面不能缩放等
 */
(function (win, doc) {
   console.log(win);
   console.log(doc);
})(window, document);

function setMinHeight(...params) {
   params.forEach(function (item) {
      console.log(item)
   })
}