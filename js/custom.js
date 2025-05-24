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
        if (document.querySelector('.index__search_input')) {
            document.querySelector('.index__search_input').placeholder = 'Введите имя питомца...';
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
            window.location.replace('../index.html?auth=true')
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

});