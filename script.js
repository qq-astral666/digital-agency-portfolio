document.addEventListener('DOMContentLoaded', () => {

    // 1. МОБИЛЬНОЕ БУРГЕР-МЕНЮ (Железная логика)
    const burgerBtn = document.querySelector('.burger');
    const navMenu = document.querySelector('.nav');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            burgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрытие меню при клике по ссылкам навигации
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Закрытие по клику в любую область экрана
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // 2. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ
    const fadeElements = document.querySelectorAll('.animate-fade');
    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    fadeElements.forEach(el => appearanceObserver.observe(el));
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if(heroContent) heroContent.classList.add('visible');
    }, 100);

    // 3. ВАЛИДАЦИЯ ФОРМЫ
    const form = document.getElementById('contactForm');
    if (form) {
        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');

        const validateInput = (input, condition) => {
            const group = input.parentElement;
            if (condition) {
                group.classList.remove('invalid');
                return true;
            } else {
                group.classList.add('invalid');
                return false;
            }
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const isNameValid = validateInput(nameInput, nameInput.value.trim().length >= 2);
            const isEmailValid = validateInput(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()));

            if (isNameValid && isEmailValid) {
                alert('Заявка успешно отправлена!');
                form.reset();
            }
        });

        nameInput.addEventListener('input', () => validateInput(nameInput, nameInput.value.trim().length >= 2));
        emailInput.addEventListener('input', () => validateInput(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())));
    }

    // 4. СЧЕТЧИК СТАТИСТИКИ
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const startCounting = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-target'), 10);
                    let startValue = 0;
                    const duration = 2000;
                    const stepTime = Math.max(Math.floor(duration / endValue), 10);

                    const counter = setInterval(() => {
                        startValue += 1;
                        target.textContent = startValue;
                        if (startValue >= endValue) {
                            target.textContent = endValue + '+';
                            clearInterval(counter);
                        }
                    }, stepTime);
                    observer.unobserve(target);
                }
            });
        };
        const statsObserver = new IntersectionObserver(startCounting, { threshold: 0.5 });
        statNumbers.forEach(num => statsObserver.observe(num));
    }
});