function openMobileMenu(e, elem) {
    e.preventDefault();
    document.querySelector(".header-mobile").classList.toggle("active");
    document.querySelector("body").classList.toggle("ovh");
}

function closeMobileMenu(e, elem) {
    e.preventDefault();
    document.querySelector(".header-mobile").classList.remove("active");
    document.querySelector("body").classList.remove("ovh");
    document.querySelectorAll('.burger').forEach((btn)=>{btn.classList.toggle('active');});
}

function openMobileDrop(e, elem) {
    e.preventDefault();
    e.stopPropagation();
    elem.closest('.header-mobile__link').nextElementSibling.classList.add("active");
}

function backMobileMenu(e, elem) {
    e.preventDefault();
    e.stopPropagation();
    elem.closest(".header-mobile__drop").classList.remove("active");
}
function scrollUp() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
}
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener("scroll", function (e) {
        if (this.scrollY > 200) {
            document.querySelector('.header__fixed').classList.add('header__fixed_active');
        } else {
            document.querySelector('.header__fixed').classList.remove('header__fixed_active');
        }
        if (this.scrollY > 1500) {
            document.querySelector('.footer__up').classList.add('footer__up_on');
        } else {
            document.querySelector('.footer__up').classList.remove('footer__up_on');
        }
    });
    const buttonUp = document.querySelector('.footer__up_btn');
    if(buttonUp) {
        buttonUp.addEventListener('click', ()=>{
            scrollUp();
        });
    }
    const swiper = new Swiper('.main__swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });
    const swiperForm = new Swiper('.post-form__swiper', {
        breakpoints: {
        320: {
            slidesPerView: 'auto',
            spaceBetween: 6
        },
        992: {
            slidesPerView: 'auto',
            spaceBetween: 17
        },
    },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });
    const swiperPet = new Swiper('.another-pet__swiper', {
        breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        576: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });
    // Константы диапазона
    const min = 2, max = 100, step = 1;
    let minValue = 2, maxValue = 100;

    const sliderWrap = document.querySelector('.slider-wrap');
    const track = document.querySelector('.slider-track');
    const rangeEl = document.querySelector('.slider-range');
    const thumbMin = document.getElementById('thumbMin');
    const thumbMax = document.getElementById('thumbMax');
    const minLabel = document.querySelector('.min-label');
    const maxLabel = document.querySelector('.max-label');

    let isDragging = null;

    function percent(val) {
        return ((val - min) / (max - min)) * 100;
    }
    function valueFromPx(px, sliderWidth) {
        let percentValue = (px / sliderWidth);
        let newValue = Math.round((max - min) * percentValue / step) * step + min;
        newValue = Math.min(Math.max(newValue, min), max);
        return newValue;
    }
    function updateSlider() {
        let sliderWidth = sliderWrap.clientWidth - 60;
        let minPercent = percent(minValue);
        let maxPercent = percent(maxValue);
        // Позиции бегунков
        thumbMin.style.left = `calc(${minPercent}% + 30px)`;
        thumbMax.style.left = `calc(${maxPercent}% - 30px)`;
        // Диапазон
        let diap = maxPercent - minPercent;
        rangeEl.style.width = `calc(${diap}% * (${sliderWidth} - 60px) / 100)`;
        rangeEl.style.left = `calc(${minPercent}% + 30px)`;
        // Лейблы
        minLabel.textContent = minValue + 'км';
        maxLabel.textContent = maxValue + 'км';
        // Засечки по aria
        thumbMin.setAttribute('aria-valuenow', minValue);
        thumbMax.setAttribute('aria-valuenow', maxValue);
    }
    function clampMin(val) {
        return Math.min(Math.max(val, min), maxValue - step);
    }
    function clampMax(val) {
        return Math.max(Math.min(val, max), minValue + step);
    }

    function onStart(e, which) {
        e.preventDefault();
        isDragging = which;
        if (which === 'min') thumbMin.classList.add('active');
        if (which === 'max') thumbMax.classList.add('active');
        document.addEventListener('pointermove', onMove);
        document.addEventListener('pointerup', onEnd);
    }
    function onMove(e) {
        let sliderRect = sliderWrap.getBoundingClientRect();
        let x = (e.touches ? e.touches[0].clientX : e.clientX) - sliderRect.left - 10;
        let sliderWidth = sliderWrap.clientWidth - 20;
        if (isDragging === 'min') {
            let v = clampMin(valueFromPx(x, sliderWidth));
            if (v !== minValue) { minValue = v; updateSlider(); }
        }
        if (isDragging === 'max') {
            let v = clampMax(valueFromPx(x, sliderWidth));
            if (v !== maxValue) { maxValue = v; updateSlider(); }
        }
    }
    function onEnd() {
        isDragging = null;
        thumbMin.classList.remove('active');
        thumbMax.classList.remove('active');
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerup', onEnd);
    }
    if (sliderWrap) {
        // Мышь/touch
        thumbMin.addEventListener('pointerdown', e => onStart(e, 'min'));
        thumbMax.addEventListener('pointerdown', e => onStart(e, 'max'));

        // Доступность: стрелки
        [thumbMin, thumbMax].forEach((el, idx) => {
            el.addEventListener('keydown', function (e) {
                if (isDragging) return;
                if (idx === 0 && (e.key === 'ArrowLeft' || e.key === 'ArrowDown')) {
                    minValue = clampMin(minValue - step); updateSlider();
                }
                if (idx === 0 && (e.key === 'ArrowRight' || e.key === 'ArrowUp')) {
                    minValue = clampMin(minValue + step); updateSlider();
                }
                if (idx === 1 && (e.key === 'ArrowLeft' || e.key === 'ArrowDown')) {
                    maxValue = clampMax(maxValue - step); updateSlider();
                }
                if (idx === 1 && (e.key === 'ArrowRight' || e.key === 'ArrowUp')) {
                    maxValue = clampMax(maxValue + step); updateSlider();
                }
            });
        });

        window.addEventListener('resize', updateSlider);

        updateSlider();
    }

    const tabsMain = document.querySelectorAll('.index__tabs_btn');
    const tabsContentMain = document.querySelectorAll('.tabs__content');
    if (tabsMain.length) {
        tabsMain[0].classList.add('index__tabs_btn-active');
        tabsContentMain[0].classList.add('tabs__content_active');
        tabsMain.forEach(element => {
            element.addEventListener('click', e => {
                const path = e.currentTarget.dataset.path;
                tabsMain.forEach(btn => {
                    btn.classList.remove('index__tabs_btn-active');
                });
                e.currentTarget.classList.add('index__tabs_btn-active');
                tabsContentMain.forEach(element => {
                    element.classList.remove('tabs__content_active');
                });
                document.querySelector(`[data-target="${path}"]`).classList.add('tabs__content_active');
            });
        });
    }

    const video = document.querySelectorAll('.bg-video');
    const playPauseButton = document.querySelectorAll('.icon__video_play');
    const volumeButton = document.querySelectorAll('.icon__video_volume');
    if (video.length) {
        playPauseButton.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const currentVideo = e.currentTarget.closest('.card__video').querySelector('.bg-video');
                if (currentVideo.paused) {
                    currentVideo.play();
                    btn.innerHTML = '<svg viewBox="0 0 32 32" width="29" height="29" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 33"><path d="m14 5v22a3 3 0 0 1 -3 3h-3a3 3 0 0 1 -3-3v-22a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3zm10-3h-3a3 3 0 0 0 -3 3v22a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-22a3 3 0 0 0 -3-3z" fill="#000000" style="fill: rgb(255, 255, 255);"></path></g></svg>';
                } else {
                    currentVideo.pause();
                    btn.innerHTML = '<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.16602 6.06268V22.396L13.4993 14.2294M15.8327 22.396H19.3327V6.06268H15.8327M21.666 6.06268V22.396H25.166V6.06268" fill="white" /></svg>';
                }
            });
        });


        volumeButton.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const currentVideo2 = e.currentTarget.closest('.card__video').querySelector('.bg-video');
                currentVideo2.muted = !currentVideo2.muted;
                btn.innerHTML = currentVideo2.muted ? '<svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.9993 3.99768V6.40101C20.371 7.40435 22.8327 10.531 22.8327 14.2293C22.8327 17.9277 20.371 21.0427 16.9993 22.046V24.461C21.666 23.3993 25.166 19.2227 25.166 14.2293C25.166 9.23601 21.666 5.05935 16.9993 3.99768ZM19.916 14.2293C19.916 12.1643 18.7493 10.391 16.9993 9.52768V18.896C18.7493 18.0677 19.916 16.2827 19.916 14.2293ZM4.16602 10.7293V17.7293H8.83268L14.666 23.5627V4.89601L8.83268 10.7293H4.16602Z" fill="white" /></svg>' : '<svg enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="29" height="29" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.159 0-256 114.841-256 256s114.841 256 256 256 256-114.842 256-256-114.841-256-256-256zm0 488c-127.925 0-232-104.075-232-232s104.075-232 232-232 232 104.075 232 232-104.075 232-232 232zm93.456-248.652v161.322c0 4.373-2.379 8.4-6.209 10.511-1.806.995-3.8 1.489-5.79 1.489-2.231 0-4.458-.621-6.413-1.856l-98.839-62.482c-5.602-3.542-7.272-10.954-3.731-16.556s10.955-7.271 16.555-3.731l80.427 50.843v-139.54c0-6.627 5.373-12 12-12s12 5.372 12 12zm30.256-130.503-30.256 30.256v-13.431c0-4.374-2.379-8.4-6.21-10.511-3.83-2.11-8.505-1.97-12.202.368l-123.217 77.893h-72.838c-16.094 0-29.188 13.093-29.188 29.188v81.125c0 16.094 13.093 29.188 29.188 29.188h20.647l-44.925 44.925c-4.686 4.687-4.686 12.284 0 16.971 2.343 2.343 5.414 3.515 8.485 3.515s6.142-1.172 8.485-3.515l269-269c4.686-4.687 4.686-12.284 0-16.971-4.685-4.688-12.283-4.688-16.969-.001zm-244.723 200.075c-2.86 0-5.188-2.327-5.188-5.188v-81.125c0-2.86 2.327-5.188 5.188-5.188h76.313c2.27 0 4.494-.644 6.412-1.857l107.741-68.11v15.648l-145.818 145.82z" fill="#000000" style="fill: rgb(255, 255, 255);"></path></svg>';
            });
        });

    }
    const burgerBtn = document.querySelectorAll('.burger');
    if (burgerBtn.length) {
        burgerBtn.forEach((burger) => {
            burger.addEventListener('click', function (e) {
                burgerBtn.forEach((btn)=>{btn.classList.toggle('active');});
                openMobileMenu(e, e.currentTarget);
            });
        });
    }
    const close = document.querySelector('.header-mobile__overlay');
    if (close) {
        close.addEventListener('click', function (e) {
            closeMobileMenu(e, document.querySelector('.header-mobile'));
        });
    }
    const secMenu = document.querySelector('.open-second-menu');
    if (secMenu) {
        secMenu.addEventListener('click', function (e) {
            openMobileDrop(e, e.currentTarget);
        });
    }
    const menuBack = document.getElementById('mobile-back');
    if (menuBack) {
        menuBack.addEventListener('click', function (e) {
            backMobileMenu(e, e.currentTarget);
        });
    }

    const showMobileFilter = document.querySelectorAll('.filter__button');
    if (showMobileFilter.length) {
        showMobileFilter.forEach((filter) => {
            filter.addEventListener('click', () => {
                filter.closest('.tabs__content').querySelector('.tabs__content_left').classList.add('active');
                setTimeout(function () {
                    filter.closest('.tabs__content').querySelector('.tabs__content_left').classList.add("show");
                }, 100);
            });
        });
    }
    const closeMobileFilter = document.querySelectorAll('.js-close-filter');
    if (closeMobileFilter.length) {
        closeMobileFilter.forEach((close) => {
            close.addEventListener('click', () => {
                close.closest('.tabs__content').querySelector('.tabs__content_left').classList.remove('active');
                setTimeout(function () {
                    close.closest('.tabs__content').querySelector('.tabs__content_left').classList.remove("show");
                }, 100);
            });
        });
    }
    if (window.matchMedia('(max-width: 620px)').matches) {
        if (document.querySelector('.index__search_input.index__search_input-cutMob')) {
            document.querySelector('.index__search_input.index__search_input-cutMob').placeholder = 'Введите имя питомца...';
        }
    }
    const curator = document.querySelector('.curator-block');
    if (curator) {
        setTimeout(function () {
            curator.style.display = 'flex';
            document.querySelector('.close-btn').addEventListener('click', () => {
                curator.style.display = 'none';
            });
        }, 5000);
    }
    const blackCat = document.querySelector('.black__cat');
    if (blackCat) {
        setTimeout(function () {
            blackCat.style.display = 'flex';
            document.querySelector('.black-cat__close-btn').addEventListener('click', () => {
                blackCat.style.display = 'none';
            });
        }, 3000);
    }

    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeOpen = document.getElementById('eye-open');
    const eyeClosed = document.getElementById('eye-closed');
if(togglePassword) {
    togglePassword.addEventListener('click', function() {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeClosed.style.display = "none";
        eyeOpen.style.display = "";
      } else {
        passwordInput.type = "password";
        eyeClosed.style.display = "";
        eyeOpen.style.display = "none";
      }
    });
}
    async function sendData(data) {
        return await fetch('./js/server.php', {
        method: 'GET',/*здесь POST, GET для рабочего примера в верстке */
        /*body: data,*/
        })
    }
    async function handleFormSubmit(event,form,btn) {
        event.preventDefault();
        let innerText = btn.textContent;
        btn.textContent = 'Отправка...';
        btn.setAttribute('disabled', true);
        const data = new FormData(form);
        const response = await sendData(data);
        if(response.status == 200) {
            form.reset();
            window.location.replace('/cotinder/index.html?auth=true')
        }
        btn.textContent = innerText;
        btn.removeAttribute('disabled');
}

    const formAuth = document.querySelector('.authorization__form');
    if(formAuth) {
        formAuth.addEventListener('submit', (e) => {
            handleFormSubmit(e,formAuth,document.querySelector('.authorization__btn'));
        });
    }
    /*убрать start - код только для верстки */
    const params = new URLSearchParams(window.location.search);
    if(params) {
        if(params.has('auth')) {
            document.querySelectorAll('.header__non-authorized').forEach((block) => {
                block.style.display = 'none';
            });
            document.querySelectorAll('.header__authorized').forEach((block) => {
                block.style.display = 'flex';
                });
        }
    }
    /* убрать end*/
    Fancybox.bind("[data-fancybox]", {
  tpl: {
    closeButton: '<button type="button" data-fancybox-close="" class="fancybox-button fancybox-close-small fancy__myClose" title="Close"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9997 26.3333C8.75218 26.3333 3.66634 21.2474 3.66634 14.9999C3.66634 8.75242 8.75218 3.66659 14.9997 3.66659C21.2472 3.66659 26.333 8.75242 26.333 14.9999C26.333 21.2474 21.2472 26.3333 14.9997 26.3333ZM14.9997 0.833252C7.16551 0.833252 0.833008 7.16575 0.833008 14.9999C0.833008 22.8341 7.16551 29.1666 14.9997 29.1666C22.8338 29.1666 29.1663 22.8341 29.1663 14.9999C29.1663 7.16575 22.8338 0.833252 14.9997 0.833252ZM18.6688 9.33325L14.9997 13.0024L11.3305 9.33325L9.33301 11.3308L13.0022 14.9999L9.33301 18.6691L11.3305 20.6666L14.9997 16.9974L18.6688 20.6666L20.6663 18.6691L16.9972 14.9999L20.6663 11.3308L18.6688 9.33325Z" fill="white"/></svg></button>',
  },
});
if(document.querySelector('.comment__replies')) {
$('.comment__replies').hide();
$('.comment__likes button').on('click', function(e) {
        let path = e.currentTarget.dataset.path;
        $(`[data-target="${path}"]`).slideToggle();
    });
}
if(document.querySelector('.person__info_map')) {
async function initMap() {
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = ymaps3;

    const map = new YMap(
        document.querySelector('.person__info_map'),
        {
            location: {
                center: [37.588144, 55.733842],
                zoom: 15
            }
        }
    );

    map.addChild(new YMapDefaultSchemeLayer({
        customization: [
    {
        "tags": "country",
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#8c8c8c"
            },
            {
                "zoom": 0,
                "opacity": 0.8
            },
            {
                "zoom": 1,
                "opacity": 0.8
            },
            {
                "zoom": 2,
                "opacity": 0.8
            },
            {
                "zoom": 3,
                "opacity": 0.8
            },
            {
                "zoom": 4,
                "opacity": 0.8
            },
            {
                "zoom": 5,
                "opacity": 1
            },
            {
                "zoom": 6,
                "opacity": 1
            },
            {
                "zoom": 7,
                "opacity": 1
            },
            {
                "zoom": 8,
                "opacity": 1
            },
            {
                "zoom": 9,
                "opacity": 1
            },
            {
                "zoom": 10,
                "opacity": 1
            },
            {
                "zoom": 11,
                "opacity": 1
            },
            {
                "zoom": 12,
                "opacity": 1
            },
            {
                "zoom": 13,
                "opacity": 1
            },
            {
                "zoom": 14,
                "opacity": 1
            },
            {
                "zoom": 15,
                "opacity": 1
            },
            {
                "zoom": 16,
                "opacity": 1
            },
            {
                "zoom": 17,
                "opacity": 1
            },
            {
                "zoom": 18,
                "opacity": 1
            },
            {
                "zoom": 19,
                "opacity": 1
            },
            {
                "zoom": 20,
                "opacity": 1
            },
            {
                "zoom": 21,
                "opacity": 1
            }
        ]
    },
    {
        "tags": "country",
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "zoom": 0,
                "opacity": 0.15
            },
            {
                "zoom": 1,
                "opacity": 0.15
            },
            {
                "zoom": 2,
                "opacity": 0.15
            },
            {
                "zoom": 3,
                "opacity": 0.15
            },
            {
                "zoom": 4,
                "opacity": 0.15
            },
            {
                "zoom": 5,
                "opacity": 0.15
            },
            {
                "zoom": 6,
                "opacity": 0.25
            },
            {
                "zoom": 7,
                "opacity": 0.5
            },
            {
                "zoom": 8,
                "opacity": 0.47
            },
            {
                "zoom": 9,
                "opacity": 0.44
            },
            {
                "zoom": 10,
                "opacity": 0.41
            },
            {
                "zoom": 11,
                "opacity": 0.38
            },
            {
                "zoom": 12,
                "opacity": 0.35
            },
            {
                "zoom": 13,
                "opacity": 0.33
            },
            {
                "zoom": 14,
                "opacity": 0.3
            },
            {
                "zoom": 15,
                "opacity": 0.28
            },
            {
                "zoom": 16,
                "opacity": 0.25
            },
            {
                "zoom": 17,
                "opacity": 0.25
            },
            {
                "zoom": 18,
                "opacity": 0.25
            },
            {
                "zoom": 19,
                "opacity": 0.25
            },
            {
                "zoom": 20,
                "opacity": 0.25
            },
            {
                "zoom": 21,
                "opacity": 0.25
            }
        ]
    },
    {
        "tags": "region",
        "elements": "geometry.fill",
        "stylers": [
            {
                "zoom": 0,
                "color": "#a6a6a6",
                "opacity": 0.5
            },
            {
                "zoom": 1,
                "color": "#a6a6a6",
                "opacity": 0.5
            },
            {
                "zoom": 2,
                "color": "#a6a6a6",
                "opacity": 0.5
            },
            {
                "zoom": 3,
                "color": "#a6a6a6",
                "opacity": 0.5
            },
            {
                "zoom": 4,
                "color": "#a6a6a6",
                "opacity": 0.5
            },
            {
                "zoom": 5,
                "color": "#a6a6a6",
                "opacity": 0.5
            },
            {
                "zoom": 6,
                "color": "#a6a6a6",
                "opacity": 1
            },
            {
                "zoom": 7,
                "color": "#a6a6a6",
                "opacity": 1
            },
            {
                "zoom": 8,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 9,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 10,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 11,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 12,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 13,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 14,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 15,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 16,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 17,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 18,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 19,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 20,
                "color": "#8c8c8c",
                "opacity": 1
            },
            {
                "zoom": 21,
                "color": "#8c8c8c",
                "opacity": 1
            }
        ]
    },
    {
        "tags": "region",
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "zoom": 0,
                "opacity": 0.15
            },
            {
                "zoom": 1,
                "opacity": 0.15
            },
            {
                "zoom": 2,
                "opacity": 0.15
            },
            {
                "zoom": 3,
                "opacity": 0.15
            },
            {
                "zoom": 4,
                "opacity": 0.15
            },
            {
                "zoom": 5,
                "opacity": 0.15
            },
            {
                "zoom": 6,
                "opacity": 0.25
            },
            {
                "zoom": 7,
                "opacity": 0.5
            },
            {
                "zoom": 8,
                "opacity": 0.47
            },
            {
                "zoom": 9,
                "opacity": 0.44
            },
            {
                "zoom": 10,
                "opacity": 0.41
            },
            {
                "zoom": 11,
                "opacity": 0.38
            },
            {
                "zoom": 12,
                "opacity": 0.35
            },
            {
                "zoom": 13,
                "opacity": 0.33
            },
            {
                "zoom": 14,
                "opacity": 0.3
            },
            {
                "zoom": 15,
                "opacity": 0.28
            },
            {
                "zoom": 16,
                "opacity": 0.25
            },
            {
                "zoom": 17,
                "opacity": 0.25
            },
            {
                "zoom": 18,
                "opacity": 0.25
            },
            {
                "zoom": 19,
                "opacity": 0.25
            },
            {
                "zoom": 20,
                "opacity": 0.25
            },
            {
                "zoom": 21,
                "opacity": 0.25
            }
        ]
    },
    {
        "tags": {
            "any": "admin",
            "none": [
                "country",
                "region",
                "locality",
                "district",
                "address"
            ]
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#8c8c8c"
            },
            {
                "zoom": 0,
                "opacity": 0.5
            },
            {
                "zoom": 1,
                "opacity": 0.5
            },
            {
                "zoom": 2,
                "opacity": 0.5
            },
            {
                "zoom": 3,
                "opacity": 0.5
            },
            {
                "zoom": 4,
                "opacity": 0.5
            },
            {
                "zoom": 5,
                "opacity": 0.5
            },
            {
                "zoom": 6,
                "opacity": 1
            },
            {
                "zoom": 7,
                "opacity": 1
            },
            {
                "zoom": 8,
                "opacity": 1
            },
            {
                "zoom": 9,
                "opacity": 1
            },
            {
                "zoom": 10,
                "opacity": 1
            },
            {
                "zoom": 11,
                "opacity": 1
            },
            {
                "zoom": 12,
                "opacity": 1
            },
            {
                "zoom": 13,
                "opacity": 1
            },
            {
                "zoom": 14,
                "opacity": 1
            },
            {
                "zoom": 15,
                "opacity": 1
            },
            {
                "zoom": 16,
                "opacity": 1
            },
            {
                "zoom": 17,
                "opacity": 1
            },
            {
                "zoom": 18,
                "opacity": 1
            },
            {
                "zoom": 19,
                "opacity": 1
            },
            {
                "zoom": 20,
                "opacity": 1
            },
            {
                "zoom": 21,
                "opacity": 1
            }
        ]
    },
    {
        "tags": {
            "any": "admin",
            "none": [
                "country",
                "region",
                "locality",
                "district",
                "address"
            ]
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "zoom": 0,
                "opacity": 0.15
            },
            {
                "zoom": 1,
                "opacity": 0.15
            },
            {
                "zoom": 2,
                "opacity": 0.15
            },
            {
                "zoom": 3,
                "opacity": 0.15
            },
            {
                "zoom": 4,
                "opacity": 0.15
            },
            {
                "zoom": 5,
                "opacity": 0.15
            },
            {
                "zoom": 6,
                "opacity": 0.25
            },
            {
                "zoom": 7,
                "opacity": 0.5
            },
            {
                "zoom": 8,
                "opacity": 0.47
            },
            {
                "zoom": 9,
                "opacity": 0.44
            },
            {
                "zoom": 10,
                "opacity": 0.41
            },
            {
                "zoom": 11,
                "opacity": 0.38
            },
            {
                "zoom": 12,
                "opacity": 0.35
            },
            {
                "zoom": 13,
                "opacity": 0.33
            },
            {
                "zoom": 14,
                "opacity": 0.3
            },
            {
                "zoom": 15,
                "opacity": 0.28
            },
            {
                "zoom": 16,
                "opacity": 0.25
            },
            {
                "zoom": 17,
                "opacity": 0.25
            },
            {
                "zoom": 18,
                "opacity": 0.25
            },
            {
                "zoom": 19,
                "opacity": 0.25
            },
            {
                "zoom": 20,
                "opacity": 0.25
            },
            {
                "zoom": 21,
                "opacity": 0.25
            }
        ]
    },
    {
        "tags": {
            "any": "landcover",
            "none": "vegetation"
        },
        "stylers": [
            {
                "hue": "#c7cfd6"
            }
        ]
    },
    {
        "tags": "vegetation",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#aab6c0",
                "opacity": 0.1
            },
            {
                "zoom": 1,
                "color": "#aab6c0",
                "opacity": 0.1
            },
            {
                "zoom": 2,
                "color": "#aab6c0",
                "opacity": 0.1
            },
            {
                "zoom": 3,
                "color": "#aab6c0",
                "opacity": 0.1
            },
            {
                "zoom": 4,
                "color": "#aab6c0",
                "opacity": 0.1
            },
            {
                "zoom": 5,
                "color": "#aab6c0",
                "opacity": 0.1
            },
            {
                "zoom": 6,
                "color": "#aab6c0",
                "opacity": 0.2
            },
            {
                "zoom": 7,
                "color": "#c7cfd6",
                "opacity": 0.3
            },
            {
                "zoom": 8,
                "color": "#c7cfd6",
                "opacity": 0.4
            },
            {
                "zoom": 9,
                "color": "#c7cfd6",
                "opacity": 0.6
            },
            {
                "zoom": 10,
                "color": "#c7cfd6",
                "opacity": 0.8
            },
            {
                "zoom": 11,
                "color": "#c7cfd6",
                "opacity": 1
            },
            {
                "zoom": 12,
                "color": "#c7cfd6",
                "opacity": 1
            },
            {
                "zoom": 13,
                "color": "#c7cfd6",
                "opacity": 1
            },
            {
                "zoom": 14,
                "color": "#cdd4da",
                "opacity": 1
            },
            {
                "zoom": 15,
                "color": "#d3d9df",
                "opacity": 1
            },
            {
                "zoom": 16,
                "color": "#d3d9df",
                "opacity": 1
            },
            {
                "zoom": 17,
                "color": "#d3d9df",
                "opacity": 1
            },
            {
                "zoom": 18,
                "color": "#d3d9df",
                "opacity": 1
            },
            {
                "zoom": 19,
                "color": "#d3d9df",
                "opacity": 1
            },
            {
                "zoom": 20,
                "color": "#d3d9df",
                "opacity": 1
            },
            {
                "zoom": 21,
                "color": "#d3d9df",
                "opacity": 1
            }
        ]
    },
    {
        "tags": "park",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 1,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 2,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 3,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 4,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 5,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 6,
                "color": "#c7cfd6",
                "opacity": 0.2
            },
            {
                "zoom": 7,
                "color": "#c7cfd6",
                "opacity": 0.3
            },
            {
                "zoom": 8,
                "color": "#c7cfd6",
                "opacity": 0.4
            },
            {
                "zoom": 9,
                "color": "#c7cfd6",
                "opacity": 0.6
            },
            {
                "zoom": 10,
                "color": "#c7cfd6",
                "opacity": 0.8
            },
            {
                "zoom": 11,
                "color": "#c7cfd6",
                "opacity": 1
            },
            {
                "zoom": 12,
                "color": "#c7cfd6",
                "opacity": 1
            },
            {
                "zoom": 13,
                "color": "#c7cfd6",
                "opacity": 1
            },
            {
                "zoom": 14,
                "color": "#cdd4da",
                "opacity": 1
            },
            {
                "zoom": 15,
                "color": "#d3d9df",
                "opacity": 1
            },
            {
                "zoom": 16,
                "color": "#d3d9df",
                "opacity": 0.9
            },
            {
                "zoom": 17,
                "color": "#d3d9df",
                "opacity": 0.8
            },
            {
                "zoom": 18,
                "color": "#d3d9df",
                "opacity": 0.7
            },
            {
                "zoom": 19,
                "color": "#d3d9df",
                "opacity": 0.7
            },
            {
                "zoom": 20,
                "color": "#d3d9df",
                "opacity": 0.7
            },
            {
                "zoom": 21,
                "color": "#d3d9df",
                "opacity": 0.7
            }
        ]
    },
    {
        "tags": "national_park",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 1,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 2,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 3,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 4,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 5,
                "color": "#c7cfd6",
                "opacity": 0.1
            },
            {
                "zoom": 6,
                "color": "#c7cfd6",
                "opacity": 0.2
            },
            {
                "zoom": 7,
                "color": "#c7cfd6",
                "opacity": 0.3
            },
            {
                "zoom": 8,
                "color": "#c7cfd6",
                "opacity": 0.4
            },
            {
                "zoom": 9,
                "color": "#c7cfd6",
                "opacity": 0.6
            },
            {
                "zoom": 10,
                "color": "#c7cfd6",
                "opacity": 0.8
            },
            {
                "zoom": 11,
                "color": "#c7cfd6",
                "opacity": 1
            },
            {
                "zoom": 12,
                "color": "#c7cfd6",
                "opacity": 1
            },
            {
                "zoom": 13,
                "color": "#c7cfd6",
                "opacity": 1
            },
            {
                "zoom": 14,
                "color": "#cdd4da",
                "opacity": 1
            },
            {
                "zoom": 15,
                "color": "#d3d9df",
                "opacity": 1
            },
            {
                "zoom": 16,
                "color": "#d3d9df",
                "opacity": 0.7
            },
            {
                "zoom": 17,
                "color": "#d3d9df",
                "opacity": 0.7
            },
            {
                "zoom": 18,
                "color": "#d3d9df",
                "opacity": 0.7
            },
            {
                "zoom": 19,
                "color": "#d3d9df",
                "opacity": 0.7
            },
            {
                "zoom": 20,
                "color": "#d3d9df",
                "opacity": 0.7
            },
            {
                "zoom": 21,
                "color": "#d3d9df",
                "opacity": 0.7
            }
        ]
    },
    {
        "tags": "cemetery",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#c7cfd6"
            },
            {
                "zoom": 1,
                "color": "#c7cfd6"
            },
            {
                "zoom": 2,
                "color": "#c7cfd6"
            },
            {
                "zoom": 3,
                "color": "#c7cfd6"
            },
            {
                "zoom": 4,
                "color": "#c7cfd6"
            },
            {
                "zoom": 5,
                "color": "#c7cfd6"
            },
            {
                "zoom": 6,
                "color": "#c7cfd6"
            },
            {
                "zoom": 7,
                "color": "#c7cfd6"
            },
            {
                "zoom": 8,
                "color": "#c7cfd6"
            },
            {
                "zoom": 9,
                "color": "#c7cfd6"
            },
            {
                "zoom": 10,
                "color": "#c7cfd6"
            },
            {
                "zoom": 11,
                "color": "#c7cfd6"
            },
            {
                "zoom": 12,
                "color": "#c7cfd6"
            },
            {
                "zoom": 13,
                "color": "#c7cfd6"
            },
            {
                "zoom": 14,
                "color": "#cdd4da"
            },
            {
                "zoom": 15,
                "color": "#d3d9df"
            },
            {
                "zoom": 16,
                "color": "#d3d9df"
            },
            {
                "zoom": 17,
                "color": "#d3d9df"
            },
            {
                "zoom": 18,
                "color": "#d3d9df"
            },
            {
                "zoom": 19,
                "color": "#d3d9df"
            },
            {
                "zoom": 20,
                "color": "#d3d9df"
            },
            {
                "zoom": 21,
                "color": "#d3d9df"
            }
        ]
    },
    {
        "tags": "sports_ground",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 1,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 2,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 3,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 4,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 5,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 6,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 7,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 8,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 9,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 10,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 11,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 12,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 13,
                "color": "#b8c2cb",
                "opacity": 0
            },
            {
                "zoom": 14,
                "color": "#bec7cf",
                "opacity": 0
            },
            {
                "zoom": 15,
                "color": "#c4ccd4",
                "opacity": 0.5
            },
            {
                "zoom": 16,
                "color": "#c5cdd5",
                "opacity": 1
            },
            {
                "zoom": 17,
                "color": "#c6ced5",
                "opacity": 1
            },
            {
                "zoom": 18,
                "color": "#c7ced6",
                "opacity": 1
            },
            {
                "zoom": 19,
                "color": "#c8cfd7",
                "opacity": 1
            },
            {
                "zoom": 20,
                "color": "#c9d0d7",
                "opacity": 1
            },
            {
                "zoom": 21,
                "color": "#cad1d8",
                "opacity": 1
            }
        ]
    },
    {
        "tags": "terrain",
        "elements": "geometry",
        "stylers": [
            {
                "hue": "#e1e3e5"
            },
            {
                "zoom": 0,
                "opacity": 0.3
            },
            {
                "zoom": 1,
                "opacity": 0.3
            },
            {
                "zoom": 2,
                "opacity": 0.3
            },
            {
                "zoom": 3,
                "opacity": 0.3
            },
            {
                "zoom": 4,
                "opacity": 0.3
            },
            {
                "zoom": 5,
                "opacity": 0.35
            },
            {
                "zoom": 6,
                "opacity": 0.4
            },
            {
                "zoom": 7,
                "opacity": 0.6
            },
            {
                "zoom": 8,
                "opacity": 0.8
            },
            {
                "zoom": 9,
                "opacity": 0.9
            },
            {
                "zoom": 10,
                "opacity": 1
            },
            {
                "zoom": 11,
                "opacity": 1
            },
            {
                "zoom": 12,
                "opacity": 1
            },
            {
                "zoom": 13,
                "opacity": 1
            },
            {
                "zoom": 14,
                "opacity": 1
            },
            {
                "zoom": 15,
                "opacity": 1
            },
            {
                "zoom": 16,
                "opacity": 1
            },
            {
                "zoom": 17,
                "opacity": 1
            },
            {
                "zoom": 18,
                "opacity": 1
            },
            {
                "zoom": 19,
                "opacity": 1
            },
            {
                "zoom": 20,
                "opacity": 1
            },
            {
                "zoom": 21,
                "opacity": 1
            }
        ]
    },
    {
        "tags": "geographic_line",
        "elements": "geometry",
        "stylers": [
            {
                "color": "#747d86"
            }
        ]
    },
    {
        "tags": "land",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#e1e3e4"
            },
            {
                "zoom": 1,
                "color": "#e1e3e4"
            },
            {
                "zoom": 2,
                "color": "#e1e3e4"
            },
            {
                "zoom": 3,
                "color": "#e1e3e4"
            },
            {
                "zoom": 4,
                "color": "#e1e3e4"
            },
            {
                "zoom": 5,
                "color": "#e4e5e6"
            },
            {
                "zoom": 6,
                "color": "#e6e8e9"
            },
            {
                "zoom": 7,
                "color": "#e9eaeb"
            },
            {
                "zoom": 8,
                "color": "#ecedee"
            },
            {
                "zoom": 9,
                "color": "#ecedee"
            },
            {
                "zoom": 10,
                "color": "#ecedee"
            },
            {
                "zoom": 11,
                "color": "#ecedee"
            },
            {
                "zoom": 12,
                "color": "#ecedee"
            },
            {
                "zoom": 13,
                "color": "#ecedee"
            },
            {
                "zoom": 14,
                "color": "#eeeff0"
            },
            {
                "zoom": 15,
                "color": "#f1f2f3"
            },
            {
                "zoom": 16,
                "color": "#f1f2f3"
            },
            {
                "zoom": 17,
                "color": "#f2f3f4"
            },
            {
                "zoom": 18,
                "color": "#f2f3f4"
            },
            {
                "zoom": 19,
                "color": "#f3f4f4"
            },
            {
                "zoom": 20,
                "color": "#f3f4f5"
            },
            {
                "zoom": 21,
                "color": "#f4f5f5"
            }
        ]
    },
    {
        "tags": "residential",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 1,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 2,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 3,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 4,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 5,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 6,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 7,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 8,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 9,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 10,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 11,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 12,
                "color": "#e1e3e5",
                "opacity": 0.5
            },
            {
                "zoom": 13,
                "color": "#e1e3e5",
                "opacity": 1
            },
            {
                "zoom": 14,
                "color": "#e6e8e9",
                "opacity": 1
            },
            {
                "zoom": 15,
                "color": "#ecedee",
                "opacity": 1
            },
            {
                "zoom": 16,
                "color": "#edeeef",
                "opacity": 1
            },
            {
                "zoom": 17,
                "color": "#eeeff0",
                "opacity": 1
            },
            {
                "zoom": 18,
                "color": "#eeeff0",
                "opacity": 1
            },
            {
                "zoom": 19,
                "color": "#eff0f1",
                "opacity": 1
            },
            {
                "zoom": 20,
                "color": "#f0f1f2",
                "opacity": 1
            },
            {
                "zoom": 21,
                "color": "#f1f2f3",
                "opacity": 1
            }
        ]
    },
    {
        "tags": "locality",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#e1e3e5"
            },
            {
                "zoom": 1,
                "color": "#e1e3e5"
            },
            {
                "zoom": 2,
                "color": "#e1e3e5"
            },
            {
                "zoom": 3,
                "color": "#e1e3e5"
            },
            {
                "zoom": 4,
                "color": "#e1e3e5"
            },
            {
                "zoom": 5,
                "color": "#e1e3e5"
            },
            {
                "zoom": 6,
                "color": "#e1e3e5"
            },
            {
                "zoom": 7,
                "color": "#e1e3e5"
            },
            {
                "zoom": 8,
                "color": "#e1e3e5"
            },
            {
                "zoom": 9,
                "color": "#e1e3e5"
            },
            {
                "zoom": 10,
                "color": "#e1e3e5"
            },
            {
                "zoom": 11,
                "color": "#e1e3e5"
            },
            {
                "zoom": 12,
                "color": "#e1e3e5"
            },
            {
                "zoom": 13,
                "color": "#e1e3e5"
            },
            {
                "zoom": 14,
                "color": "#e6e8e9"
            },
            {
                "zoom": 15,
                "color": "#ecedee"
            },
            {
                "zoom": 16,
                "color": "#edeeef"
            },
            {
                "zoom": 17,
                "color": "#eeeff0"
            },
            {
                "zoom": 18,
                "color": "#eeeff0"
            },
            {
                "zoom": 19,
                "color": "#eff0f1"
            },
            {
                "zoom": 20,
                "color": "#f0f1f2"
            },
            {
                "zoom": 21,
                "color": "#f1f2f3"
            }
        ]
    },
    {
        "tags": {
            "any": "structure",
            "none": [
                "building",
                "fence"
            ]
        },
        "elements": "geometry",
        "stylers": [
            {
                "opacity": 0.9
            },
            {
                "zoom": 0,
                "color": "#e1e3e5"
            },
            {
                "zoom": 1,
                "color": "#e1e3e5"
            },
            {
                "zoom": 2,
                "color": "#e1e3e5"
            },
            {
                "zoom": 3,
                "color": "#e1e3e5"
            },
            {
                "zoom": 4,
                "color": "#e1e3e5"
            },
            {
                "zoom": 5,
                "color": "#e1e3e5"
            },
            {
                "zoom": 6,
                "color": "#e1e3e5"
            },
            {
                "zoom": 7,
                "color": "#e1e3e5"
            },
            {
                "zoom": 8,
                "color": "#e1e3e5"
            },
            {
                "zoom": 9,
                "color": "#e1e3e5"
            },
            {
                "zoom": 10,
                "color": "#e1e3e5"
            },
            {
                "zoom": 11,
                "color": "#e1e3e5"
            },
            {
                "zoom": 12,
                "color": "#e1e3e5"
            },
            {
                "zoom": 13,
                "color": "#e1e3e5"
            },
            {
                "zoom": 14,
                "color": "#e6e8e9"
            },
            {
                "zoom": 15,
                "color": "#ecedee"
            },
            {
                "zoom": 16,
                "color": "#edeeef"
            },
            {
                "zoom": 17,
                "color": "#eeeff0"
            },
            {
                "zoom": 18,
                "color": "#eeeff0"
            },
            {
                "zoom": 19,
                "color": "#eff0f1"
            },
            {
                "zoom": 20,
                "color": "#f0f1f2"
            },
            {
                "zoom": 21,
                "color": "#f1f2f3"
            }
        ]
    },
    {
        "tags": "building",
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#dee0e3"
            },
            {
                "zoom": 0,
                "opacity": 0.7
            },
            {
                "zoom": 1,
                "opacity": 0.7
            },
            {
                "zoom": 2,
                "opacity": 0.7
            },
            {
                "zoom": 3,
                "opacity": 0.7
            },
            {
                "zoom": 4,
                "opacity": 0.7
            },
            {
                "zoom": 5,
                "opacity": 0.7
            },
            {
                "zoom": 6,
                "opacity": 0.7
            },
            {
                "zoom": 7,
                "opacity": 0.7
            },
            {
                "zoom": 8,
                "opacity": 0.7
            },
            {
                "zoom": 9,
                "opacity": 0.7
            },
            {
                "zoom": 10,
                "opacity": 0.7
            },
            {
                "zoom": 11,
                "opacity": 0.7
            },
            {
                "zoom": 12,
                "opacity": 0.7
            },
            {
                "zoom": 13,
                "opacity": 0.7
            },
            {
                "zoom": 14,
                "opacity": 0.7
            },
            {
                "zoom": 15,
                "opacity": 0.7
            },
            {
                "zoom": 16,
                "opacity": 0.9
            },
            {
                "zoom": 17,
                "opacity": 0.6
            },
            {
                "zoom": 18,
                "opacity": 0.6
            },
            {
                "zoom": 19,
                "opacity": 0.6
            },
            {
                "zoom": 20,
                "opacity": 0.6
            },
            {
                "zoom": 21,
                "opacity": 0.6
            }
        ]
    },
    {
        "tags": "building",
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd1"
            },
            {
                "zoom": 0,
                "opacity": 0.5
            },
            {
                "zoom": 1,
                "opacity": 0.5
            },
            {
                "zoom": 2,
                "opacity": 0.5
            },
            {
                "zoom": 3,
                "opacity": 0.5
            },
            {
                "zoom": 4,
                "opacity": 0.5
            },
            {
                "zoom": 5,
                "opacity": 0.5
            },
            {
                "zoom": 6,
                "opacity": 0.5
            },
            {
                "zoom": 7,
                "opacity": 0.5
            },
            {
                "zoom": 8,
                "opacity": 0.5
            },
            {
                "zoom": 9,
                "opacity": 0.5
            },
            {
                "zoom": 10,
                "opacity": 0.5
            },
            {
                "zoom": 11,
                "opacity": 0.5
            },
            {
                "zoom": 12,
                "opacity": 0.5
            },
            {
                "zoom": 13,
                "opacity": 0.5
            },
            {
                "zoom": 14,
                "opacity": 0.5
            },
            {
                "zoom": 15,
                "opacity": 0.5
            },
            {
                "zoom": 16,
                "opacity": 0.5
            },
            {
                "zoom": 17,
                "opacity": 1
            },
            {
                "zoom": 18,
                "opacity": 1
            },
            {
                "zoom": 19,
                "opacity": 1
            },
            {
                "zoom": 20,
                "opacity": 1
            },
            {
                "zoom": 21,
                "opacity": 1
            }
        ]
    },
    {
        "tags": {
            "any": "urban_area",
            "none": [
                "residential",
                "industrial",
                "cemetery",
                "park",
                "medical",
                "sports_ground",
                "beach",
                "construction_site"
            ]
        },
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 1,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 2,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 3,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 4,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 5,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 6,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 7,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 8,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 9,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 10,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 11,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 12,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 13,
                "color": "#d6d9dc",
                "opacity": 1
            },
            {
                "zoom": 14,
                "color": "#dddfe2",
                "opacity": 1
            },
            {
                "zoom": 15,
                "color": "#e4e6e8",
                "opacity": 1
            },
            {
                "zoom": 16,
                "color": "#ebeced",
                "opacity": 0.67
            },
            {
                "zoom": 17,
                "color": "#f2f3f3",
                "opacity": 0.33
            },
            {
                "zoom": 18,
                "color": "#f2f3f3",
                "opacity": 0
            },
            {
                "zoom": 19,
                "color": "#f2f3f3",
                "opacity": 0
            },
            {
                "zoom": 20,
                "color": "#f2f3f3",
                "opacity": 0
            },
            {
                "zoom": 21,
                "color": "#f2f3f3",
                "opacity": 0
            }
        ]
    },
    {
        "tags": "poi",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            },
            {
                "tertiary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "poi",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#778088"
            }
        ]
    },
    {
        "tags": "poi",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "outdoor",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            },
            {
                "tertiary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "outdoor",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#778088"
            }
        ]
    },
    {
        "tags": "outdoor",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "park",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            },
            {
                "tertiary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "park",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#778088"
            }
        ]
    },
    {
        "tags": "park",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "cemetery",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            },
            {
                "tertiary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "cemetery",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#778088"
            }
        ]
    },
    {
        "tags": "cemetery",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "beach",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            },
            {
                "tertiary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "beach",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#778088"
            }
        ]
    },
    {
        "tags": "beach",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "medical",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            },
            {
                "tertiary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "medical",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#778088"
            }
        ]
    },
    {
        "tags": "medical",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "shopping",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            },
            {
                "tertiary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "shopping",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#778088"
            }
        ]
    },
    {
        "tags": "shopping",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "commercial_services",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            },
            {
                "tertiary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "commercial_services",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#778088"
            }
        ]
    },
    {
        "tags": "commercial_services",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "food_and_drink",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            },
            {
                "tertiary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "food_and_drink",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#778088"
            }
        ]
    },
    {
        "tags": "food_and_drink",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "road",
        "elements": "label.icon",
        "types": "point",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            },
            {
                "tertiary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "road",
        "elements": "label.text.fill",
        "types": "point",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "tags": "entrance",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "locality",
        "elements": "label.icon",
        "stylers": [
            {
                "color": "#9da6af"
            },
            {
                "secondary-color": "#ffffff"
            }
        ]
    },
    {
        "tags": "country",
        "elements": "label.text.fill",
        "stylers": [
            {
                "opacity": 0.8
            },
            {
                "color": "#8f969e"
            }
        ]
    },
    {
        "tags": "country",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "region",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#8f969e"
            },
            {
                "opacity": 0.8
            }
        ]
    },
    {
        "tags": "region",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "district",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#8f969e"
            },
            {
                "opacity": 0.8
            }
        ]
    },
    {
        "tags": "district",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": {
            "any": "admin",
            "none": [
                "country",
                "region",
                "locality",
                "district",
                "address"
            ]
        },
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#8f969e"
            }
        ]
    },
    {
        "tags": {
            "any": "admin",
            "none": [
                "country",
                "region",
                "locality",
                "district",
                "address"
            ]
        },
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "locality",
        "elements": "label.text.fill",
        "stylers": [
            {
                "zoom": 0,
                "color": "#778088"
            },
            {
                "zoom": 1,
                "color": "#778088"
            },
            {
                "zoom": 2,
                "color": "#778088"
            },
            {
                "zoom": 3,
                "color": "#778088"
            },
            {
                "zoom": 4,
                "color": "#778088"
            },
            {
                "zoom": 5,
                "color": "#757e86"
            },
            {
                "zoom": 6,
                "color": "#737c83"
            },
            {
                "zoom": 7,
                "color": "#717a81"
            },
            {
                "zoom": 8,
                "color": "#6f777f"
            },
            {
                "zoom": 9,
                "color": "#6d757c"
            },
            {
                "zoom": 10,
                "color": "#6b737a"
            },
            {
                "zoom": 11,
                "color": "#6b737a"
            },
            {
                "zoom": 12,
                "color": "#6b737a"
            },
            {
                "zoom": 13,
                "color": "#6b737a"
            },
            {
                "zoom": 14,
                "color": "#6b737a"
            },
            {
                "zoom": 15,
                "color": "#6b737a"
            },
            {
                "zoom": 16,
                "color": "#6b737a"
            },
            {
                "zoom": 17,
                "color": "#6b737a"
            },
            {
                "zoom": 18,
                "color": "#6b737a"
            },
            {
                "zoom": 19,
                "color": "#6b737a"
            },
            {
                "zoom": 20,
                "color": "#6b737a"
            },
            {
                "zoom": 21,
                "color": "#6b737a"
            }
        ]
    },
    {
        "tags": "locality",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "road",
        "elements": "label.text.fill",
        "types": "polyline",
        "stylers": [
            {
                "color": "#778088"
            }
        ]
    },
    {
        "tags": "road",
        "elements": "label.text.outline",
        "types": "polyline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "road",
        "elements": "geometry.fill.pattern",
        "types": "polyline",
        "stylers": [
            {
                "scale": 1
            },
            {
                "color": "#adb3b8"
            }
        ]
    },
    {
        "tags": "road",
        "elements": "label.text.fill",
        "types": "point",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "tags": "structure",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#5f666d"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "structure",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "entrance",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#5f666d"
            },
            {
                "opacity": 1
            }
        ]
    },
    {
        "tags": "entrance",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "address",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#5f666d"
            },
            {
                "zoom": 0,
                "opacity": 0.9
            },
            {
                "zoom": 1,
                "opacity": 0.9
            },
            {
                "zoom": 2,
                "opacity": 0.9
            },
            {
                "zoom": 3,
                "opacity": 0.9
            },
            {
                "zoom": 4,
                "opacity": 0.9
            },
            {
                "zoom": 5,
                "opacity": 0.9
            },
            {
                "zoom": 6,
                "opacity": 0.9
            },
            {
                "zoom": 7,
                "opacity": 0.9
            },
            {
                "zoom": 8,
                "opacity": 0.9
            },
            {
                "zoom": 9,
                "opacity": 0.9
            },
            {
                "zoom": 10,
                "opacity": 0.9
            },
            {
                "zoom": 11,
                "opacity": 0.9
            },
            {
                "zoom": 12,
                "opacity": 0.9
            },
            {
                "zoom": 13,
                "opacity": 0.9
            },
            {
                "zoom": 14,
                "opacity": 0.9
            },
            {
                "zoom": 15,
                "opacity": 0.9
            },
            {
                "zoom": 16,
                "opacity": 0.9
            },
            {
                "zoom": 17,
                "opacity": 1
            },
            {
                "zoom": 18,
                "opacity": 1
            },
            {
                "zoom": 19,
                "opacity": 1
            },
            {
                "zoom": 20,
                "opacity": 1
            },
            {
                "zoom": 21,
                "opacity": 1
            }
        ]
    },
    {
        "tags": "address",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "landscape",
        "elements": "label.text.fill",
        "stylers": [
            {
                "zoom": 0,
                "color": "#8f969e",
                "opacity": 1
            },
            {
                "zoom": 1,
                "color": "#8f969e",
                "opacity": 1
            },
            {
                "zoom": 2,
                "color": "#8f969e",
                "opacity": 1
            },
            {
                "zoom": 3,
                "color": "#8f969e",
                "opacity": 1
            },
            {
                "zoom": 4,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 5,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 6,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 7,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 8,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 9,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 10,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 11,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 12,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 13,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 14,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 15,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 16,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 17,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 18,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 19,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 20,
                "color": "#5f666d",
                "opacity": 0.5
            },
            {
                "zoom": 21,
                "color": "#5f666d",
                "opacity": 0.5
            }
        ]
    },
    {
        "tags": "landscape",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "zoom": 0,
                "opacity": 0.5
            },
            {
                "zoom": 1,
                "opacity": 0.5
            },
            {
                "zoom": 2,
                "opacity": 0.5
            },
            {
                "zoom": 3,
                "opacity": 0.5
            },
            {
                "zoom": 4,
                "opacity": 0
            },
            {
                "zoom": 5,
                "opacity": 0
            },
            {
                "zoom": 6,
                "opacity": 0
            },
            {
                "zoom": 7,
                "opacity": 0
            },
            {
                "zoom": 8,
                "opacity": 0
            },
            {
                "zoom": 9,
                "opacity": 0
            },
            {
                "zoom": 10,
                "opacity": 0
            },
            {
                "zoom": 11,
                "opacity": 0
            },
            {
                "zoom": 12,
                "opacity": 0
            },
            {
                "zoom": 13,
                "opacity": 0
            },
            {
                "zoom": 14,
                "opacity": 0
            },
            {
                "zoom": 15,
                "opacity": 0
            },
            {
                "zoom": 16,
                "opacity": 0
            },
            {
                "zoom": 17,
                "opacity": 0
            },
            {
                "zoom": 18,
                "opacity": 0
            },
            {
                "zoom": 19,
                "opacity": 0
            },
            {
                "zoom": 20,
                "opacity": 0
            },
            {
                "zoom": 21,
                "opacity": 0
            }
        ]
    },
    {
        "tags": "water",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#5e6871"
            },
            {
                "opacity": 0.8
            }
        ]
    },
    {
        "tags": "water",
        "elements": "label.text.outline",
        "types": "polyline",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "opacity": 0.2
            }
        ]
    },
    {
        "tags": {
            "any": "road_1",
            "none": "is_tunnel"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "zoom": 0,
                "scale": 0
            },
            {
                "zoom": 1,
                "scale": 0
            },
            {
                "zoom": 2,
                "scale": 0
            },
            {
                "zoom": 3,
                "scale": 0
            },
            {
                "zoom": 4,
                "scale": 0
            },
            {
                "zoom": 5,
                "scale": 0
            },
            {
                "zoom": 6,
                "scale": 3.3
            },
            {
                "zoom": 7,
                "scale": 3.55
            },
            {
                "zoom": 8,
                "scale": 3.92
            },
            {
                "zoom": 9,
                "scale": 4.44
            },
            {
                "zoom": 10,
                "scale": 4.01
            },
            {
                "zoom": 11,
                "scale": 3.39
            },
            {
                "zoom": 12,
                "scale": 2.94
            },
            {
                "zoom": 13,
                "scale": 2.53
            },
            {
                "zoom": 14,
                "scale": 2.26
            },
            {
                "zoom": 15,
                "scale": 2.11
            },
            {
                "zoom": 16,
                "scale": 2.07
            },
            {
                "zoom": 17,
                "scale": 1.64
            },
            {
                "zoom": 18,
                "scale": 1.35
            },
            {
                "zoom": 19,
                "scale": 1.16
            },
            {
                "zoom": 20,
                "scale": 1.05
            },
            {
                "zoom": 21,
                "scale": 1
            }
        ]
    },
    {
        "tags": {
            "any": "road_1"
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 1
            },
            {
                "zoom": 1,
                "scale": 1
            },
            {
                "zoom": 2,
                "scale": 1
            },
            {
                "zoom": 3,
                "scale": 1
            },
            {
                "zoom": 4,
                "scale": 1
            },
            {
                "zoom": 5,
                "scale": 1
            },
            {
                "zoom": 6,
                "scale": 2.18
            },
            {
                "zoom": 7,
                "scale": 2.18
            },
            {
                "zoom": 8,
                "scale": 2.25
            },
            {
                "zoom": 9,
                "scale": 2.4
            },
            {
                "zoom": 10,
                "scale": 2.4
            },
            {
                "zoom": 11,
                "scale": 2.26
            },
            {
                "zoom": 12,
                "scale": 2.15
            },
            {
                "zoom": 13,
                "scale": 2
            },
            {
                "zoom": 14,
                "scale": 1.9
            },
            {
                "zoom": 15,
                "scale": 1.86
            },
            {
                "zoom": 16,
                "scale": 1.88
            },
            {
                "zoom": 17,
                "scale": 1.53
            },
            {
                "zoom": 18,
                "scale": 1.28
            },
            {
                "zoom": 19,
                "scale": 1.11
            },
            {
                "zoom": 20,
                "scale": 1.01
            },
            {
                "zoom": 21,
                "scale": 0.96
            }
        ]
    },
    {
        "tags": {
            "any": "road_2",
            "none": "is_tunnel"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "zoom": 0,
                "scale": 0
            },
            {
                "zoom": 1,
                "scale": 0
            },
            {
                "zoom": 2,
                "scale": 0
            },
            {
                "zoom": 3,
                "scale": 0
            },
            {
                "zoom": 4,
                "scale": 0
            },
            {
                "zoom": 5,
                "scale": 0
            },
            {
                "zoom": 6,
                "scale": 3.3
            },
            {
                "zoom": 7,
                "scale": 3.55
            },
            {
                "zoom": 8,
                "scale": 3.92
            },
            {
                "zoom": 9,
                "scale": 4.44
            },
            {
                "zoom": 10,
                "scale": 4.01
            },
            {
                "zoom": 11,
                "scale": 3.39
            },
            {
                "zoom": 12,
                "scale": 2.94
            },
            {
                "zoom": 13,
                "scale": 2.53
            },
            {
                "zoom": 14,
                "scale": 2.26
            },
            {
                "zoom": 15,
                "scale": 2.11
            },
            {
                "zoom": 16,
                "scale": 2.07
            },
            {
                "zoom": 17,
                "scale": 1.64
            },
            {
                "zoom": 18,
                "scale": 1.35
            },
            {
                "zoom": 19,
                "scale": 1.16
            },
            {
                "zoom": 20,
                "scale": 1.05
            },
            {
                "zoom": 21,
                "scale": 1
            }
        ]
    },
    {
        "tags": {
            "any": "road_2"
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 1
            },
            {
                "zoom": 1,
                "scale": 1
            },
            {
                "zoom": 2,
                "scale": 1
            },
            {
                "zoom": 3,
                "scale": 1
            },
            {
                "zoom": 4,
                "scale": 1
            },
            {
                "zoom": 5,
                "scale": 1
            },
            {
                "zoom": 6,
                "scale": 2.18
            },
            {
                "zoom": 7,
                "scale": 2.18
            },
            {
                "zoom": 8,
                "scale": 2.25
            },
            {
                "zoom": 9,
                "scale": 2.4
            },
            {
                "zoom": 10,
                "scale": 2.4
            },
            {
                "zoom": 11,
                "scale": 2.26
            },
            {
                "zoom": 12,
                "scale": 2.15
            },
            {
                "zoom": 13,
                "scale": 2
            },
            {
                "zoom": 14,
                "scale": 1.9
            },
            {
                "zoom": 15,
                "scale": 1.86
            },
            {
                "zoom": 16,
                "scale": 1.88
            },
            {
                "zoom": 17,
                "scale": 1.53
            },
            {
                "zoom": 18,
                "scale": 1.28
            },
            {
                "zoom": 19,
                "scale": 1.11
            },
            {
                "zoom": 20,
                "scale": 1.01
            },
            {
                "zoom": 21,
                "scale": 0.96
            }
        ]
    },
    {
        "tags": {
            "any": "road_3",
            "none": "is_tunnel"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "zoom": 0,
                "scale": 0
            },
            {
                "zoom": 1,
                "scale": 0
            },
            {
                "zoom": 2,
                "scale": 0
            },
            {
                "zoom": 3,
                "scale": 0
            },
            {
                "zoom": 4,
                "scale": 0
            },
            {
                "zoom": 5,
                "scale": 0
            },
            {
                "zoom": 6,
                "scale": 0
            },
            {
                "zoom": 7,
                "scale": 0
            },
            {
                "zoom": 8,
                "scale": 0
            },
            {
                "zoom": 9,
                "scale": 2.79
            },
            {
                "zoom": 10,
                "scale": 2.91
            },
            {
                "zoom": 11,
                "scale": 1.86
            },
            {
                "zoom": 12,
                "scale": 1.86
            },
            {
                "zoom": 13,
                "scale": 1.54
            },
            {
                "zoom": 14,
                "scale": 1.32
            },
            {
                "zoom": 15,
                "scale": 1.2
            },
            {
                "zoom": 16,
                "scale": 1.15
            },
            {
                "zoom": 17,
                "scale": 1.01
            },
            {
                "zoom": 18,
                "scale": 0.93
            },
            {
                "zoom": 19,
                "scale": 0.91
            },
            {
                "zoom": 20,
                "scale": 0.93
            },
            {
                "zoom": 21,
                "scale": 1
            }
        ]
    },
    {
        "tags": {
            "any": "road_3"
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 1.14
            },
            {
                "zoom": 1,
                "scale": 1.14
            },
            {
                "zoom": 2,
                "scale": 1.14
            },
            {
                "zoom": 3,
                "scale": 1.14
            },
            {
                "zoom": 4,
                "scale": 1.14
            },
            {
                "zoom": 5,
                "scale": 1.14
            },
            {
                "zoom": 6,
                "scale": 1.14
            },
            {
                "zoom": 7,
                "scale": 1.14
            },
            {
                "zoom": 8,
                "scale": 0.92
            },
            {
                "zoom": 9,
                "scale": 3.01
            },
            {
                "zoom": 10,
                "scale": 1.95
            },
            {
                "zoom": 11,
                "scale": 1.46
            },
            {
                "zoom": 12,
                "scale": 1.52
            },
            {
                "zoom": 13,
                "scale": 1.35
            },
            {
                "zoom": 14,
                "scale": 1.22
            },
            {
                "zoom": 15,
                "scale": 1.14
            },
            {
                "zoom": 16,
                "scale": 1.11
            },
            {
                "zoom": 17,
                "scale": 0.98
            },
            {
                "zoom": 18,
                "scale": 0.9
            },
            {
                "zoom": 19,
                "scale": 0.88
            },
            {
                "zoom": 20,
                "scale": 0.9
            },
            {
                "zoom": 21,
                "scale": 0.96
            }
        ]
    },
    {
        "tags": {
            "any": "road_4",
            "none": "is_tunnel"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "zoom": 0,
                "scale": 0
            },
            {
                "zoom": 1,
                "scale": 0
            },
            {
                "zoom": 2,
                "scale": 0
            },
            {
                "zoom": 3,
                "scale": 0
            },
            {
                "zoom": 4,
                "scale": 0
            },
            {
                "zoom": 5,
                "scale": 0
            },
            {
                "zoom": 6,
                "scale": 0
            },
            {
                "zoom": 7,
                "scale": 0
            },
            {
                "zoom": 8,
                "scale": 0
            },
            {
                "zoom": 9,
                "scale": 0
            },
            {
                "zoom": 10,
                "scale": 1.88
            },
            {
                "zoom": 11,
                "scale": 1.4
            },
            {
                "zoom": 12,
                "scale": 1.57
            },
            {
                "zoom": 13,
                "scale": 1.32
            },
            {
                "zoom": 14,
                "scale": 1.16
            },
            {
                "zoom": 15,
                "scale": 1.07
            },
            {
                "zoom": 16,
                "scale": 1.28
            },
            {
                "zoom": 17,
                "scale": 1.1
            },
            {
                "zoom": 18,
                "scale": 0.99
            },
            {
                "zoom": 19,
                "scale": 0.94
            },
            {
                "zoom": 20,
                "scale": 0.95
            },
            {
                "zoom": 21,
                "scale": 1
            }
        ]
    },
    {
        "tags": {
            "any": "road_4"
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 1
            },
            {
                "zoom": 1,
                "scale": 1
            },
            {
                "zoom": 2,
                "scale": 1
            },
            {
                "zoom": 3,
                "scale": 1
            },
            {
                "zoom": 4,
                "scale": 1
            },
            {
                "zoom": 5,
                "scale": 1
            },
            {
                "zoom": 6,
                "scale": 1
            },
            {
                "zoom": 7,
                "scale": 1
            },
            {
                "zoom": 8,
                "scale": 1
            },
            {
                "zoom": 9,
                "scale": 0.8
            },
            {
                "zoom": 10,
                "scale": 1.36
            },
            {
                "zoom": 11,
                "scale": 1.15
            },
            {
                "zoom": 12,
                "scale": 1.3
            },
            {
                "zoom": 13,
                "scale": 1.17
            },
            {
                "zoom": 14,
                "scale": 1.08
            },
            {
                "zoom": 15,
                "scale": 1.03
            },
            {
                "zoom": 16,
                "scale": 1.21
            },
            {
                "zoom": 17,
                "scale": 1.05
            },
            {
                "zoom": 18,
                "scale": 0.96
            },
            {
                "zoom": 19,
                "scale": 0.91
            },
            {
                "zoom": 20,
                "scale": 0.91
            },
            {
                "zoom": 21,
                "scale": 0.96
            }
        ]
    },
    {
        "tags": {
            "any": "road_5",
            "none": "is_tunnel"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "zoom": 0,
                "scale": 0
            },
            {
                "zoom": 1,
                "scale": 0
            },
            {
                "zoom": 2,
                "scale": 0
            },
            {
                "zoom": 3,
                "scale": 0
            },
            {
                "zoom": 4,
                "scale": 0
            },
            {
                "zoom": 5,
                "scale": 0
            },
            {
                "zoom": 6,
                "scale": 0
            },
            {
                "zoom": 7,
                "scale": 0
            },
            {
                "zoom": 8,
                "scale": 0
            },
            {
                "zoom": 9,
                "scale": 0
            },
            {
                "zoom": 10,
                "scale": 0
            },
            {
                "zoom": 11,
                "scale": 0
            },
            {
                "zoom": 12,
                "scale": 1.39
            },
            {
                "zoom": 13,
                "scale": 1.05
            },
            {
                "zoom": 14,
                "scale": 0.9
            },
            {
                "zoom": 15,
                "scale": 1.05
            },
            {
                "zoom": 16,
                "scale": 1.22
            },
            {
                "zoom": 17,
                "scale": 1.04
            },
            {
                "zoom": 18,
                "scale": 0.94
            },
            {
                "zoom": 19,
                "scale": 0.91
            },
            {
                "zoom": 20,
                "scale": 0.93
            },
            {
                "zoom": 21,
                "scale": 1
            }
        ]
    },
    {
        "tags": {
            "any": "road_5"
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 1
            },
            {
                "zoom": 1,
                "scale": 1
            },
            {
                "zoom": 2,
                "scale": 1
            },
            {
                "zoom": 3,
                "scale": 1
            },
            {
                "zoom": 4,
                "scale": 1
            },
            {
                "zoom": 5,
                "scale": 1
            },
            {
                "zoom": 6,
                "scale": 1
            },
            {
                "zoom": 7,
                "scale": 1
            },
            {
                "zoom": 8,
                "scale": 1
            },
            {
                "zoom": 9,
                "scale": 1
            },
            {
                "zoom": 10,
                "scale": 1
            },
            {
                "zoom": 11,
                "scale": 0.44
            },
            {
                "zoom": 12,
                "scale": 1.15
            },
            {
                "zoom": 13,
                "scale": 0.97
            },
            {
                "zoom": 14,
                "scale": 0.87
            },
            {
                "zoom": 15,
                "scale": 1.01
            },
            {
                "zoom": 16,
                "scale": 1.16
            },
            {
                "zoom": 17,
                "scale": 1
            },
            {
                "zoom": 18,
                "scale": 0.91
            },
            {
                "zoom": 19,
                "scale": 0.88
            },
            {
                "zoom": 20,
                "scale": 0.89
            },
            {
                "zoom": 21,
                "scale": 0.96
            }
        ]
    },
    {
        "tags": {
            "any": "road_6",
            "none": "is_tunnel"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "zoom": 0,
                "scale": 0
            },
            {
                "zoom": 1,
                "scale": 0
            },
            {
                "zoom": 2,
                "scale": 0
            },
            {
                "zoom": 3,
                "scale": 0
            },
            {
                "zoom": 4,
                "scale": 0
            },
            {
                "zoom": 5,
                "scale": 0
            },
            {
                "zoom": 6,
                "scale": 0
            },
            {
                "zoom": 7,
                "scale": 0
            },
            {
                "zoom": 8,
                "scale": 0
            },
            {
                "zoom": 9,
                "scale": 0
            },
            {
                "zoom": 10,
                "scale": 0
            },
            {
                "zoom": 11,
                "scale": 0
            },
            {
                "zoom": 12,
                "scale": 0
            },
            {
                "zoom": 13,
                "scale": 2.5
            },
            {
                "zoom": 14,
                "scale": 1.41
            },
            {
                "zoom": 15,
                "scale": 1.39
            },
            {
                "zoom": 16,
                "scale": 1.45
            },
            {
                "zoom": 17,
                "scale": 1.16
            },
            {
                "zoom": 18,
                "scale": 1
            },
            {
                "zoom": 19,
                "scale": 0.94
            },
            {
                "zoom": 20,
                "scale": 0.94
            },
            {
                "zoom": 21,
                "scale": 1
            }
        ]
    },
    {
        "tags": {
            "any": "road_6"
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 1
            },
            {
                "zoom": 1,
                "scale": 1
            },
            {
                "zoom": 2,
                "scale": 1
            },
            {
                "zoom": 3,
                "scale": 1
            },
            {
                "zoom": 4,
                "scale": 1
            },
            {
                "zoom": 5,
                "scale": 1
            },
            {
                "zoom": 6,
                "scale": 1
            },
            {
                "zoom": 7,
                "scale": 1
            },
            {
                "zoom": 8,
                "scale": 1
            },
            {
                "zoom": 9,
                "scale": 1
            },
            {
                "zoom": 10,
                "scale": 1
            },
            {
                "zoom": 11,
                "scale": 1
            },
            {
                "zoom": 12,
                "scale": 1
            },
            {
                "zoom": 13,
                "scale": 1.65
            },
            {
                "zoom": 14,
                "scale": 1.21
            },
            {
                "zoom": 15,
                "scale": 1.26
            },
            {
                "zoom": 16,
                "scale": 1.35
            },
            {
                "zoom": 17,
                "scale": 1.1
            },
            {
                "zoom": 18,
                "scale": 0.97
            },
            {
                "zoom": 19,
                "scale": 0.91
            },
            {
                "zoom": 20,
                "scale": 0.91
            },
            {
                "zoom": 21,
                "scale": 0.96
            }
        ]
    },
    {
        "tags": {
            "any": "road_7",
            "none": "is_tunnel"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "zoom": 0,
                "scale": 0
            },
            {
                "zoom": 1,
                "scale": 0
            },
            {
                "zoom": 2,
                "scale": 0
            },
            {
                "zoom": 3,
                "scale": 0
            },
            {
                "zoom": 4,
                "scale": 0
            },
            {
                "zoom": 5,
                "scale": 0
            },
            {
                "zoom": 6,
                "scale": 0
            },
            {
                "zoom": 7,
                "scale": 0
            },
            {
                "zoom": 8,
                "scale": 0
            },
            {
                "zoom": 9,
                "scale": 0
            },
            {
                "zoom": 10,
                "scale": 0
            },
            {
                "zoom": 11,
                "scale": 0
            },
            {
                "zoom": 12,
                "scale": 0
            },
            {
                "zoom": 13,
                "scale": 0
            },
            {
                "zoom": 14,
                "scale": 1
            },
            {
                "zoom": 15,
                "scale": 0.87
            },
            {
                "zoom": 16,
                "scale": 0.97
            },
            {
                "zoom": 17,
                "scale": 0.89
            },
            {
                "zoom": 18,
                "scale": 0.86
            },
            {
                "zoom": 19,
                "scale": 0.88
            },
            {
                "zoom": 20,
                "scale": 0.92
            },
            {
                "zoom": 21,
                "scale": 1
            }
        ]
    },
    {
        "tags": {
            "any": "road_7"
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 1
            },
            {
                "zoom": 1,
                "scale": 1
            },
            {
                "zoom": 2,
                "scale": 1
            },
            {
                "zoom": 3,
                "scale": 1
            },
            {
                "zoom": 4,
                "scale": 1
            },
            {
                "zoom": 5,
                "scale": 1
            },
            {
                "zoom": 6,
                "scale": 1
            },
            {
                "zoom": 7,
                "scale": 1
            },
            {
                "zoom": 8,
                "scale": 1
            },
            {
                "zoom": 9,
                "scale": 1
            },
            {
                "zoom": 10,
                "scale": 1
            },
            {
                "zoom": 11,
                "scale": 1
            },
            {
                "zoom": 12,
                "scale": 1
            },
            {
                "zoom": 13,
                "scale": 1
            },
            {
                "zoom": 14,
                "scale": 0.93
            },
            {
                "zoom": 15,
                "scale": 0.85
            },
            {
                "zoom": 16,
                "scale": 0.94
            },
            {
                "zoom": 17,
                "scale": 0.86
            },
            {
                "zoom": 18,
                "scale": 0.83
            },
            {
                "zoom": 19,
                "scale": 0.84
            },
            {
                "zoom": 20,
                "scale": 0.88
            },
            {
                "zoom": 21,
                "scale": 0.95
            }
        ]
    },
    {
        "tags": {
            "any": "road_minor",
            "none": "is_tunnel"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "zoom": 0,
                "scale": 0
            },
            {
                "zoom": 1,
                "scale": 0
            },
            {
                "zoom": 2,
                "scale": 0
            },
            {
                "zoom": 3,
                "scale": 0
            },
            {
                "zoom": 4,
                "scale": 0
            },
            {
                "zoom": 5,
                "scale": 0
            },
            {
                "zoom": 6,
                "scale": 0
            },
            {
                "zoom": 7,
                "scale": 0
            },
            {
                "zoom": 8,
                "scale": 0
            },
            {
                "zoom": 9,
                "scale": 0
            },
            {
                "zoom": 10,
                "scale": 0
            },
            {
                "zoom": 11,
                "scale": 0
            },
            {
                "zoom": 12,
                "scale": 0
            },
            {
                "zoom": 13,
                "scale": 0
            },
            {
                "zoom": 14,
                "scale": 0
            },
            {
                "zoom": 15,
                "scale": 0
            },
            {
                "zoom": 16,
                "scale": 1
            },
            {
                "zoom": 17,
                "scale": 1
            },
            {
                "zoom": 18,
                "scale": 1
            },
            {
                "zoom": 19,
                "scale": 1
            },
            {
                "zoom": 20,
                "scale": 1
            },
            {
                "zoom": 21,
                "scale": 1
            }
        ]
    },
    {
        "tags": {
            "any": "road_minor"
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 0.29
            },
            {
                "zoom": 1,
                "scale": 0.29
            },
            {
                "zoom": 2,
                "scale": 0.29
            },
            {
                "zoom": 3,
                "scale": 0.29
            },
            {
                "zoom": 4,
                "scale": 0.29
            },
            {
                "zoom": 5,
                "scale": 0.29
            },
            {
                "zoom": 6,
                "scale": 0.29
            },
            {
                "zoom": 7,
                "scale": 0.29
            },
            {
                "zoom": 8,
                "scale": 0.29
            },
            {
                "zoom": 9,
                "scale": 0.29
            },
            {
                "zoom": 10,
                "scale": 0.29
            },
            {
                "zoom": 11,
                "scale": 0.29
            },
            {
                "zoom": 12,
                "scale": 0.29
            },
            {
                "zoom": 13,
                "scale": 0.29
            },
            {
                "zoom": 14,
                "scale": 0.29
            },
            {
                "zoom": 15,
                "scale": 0.29
            },
            {
                "zoom": 16,
                "scale": 1
            },
            {
                "zoom": 17,
                "scale": 0.9
            },
            {
                "zoom": 18,
                "scale": 0.91
            },
            {
                "zoom": 19,
                "scale": 0.92
            },
            {
                "zoom": 20,
                "scale": 0.93
            },
            {
                "zoom": 21,
                "scale": 0.95
            }
        ]
    },
    {
        "tags": {
            "any": "road_unclassified",
            "none": "is_tunnel"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "zoom": 0,
                "scale": 0
            },
            {
                "zoom": 1,
                "scale": 0
            },
            {
                "zoom": 2,
                "scale": 0
            },
            {
                "zoom": 3,
                "scale": 0
            },
            {
                "zoom": 4,
                "scale": 0
            },
            {
                "zoom": 5,
                "scale": 0
            },
            {
                "zoom": 6,
                "scale": 0
            },
            {
                "zoom": 7,
                "scale": 0
            },
            {
                "zoom": 8,
                "scale": 0
            },
            {
                "zoom": 9,
                "scale": 0
            },
            {
                "zoom": 10,
                "scale": 0
            },
            {
                "zoom": 11,
                "scale": 0
            },
            {
                "zoom": 12,
                "scale": 0
            },
            {
                "zoom": 13,
                "scale": 0
            },
            {
                "zoom": 14,
                "scale": 0
            },
            {
                "zoom": 15,
                "scale": 0
            },
            {
                "zoom": 16,
                "scale": 1
            },
            {
                "zoom": 17,
                "scale": 1
            },
            {
                "zoom": 18,
                "scale": 1
            },
            {
                "zoom": 19,
                "scale": 1
            },
            {
                "zoom": 20,
                "scale": 1
            },
            {
                "zoom": 21,
                "scale": 1
            }
        ]
    },
    {
        "tags": {
            "any": "road_unclassified"
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 0.29
            },
            {
                "zoom": 1,
                "scale": 0.29
            },
            {
                "zoom": 2,
                "scale": 0.29
            },
            {
                "zoom": 3,
                "scale": 0.29
            },
            {
                "zoom": 4,
                "scale": 0.29
            },
            {
                "zoom": 5,
                "scale": 0.29
            },
            {
                "zoom": 6,
                "scale": 0.29
            },
            {
                "zoom": 7,
                "scale": 0.29
            },
            {
                "zoom": 8,
                "scale": 0.29
            },
            {
                "zoom": 9,
                "scale": 0.29
            },
            {
                "zoom": 10,
                "scale": 0.29
            },
            {
                "zoom": 11,
                "scale": 0.29
            },
            {
                "zoom": 12,
                "scale": 0.29
            },
            {
                "zoom": 13,
                "scale": 0.29
            },
            {
                "zoom": 14,
                "scale": 0.29
            },
            {
                "zoom": 15,
                "scale": 0.29
            },
            {
                "zoom": 16,
                "scale": 1
            },
            {
                "zoom": 17,
                "scale": 0.9
            },
            {
                "zoom": 18,
                "scale": 0.91
            },
            {
                "zoom": 19,
                "scale": 0.92
            },
            {
                "zoom": 20,
                "scale": 0.93
            },
            {
                "zoom": 21,
                "scale": 0.95
            }
        ]
    },
    {
        "tags": {
            "all": "is_tunnel",
            "none": "path"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "zoom": 0,
                "color": "#dcdee0"
            },
            {
                "zoom": 1,
                "color": "#dcdee0"
            },
            {
                "zoom": 2,
                "color": "#dcdee0"
            },
            {
                "zoom": 3,
                "color": "#dcdee0"
            },
            {
                "zoom": 4,
                "color": "#dcdee0"
            },
            {
                "zoom": 5,
                "color": "#dcdee0"
            },
            {
                "zoom": 6,
                "color": "#dcdee0"
            },
            {
                "zoom": 7,
                "color": "#dcdee0"
            },
            {
                "zoom": 8,
                "color": "#dcdee0"
            },
            {
                "zoom": 9,
                "color": "#dcdee0"
            },
            {
                "zoom": 10,
                "color": "#dcdee0"
            },
            {
                "zoom": 11,
                "color": "#dcdee0"
            },
            {
                "zoom": 12,
                "color": "#dcdee0"
            },
            {
                "zoom": 13,
                "color": "#dcdee0"
            },
            {
                "zoom": 14,
                "color": "#e1e3e5"
            },
            {
                "zoom": 15,
                "color": "#e6e8ea"
            },
            {
                "zoom": 16,
                "color": "#e7e9eb"
            },
            {
                "zoom": 17,
                "color": "#e8eaeb"
            },
            {
                "zoom": 18,
                "color": "#e9eaec"
            },
            {
                "zoom": 19,
                "color": "#eaebed"
            },
            {
                "zoom": 20,
                "color": "#ebeced"
            },
            {
                "zoom": 21,
                "color": "#ecedee"
            }
        ]
    },
    {
        "tags": {
            "all": "path",
            "none": "is_tunnel"
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#c8ccd0"
            }
        ]
    },
    {
        "tags": {
            "all": "path",
            "none": "is_tunnel"
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "opacity": 0.7
            },
            {
                "zoom": 0,
                "color": "#e1e3e5"
            },
            {
                "zoom": 1,
                "color": "#e1e3e5"
            },
            {
                "zoom": 2,
                "color": "#e1e3e5"
            },
            {
                "zoom": 3,
                "color": "#e1e3e5"
            },
            {
                "zoom": 4,
                "color": "#e1e3e5"
            },
            {
                "zoom": 5,
                "color": "#e1e3e5"
            },
            {
                "zoom": 6,
                "color": "#e1e3e5"
            },
            {
                "zoom": 7,
                "color": "#e1e3e5"
            },
            {
                "zoom": 8,
                "color": "#e1e3e5"
            },
            {
                "zoom": 9,
                "color": "#e1e3e5"
            },
            {
                "zoom": 10,
                "color": "#e1e3e5"
            },
            {
                "zoom": 11,
                "color": "#e1e3e5"
            },
            {
                "zoom": 12,
                "color": "#e1e3e5"
            },
            {
                "zoom": 13,
                "color": "#e1e3e5"
            },
            {
                "zoom": 14,
                "color": "#e6e8e9"
            },
            {
                "zoom": 15,
                "color": "#ecedee"
            },
            {
                "zoom": 16,
                "color": "#edeeef"
            },
            {
                "zoom": 17,
                "color": "#eeeff0"
            },
            {
                "zoom": 18,
                "color": "#eeeff0"
            },
            {
                "zoom": 19,
                "color": "#eff0f1"
            },
            {
                "zoom": 20,
                "color": "#f0f1f2"
            },
            {
                "zoom": 21,
                "color": "#f1f2f3"
            }
        ]
    },
    {
        "tags": "road_construction",
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "tags": "road_construction",
        "elements": "geometry.outline",
        "stylers": [
            {
                "zoom": 0,
                "color": "#e4e6e8"
            },
            {
                "zoom": 1,
                "color": "#e4e6e8"
            },
            {
                "zoom": 2,
                "color": "#e4e6e8"
            },
            {
                "zoom": 3,
                "color": "#e4e6e8"
            },
            {
                "zoom": 4,
                "color": "#e4e6e8"
            },
            {
                "zoom": 5,
                "color": "#e4e6e8"
            },
            {
                "zoom": 6,
                "color": "#e4e6e8"
            },
            {
                "zoom": 7,
                "color": "#e4e6e8"
            },
            {
                "zoom": 8,
                "color": "#e4e6e8"
            },
            {
                "zoom": 9,
                "color": "#e4e6e8"
            },
            {
                "zoom": 10,
                "color": "#e4e6e8"
            },
            {
                "zoom": 11,
                "color": "#e4e6e8"
            },
            {
                "zoom": 12,
                "color": "#e4e6e8"
            },
            {
                "zoom": 13,
                "color": "#e4e6e8"
            },
            {
                "zoom": 14,
                "color": "#c8ccd0"
            },
            {
                "zoom": 15,
                "color": "#e4e6e8"
            },
            {
                "zoom": 16,
                "color": "#e8eaec"
            },
            {
                "zoom": 17,
                "color": "#edeef0"
            },
            {
                "zoom": 18,
                "color": "#f1f2f3"
            },
            {
                "zoom": 19,
                "color": "#f6f7f7"
            },
            {
                "zoom": 20,
                "color": "#fafbfb"
            },
            {
                "zoom": 21,
                "color": "#ffffff"
            }
        ]
    },
    {
        "tags": {
            "any": "ferry"
        },
        "stylers": [
            {
                "color": "#919ba4"
            }
        ]
    },
    {
        "tags": "transit_location",
        "elements": "label.icon",
        "stylers": [
            {
                "saturation": -1
            },
            {
                "zoom": 0,
                "opacity": 0
            },
            {
                "zoom": 1,
                "opacity": 0
            },
            {
                "zoom": 2,
                "opacity": 0
            },
            {
                "zoom": 3,
                "opacity": 0
            },
            {
                "zoom": 4,
                "opacity": 0
            },
            {
                "zoom": 5,
                "opacity": 0
            },
            {
                "zoom": 6,
                "opacity": 0
            },
            {
                "zoom": 7,
                "opacity": 0
            },
            {
                "zoom": 8,
                "opacity": 0
            },
            {
                "zoom": 9,
                "opacity": 0
            },
            {
                "zoom": 10,
                "opacity": 0
            },
            {
                "zoom": 11,
                "opacity": 0
            },
            {
                "zoom": 12,
                "opacity": 0
            },
            {
                "zoom": 13,
                "opacity": 1
            },
            {
                "zoom": 14,
                "opacity": 1
            },
            {
                "zoom": 15,
                "opacity": 1
            },
            {
                "zoom": 16,
                "opacity": 1
            },
            {
                "zoom": 17,
                "opacity": 1
            },
            {
                "zoom": 18,
                "opacity": 1
            },
            {
                "zoom": 19,
                "opacity": 1
            },
            {
                "zoom": 20,
                "opacity": 1
            },
            {
                "zoom": 21,
                "opacity": 1
            }
        ]
    },
    {
        "tags": "transit_location",
        "elements": "label.text",
        "stylers": [
            {
                "zoom": 0,
                "opacity": 0
            },
            {
                "zoom": 1,
                "opacity": 0
            },
            {
                "zoom": 2,
                "opacity": 0
            },
            {
                "zoom": 3,
                "opacity": 0
            },
            {
                "zoom": 4,
                "opacity": 0
            },
            {
                "zoom": 5,
                "opacity": 0
            },
            {
                "zoom": 6,
                "opacity": 0
            },
            {
                "zoom": 7,
                "opacity": 0
            },
            {
                "zoom": 8,
                "opacity": 0
            },
            {
                "zoom": 9,
                "opacity": 0
            },
            {
                "zoom": 10,
                "opacity": 0
            },
            {
                "zoom": 11,
                "opacity": 0
            },
            {
                "zoom": 12,
                "opacity": 0
            },
            {
                "zoom": 13,
                "opacity": 1
            },
            {
                "zoom": 14,
                "opacity": 1
            },
            {
                "zoom": 15,
                "opacity": 1
            },
            {
                "zoom": 16,
                "opacity": 1
            },
            {
                "zoom": 17,
                "opacity": 1
            },
            {
                "zoom": 18,
                "opacity": 1
            },
            {
                "zoom": 19,
                "opacity": 1
            },
            {
                "zoom": 20,
                "opacity": 1
            },
            {
                "zoom": 21,
                "opacity": 1
            }
        ]
    },
    {
        "tags": "transit_location",
        "elements": "label.text.fill",
        "stylers": [
            {
                "color": "#6c8993"
            }
        ]
    },
    {
        "tags": "transit_location",
        "elements": "label.text.outline",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "tags": "transit_schema",
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#6c8993"
            },
            {
                "scale": 0.7
            },
            {
                "zoom": 0,
                "opacity": 0.6
            },
            {
                "zoom": 1,
                "opacity": 0.6
            },
            {
                "zoom": 2,
                "opacity": 0.6
            },
            {
                "zoom": 3,
                "opacity": 0.6
            },
            {
                "zoom": 4,
                "opacity": 0.6
            },
            {
                "zoom": 5,
                "opacity": 0.6
            },
            {
                "zoom": 6,
                "opacity": 0.6
            },
            {
                "zoom": 7,
                "opacity": 0.6
            },
            {
                "zoom": 8,
                "opacity": 0.6
            },
            {
                "zoom": 9,
                "opacity": 0.6
            },
            {
                "zoom": 10,
                "opacity": 0.6
            },
            {
                "zoom": 11,
                "opacity": 0.6
            },
            {
                "zoom": 12,
                "opacity": 0.6
            },
            {
                "zoom": 13,
                "opacity": 0.6
            },
            {
                "zoom": 14,
                "opacity": 0.6
            },
            {
                "zoom": 15,
                "opacity": 0.5
            },
            {
                "zoom": 16,
                "opacity": 0.4
            },
            {
                "zoom": 17,
                "opacity": 0.4
            },
            {
                "zoom": 18,
                "opacity": 0.4
            },
            {
                "zoom": 19,
                "opacity": 0.4
            },
            {
                "zoom": 20,
                "opacity": 0.4
            },
            {
                "zoom": 21,
                "opacity": 0.4
            }
        ]
    },
    {
        "tags": "transit_schema",
        "elements": "geometry.outline",
        "stylers": [
            {
                "opacity": 0
            }
        ]
    },
    {
        "tags": "transit_line",
        "elements": "geometry.fill.pattern",
        "stylers": [
            {
                "color": "#949c9e"
            },
            {
                "zoom": 0,
                "opacity": 0
            },
            {
                "zoom": 1,
                "opacity": 0
            },
            {
                "zoom": 2,
                "opacity": 0
            },
            {
                "zoom": 3,
                "opacity": 0
            },
            {
                "zoom": 4,
                "opacity": 0
            },
            {
                "zoom": 5,
                "opacity": 0
            },
            {
                "zoom": 6,
                "opacity": 0
            },
            {
                "zoom": 7,
                "opacity": 0
            },
            {
                "zoom": 8,
                "opacity": 0
            },
            {
                "zoom": 9,
                "opacity": 0
            },
            {
                "zoom": 10,
                "opacity": 0
            },
            {
                "zoom": 11,
                "opacity": 0
            },
            {
                "zoom": 12,
                "opacity": 0
            },
            {
                "zoom": 13,
                "opacity": 1
            },
            {
                "zoom": 14,
                "opacity": 1
            },
            {
                "zoom": 15,
                "opacity": 1
            },
            {
                "zoom": 16,
                "opacity": 1
            },
            {
                "zoom": 17,
                "opacity": 1
            },
            {
                "zoom": 18,
                "opacity": 1
            },
            {
                "zoom": 19,
                "opacity": 1
            },
            {
                "zoom": 20,
                "opacity": 1
            },
            {
                "zoom": 21,
                "opacity": 1
            }
        ]
    },
    {
        "tags": "transit_line",
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#949c9e"
            },
            {
                "scale": 0.4
            },
            {
                "zoom": 0,
                "opacity": 0
            },
            {
                "zoom": 1,
                "opacity": 0
            },
            {
                "zoom": 2,
                "opacity": 0
            },
            {
                "zoom": 3,
                "opacity": 0
            },
            {
                "zoom": 4,
                "opacity": 0
            },
            {
                "zoom": 5,
                "opacity": 0
            },
            {
                "zoom": 6,
                "opacity": 0
            },
            {
                "zoom": 7,
                "opacity": 0
            },
            {
                "zoom": 8,
                "opacity": 0
            },
            {
                "zoom": 9,
                "opacity": 0
            },
            {
                "zoom": 10,
                "opacity": 0
            },
            {
                "zoom": 11,
                "opacity": 0
            },
            {
                "zoom": 12,
                "opacity": 0
            },
            {
                "zoom": 13,
                "opacity": 1
            },
            {
                "zoom": 14,
                "opacity": 1
            },
            {
                "zoom": 15,
                "opacity": 1
            },
            {
                "zoom": 16,
                "opacity": 1
            },
            {
                "zoom": 17,
                "opacity": 1
            },
            {
                "zoom": 18,
                "opacity": 1
            },
            {
                "zoom": 19,
                "opacity": 1
            },
            {
                "zoom": 20,
                "opacity": 1
            },
            {
                "zoom": 21,
                "opacity": 1
            }
        ]
    },
    {
        "tags": "water",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#adb4bb"
            },
            {
                "zoom": 1,
                "color": "#adb4bb"
            },
            {
                "zoom": 2,
                "color": "#adb4bb"
            },
            {
                "zoom": 3,
                "color": "#adb4bb"
            },
            {
                "zoom": 4,
                "color": "#adb4bb"
            },
            {
                "zoom": 5,
                "color": "#adb4bb"
            },
            {
                "zoom": 6,
                "color": "#adb4bb"
            },
            {
                "zoom": 7,
                "color": "#adb4bb"
            },
            {
                "zoom": 8,
                "color": "#afb6bd"
            },
            {
                "zoom": 9,
                "color": "#b1b7be"
            },
            {
                "zoom": 10,
                "color": "#b3b9c0"
            },
            {
                "zoom": 11,
                "color": "#b4bac1"
            },
            {
                "zoom": 12,
                "color": "#b4bbc1"
            },
            {
                "zoom": 13,
                "color": "#b5bcc2"
            },
            {
                "zoom": 14,
                "color": "#b6bdc3"
            },
            {
                "zoom": 15,
                "color": "#b8bec4"
            },
            {
                "zoom": 16,
                "color": "#b9c0c5"
            },
            {
                "zoom": 17,
                "color": "#bbc1c6"
            },
            {
                "zoom": 18,
                "color": "#bcc2c8"
            },
            {
                "zoom": 19,
                "color": "#bec3c9"
            },
            {
                "zoom": 20,
                "color": "#bfc5ca"
            },
            {
                "zoom": 21,
                "color": "#c1c6cb"
            }
        ]
    },
    {
        "tags": "water",
        "elements": "geometry",
        "types": "polyline",
        "stylers": [
            {
                "zoom": 0,
                "opacity": 0.4
            },
            {
                "zoom": 1,
                "opacity": 0.4
            },
            {
                "zoom": 2,
                "opacity": 0.4
            },
            {
                "zoom": 3,
                "opacity": 0.4
            },
            {
                "zoom": 4,
                "opacity": 0.6
            },
            {
                "zoom": 5,
                "opacity": 0.8
            },
            {
                "zoom": 6,
                "opacity": 1
            },
            {
                "zoom": 7,
                "opacity": 1
            },
            {
                "zoom": 8,
                "opacity": 1
            },
            {
                "zoom": 9,
                "opacity": 1
            },
            {
                "zoom": 10,
                "opacity": 1
            },
            {
                "zoom": 11,
                "opacity": 1
            },
            {
                "zoom": 12,
                "opacity": 1
            },
            {
                "zoom": 13,
                "opacity": 1
            },
            {
                "zoom": 14,
                "opacity": 1
            },
            {
                "zoom": 15,
                "opacity": 1
            },
            {
                "zoom": 16,
                "opacity": 1
            },
            {
                "zoom": 17,
                "opacity": 1
            },
            {
                "zoom": 18,
                "opacity": 1
            },
            {
                "zoom": 19,
                "opacity": 1
            },
            {
                "zoom": 20,
                "opacity": 1
            },
            {
                "zoom": 21,
                "opacity": 1
            }
        ]
    },
    {
        "tags": "bathymetry",
        "elements": "geometry",
        "stylers": [
            {
                "hue": "#adb4bb"
            }
        ]
    },
    {
        "tags": {
            "any": [
                "industrial",
                "construction_site"
            ]
        },
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#dcdee0"
            },
            {
                "zoom": 1,
                "color": "#dcdee0"
            },
            {
                "zoom": 2,
                "color": "#dcdee0"
            },
            {
                "zoom": 3,
                "color": "#dcdee0"
            },
            {
                "zoom": 4,
                "color": "#dcdee0"
            },
            {
                "zoom": 5,
                "color": "#dcdee0"
            },
            {
                "zoom": 6,
                "color": "#dcdee0"
            },
            {
                "zoom": 7,
                "color": "#dcdee0"
            },
            {
                "zoom": 8,
                "color": "#dcdee0"
            },
            {
                "zoom": 9,
                "color": "#dcdee0"
            },
            {
                "zoom": 10,
                "color": "#dcdee0"
            },
            {
                "zoom": 11,
                "color": "#dcdee0"
            },
            {
                "zoom": 12,
                "color": "#dcdee0"
            },
            {
                "zoom": 13,
                "color": "#dcdee0"
            },
            {
                "zoom": 14,
                "color": "#e1e3e5"
            },
            {
                "zoom": 15,
                "color": "#e7e8ea"
            },
            {
                "zoom": 16,
                "color": "#e8e9eb"
            },
            {
                "zoom": 17,
                "color": "#e9eaeb"
            },
            {
                "zoom": 18,
                "color": "#e9eaec"
            },
            {
                "zoom": 19,
                "color": "#eaebed"
            },
            {
                "zoom": 20,
                "color": "#ebeced"
            },
            {
                "zoom": 21,
                "color": "#ecedee"
            }
        ]
    },
    {
        "tags": {
            "any": "transit",
            "none": [
                "transit_location",
                "transit_line",
                "transit_schema",
                "is_unclassified_transit"
            ]
        },
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#dcdee0"
            },
            {
                "zoom": 1,
                "color": "#dcdee0"
            },
            {
                "zoom": 2,
                "color": "#dcdee0"
            },
            {
                "zoom": 3,
                "color": "#dcdee0"
            },
            {
                "zoom": 4,
                "color": "#dcdee0"
            },
            {
                "zoom": 5,
                "color": "#dcdee0"
            },
            {
                "zoom": 6,
                "color": "#dcdee0"
            },
            {
                "zoom": 7,
                "color": "#dcdee0"
            },
            {
                "zoom": 8,
                "color": "#dcdee0"
            },
            {
                "zoom": 9,
                "color": "#dcdee0"
            },
            {
                "zoom": 10,
                "color": "#dcdee0"
            },
            {
                "zoom": 11,
                "color": "#dcdee0"
            },
            {
                "zoom": 12,
                "color": "#dcdee0"
            },
            {
                "zoom": 13,
                "color": "#dcdee0"
            },
            {
                "zoom": 14,
                "color": "#e1e3e5"
            },
            {
                "zoom": 15,
                "color": "#e7e8ea"
            },
            {
                "zoom": 16,
                "color": "#e8e9eb"
            },
            {
                "zoom": 17,
                "color": "#e9eaeb"
            },
            {
                "zoom": 18,
                "color": "#e9eaec"
            },
            {
                "zoom": 19,
                "color": "#eaebed"
            },
            {
                "zoom": 20,
                "color": "#ebeced"
            },
            {
                "zoom": 21,
                "color": "#ecedee"
            }
        ]
    },
    {
        "tags": "fence",
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#d1d4d6"
            },
            {
                "zoom": 0,
                "opacity": 0.75
            },
            {
                "zoom": 1,
                "opacity": 0.75
            },
            {
                "zoom": 2,
                "opacity": 0.75
            },
            {
                "zoom": 3,
                "opacity": 0.75
            },
            {
                "zoom": 4,
                "opacity": 0.75
            },
            {
                "zoom": 5,
                "opacity": 0.75
            },
            {
                "zoom": 6,
                "opacity": 0.75
            },
            {
                "zoom": 7,
                "opacity": 0.75
            },
            {
                "zoom": 8,
                "opacity": 0.75
            },
            {
                "zoom": 9,
                "opacity": 0.75
            },
            {
                "zoom": 10,
                "opacity": 0.75
            },
            {
                "zoom": 11,
                "opacity": 0.75
            },
            {
                "zoom": 12,
                "opacity": 0.75
            },
            {
                "zoom": 13,
                "opacity": 0.75
            },
            {
                "zoom": 14,
                "opacity": 0.75
            },
            {
                "zoom": 15,
                "opacity": 0.75
            },
            {
                "zoom": 16,
                "opacity": 0.75
            },
            {
                "zoom": 17,
                "opacity": 0.45
            },
            {
                "zoom": 18,
                "opacity": 0.45
            },
            {
                "zoom": 19,
                "opacity": 0.45
            },
            {
                "zoom": 20,
                "opacity": 0.45
            },
            {
                "zoom": 21,
                "opacity": 0.45
            }
        ]
    },
    {
        "tags": "medical",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#dcdee0"
            },
            {
                "zoom": 1,
                "color": "#dcdee0"
            },
            {
                "zoom": 2,
                "color": "#dcdee0"
            },
            {
                "zoom": 3,
                "color": "#dcdee0"
            },
            {
                "zoom": 4,
                "color": "#dcdee0"
            },
            {
                "zoom": 5,
                "color": "#dcdee0"
            },
            {
                "zoom": 6,
                "color": "#dcdee0"
            },
            {
                "zoom": 7,
                "color": "#dcdee0"
            },
            {
                "zoom": 8,
                "color": "#dcdee0"
            },
            {
                "zoom": 9,
                "color": "#dcdee0"
            },
            {
                "zoom": 10,
                "color": "#dcdee0"
            },
            {
                "zoom": 11,
                "color": "#dcdee0"
            },
            {
                "zoom": 12,
                "color": "#dcdee0"
            },
            {
                "zoom": 13,
                "color": "#dcdee0"
            },
            {
                "zoom": 14,
                "color": "#e1e3e5"
            },
            {
                "zoom": 15,
                "color": "#e7e8ea"
            },
            {
                "zoom": 16,
                "color": "#e8e9eb"
            },
            {
                "zoom": 17,
                "color": "#e9eaeb"
            },
            {
                "zoom": 18,
                "color": "#e9eaec"
            },
            {
                "zoom": 19,
                "color": "#eaebed"
            },
            {
                "zoom": 20,
                "color": "#ebeced"
            },
            {
                "zoom": 21,
                "color": "#ecedee"
            }
        ]
    },
    {
        "tags": "beach",
        "elements": "geometry",
        "stylers": [
            {
                "zoom": 0,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 1,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 2,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 3,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 4,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 5,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 6,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 7,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 8,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 9,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 10,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 11,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 12,
                "color": "#dcdee0",
                "opacity": 0.3
            },
            {
                "zoom": 13,
                "color": "#dcdee0",
                "opacity": 0.65
            },
            {
                "zoom": 14,
                "color": "#e1e3e5",
                "opacity": 1
            },
            {
                "zoom": 15,
                "color": "#e7e8ea",
                "opacity": 1
            },
            {
                "zoom": 16,
                "color": "#e8e9eb",
                "opacity": 1
            },
            {
                "zoom": 17,
                "color": "#e9eaeb",
                "opacity": 1
            },
            {
                "zoom": 18,
                "color": "#e9eaec",
                "opacity": 1
            },
            {
                "zoom": 19,
                "color": "#eaebed",
                "opacity": 1
            },
            {
                "zoom": 20,
                "color": "#ebeced",
                "opacity": 1
            },
            {
                "zoom": 21,
                "color": "#ecedee",
                "opacity": 1
            }
        ]
    },
    {
        "tags": {
            "all": [
                "is_tunnel",
                "path"
            ]
        },
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#c3c7cb"
            },
            {
                "opacity": 0.3
            }
        ]
    },
    {
        "tags": {
            "all": [
                "is_tunnel",
                "path"
            ]
        },
        "elements": "geometry.outline",
        "stylers": [
            {
                "opacity": 0
            }
        ]
    },
    {
        "tags": "road_limited",
        "elements": "geometry.fill",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 0
            },
            {
                "zoom": 1,
                "scale": 0
            },
            {
                "zoom": 2,
                "scale": 0
            },
            {
                "zoom": 3,
                "scale": 0
            },
            {
                "zoom": 4,
                "scale": 0
            },
            {
                "zoom": 5,
                "scale": 0
            },
            {
                "zoom": 6,
                "scale": 0
            },
            {
                "zoom": 7,
                "scale": 0
            },
            {
                "zoom": 8,
                "scale": 0
            },
            {
                "zoom": 9,
                "scale": 0
            },
            {
                "zoom": 10,
                "scale": 0
            },
            {
                "zoom": 11,
                "scale": 0
            },
            {
                "zoom": 12,
                "scale": 0
            },
            {
                "zoom": 13,
                "scale": 0.1
            },
            {
                "zoom": 14,
                "scale": 0.2
            },
            {
                "zoom": 15,
                "scale": 0.3
            },
            {
                "zoom": 16,
                "scale": 0.5
            },
            {
                "zoom": 17,
                "scale": 0.6
            },
            {
                "zoom": 18,
                "scale": 0.7
            },
            {
                "zoom": 19,
                "scale": 0.88
            },
            {
                "zoom": 20,
                "scale": 0.92
            },
            {
                "zoom": 21,
                "scale": 1
            }
        ]
    },
    {
        "tags": "road_limited",
        "elements": "geometry.outline",
        "stylers": [
            {
                "color": "#c8ccd0"
            },
            {
                "zoom": 0,
                "scale": 1
            },
            {
                "zoom": 1,
                "scale": 1
            },
            {
                "zoom": 2,
                "scale": 1
            },
            {
                "zoom": 3,
                "scale": 1
            },
            {
                "zoom": 4,
                "scale": 1
            },
            {
                "zoom": 5,
                "scale": 1
            },
            {
                "zoom": 6,
                "scale": 1
            },
            {
                "zoom": 7,
                "scale": 1
            },
            {
                "zoom": 8,
                "scale": 1
            },
            {
                "zoom": 9,
                "scale": 1
            },
            {
                "zoom": 10,
                "scale": 1
            },
            {
                "zoom": 11,
                "scale": 1
            },
            {
                "zoom": 12,
                "scale": 1
            },
            {
                "zoom": 13,
                "scale": 0.1
            },
            {
                "zoom": 14,
                "scale": 0.2
            },
            {
                "zoom": 15,
                "scale": 0.3
            },
            {
                "zoom": 16,
                "scale": 0.5
            },
            {
                "zoom": 17,
                "scale": 0.6
            },
            {
                "zoom": 18,
                "scale": 0.7
            },
            {
                "zoom": 19,
                "scale": 0.84
            },
            {
                "zoom": 20,
                "scale": 0.88
            },
            {
                "zoom": 21,
                "scale": 0.95
            }
        ]
    },
    {
        "tags": {
            "any": "landcover",
            "none": "vegetation"
        },
        "stylers": {
            "visibility": "off"
        }
    }
]
    }));
    // Добавляем слой объектов
map.addChild(new YMapDefaultFeaturesLayer())

// Подключение модуля меток
  const {YMapDefaultMarker} = (await ymaps3.import('@yandex/ymaps3-markers@0.0.1'));

// Создание метки
const myPlacemark = new YMapDefaultMarker({
  "coordinates": [37.588144, 55.733842],
  "color": "orange",
});

// Добавление метки на карту
map.addChild(myPlacemark);
}

initMap();
}
const monthNames = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];

    const dayCircles = [10, 17, 12]; // Просто для примера, чтобы показать "серые" кружки

    function renderCalendar() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const today = now.getDate();

      // Заголовок (месяц)
      document.getElementById("monthYear").innerText = `${monthNames[month]}`;

      // Первый день месяца (начинается с Пн)
      const firstDayOfWeek = (d => d === 0 ? 6 : d - 1)(new Date(year, month, 1).getDay());
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Сколько всего должно быть ячеек в календаре (чтобы заполнить полные недели)
      const totalDays = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;

      let html = '<tr>';
      let day = 1;
      for(let i=0; i < totalDays; i++) {
        // Если это начало строки и не первая строка
        if(i % 7 === 0 && i !== 0) html += '</tr><tr>';

        if(i < firstDayOfWeek) {
          html += '<td class="grey"></td>';
        } else if(day > daysInMonth) {
          html += '<td class="grey"></td>';
        } else {
          let cellClass = '';
          if(day === today) cellClass = 'today';
          else if(dayCircles.includes(day)) cellClass = 'day-circle';
          html += `<td class="${cellClass}">${day.toString().padStart(2, '0')}</td>`;
          day++;
        }
      }
      html += '</tr>';
      document.querySelector("#calendarTable tbody").innerHTML = html;
    }
    if(document.getElementById('calendarTable')) {
    renderCalendar();
    }
    const postUsers = document.querySelectorAll('.post-form__slide');
    if(postUsers.length) {
        postUsers.forEach((postUser) => {
            postUser.addEventListener('click', ()=> {
                postUsers.forEach((postUser) => {
                postUser.classList.remove('active');
            });
            postUser.classList.add('active');
            });
        });
    }
    const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const slots = document.getElementById('slots').querySelectorAll('.slot');
let currentSlotIndex = 0; // Индекс текущего свободного слота

const handleFiles = (files) => {
  // Проход по каждому файлу
  [...files].forEach((file) => {
    if (currentSlotIndex >= slots.length) return; // Проверяем наличие свободного слота

    const slot = slots[currentSlotIndex];
    const fileURL = URL.createObjectURL(file);

    // Показать изображение или видео
    if (file.type.startsWith('image/')) {
      slot.innerHTML = `<img src="${fileURL}" alt="Загружено">`;
    } else if (file.type.startsWith('video/')) {
      slot.innerHTML = `<video src="${fileURL}" autoplay muted loop></video>`;
    }

    currentSlotIndex++; // Переходим к следующему слоту
  });
};

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.style.background = 'linear-gradient(180deg, #c598ef, #67cceb)';
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.background = 'linear-gradient(180deg, #d8a7ff, #72d6f8)';
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.style.background = 'linear-gradient(180deg, #d8a7ff, #72d6f8)';
  handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
});
});