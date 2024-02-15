const yahooFinance = require('yahoo-finance2').default; // NOTE the .default

async function getStockPrices(stockSymbols) {
    try {
        let resultString = "";

        const stockQuotes = await yahooFinance.quote(stockSymbols);
        
        for(const quote of stockQuotes){
            var companyName = quote["displayName"]
            if (companyName == null){
                companyName = quote["shortName"]
            }
            const price = quote["regularMarketPrice"];
            const changeToday = quote["regularMarketChange"];
            var upOrDown = (changeToday > 0) ? 'up' : 'down';

            const stockInfoString = `${companyName} is at $${price}, which is ${upOrDown} $${Math.abs(changeToday)} today.\n`;
            resultString += stockInfoString;
        }
        return resultString.trim(); // Trimming any leading/trailing whitespace
    } catch (error) {
        console.error('Error fetching stock price:', error);
    }
}

(async () => {
    const stockSymbols = ["wm", "f", "cwst"];
    const stockInfo = await getStockPrices(stockSymbols);
    console.log(stockInfo);
})();