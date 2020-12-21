'use strict';

window.addEventListener('DOMContentLoaded', () => {

    function anchors() {
        const anchors = document.querySelectorAll('a[href*="#"]');

        for (let anchor of anchors) {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const blockID = anchor.getAttribute('href').substr(1);

                document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    }

    anchors();

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

        if (window.pageYOffset >= 954) {
            document.querySelector('.up').classList.add('show_up');
        } else {
            document.querySelector('.up').classList.remove('show_up');
        }

        if (window.pageYOffset >= 460) {
            addMoveClass('.skills', 'move_block_left_to_right', 'showBlockLeft .5s linear forwards');
            about.style.opacity = '1';


            function setValue(elem, value, inc, shift, speed) {
                let interval = false;
                elem.innerHTML = 0;
                if (inc) {
                    interval = setInterval(function () {
                        if (elem.innerHTML * 1 + shift >= value) {
                            elem.innerHTML = value;
                            clearInterval(interval);
                        } else {
                            elem.innerHTML = elem.innerHTML * 1 + shift;
                        }
                    }, speed);
                } else {
                    interval = setInterval(function () {
                        if (elem.innerHTML * 1 - shift <= value) {
                            elem.innerHTML = value;
                            clearInterval(interval);
                        } else {
                            elem.innerHTML = elem.innerHTML * 1 - shift;
                        }
                    }, speed);
                }
            };

            const result = document.querySelectorAll('.result'),
                resultValue = +result.textContent;
            /* resultValue = result.values(); */
            console.log(resultValue);

            /* setValue(result, 0, false, 10, 30); */

            function openAccordOnce() {
                if (isScrolled) {
                    const loadTime = window.setTimeout(() => {
                        function initAccordeon() {
                            const firstSectionBodyHeight = document.querySelector('.accordeon-section .accordeon-body > *').clientHeight;
                            document.querySelector('.accordeon-section .accordeon-body').style.maxHeight = firstSectionBodyHeight + 'px';
                        }
                        result.forEach((item, i) => {
                            /* setValue(item, resultValue, true, 1, 20); */
                        });
                        /* setValue(result, resultValue, true, 1, 20); */
                        initAccordeon();
                    }, 1000);
                }
                isScrolled = false;
            }
            openAccordOnce();
            /* console.log(isScrolled); */

        }
        if (window.pageYOffset >= 2010) {
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
        function accordeon(addSection, addBody) {

            const accordeonHeaderClickHandler = (e) => {
                document.querySelectorAll(addSection).forEach(section => {
                    section.querySelector(addBody).style.maxHeight = '0px';
                });

                const
                    accordeonSection = e.target.closest(addSection),
                    insideElHeight = accordeonSection.querySelector(`${addBody} > *`).clientHeight;

                accordeonSection.querySelector('.accordeon-body').style.maxHeight = insideElHeight + 'px';
            };

            accordeonSection.forEach(section => {
                section.addEventListener('click', accordeonHeaderClickHandler);
            });
        };

        accordeon('.accordeon-section', '.accordeon-body');
    });

    /* my works */
    const slider = tns({
        container: '.my-slider',
        items: 4,
        gutter: 33,
        mouseDrag: true,
        slideBy: 'page',
        autoplay: false,
        controls: false
    });

    const
        workContainer = document.querySelectorAll('.work__item__container'),
        workItem = document.querySelectorAll('.work__item');

    workContainer.forEach((item, j) => {
        item.addEventListener('click', () => {
            if (item.style.maxHeight == '100rem') {
                item.style.maxHeight = '2.3rem';
            } else {
                item.style.maxHeight = '100rem';
            }
        });
        item.setAttribute('id', j + 1);
        for (let i = 2; i <= workContainer.length; i++) {
            if (i % 2 == 0) {
                workContainer[i].style = 'border: 1px solid #FFD500';
                workItem[i].classList.add('yellow');
            }
        }
    });

    /* Form */
    let button = document.querySelector('.submit');
    console.log(button);

    /*add event on the send button*/
    button.addEventListener('click', function (event) {
        event.preventDefault();
        /*create object*/
        let formData = {
            name: document.querySelector('#name').value,
            company: document.querySelector('#company').value,
            subject: document.querySelector('#subject').value,
            email: document.querySelector('#email').value,
            message: document.querySelector('#message').value
        };

        /*transmit data*/
        let request = new XMLHttpRequest();

        request.open('POST', "server.php");
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send('name=' + encodeURIComponent(formData.name) + '&company=' + encodeURIComponent(formData.company) + '&subject=' + encodeURIComponent(formData.subject) + '&email=' + encodeURIComponent(formData.email) + '&message=' + encodeURIComponent(formData.message));
    });

});