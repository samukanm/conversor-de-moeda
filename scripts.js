document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.querySelector('.convert-button');
    const primaryCurrencySelect = document.querySelector('.primary-currency-selection');
    const secondaryCurrencySelect = document.querySelector('.currency-select');
    const inputCurrency = document.querySelector('.input-currency');
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert');
    const currencyValue = document.querySelector('.currency-value');
    const currencyName = document.querySelector('#currency-name');

    const exchangeRates = {
        real: { dolar: 0.20, euro: 0.17, libra: 0.15, bitcoin: 0.0000047 },
        dolar: { real: 5.00, euro: 0.85, libra: 0.75, bitcoin: 0.000023 },
        euro: { real: 5.90, dolar: 1.18, libra: 0.88, bitcoin: 0.000027 },
        libra: { real: 6.70, dolar: 1.33, euro: 1.14, bitcoin: 0.000031 },
        bitcoin: { real: 210000, dolar: 43000, euro: 37000, libra: 33000 }
    };

    convertButton.addEventListener('click', () => {
        const primaryCurrency = primaryCurrencySelect.value;
        const secondaryCurrency = secondaryCurrencySelect.value;
        const amount = parseFloat(inputCurrency.value);

        if (!amount || amount <= 0) {
            alert('Por favor, insira um valor válido.');
            return;
        }

        if (primaryCurrency === secondaryCurrency) {
            alert('Por favor, selecione moedas diferentes para conversão.');
            return;
        }

        const conversionRate = exchangeRates[primaryCurrency][secondaryCurrency];
        const convertedAmount = (amount * conversionRate).toFixed(2);

        currencyValueToConvert.textContent = `${primaryCurrencySelect.selectedOptions[0].text.split(' ')[0]} ${amount.toLocaleString('pt-BR')}`;
        currencyValue.textContent = `${secondaryCurrencySelect.selectedOptions[0].text.split(' ')[0]} ${convertedAmount.toLocaleString('pt-BR')}`;
        currencyName.textContent = secondaryCurrencySelect.selectedOptions[0].text.split(' ')[1];
    });

    primaryCurrencySelect.addEventListener('change', updateCurrencyDisplay);
    secondaryCurrencySelect.addEventListener('change', updateCurrencyDisplay);

    function updateCurrencyDisplay() {
        const primaryCurrency = primaryCurrencySelect.value;
        const secondaryCurrency = secondaryCurrencySelect.value;
        const currencyData = {
            real: { name: "Real", img: "assets/REAL.png" },
            dolar: { name: "Dólar americano", img: "assets/USD.png" },
            euro: { name: "Euro", img: "assets/EUR.png" },
            libra: { name: "Libra", img: "assets/GBP.png" },
            bitcoin: { name: "Bitcoin", img: "assets/BTC.png" }
        };

        document.querySelector('.currency-img').src = currencyData[secondaryCurrency].img;
        document.querySelector('#currency-name').textContent = currencyData[secondaryCurrency].name;
        document.querySelector('.img').src = currencyData[primaryCurrency].img;
        document.querySelector('.currency').textContent = currencyData[primaryCurrency].name;
    }
});
