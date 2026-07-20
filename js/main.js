const btnThemeToggle = document.getElementById('theme-toggler');
const rootDoc = document.documentElement;
const iconTheme = btnThemeToggle ? btnThemeToggle.querySelector('i') : null;

const userSavedTheme = localStorage.getItem('site_theme');
if (userSavedTheme === 'light' && rootDoc) {
    rootDoc.setAttribute('data-theme', 'light');
    if (iconTheme) iconTheme.classList.replace('bi-brightness-high', 'bi-moon-stars');
}

if (btnThemeToggle && iconTheme) {
    btnThemeToggle.addEventListener('click', () => {
        if (rootDoc.getAttribute('data-theme') === 'dark') {
            rootDoc.setAttribute('data-theme', 'light');
            localStorage.setItem('site_theme', 'light');
            iconTheme.classList.replace('bi-brightness-high', 'bi-moon-stars');
        } else {
            rootDoc.setAttribute('data-theme', 'dark');
            localStorage.setItem('site_theme', 'dark');
            iconTheme.classList.replace('bi-moon-stars', 'bi-brightness-high');
        }
    });
}

const mainHeader = document.getElementById('main-header');
const burgerToggle = document.getElementById('burger-toggle');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainHeader.classList.add('fixed-scrolled');
    } else {
        mainHeader.classList.remove('fixed-scrolled');
    }
});

if (burgerToggle && navMenu) {
    burgerToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        const iconBtn = burgerToggle.querySelector('i');
        if (navMenu.classList.contains('show-menu')) {
            iconBtn.classList.replace('bi-list', 'bi-x-lg');
        } else {
            iconBtn.classList.replace('bi-x-lg', 'bi-list');
        }
    });
}

const observedElements = document.querySelectorAll('.anim-scroll');
const observerLogic = (entriesList, observerRef) => {
    entriesList.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('section-stats')) {
                launchCounters();
            }
            observerRef.unobserve(entry.target);
        }
    });
};
const scrollObserver = new IntersectionObserver(observerLogic, { threshold: 0.1 });
observedElements.forEach(item => scrollObserver.observe(item));

let hasCountersRun = false;
function launchCounters() {
    if (hasCountersRun) return;
    hasCountersRun = true;
    const countersList = document.querySelectorAll('.chiffre-stat');
    countersList.forEach(item => {
        const targetVal = +item.getAttribute('data-limit');
        let currentVal = 0;
        const stepVal = targetVal / 50;
        const computeLoop = () => {
            currentVal += stepVal;
            if (currentVal < targetVal) {
                item.innerText = Math.ceil(currentVal);
                setTimeout(computeLoop, 25);
            } else {
                item.innerText = targetVal;
            }
        };
        computeLoop();
    });
}

const targetEventTime = new Date("Nov 15, 2026 09:00:00").getTime();
setInterval(() => {
    const rightNow = new Date().getTime();
    const diffTime = targetEventTime - rightNow;
    if (diffTime > 0) {
        const d = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const h = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diffTime % (1000 * 60)) / 1000);

        const dBox = document.getElementById("days-count");
        if (dBox) {
            dBox.innerText = d < 10 ? "0" + d : d;
            document.getElementById("hours-count").innerText = h < 10 ? "0" + h : h;
            document.getElementById("mins-count").innerText = m < 10 ? "0" + m : m;
            document.getElementById("secs-count").innerText = s < 10 ? "0" + s : s;
        }
    }
}, 1000);

const tabsButtons = document.querySelectorAll('.btn-onglet');
const tabsPanels = document.querySelectorAll('.contenu-onglet');
tabsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabsButtons.forEach(b => b.classList.remove('active-tab'));
        tabsPanels.forEach(p => p.classList.remove('active-tab'));
        btn.classList.add('active-tab');
        const activeTabContent = document.getElementById(btn.getAttribute('data-target-tab'));
        if (activeTabContent) activeTabContent.classList.add('active-tab');
    });
});

const filtersButtons = document.querySelectorAll('.btn-filtre');
const teamCards = document.querySelectorAll('.grille-intervenants .carte-intervenant');
filtersButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filtersButtons.forEach(b => b.classList.remove('active-filter'));
        btn.classList.add('active-filter');
        const filterKey = btn.getAttribute('data-filter-type');
        teamCards.forEach(cardItem => {
            if (filterKey === 'all' || cardItem.getAttribute('data-category') === filterKey) {
                cardItem.style.display = 'block';
            } else {
                cardItem.style.display = 'none';
            }
        });
    });
});

const userForm = document.getElementById('user-form-sub');
if (userForm) {
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let formOk = true;

        const inputNom = document.getElementById('input-nom');
        const inputEmail = document.getElementById('input-email');
        const inputTel = document.getElementById('input-tel');
        const inputType = document.getElementById('input-type');
        const inputPays = document.getElementById('input-pays');
        const inputMsg = document.getElementById('input-msg');

        if (inputNom.value.trim() === '') {
            setFieldError(inputNom, 'err-nom');
            formOk = false;
        } else {
            setFieldSuccess(inputNom, 'err-nom');
        }

        const regEmailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regEmailCheck.test(inputEmail.value.trim())) {
            setFieldError(inputEmail, 'err-email');
            formOk = false;
        } else {
            setFieldSuccess(inputEmail, 'err-email');
        }

        const rawPhone = inputTel.value.replace(/\D/g, '');
        if (rawPhone.length < 8) {
            setFieldError(inputTel, 'err-tel');
            formOk = false;
        } else {
            setFieldSuccess(inputTel, 'err-tel');
        }

        if (inputType.value === '') {
            setFieldError(inputType, 'err-type');
            formOk = false;
        } else {
            setFieldSuccess(inputType, 'err-type');
        }

        if (inputPays.value === '') {
            setFieldError(inputPays, 'err-pays');
            formOk = false;
        } else {
            setFieldSuccess(inputPays, 'err-pays');
        }

        if (inputMsg.value.trim().length < 20) {
            setFieldError(inputMsg, 'err-msg');
            formOk = false;
        } else {
            setFieldSuccess(inputMsg, 'err-msg');
        }

        if (formOk) {
            document.getElementById('banner-feedback').style.display = 'block';
            userForm.reset();
            document.querySelectorAll('.input-saisi').forEach(el => el.classList.remove('is-ok'));
            setTimeout(() => {
                document.getElementById('banner-feedback').style.display = 'none';
            }, 5000);
        }
    });
}

function setFieldError(fieldElem, errTextId) {
    fieldElem.classList.add('is-err');
    fieldElem.classList.remove('is-ok');
    const errorBlock = document.getElementById(errTextId);
    if (errorBlock) errorBlock.style.display = 'block';
}

function setFieldSuccess(fieldElem, errTextId) {
    fieldElem.classList.remove('is-err');
    fieldElem.classList.add('is-ok');
    const errorBlock = document.getElementById(errTextId);
    if (errorBlock) errorBlock.style.display = 'none';
}

const scrollTopBtn = document.getElementById('scroll-top-btn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (scrollTopBtn) scrollTopBtn.classList.add('show-top');
    } else {
        if (scrollTopBtn) scrollTopBtn.classList.remove('show-top');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const yearFooterContainer = document.getElementById('annee-en-cours');
if (yearFooterContainer) {
    yearFooterContainer.innerText = new Date().getFullYear();
}