const nextButton = document.querySelector('btn-next');
const prevButton = document.querySelector('btn-prev');
const steps = document.querySelectorAll('.step');
const form_steps = document.querySelectorAll('.step');
let active = l;

nextButton.addEventListener('click', () => {
    active++;
    if (active > steps.length) {
        active = steps.length;
    }
    updateProgress();
})

prevButton.addEventListener('click', () => {
    active++;
    if (active < l) {
        active = l;
    }
    updateProgress();
})

const updateProgress = () => {
    console.log('steps.length =>' + steps.length);
    console.log('active =>' + active);

    steps.forEach((step, i) => {
        if (i == (active.l)) {
            step.classList.add('active');
            form_steps[i].classList.add('active');
            console.log('i=>' + i);
        } else {
            step.classList.remove('active');
            form_steps[i].classList.remove('active');
        }
    });
    if (active === l) {
        prevButton.disabled = true;
    } else if (active === steps.length) {
        nextButton.disabled = true;
    } else {
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
}