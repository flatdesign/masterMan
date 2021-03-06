$(function () {
  let $items = $('.reviews__list .reviews__element');
  let $humburger = $('.humburger');
  let $menu = $('.main-header__list');
  let $close = $('.main-header__close');
  let $body = $('body');
  
  $humburger.on("click", function() {
    $menu.addClass('active');
    $close.addClass('active');
    $body.addClass('no-scroll');
  });

  $close.on("click", function() {
    $menu.removeClass('active');
    $close.removeClass('active');
    $body.removeClass('no-scroll');
  });

  let $services = $('.services__element a');
    $services.on("click", function(e) {
      e.preventDefault();
      $body.addClass('no-scroll');
      $wrapper = $(this.parentNode).find('.services__element-wrapper');
      $shadowElement = $(this.parentNode).find('.services__element-shadow');

      $wrapper.addClass('active');   
      $shadowElement.addClass('active');

      $shadowElement.on('click', function() {
        $body.removeClass('no-scroll');
        $(this).removeClass('active');
        $wrapper.removeClass('active');
      })
  });

  $('.main-header__list a').on('click', function() {
    $menu.removeClass('active');
    $close.removeClass('active');
    $body.removeClass('no-scroll');
  });

  $('.scroll-link').bind('click.smoothscroll',function (e) {
    e.preventDefault();
    
    let target = this.hash,
    $target = $(target);
      
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
      }, 500, 'swing', function () {
        window.location.hash = target;
      });
    });


    let selectType = $('.form__type');

    let addOptions = function(select) {
      $(selectType).empty();
      let options = $(select);
        for(let i = 0; i < options.length; i++) {
          let o = new Option($(options[i]).text(), $(options[i]).text());
          $(o).html($(options[i]).text());
          selectType.append(o);
        }
    }

    $('.form__services').on('change', function (e) {
      let valueSelected = this.value;
      switch(valueSelected) {
        case 'Сантехнические работы': {
          addOptions('.services__element--plumber li');
          break;
        }
        case 'Электромонтажные работы': {
          addOptions('.services__element--electric-installation li');
          break;
        }
        case 'Кровельные работы': {
          addOptions('.services__element--roofing li');
          break;
        }
        case 'Отделочные работы': {
          addOptions('.services__element--finishing-work li');
          break;
        }
        case 'Услуги плотника': {
          addOptions('.services__element--carpenter li');
          break;
        }
        case 'Металлоконструкционные работы': {
          addOptions('.services__element--metal-construction li');
          break;
        }
        case 'Установка бытовой техники': {
          addOptions('.services__element--appliances li');
          break;
        }
        case 'Сборка/разборка/ремонт мебели': {
          addOptions('.services__element--furniture li');
          break;
        }
        case 'Другие услуги': {
          addOptions('.services__element--other li');
          break;
        }

      }
    });

    // ВАЛИДАЦИЯ ФОРМЫ

    $('.request__form').on('submit', function(e) {
      if(!validateForm()) {
        e.preventDefault();
      } 
    });

    let validateForm = function() {
      let validity = true;

      $('.error').removeClass('error');
      let regularPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      let $phone = $('.form__phone');
      if(!regularPhone.test($phone.val())) {
        $phone.addClass('error');
        validity = false;
      }

      let regularEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
      let $email = $('.form__email');
      if(!regularEmail.test($email.val()) && $email.val() != '') {
        $email.addClass('error');
        validity = false;
      }

      return validity;
    }

    

    
    
    

  $('.reviews__list').owlCarousel({
      nav: true,
      loop: true,
      responsiveClass: true,
      autoWidth: true,
      dots: false,
      responsive: {
          0: {
            items: 1
          },
          1200: {
            items: 2
          }
      },
      onInitialized: function () {
          equalsHeight($items);
      },
      onResized: function () {
          equalsHeight($items);
    },
  });

  function equalsHeight($items) {
      let max = 0;

      $items.each(function () {
          let h = $(this).find('> div').outerHeight();

          if (h > max) {
              max = h;
          }
      });

      $items.css('min-height', max + 'px');

      setTimeout(function () {
          $('.reviews').trigger('refresh.owl.carousel');
      }, 1);
  }

});
