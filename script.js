document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taxForm');
    const age = document.getElementById('age');
    const income = document.getElementById('income');
    const deductions = document.getElementById('deductions');
    const ageError = document.getElementById('ageError');
    const incomeError = document.getElementById('incomeError');
    const deductionsError = document.getElementById('deductionsError');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        ageError.title = '';
        incomeError.title = '';
        deductionsError.title = '';

        let valid = true;
        if (!age.value) {
            showError(age, ageError, 'Please select an age group.');
            valid = false;
        }
        if (!income.value) {
            showError(income, incomeError, 'Gross Annual Income is required.');
            valid = false;
        }
        if (!deductions.value) {
            showError(deductions, deductionsError, 'Deductions are required.');
            valid = false;
        }

        if (valid) {
            const tax = calculateTax(parseFloat(income.value), parseFloat(deductions.value), age.value);
            showModal(tax);
        }
    });

    function showError(input, errorElement, errorMessage) {
        errorElement.title = errorMessage;
        errorElement.style.display = 'block';
        errorElement.textContent = '!';
        input.classList.add('invalid-input');
        const errorTooltip = document.createElement('div');
        errorTooltip.classList.add('error-tooltip');
        errorTooltip.textContent = errorMessage;
        input.parentNode.appendChild(errorTooltip);
        input.addEventListener('input', function() {
            errorElement.style.display = 'none';
            input.classList.remove('invalid-input');
            input.parentNode.removeChild(errorTooltip);
        });
    }

    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName('close')[0];

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    function showModal(tax) {
        const taxResult = document.getElementById('taxResult');
        taxResult.innerHTML = `<p>Tax to be paid: ${tax.toFixed(2)} Lakhs</p>`;
        modal.style.display = 'block';
    }

    function calculateTax(income, deductions, age) {
        let taxableIncome = income + deductions - 8;
        if (taxableIncome <= 0) {
            return 0;
        } else {
            switch (age) {
                case '<40':
                    return 0.3 * taxableIncome;
                case '>=40&<60':
                    return 0.4 * taxableIncome;
                case '>=60':
                    return 0.1 * taxableIncome;
                default:
                    return 0;
            }
        }
    }
});
