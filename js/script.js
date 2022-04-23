'use strict';

window.addEventListener("DOMContentLoaded", () => {

    //popup
    (function modals() {
        function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
            const trigger = document.querySelectorAll(triggerSelector),
                modal = document.querySelector(modalSelector),
                close = document.querySelector(closeSelector),
                windows = document.querySelectorAll('[data-modal]'),
                scroll = calcScroll();

            trigger.forEach(item => {
                item.addEventListener('click', (e) => {
                    if (e.target) {
                        e.preventDefault();
                    }

                    windows.forEach(item => {
                        item.style.display = 'none';
                    });

                    modal.classList.remove('display-none');
                    document.body.classList.add('block-hidden');
                    document.body.style.marginRight = `${scroll}px`;
                    modal.classList.add('appearance');
                });
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal && closeClickOverlay || e.target === close) {
                    modal.classList.remove('appearance');
                    modal.classList.add('display-none');
                    document.body.classList.remove('block-hidden');
                    document.body.style.marginRight = `0px`;
                }
            });
        }

        function showModalByTime(selector, time) {
            setTimeout(function () {
                let display;

                document.querySelectorAll('[data-modal]').forEach(item => {
                    if (getComputedStyle(item).display !== 'none') {
                        display = "block";
                    }
                });

                if (!display) {
                    document.querySelector(selector).style.display = 'block';
                    document.body.style.overflow = "block-hidden";
                    let scroll = calcScroll();
                    document.body.style.marginRight = `0px`;
                }
            }, time);
        }

        function calcScroll() {
            let div = document.createElement('div');

            div.style.width = '50px';
            div.style.height = '50px';
            div.style.overflowY = 'scroll';
            div.style.visibility = 'block-hidden';

            document.body.appendChild(div);
            let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();

            return scrollWidth;
        }

        bindModal('[data-popup]', '.popup', '.popup__closed');

        //showModalByTime('.popup-consultation', 5000);
    }());

    //sticky menu
    (function scrollTopMenu() {
        const topMenu = document.querySelector('.header__top');

        let a = 0;

        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset;

            if (scrollTop >= 250) {
                topMenu.classList.add('top-menu-scroll');
                if (scrollTop > a) {
                    topMenu.classList.add('menu-hide');
                    topMenu.classList.remove('menu-show');
                } else {
                    topMenu.classList.remove('menu-hide');
                    topMenu.classList.add('menu-show');
                }
            } else {
                topMenu.classList.remove('top-menu-scroll');
            }

            a = scrollTop;
        });

    }());

    //swiper
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        scrollbar: {
            el: '.swiper-scrollbar',
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            630: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            930: {
                slidesPerView: 3,
                spaceBetween: 30
            },
        }
    });

});