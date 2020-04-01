document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false});

$(function(){
    // #で始まるアンカーをクリックした場合に処理
    $('a[href^=#]').click(function() {
       // スクロールの速度
       var speed = 800; // ミリ秒
       // アンカーの値取得
       var href= $(this).attr("href");
       console.log(this);
       // 移動先を取得
       var target = $(href == "#" || href == "" ? 'html' : href);
       console.log(target);
       // 移動先を数値で取得
       var position = target.offset().top;
       console.log(position);
       // スムーススクロール
       $('body,html').animate({scrollTop:position}, speed, 'swing');
       return false;
    });
});
