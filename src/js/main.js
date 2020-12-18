'use strict';
window.addEventListener('DOMContentLoaded', () => {

    window.onload = () => {
        const navItems = document.querySelectorAll('.header__nav__item');

        navItems.forEach(item => {
            const loadTime = window.setTimeout(() => {
                item.style.opacity = '1';
            }, 300);
        });

        function addMoveClass(itemClass, addClass, animation) {
            const item = document.querySelector(itemClass);
            item.classList.add(addClass);
            item.style.animation = animation;
        }

        function removeMoveClass(itemClass, addClass, animation) {
            const item = document.querySelector(itemClass);
            item.classList.remove(addClass);
            item.style.animation = animation;
        }

        window.addEventListener('scroll', function () {
            let scrollResult = window.pageYOffset;
            console.log(scrollResult);
        });


        window.addEventListener('scroll', function () {
            if (window.pageYOffset >= 460) {
                addMoveClass('.skills', 'move_block_left_to_right', 'showBlockLeft .5s linear forwards');
            }
            if (window.pageYOffset >= 1560) {
                removeMoveClass('.skills', 'move_block_left_to_right', 'hiddenBlockLeft .1s linear forwards');
            }
        });

        addMoveClass('.greeting', 'move_block_left_to_right', 'showBlockLeft 1s linear forwards');
        addMoveClass('.greeting__my__photo', 'move__photo', 'showBlockRight 1s linear forwards');


    };

});