const headerSign = $('.header__sign2');
headerSign.click(function() {
    $(this).toggleClass('header__sign2_active')
});
headerSign.dblclick(function() {
    $(this).toggleClass('red')
})

const elem1 = $('.navigation__item');

elem1.click(function() {
   console.log($(this).prev().get(0));
   console.log($(this).next().get()); 
});

const elem2 = $('.navigation__city');
elem2.click(function() {
    $(this).css({
        backgroundColor: 'red',
        'border': '3px solid black'
    })
 });

 $('.header__logo').attr('alt', 'Логотип компании "Дом построен"')
console.log($('.header__logo').attr('alt'));
console.log($('.header__logo').offset())

const modalBtn = $('.present__btn');
const modalClose = $('.modal-order__close');
const modalOrder = $('.modal-order');
modalBtn.click(function() {
    modalOrder.show(500);
});
modalClose.click(function() {
    modalOrder.hide(500);
});

modalOrder.on('click', function(e) {
    if (!(e.target.closest('.modal-order__wrapper')) && !(e.target.closest('.modal-order__input'))) {
        modalOrder.hide(500);
    }
})

const modalOrderInput = $('.modal-order__input');
const modalOrderTitle = $('.modal-order__title');

modalOrderInput.focus(function() {
    modalOrderTitle
    .text(`Введите ${$(this).attr('placeholder').toLowerCase()}`)
});

modalOrderInput.blur(function() {
    modalOrderTitle.text('Заполните форму');
});

modalOrderInput.on('input', function(event) {
    console.log(event.type)
});
modalOrderInput.on('change', function(event) {
    console.log(event.type)
});

//Создание элементов
const div = $(`
  <div class="hello-world">
    <h1>Привет мир</h1>
  </div>
`);

div.css('padding', '40px');
div.css('border', '3px solid black');
div.css('margin', '20px');

// div.html(`
//   <div class="hello-world">
//     <h1>Привет всем</h1>
//   </div>
// `);

$('body').append(div);

div.width('40%');
div.height('50'); // Элемент
div.innerHeight(); // C padding
div.outerHeight(); // С border
div.outerHeight(true); // С margin

//Анимация
const foo = function() {
//   $(this).next().slideUp()
//   $(this).next().slideDown();
//   $(this).next().slideToggle(1000);
//   $(this).next().fadeToggle(1000);
//   $(this).next().fadeTo(1000, 0.5);
  $(this).next().animate({
    height: '-=50px'
  }, 2000, function() {
    alert('Анимация закончилась');
  });

};

$('.what-building__text').on('click', foo);


//Отправка формы
// $('.modal-order__form').submit(function(event) {
//     event.preventDefault();
//     // $.post('https://jsonplaceholder.typicode.com/todos', $(this).serialize())
//     //   .then(function(data) {
//     //     console.log(data);
//     //     return data;
//     //   })
//     //   .catch(function(err) {
//     //     console.log(err);
//     //   });
//     $.ajax({
//         url: 'https://jsonplaceholder.typicode.com/todos',
//         type: 'POST',
//         data: $(this).serialize(),
//         success(data) {
//             modalOrderTitle.text('Ваша заявка принята, номер заявки' + data.id)
//             $('.modal-order__form').slideUp(300);
//         },
//         error() {
//           modalOrderTitle.text('Что-то пошло не так')
//         },
//     });
// });

// Burger-menu, домашнее задание

// $('.header__burger').on('click', function() {
//     $('.navigation').animate({
//         left: 0,
//     }, 500, function() {
//         $('.navigation__close').animate({
//             opacity: 1,
//         }, 300, 'swing');
//     });
// });
const menu = $('.header__burger');
const nav = $('.navigation');
const closeBtn = $('.navigation__close');
menu.on('click', function() {
  nav.css('display', 'flex');
  closeBtn.css('display', 'flex');
});

closeBtn.on('click', function() {
    nav.hide();
});

$('body').on('click', function(event) {
    if (!(event.target.closest('.navigation')) && !(event.target.closest('.header__burger'))) {
      nav.hide(500);
    };
});


//Cookies
const cookieAlert = document.querySelector('.alert-cookie');
const cookieButton = document.querySelector('.alert-cookie__button');

cookieButton.addEventListener('click', () => {
  cookieAlert.classList.remove('alert-cookie_no-ready');
  Cookies.set('dom-ready-cookie', 'true', {
    expires: 10, // Сколько дней хранятся cookies
  });
});
if (!Cookies.get('dom-ready-cookie')) {
  cookieAlert.classList.add('alert-cookie_no-ready');
};

// Inputmask
const modalOrderFieldset = document.querySelector('.modal-order__fieldset');
const inputTel = document.querySelector('.modal-order__input_tel');
const telMask = new Inputmask('+7(999)-999-99-99');
telMask.mask(inputTel);


//JustValidate
const justValidate = new JustValidate('.modal-order__form');
justValidate
  .addField('.modal-order__input', [
    {
      rule: 'required',
      errorMessage: 'Укажите Ваше имя',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Не короче 3-х символов',
    },
    {
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Слишком длинное имя',
    },
  ])
  .addField('.modal-order__input_email', [
    {
      rule: 'required',
      errorMessage: 'Укажите Ваш email',
    },
    {
      rule: 'email',
      errorMessage: 'Некорректный email',
    },
  ])
  .addField('.modal-order__input_tel', [
    {
      rule: 'required',
      errorMessage: 'Укажите Ваш телефон',
    },
    {
      validator(value) {
        const phone = inputTel.inputmask.unmaskedvalue();
        console.log(phone);
        return !!(Number(phone) && phone.length === 10);
      },
      errorMessage: 'Некорректный телефон',
    }  
  ])
  .onSuccess(event => {
    const target = event.target;
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      name: target.name.value,
      tel: inputTel.inputmask.unmaskedvalue(),
      email: target.email.value,
    })
    .then(response => {
      target.reset();
      modalOrderFieldset.disabled = true;
      modalOrderTitle.textContent = `Ваша заявка принята, номер заявки ${response.data.id}`;
    })
    .catch(err => {
      modalOrderFieldset.disabled = false;
      target.reset();
      modalOrderTitle.textContent = 'Что-то пошло не так';
      console.error(err);
    })
  })

// Слайдер

new Swiper('.swiper', {
  slidesPreView: 4, 
  loop: true,
  autoplay: {
    delay: 3000,
  },

  pagination: {
    el: 'swiper-panigation',
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  Keyboard: true,
});




