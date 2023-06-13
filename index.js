const quoteButtons = document.querySelectorAll('.custom-quote-button');
const modal = document.getElementById('modal-background');
const modalCloseBtn = document.getElementById('modal-close-icon');
const pageLinks = document.querySelectorAll('.page-link');
const header = document.getElementById('header');
const menuBtn = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');

const bottomOfHeader = header.offsetTop + header.offsetHeight;

quoteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'initial';
    })
})

modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
})

pageLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('opened');
        menuBtn.classList.remove('opened');
        window.scrollTo({
            top: document.getElementById(link.dataset.dest).offsetTop,
            behavior: "smooth"
        });
    })
});

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('opened');
    menu.classList.toggle('opened');
});

window.addEventListener('scroll', () => {
    pageLinks.forEach(link => {
        let topOfPageSection = document.getElementById(link.dataset.dest).offsetTop;
        if (window.scrollY >= topOfPageSection) {
            document.querySelector('.active-link').classList.remove('active-link');
            link.classList.add('active-link');
        }
    });

    window.scrollY >= bottomOfHeader ? header.classList.add('header-scrolled') : header.classList.remove('header-scrolled')
});