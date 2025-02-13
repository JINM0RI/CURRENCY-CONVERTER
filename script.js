document.addEventListener("DOMContentLoaded", function () {
    const firstCurrency = document.getElementById("first");
    const secondCurrency = document.getElementById("second");
    const inputRate = document.getElementById("input-rate");
    const convertRate = document.getElementById("convert-rate");
    const convertButton = document.getElementById("convertion_button");

    async function fetchExchangeRate(base, to, amount) {
        const url = `https://api.exchangerate-api.com/v4/latest/${base}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("API request failed");

            const data = await response.json();
            if (data.rates[to]) {
                return data.rates[to] * amount;
            } else {
                throw new Error("Invalid currency response");
            }
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
            alert("Failed to fetch exchange rate. Please try again.");
            return null;
        }
    }

    async function convertCurrency() {
        const base = firstCurrency.value;
        const to = secondCurrency.value;
        const amount = parseFloat(inputRate.value);

        if (!base || !to || isNaN(amount) || amount <= 0) {
            alert("Please select valid currencies and enter a valid amount.");
            convertRate.value = "";
            return;
        }

        const convertedAmount = await fetchExchangeRate(base, to, amount);
        if (convertedAmount !== null) {
            convertRate.value = Math.round(convertedAmount);
        } else {
            convertRate.value = "Error";
        }
    }

    convertButton.addEventListener("click", convertCurrency);
});
