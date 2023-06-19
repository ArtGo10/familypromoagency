const quoteButtons = document.querySelectorAll('.custom-quote-button');
const modal = document.getElementById('modal-background');
const modalCloseBtn = document.getElementById('modal-close-icon');
const pageLinks = document.querySelectorAll('.page-link');
const header = document.getElementById('header');
const menuBtn = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
const advSliderWrapper = document.querySelector('.advantages-slider-inner');
const advSlides = document.querySelectorAll('.advantages-slide');
const advLeftArrows = document.querySelectorAll('.adv-left-arrow');
const advRightArrows = document.querySelectorAll('.adv-right-arrow');
const servSliderWrapper = document.querySelector('.services-wrapper');
const servHeader = document.querySelector('.services-header');
const servContent = document.querySelector('.services-content');
const servLeftArrow = document.querySelector('.serv-left-arrow');
const servRightArrow = document.querySelector('.serv-right-arrow');

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

function preventSlidersFromScrolling() {
    advSliderWrapper.scrollTo(0, 0);
    servSliderWrapper.scrollTo(0, 0);
}

advSliderWrapper.addEventListener('scroll', preventSlidersFromScrolling);
servSliderWrapper.addEventListener('scroll', preventSlidersFromScrolling);

function addClickForAdvArrows (el, idx) {
    el.addEventListener('click', () => {
        advSlides.forEach(slide => {
            const width = slide.getBoundingClientRect().width;
            slide.style.transform = `translateX(-${idx * (width + 24)}px)`;
        });
    })
}

function addClickForServArrows (toLeft = true) {
    const width = servHeader.getBoundingClientRect().width;
    servHeader.style.transform = `translateX(-${toLeft ? 0 : width + 8}px)`;
    servContent.style.transform = `translateX(-${toLeft ? 0 : width + 8}px)`;
}

advLeftArrows.forEach((arr, idx) => addClickForAdvArrows(arr, idx));
advRightArrows.forEach((arr, idx) => addClickForAdvArrows(arr, idx + 1));
servLeftArrow.addEventListener('click', () => addClickForServArrows(true));
servRightArrow.addEventListener('click', () => addClickForServArrows(false));