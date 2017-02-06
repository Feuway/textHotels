'use strict';

let toggleMenu = document.querySelector('.menu-toggle');
let nav = document.querySelector('.main-nav');
let phone = document.querySelector('.phone');
let language = document.querySelector('.select-language');

let openMenu = () => {
    nav.classList.toggle('invisible');
    phone.classList.toggle('invisible');
    language.classList.toggle('invisible');
};

toggleMenu.addEventListener('click', function() {
    openMenu();
});