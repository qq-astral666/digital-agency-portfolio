document.addEventListener('DOMContentLoaded', () => {

    // 1. Анимация появления элементов при скролле (Intersection Observer)
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


    // 2. Валидация формы обратной связи
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
                alert('Заявка успешно отправлена! Менеджер свяжется с вами.');
                form.reset();
            }
        });

        nameInput.addEventListener('input', () => validateInput(nameInput, nameInput.value.trim().length >= 2));
        emailInput.addEventListener('input', () => validateInput(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())));
    }


    // 3. Динамический счетчик цифр в статистике (Главная страница)
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


    // 4. Логика FAQ Аккордеона (Страница услуг)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpened = item.classList.contains('active');
            document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));
            if (!isOpened) {
                item.classList.add('active');
            }
        });
    });


    // 5. Фильтрация Портфолио по табам (Прямое переключение классов без конфликтов)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (tabButtons.length > 0 && portfolioItems.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Активный класс для нажатой кнопки
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        // Показываем элемент: убираем класс скрытия и принудительно сбрасываем inline-стили
                        item.classList.remove('portfolio-item-hidden');
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    } else {
                        // Скрываем элемент через класс
                        item.classList.add('portfolio-item-hidden');
                    }
                });
            });
        });
    }


    // 6. Модальное окно для кейсов (Лайтбокс)
    const modal = document.getElementById('portfolioModal');
    if (modal && portfolioItems.length > 0) {
        const modalClose = modal.querySelector('.modal-close');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDesc = modal.querySelector('.modal-desc');
        const modalTag = modal.querySelector('.modal-tag');

        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const title = item.getAttribute('data-title');
                const desc = item.getAttribute('data-desc');
                const tagEl = item.querySelector('.item-tag');
                const tag = tagEl ? tagEl.textContent : 'Кейс';

                modalTitle.textContent = title || 'Название проекта';
                modalDesc.textContent = desc || 'Описание скоро появится...';
                modalTag.textContent = tag;

                modal.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
});