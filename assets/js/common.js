// ライブラリ読み込み
var script = ['/bio/assets/lib/slick/slick.js'];
$.ajax({
  url: script,
  async: false,
  dataType: 'script'
});


let headerBar = $('.l-header-bar');
let headerMenu = $('.l-header-menu');
let main = $('.l-main');
let headerSpace = $('.js-header-space');
let layer = $('.l-header-layer');
let dropmenu = $('.js-dropmenu');
let tab = $('.js-dropmenu-tab');
let dropToggle = $('.js-drop-toggle');
let gnavToggle = $('.js-gnav-toggle');


// ヘッダー（余白調整）
$(window).on('load resize', function(){
  let windowW = $(window).width();
  let headerBarheight = (headerBar.outerHeight()) + "px";
  let headerWholeheight = (headerBar.outerHeight() + headerMenu.outerHeight()) + "px";
  headerSpace.css({'margin-top': headerBarheight, 'top': '0'});
  if (windowW >= 1024) {
    main.css({'padding-top': '0'});
  } else {
    main.css({'padding-top': headerWholeheight});
  }
});


// ヘッダー（ドロップメニュー）
tab.on('click', function(){
  if ($(this).hasClass('is-open')) {
    $(this).removeClass('is-open');
    dropToggle.removeClass('is-open');
    dropmenu.stop().fadeOut();
    layer.removeClass('is-dark');
  } else {
    $(this).addClass('is-open');
    dropToggle.addClass('is-open');
    dropmenu.stop().fadeIn();
    layer.addClass('is-dark');
  }
});

dropToggle.on('click', function(){
  if ($(this).hasClass('is-open')) {
    $(this).removeClass('is-open');
    dropmenu.removeClass('is-open');
    dropmenu.stop().fadeOut();
    tab.removeClass('is-open');
    layer.removeClass('is-dark');
    gnavToggle.css({
      'pointer-events': 'inherit',
    })
  } else {
    $(this).addClass('is-open');
    dropmenu.addClass('is-open');
    dropmenu.stop().fadeIn();
    layer.removeClass('is-dark');
    gnavToggle.css({
      'pointer-events': 'none',
    })
  }
});

// メニュー下のレイヤー
layer.on('click', function(){
  if ($(this).hasClass('is-dark')) {
    $(this).removeClass('is-dark');
    tab.removeClass('is-open');
    dropmenu.removeClass('is-open');
    dropmenu.stop().fadeOut();
    gnavToggle.removeClass('is-open');
    $('.js-nav').removeClass('is-open');
    gnavToggle.css({
      'pointer-events': 'inherit',
    })
  } else {
    $(this).addClass('is-dark');
    dropmenu.addClass('is-open');
    dropmenu.stop().fadeIn();
    gnavToggle.addClass('is-open');
    $('.js-nav').addClass('is-open');
    gnavToggle.css({
      'pointer-events': 'none',
    })
  }
});


// スマホナビ
gnavToggle.on('click', function(){
  if ($(this).hasClass('is-open')) {
    $(this).removeClass('is-open');
    $('.js-nav').removeClass('is-open');
    layer.removeClass('is-dark');
    tab.css({
      'pointer-events': 'inherit',
    })
  } else {
    $(this).addClass('is-open');
    $('.js-nav').addClass('is-open');
    layer.addClass('is-dark');
    tab.css({
      'pointer-events': 'none',
    })
    layer.on('click', function(){
      tab.css({
        'pointer-events': 'inherit',
      })
    })
  }
});



// スクロール速度
let headerBarHeight = $('.l-header-bar').height();

$('a[href^="#"]').on('click', function(){
  var speed = 500;
  var href= $(this).attr("href");
  var target = $(href == "#" || href == "" ? 'html' : href);
  var position = target.offset().top;
  $("html, body").animate({scrollTop:position}, speed, "swing");
  return false;
});

// アンカーリンク
$('a[href^="#link"]').on('click', function(){
  var speed = 500;
  var href= $(this).attr("href");
  var target = $(href == "#link" ? 'html' : href);
  if( $(window).width() > 768 ) {
    var position = target.offset().top - 100;
  } else {
    var position = target.offset().top - 50;
  }
  $("html, body").animate({scrollTop:position}, speed, "swing");
  return false;
});



// ページトップ
let pageTop = $('.js-page-top');
let windowH = $(window).height();
pageTop.hide();
$(window).on('scroll', function(){
  if ($(this).width() > 1025) {
    if ($(this).scrollTop() > windowH) {
      pageTop.fadeIn(300);
    } else {
      pageTop.fadeOut();
    }
  } else {
    if ($(this).scrollTop() > windowH) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  }
});


// スライダー（トップ）
$('.js-slider-top')
  .on("init", function () {
    $('.slick-slide[data-slick-index="0"]').addClass("add-animation");
    })
    .slick({  
      autoplaySpeed: 6000,
      autoplay: true,
      fade: true,
      cssEase: 'linear',
      speed: 2000,
      dots: true,
    });
    $('.js-slider-top').on('beforeChange',function(event, slick, currentSlide, nextSlide){
      if (nextSlide > 0) {
        $('.js-slider-top').slick('slickSetOption', 'autoplaySpeed', 4000, true)
      }
    })
  .on({
    beforeChange: function (event, slick, currentSlide, nextSlide) {
      $(".slick-slide", this).eq(nextSlide).addClass("add-animation");
      $(".slick-slide", this).eq(currentSlide).addClass("remove-animation");
    },
    afterChange: function () {
      $(".remove-animation", this).removeClass("remove-animation add-animation");
    },
});


// アニメーション（トップ）
function AnimeFadeUp(){
  $('.js-anime').each(function(){
    var elemPos = $(this).offset().top-50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('anime-fade-up');
    }else{
    $(this).removeClass('anime-fade-up');
    }
  });
}
$(window).scroll(function(){
  AnimeFadeUp();
})

// リストの開閉ボタン
$('.js-list-open').hide();
$('.js-list-link').on('click', function(){
  $(this).next($('.js-list-open')).slideToggle();
  $(this).next($('.js-list-open')).toggleClass('is-open');
  $(this).toggleClass('is-open');
  $(this).parent($('.js-list-click')).toggleClass('is-open');
});




/**
 * お問い合わせフォームのリセットボタン
 * 総合トップ：お問い合わせ
*/
$('.js-contact-reset').on('click', function(){
  formReset(this.form);
});

const formReset = (form) => {
  $(form).find("input, select, textarea, checkbox").not(":button, :submit, :reset, :hidden").val("").prop("checked", false).prop("selected", false);
}