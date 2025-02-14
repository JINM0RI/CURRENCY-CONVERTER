document.addEventListener("DOMContentLoaded", function () {
    const Currencytype1 = document.getElementById("first");
    const Currencytype2 = document.getElementById("second");
    const inputRate = document.getElementById("input-rate");
    const convertRate = document.getElementById("convert-rate");
    const convertButton = document.getElementById("convertion_button");

    async function fetchExchangeRate(base, to, amount) {
        const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base.toLowerCase()}.json`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("API request failed");

            const data = await response.json();
            if (data[base.toLowerCase()] && data[base.toLowerCase()][to.toLowerCase()]) {
                return data[base.toLowerCase()][to.toLowerCase()] * amount;
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
        const base = Currencytype1.value;
        const to = Currencytype2.value;
        const amount = parseFloat(inputRate.value);

        if (!base || !to || isNaN(amount) || amount <= 0) {
            alert("Please select valid currencies and enter a valid amount.");
            convertRate.value = "";
            return;
        }

        const convertedAmount = await fetchExchangeRate(base, to, amount);
        if (convertedAmount !== null) {
            convertRate.value = convertedAmount.toFixed(2);
        } else {
            convertRate.value = "Error";
        }
    }

    convertButton.addEventListener("click", convertCurrency);
});
