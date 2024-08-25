


document.addEventListener('DOMContentLoaded', () => {
    const convertButton = document.querySelector('.convert-button');
    const primaryCurrencySelect = document.querySelector('.primary-currency-selection');
    const secondaryCurrencySelect = document.querySelector('.currency-select');
    const inputCurrency = document.querySelector('.input-currency');
    const currencyValueToConvert = document.querySelector('.currency-value-to-convert');
    const currencyValue = document.querySelector('.currency-value');
    const currencyName = document.querySelector('#currency-name');

    async function getExchangeRates() {
        try {
            const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL");
            const data = await response.json();
            return {
                dolar: data.USDBRL.bid,
                euro: data.EURBRL.bid,
                bitcoin: data.BTCBRL.bid
            };
        } catch (error) {
            alert("Erro ao buscar dados de câmbio.");
            console.error(error);
        }
    }

    convertButton.addEventListener('click', async () => {
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

        const exchangeRates = await getExchangeRates();
        let conversionRate;

        if (primaryCurrency === 'real') {
            conversionRate = 1 / exchangeRates[secondaryCurrency];
        } else if (secondaryCurrency === 'real') {
            conversionRate = exchangeRates[primaryCurrency];
        } else {
            const rateToBRL = exchangeRates[primaryCurrency];
            const rateFromBRL = 1 / exchangeRates[secondaryCurrency];
            conversionRate = rateToBRL * rateFromBRL;
        }

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

