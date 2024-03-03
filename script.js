document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate');
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');
    const incomeSlider = document.getElementById('incomeSlider');
    const incomeOutput = document.getElementById('incomeOutput');
    const indicator = document.querySelector('.indicator');

    incomeSlider.addEventListener('input', () => {
        console.log("slider value", incomeSlider.value)
        incomeOutput.value = incomeSlider.value;
    });

    calculateBtn.addEventListener('click', () => {
        layer1.style.display = 'none';
        layer2.style.display = 'block';

        const chosenIncome = parseInt(incomeSlider.value);
        console.log("chosenIncome", chosenIncome);

        if (chosenIncome === 0) {
            indicator.style.top = `991px`;
        } else {
            //top positions for each value
            const positions = {
                2000: 881,
                3000: 763,
                4000: 654,
                5000: 545,
                6000: 435,
                7000: 325
            };

            // Interpolate the indicator's bottom position based on chosenIncome
            let indicatorTop = interpolateIndicatorPosition(chosenIncome, positions);
            indicator.style.top = `${indicatorTop}px`;
        }
    });

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

    /**
     * Find the closest lower and upper bounds for the chosen income
     * @param {number} income the value selected in the input range
     * @param {object} positions the available scales with y(top) position
     * @returns {number} top position for the indicator
     */
    function interpolateIndicatorPosition(income, positions) {
        let lowerBound = 2000;
        let upperBound = 7000;

        for (let value in positions) {
            if (income >= value) {
                lowerBound = parseInt(value);
            } else {
                upperBound = parseInt(value);
                break;
            }
        }

        // Interpolate the position
        const lowerBoundTop = positions[lowerBound];
        const upperBoundTop = positions[upperBound];

        const range = upperBound - lowerBound;
        const progress = (income - lowerBound) / range;

        return lowerBoundTop + progress * (upperBoundTop - lowerBoundTop);
    }

});