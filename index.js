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
const forms = document.querySelectorAll('.form');

const bottomOfHeader = header.offsetTop + header.offsetHeight;

emailjs.init('ax7ySooPu_KFomJRO');

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

forms.forEach(form => {
    const counter = form.querySelector('.form-input-symbols-counter');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.fullName?.value || !form.email?.value || !form.companyName?.value) return;
        this.contact_number.value = Math.random() * 100000 | 0;
        // emailjs.sendForm('service_svvy1sj', 'template_c68wutp', this)
        //     .then(function() {
        //         form.reset();
        //         console.log('SUCCESS!');
        //     }, function(error) {
        //         console.log('FAILED...', error);
        //     });
        form.classList.add('sent');
        const p = document.createElement('p');
        p.innerText = 'Your request has been sent. Our team will contact you as soon as possible.';
        form.appendChild(p);
    });
    form.addEventListener('change', function (event) {
        event.target.value = event.target.value.trim();
        counter.innerText = form.comment.value.length;
    });
    form.email.addEventListener('blur', function (event) {
        event.target.value = event.target.value.trim();
    });
    form.comment.addEventListener('input', function (event) {
        counter.innerText = form.comment.value.length;
    });
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