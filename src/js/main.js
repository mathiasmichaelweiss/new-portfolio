'use strict';

window.onload = () => {
    const myPhoto = document.querySelector('.greeting__my__photo'),
        greeting = document.querySelector('.greeting'),
        navItems = document.querySelectorAll('.header__nav__item');


    navItems.forEach(item => {
        const loadTime = window.setTimeout(() => {
            item.style.opacity = '1';
        }, 300);
    });

    greeting.classList.add('move_block_left_to_right');
    myPhoto.classList.add('move__photo');
};