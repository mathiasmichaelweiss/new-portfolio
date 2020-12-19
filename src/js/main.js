'use strict';
window.addEventListener('DOMContentLoaded', () => {

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
        /* console.log(scrollResult); */
    });

    let isScrolled = true;
    window.addEventListener('scroll', function () {
        const about = document.querySelector('.about');
        if (window.pageYOffset >= 460) {
            addMoveClass('.skills', 'move_block_left_to_right', 'showBlockLeft .5s linear forwards');
            about.style.opacity = '1';

            function openAccordOnce() {
                if (isScrolled) {
                    const loadTime = window.setTimeout(() => {
                        function initAccordeon() {
                            const firstSectionBodyHeight = document.querySelector('.accordeon-section .accordeon-body > *').clientHeight;
                            document.querySelector('.accordeon-section .accordeon-body').style.maxHeight = firstSectionBodyHeight + 'px';
                        }
                        initAccordeon();
                    }, 1000);
                }
                isScrolled = false;
            }
            openAccordOnce();
            /* console.log(isScrolled); */

        }
        if (window.pageYOffset >= 1560) {
            removeMoveClass('.skills', 'move_block_left_to_right', 'hiddenBlockLeft .1s linear forwards');
            about.style.opacity = '0';
        }
        if (window.pageYOffset < 400) {
            removeMoveClass('.skills', 'move_block_left_to_right', 'hiddenBlockLeft .1s linear forwards');
            about.style.opacity = '0';
        }

        /* animate skills */
        const
            skillsClasses = document.querySelector('.skills').classList,
            skillLvl = document.querySelectorAll('.skill__lvl'),
            accordeonSection = document.querySelectorAll('.accordeon-section');

        if (skillsClasses.contains('move_block_left_to_right')) {
            skillLvl.forEach(item => {
                item.setAttribute('id', 'animate__skill__ground');
            });
        }

        if (!skillsClasses.contains('move_block_left_to_right')) {
            skillLvl.forEach(item => {
                item.removeAttribute('id', 'animate__skill__ground');
            });
        }

        /* accordion */
        +
        function () {

            const accordeonHeaderClickHandler = (e) => {
                document.querySelectorAll('.accordeon-section').forEach(section => {
                    section.querySelector('.accordeon-body').style.maxHeight = '0px';
                });

                const
                    accordeonSection = e.target.closest('.accordeon-section'),
                    insideElHeight = accordeonSection.querySelector('.accordeon-body > *').clientHeight;

                accordeonSection.querySelector('.accordeon-body').style.maxHeight = insideElHeight + 'px';
            };

            accordeonSection.forEach(section => {
                section.addEventListener('click', accordeonHeaderClickHandler);
            });
        }();

    });


});