// Tiny-slider
const slider = tns({
	container: '.carousel__inner',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: false,
	nav: true,
	navPosition: 'bottom',
	mouseDrag: true,
	speed: 2000
});

//Подключение кнопок "вперед-назад"
document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});
document.querySelector('.next ').addEventListener('click', function () {
	slider.goTo('next');
}); 

//Подключение табов с контентом
$(document).ready(function(){
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});
	
	// $('.catalog-item__link').each(function(i) {
	// 	$(this).on('click', function(e) {
	// 		e.preventDefault();
	// 		$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
	// 		$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
	// 	})
	// })
	// $('.catalog-item__back').each(function(i) {
	// 	$(this).on('click', function(e) {
	// 		e.preventDefault();
	// 		$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
	// 		$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
	// 	})
	// });

	//Ссылки "подробнее" и "назад"
	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};
	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');


	//Modal
	$('[data-modal=consultation]').on('click', function(){
		$('.overlay, #consultation').fadeIn('slow');
	});
	$('.modal__close').on('click', function(){
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});
	$('.button_mini').each(function(i){
		$(this).on('click', function(){
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		} )
	});

	//Закрытие по области
	$(window).on('click', function(e) {
        if (e.target.classList.contains('overlay')) {
            $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
        }
    });
	
	//ESC
	$(document).keyup(function(e) {
		if (e.keyCode === 27) {   // esc
		   $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
		}
	  });
	
	//Валидация через js "jquery.validate"
	// $('#consultation-form').validate();
	// $('#consultation form').validate({
	// 	rules: {
	// 		user: {
	// 			required: true,
	// 			minlength: 2
	// 		  },
	// 		tel: 'required',
	// 		email: {
	// 			required: true,
	// 			email: true
	// 		}
	// 	},
	// 	messages: {
	// 		user:{
	// 			required: "Введите ваше имя",
	// 			minlength: jQuery.validator.format("Введите не менее {0} символов!")
	// 		  },
	// 		tel:'Введите ваш номер телефона',
	// 		email:{
	// 			required:'Введите ваш почтовый адрес',
	// 			email: 'Неверный почтовый адрес'
	// 		}

	// 	}
	// });
	// $('#order form').validate();


	// Оптимизированная версия validate
	function validateForms(form) {
		$(form).validate({
			rules: {
				user: {
					required: true,
					minlength: 2
				  },
				tel: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				user:{
					required: "Введите ваше имя",
					minlength: jQuery.validator.format("Введите не менее {0} символов!")
				  },
				tel:'Введите ваш номер телефона',
				email:{
					required:'Введите ваш почтовый адрес',
					email: 'Неверный почтовый адрес'
				}
	
			}
		});
	};

	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');

	//Maskedinput
	$('input[name=tel]').mask("+7 (999) 999-99-99");

	//Отправка писем
	$('form').submit(function(e) {
		e.preventDefault();
		if (!$(this).valid()) {
			return;
		}
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});
	//Scroll
	$(window).scroll(function(){
		if ($(this).scrollTop() > 1000) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});
	//Плавный Scroll
	$("a[href^='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

	new WOW().init();
	
});
