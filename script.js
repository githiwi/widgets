document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate');
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');
    const incomeSlider = document.getElementById('incomeSlider');
    const incomeOutput = document.getElementById('incomeOutput');
    const indicator = document.getElementById('indicator');
    const incomeLevel = document.getElementById('incomeLevel');

    calculateBtn.addEventListener('click', () => {
        layer1.style.display = 'none';
        layer2.classList.remove('hidden');
        const chosenIncome = incomeSlider.value;
        incomeLevel.textContent = chosenIncome;

        
        const indicatorPosition = (parseInt(chosenIncome) / 7000) * 100;
        indicator.style.bottom = `${indicatorPosition}%`;
    });

    incomeSlider.addEventListener('input', () => {
        incomeOutput.value = incomeSlider.value;
    });

    // 
    const ageControls = document.querySelectorAll('.age-control');

    ageControls.forEach(function (ageControl) {
        const minusButton = ageControl.querySelector('.minus');
        const addButton = ageControl.querySelector('.add');
        const ageInput = ageControl.querySelector('input');

        minusButton.addEventListener('click', function () {
            updateAgeInput(ageInput, -1);
        });

        addButton.addEventListener('click', function () {
            updateAgeInput(ageInput, 1);
        });
    });

    function updateAgeInput(input, increment) {
        let currentValue = parseInt(input.value) || 0;
        currentValue += increment;
        currentValue = Math.max(0, Math.min(100, currentValue));
        input.value = currentValue;
    }

    
});


