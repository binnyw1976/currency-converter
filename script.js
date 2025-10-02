// Set max date to today
document.getElementById('date').max = new Date().toISOString().split('T')[0];

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const swapButton = document.getElementById('swap-currencies');
const dateInput = document.getElementById('date');
const convertedAmount = document.getElementById('converted-amount');
const exchangeRate = document.getElementById('exchange-rate');

// API Key for exchangerate-api.com
const API_KEY = 'e034e879e48ccbd730127fdc';

// Initial conversion
convertCurrency();

// Event Listeners
amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);
dateInput.addEventListener('change', convertCurrency);

swapButton.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
});

// Currency conversion function
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const date = dateInput.value || new Date().toISOString().split('T')[0];
    
    if (isNaN(amount) || amount < 0) {
        convertedAmount.textContent = 'Invalid amount';
        exchangeRate.textContent = 'Please enter a valid number';
        return;
    }
    
    // Show loading state
    convertedAmount.textContent = 'Converting...';
    exchangeRate.textContent = 'Fetching exchange rate...';
    
    try {
        // In a real application, you would use the API like this:
        // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        // const data = await response.json();
        // const rate = data.rates[to];
        
        // For demo purposes, we'll use mock data
        const mockRates = {
            'USD': { 'EUR': 0.925, 'GBP': 0.79, 'JPY': 110.5, 'CAD': 1.25, 'AUD': 1.35, 'CHF': 0.92, 'CNY': 6.45, 'INR': 74.5 },
            'EUR': { 'USD': 1.08, 'GBP': 0.85, 'JPY': 119.5, 'CAD': 1.35, 'AUD': 1.46, 'CHF': 0.99, 'CNY': 6.97, 'INR': 80.5 },
            'GBP': { 'USD': 1.27, 'EUR': 1.18, 'JPY': 140.0, 'CAD': 1.58, 'AUD': 1.71, 'CHF': 1.16, 'CNY': 8.16, 'INR': 94.3 },
            'JPY': { 'USD': 0.00905, 'EUR': 0.00837, 'GBP': 0.00714, 'CAD': 0.0113, 'AUD': 0.0122, 'CHF': 0.0083, 'CNY': 0.0584, 'INR': 0.674 },
            'CAD': { 'USD': 0.80, 'EUR': 0.74, 'GBP': 0.63, 'JPY': 88.5, 'AUD': 1.08, 'CHF': 0.74, 'CNY': 5.16, 'INR': 59.6 },
            'AUD': { 'USD': 0.74, 'EUR': 0.685, 'GBP': 0.585, 'JPY': 82.0, 'CAD': 0.925, 'CHF': 0.685, 'CNY': 4.78, 'INR': 55.2 },
            'CHF': { 'USD': 1.087, 'EUR': 1.01, 'GBP': 0.862, 'JPY': 120.5, 'CAD': 1.35, 'AUD': 1.46, 'CNY': 7.01, 'INR': 81.0 },
            'CNY': { 'USD': 0.155, 'EUR': 0.143, 'GBP': 0.122, 'JPY': 17.12, 'CAD': 0.194, 'AUD': 0.209, 'CHF': 0.143, 'INR': 11.55 },
            'INR': { 'USD': 0.0134, 'EUR': 0.0124, 'GBP': 0.0106, 'JPY': 1.48, 'CAD': 0.0168, 'AUD': 0.0181, 'CHF': 0.0123, 'CNY': 0.0866 }
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let rate;
        if (from === to) {
            rate = 1;
        } else if (mockRates[from] && mockRates[from][to]) {
            rate = mockRates[from][to];
        } else {
            throw new Error('Exchange rate not available');
        }
        
        const result = amount * rate;
        
        // Format numbers
        const formattedAmount = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(result);
        
        const formattedRate = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        }).format(rate);
        
        // Update UI
        convertedAmount.textContent = `${formattedAmount} ${to}`;
        exchangeRate.textContent = `1 ${from} = ${formattedRate} ${to}`;
        
    } catch (error) {
        console.error('Error converting currency:', error);
        convertedAmount.textContent = 'Conversion failed';
        exchangeRate.textContent = 'Please try again later';
    }
}

// Real API integration function (commented out for demo)
/*
async function fetchRealExchangeRate(from, to, date = null) {
    try {
        let url;
        if (date) {
            // Historical data endpoint
            url = `https://api.exchangerate-api.com/v4/history/${from}/${date}`;
        } else {
            // Latest rates endpoint
            url = `https://api.exchangerate-api.com/v4/latest/${from}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.rates && data.rates[to]) {
            return data.rates[to];
        } else {
            throw new Error('Exchange rate not available');
        }
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error;
    }
}
*/