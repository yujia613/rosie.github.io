var myapp = {
  isMobile: true,
  isSP: true,
  mq_mob: window.matchMedia('screen and (max-width: 959px)'),
  mq_sp: window.matchMedia('screen and (max-width: 599px)'),
};


myapp.init = function(){

  myapp.mq_mob.addListener(myapp.evtBreakPointMob);
  myapp.mq_sp.addListener(myapp.evtBreakPointSp);
  window.addEventListener('resize',myapp.evtResize);
  window.addEventListener('scroll',myapp.evtScroll);

  myapp.checkBrowser();

  myapp.evtBreakPointMob();
  myapp.evtBreakPointSp();
  myapp.evtResize();
  myapp.evtScroll();

  myapp.setNav();
  myapp.badgeControl();
  myapp.setHover();
  myapp.sttNewsSlide();
  myapp.setSideMenu();
  myapp.otherSetting();

  if($('body').hasClass('oshinagaki')){
    myapp.setOshinagaki();
  }
  


};


myapp.evtBreakPointMob = function(){


  if(myapp.mq_mob.matches){

    myapp.isMobile = true;

  }else{

    myapp.isMobile = false;

  }

  myapp.sttSlides();
}


myapp.evtBreakPointSp = function(){

  

  if(myapp.mq_sp.matches){
    myapp.isSP = true;
  }else{
    
    myapp.isSP = false;
  }

  
  myapp.sttSlides();
}



myapp.checkBrowser = function(){

    
    var ua = navigator.userAgent.toLowerCase();
    var ver = navigator.appVersion.toLowerCase();
    var isMSIE = (ua.indexOf('msie') > -1) && (ua.indexOf('opera') == -1);
    var isIE11 = (ua.indexOf('trident/7') > -1);
    var isIE = isMSIE || isIE11;
    var isEdge = (ua.indexOf('edge') > -1);
    if (isIE) {
        jQuery("body").addClass("ie");
    }
    if (isEdge) {
        jQuery("body").addClass("edge");
    }
}



myapp.pageOut = function(){
  $('#trns').velocity('fadeIn',250);
}


myapp.pageIn = function(){
  $('#trns').velocity('fadeOut',{
    duration:1000,
    easing:[.5,0,.5,1]
  });
}


myapp.setNav = function(){

  $('.btn_mobmenu').click(function(){
    $('.mobmenu').velocity('fadeIn',500);
    return false;
  });
  $('.btn_mobmenu_close').click(function(){
    $('.mobmenu').velocity('fadeOut',500);
    return false;
  });

  $('#btn_totop').click(function(){
    $('body,html').animate({scrollTop:0}, 500, 'swing');
    return false;
  });
}


myapp.sttSlides = function(){

  if($('header .slider')[0]){

    
    if(!$('header .slider').hasClass('slick-initialized')){
      $('header .slider').slick({
        autoplay : true,
        autoplaySpeed : 1000,
        arrows : false,
        centerMode: true,
        slidesToShow: 1,
        centerPadding: '34vw',
        speed: 1000,
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              centerPadding: '30vw',
            }
          },
          {
            breakpoint: 1280,
            settings: {
              centerPadding: '28vw',
            }
          },
          {
            breakpoint: 960,
            settings: {
              centerPadding: '20vw',
            }
          },
          {
            breakpoint: 600,
            settings: {
              centerPadding: '10vw',
            }
          }
        ]
      });
    }
      
  }

  if(myapp.mq_sp.matches){
  
    
    if($('.lb_photos')[0]){

      if(!$('.lb_photos').hasClass('slick-initialized')){

        $('.lb_photos').slick({
          autoplay : true,
          autoplaySpeed : 3000,
          arrows : false,
          pauseOnFocus : false,
          pauseOnHover : false,
          speed : 500,
          centerMode:true,
          centerPadding:'20px'
        });
      }
    }

    
    if($('.d_photos')[0]){

      
      if(!$('.d_photos').hasClass('slick-initialized')){

        $('.d_photos').slick({
          autoplay : true,
          autoplaySpeed : 3000,
          arrows : false,
          pauseOnFocus : false,
          pauseOnHover : false,
          speed : 500,
          centerMode:true,
          centerPadding:'20px'
        });
      }
    }
  
  }else{
  

    if($('.lb_photos')[0]){

      if($('.lb_photos').hasClass('slick-initialized')){
        $('.lb_photos').slick('unslick');
      }
    }

    if($('.d_photos')[0]){

      
      if($('.d_photos').hasClass('slick-initialized')){
        $('.d_photos').slick('unslick');

        
        $('.d_photos .lqd').imgLiquid();
      }
    }
    
  
  }


  if($('.sec-kodawari .kp_photos')[0]){

    if(!$('.sec-kodawari .kp_photos').hasClass('slick-initialized')){

      $('.sec-kodawari .kp_photos').slick({
        autoplay : true,
        autoplaySpeed : 1000,
        arrows : false,
        pauseOnFocus : false,
        pauseOnHover : false,
        speed : 2000,
        fade: true
      });
    }
  }

}



myapp.setOshinagaki = function(){

  var shopId = 0,
      allergen = 'off';//on off

  
  if (typeof localStorage !== 'undefined') {
      var storage = localStorage;

      shopId = storage.getItem("selshop");
      if(shopId == null) shopId = 0;

      allergen = storage.getItem("allergen");
      if(allergen == null) allergen = 'off';    
  }

 
  if(shopId == 0){
    var $firstShop = $('.list_selshop label:nth-of-type(1) input');
    shopId = $firstShop.data('shopid');
    $firstShop.prop('checked', true);
  }

  changeShop();
  changeAllergen();

  if($('.select_shop')[0]){

    
    $('.btn_selshop').click(function(){

     
      if(!myapp.isMobile) return false;

      $('.select_shop').toggleClass('open');

     
      var offset = 0;
      var cnt = $('.list_selshop label').length;
      var h = 37*cnt + 20 + 35;

      if(!$('.select_shop').hasClass('open')){
        offset = $('.select_shop').data('offset');
        h = 50;
      }

      $('.list_selshop').velocity({
        translateY:offset
      });

     
      $('.select_shop').velocity({
        height: h
      });

      return false;
    });

   
    $('[name=radio_shop]').click(function(){


      if(myapp.isMobile && !$('.select_shop').hasClass('open')){
        $('.btn_selshop').trigger('click');
        return false;
      }

      // shopIndex = $('[name=radio_shop]').index(this);
      shopId = $(this).data('shopid');

      changeShop();

      //保存
      if (typeof localStorage !== 'undefined') {
        var storage = localStorage;
        storage.setItem("selshop", shopId);
      }

    });

  }

  function changeShop(){


    $('.list_selshop input').prop('checked', false);//すべてのチェックをはずす
    $('.list_selshop input[data-shopid='+shopId+']').prop('checked', true);


    // $('.menuitem').removeClass('visible').hide();
    
    if(shopId == 0){
      $('.menuitem').addClass('visible').css({opacity:0}).velocity('fadeIn',{
        duration:1000,
        delay:100
      });
    }else{
      $('.menuitem:not(.shop'+shopId+')').removeClass('visible').hide();
      // $('.menuitem.shop'+shopId).addClass('visible').show();
      $('.menuitem.shop'+shopId).addClass('visible').css({opacity:0}).velocity('fadeIn',{
        duration:1000,
        delay:100
      });
    }

    if(myapp.isMobile){


      var shopIndex = $('[name=radio_shop]').index($('[name=radio_shop][data-shopid='+shopId+']'));
      var offset = -37*shopIndex-3;
      $('.list_selshop').velocity({
        translateY:offset
      });
      $('.select_shop').data('offset',offset).removeClass('open').velocity({
        height: 50
      });

    //PC  
    }else{
      
      $('.menuitem-big').css({top:0});
      $('.sec-oshinagaki').each(function(){
        $(this).find('.menuitem-big.visible').each(function(i){
          if(i%3 == 1) $(this).css({top:40});
        });
      });      
    }
    setTimeout(function(){
      myapp.evtResize();
    },300);
    

  }


  if($('.btn_allergen')[0]){

    $('.btn_allergen').click(function(){
      if(allergen == 'on'){
        allergen = 'off';
      }else{
        allergen = 'on';
      }
      changeAllergen();

     
      if (typeof localStorage !== 'undefined') {
        var storage = localStorage;
        storage.setItem("allergen", allergen);
      }

      return false;
    });
  }

  function changeAllergen(){

    if(allergen == 'on'){
      $('.btn_allergen').addClass('on');
      $('.allergen').addClass('on');
    }else{
      $('.btn_allergen').removeClass('on');
      $('.allergen').removeClass('on');
    }
  }


  $('a.menuitem').click(function(){
    $(this).children('.cmt').toggle();
    return false;
  });

}



myapp.sttNewsSlide = function(){

  if($('#news')[0]){

      var $self = $('#news');

     
      var offset = myapp.isMobile?15:0;
      var h = $self.find('li:first-child').outerHeight()+offset;
      $self.height(h);

      
      if($self.find('ul li').length >= 2){

        var $oshirase = $self.children('ul');
        $oshirase.newsSlider();

        $('.btn_news').show();

        
        $('.btn_news').click(function() {
          $self.toggleClass('open');
          return false;
        });
      }
  }
};


myapp.otherSetting = function(){

  if($('body').hasClass('design')){
    lightbox.option({
      'wrapAround': true
    })
  }

  $('.lqd').imgLiquid();
}




myapp.evtScroll = function(e){
  


  var scrl_val = $(window).scrollTop();
  var wh = $(window).height();
  var ft = $('footer').offset().top;


  var offset = -10;
  if(scrl_val > wh/2){
    $('#btn_totop').removeClass('hide');
  }else{
    $('#btn_totop').addClass('hide');
  }
  if(scrl_val > ft-wh-offset){
    $('#btn_totop').removeClass('fixed');
  }else{
    $('#btn_totop').addClass('fixed');
  }

 
  if($('body').hasClass('oshinagaki')){

    if(myapp.isMobile){
      var ssb_offset = $('header').height() - 10;
      if(scrl_val > ssb_offset){
        $('.sec-setting .select_shop').addClass('fixed');
      }else{
        $('.sec-setting .select_shop').removeClass('fixed');
      }
    }else{
      var ssb_offset = $('header').height() - 20;
      if(scrl_val > ssb_offset){
        $('.sec-setting .sec_inner').addClass('fixed');
      }else{
        $('.sec-setting .sec_inner').removeClass('fixed');
      }
    }
  }

}


myapp.evtResize = function(){

  if($('body').hasClass('oshinagaki')){

    var $container = $('.menuitem-big:first');
    $container.imagesLoaded(function(){
      
      var r = Math.floor($('.menuitem-big').innerWidth()/2);
      var bw = $('.btn_cmt').width();
      var bh = $('.btn_cmt').height();
      var offset = 15;
      var top = Math.floor(r*(1 - Math.sin(Math.PI/4)) - bh + offset/4);
      var right = Math.floor(r*(1 - Math.cos(Math.PI/4)) - bw + offset);
        
      if(myapp.isSP){
        $('.menuitem-big .btn_cmt').css({
          top:top,
          right:right
        });
      }

 
      if(myapp.isSP){
        var mh = $('.marks').height();
        offset = 0;
        top = Math.floor(r*(1 - Math.sin(Math.PI/4)) - mh + offset/4);
        var left = Math.floor(r*(1 - Math.cos(Math.PI/4)));
        $('.menuitem-big .marks').css({
          top:top,
          left:left,
          transform:''
        });
      }else{
        $('.menuitem-big .marks').each(function(i){
          offset = $(this).next('.name').width()/2 + 5;
          $(this).css({
            top:'',
            left:'',
            transform:'translateX(-'+offset+'px)'
          });
        });
        
      }

    });

    

  }
  
}

myapp.setHover = function(){

  $('.wp-pagenavi a').addClass('touch-hover');
  $('.sec-news .cate .month li a').addClass('touch-hover');

  $(".touch-hover")
  .on('touchstart mouseenter', function(e){
    $(this).addClass("hover");
  })
  .on('touchend mouseleave', function(e){
    $(this).removeClass("hover");
  });

}




myapp.badgeControl = function() {

  showBadge();
  
  if($('body').hasClass('news') || $('body').hasClass('single-post') || $('body').hasClass('category') || $('body').hasClass('date')){
    if (typeof localStorage !== 'undefined') {
      var storage = localStorage;
      var dt = new Date(); 
      var sec = Math.floor( dt.getTime()/1000 );
      storage.setItem("lastNewsTime", sec);
    }
    $('.badge_news').fadeOut();
  }

  function showBadge(){

    if(!($('.badge_news').length)) return;

    $('.badge_news').hide();
    if (typeof localStorage !== 'undefined') {
    
      var storage = localStorage;
          
      var lastNewsTime = Number( storage.getItem("lastNewsTime") );
      
      var numUnreadBlog = 0;
      for(var i = 0; i < newsTimes.length; i++){
        if(newsTimes[i] > lastNewsTime) numUnreadBlog++;
      }
      
      if(numUnreadBlog){
        $('.badge_news').show().text(numUnreadBlog);
      }
      
    }
  }
}


myapp.setSideMenu = function() {

  if($(".cate .dropdown")[0]) {
    $(".cate .dropdown").click(function() {
      $(this).toggleClass('active');
      $(this).children('.arrow').toggleClass('close');
      $(this).next('.children').stop().slideToggle();
      return false;
    });
  }
}


myapp.loading = function(){

  var $container = $('.afterloading');
  setTimeout(function(){
    $container.imagesLoaded(function(){
      loading_out();
    });
  },1000);

  function loading_out(){
    new WOW().init();
    $('#loading').velocity('fadeOut',{
      duration: 500,
      complete: function(){
        
      }
    });
  }

}




$( function() {

  myapp.init();
  myapp.loading();

});





(function($){
  $.fn.newsSlider = function(options){

    var $this = this;

    var defaults = {
      interval : 5000,//ms
      speed : 500//ms
    };
    var setting = $.extend(defaults, options);

      $this.each(function(index){

        var $self = $(this);

        function changeChild(){

          var target = $self.children('li:first-child');
          var offsetCoords = target.offset();

          if(!$self.parent().hasClass('open') && 
             $(window).scrollTop() + $(window).height() > offsetCoords.top && offsetCoords.top + target.outerHeight() > $(window).scrollTop() ){
            
            var d = target.height();
            $self.velocity({
              top: -d
            },setting.speed,'easeInCubic',function(){

              target.appendTo($self);
              $self.css({
                top:0
              });
            });

            var offset = myapp.isMobile?15:30;
            var h = target.next().outerHeight()+offset;
            $self.parent().velocity({
              height:h
            },setting.speed);
          }

          setTimeout(changeChild, setting.interval);
        }
        setTimeout(changeChild, setting.interval);

      });

      return(this);

  };

})(jQuery);
