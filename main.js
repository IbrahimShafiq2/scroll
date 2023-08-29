const htmlElement = document.documentElement;
const logical = document.querySelector('.logical');

function scrollVar() {
    const percentOfScreenHeightScrolled = htmlElement.scrollTop / htmlElement.clientHeight;
    htmlElement.style.setProperty('--scroll', Math.min(percentOfScreenHeightScrolled * 100, 100));
    return percentOfScreenHeightScrolled;
}

const iconElement = document.querySelector('i');
const uiElements = document.querySelectorAll('.ui');

window.addEventListener('scroll', () => {
    const percentScrolled = scrollVar();

    if (percentScrolled > 0.3) {
        iconElement.classList.add('activeIcon');
        logical.classList.add('activeParagraph');
    } else {
        iconElement.classList.remove('activeIcon');
        logical.classList.remove('activeParagraph');
    }
    uiElements.forEach((uiElement, index) => {
        if (uiElement.classList.contains('uiElement-0'))
            uiElement.style.transform = `translateY(-${percentScrolled * 350}px)`;

        if (uiElement.classList.contains('uiElement-1'))
            uiElement.style.transform = `translateX(-${percentScrolled * 350}px)`;

        if (uiElement.classList.contains('uiElement-2'))
            uiElement.style.transform = `translateX(${percentScrolled * 350}px)`;

        if (uiElement.classList.contains('uiElement-3'))
            uiElement.style.transform = `translateY(-${percentScrolled * 500}px)`;


        if (percentScrolled === 0) {
            uiElement.classList.remove(`uiElement-${index}`);
        } else {
            uiElement.classList.add(`uiElement-${index}`);
        }
    });
});


window.addEventListener('resize', scrollVar)

scrollVar()

const observer = new IntersectionObserver(entries => {
    for (let i = entries.length - 1; i >= 0; i--) {
        const entry = entries[i]

        if (entry.isIntersecting) {
            document.querySelectorAll('[data-img]').forEach(img => {
                img.classList.remove('show')
            })
            const img = document.querySelector(entry.target.dataset.imgToShow)
            img?.classList.add('show');
            break;
        }
    }
})

document.querySelectorAll('[data-img-to-show]').forEach(section => {
    observer.observe(section)
})
