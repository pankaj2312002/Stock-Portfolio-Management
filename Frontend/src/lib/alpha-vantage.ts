import axios from "axios";

// Define types for Time Series Data
export type TimeSeriesData = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};

// Define types for Time Series Response
export type TimeSeriesResponse = {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": Record<string, TimeSeriesData>;
};

// Define types for Global Quote
export type GlobalQuote = {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
};

// Define types for Global Quote Response
export type GlobalQuoteResponse = {
  "Global Quote": GlobalQuote;
};

// Define types for Search Result
export type SearchResult = {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
};

// Define types for Search Response
export type SearchResponse = {
  bestMatches: SearchResult[];
};

// Retrieve API key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || "demo";
const BASE_URL = "https://www.alphavantage.co/query";

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Function to get Time Series data
export async function getTimeSeries(
  symbol: string,
  outputSize: "compact" | "full" = "compact"
): Promise<TimeSeriesResponse> {
  try {
    const response = await api.get("", {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol,
        outputsize: outputSize,
      },
    });
    return response.data as TimeSeriesResponse;
  } catch (error) {
    console.error("Error fetching time series data:", error);
    throw new Error(
      `Failed to fetch time series data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Function to get Global Quote data
export async function getGlobalQuote(
  symbol: string
): Promise<GlobalQuoteResponse> {
  try {
    const response = await api.get("", {
      params: {
        function: "GLOBAL_QUOTE",
        symbol,
      },
    });
    return response.data as GlobalQuoteResponse;
  } catch (error) {
    console.error("Error fetching global quote:", error);
    throw new Error(
      `Failed to fetch global quote: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Function to search for symbols
export async function searchSymbol(
  keywords: string
): Promise<SearchResponse> {
  try {
    const response = await api.get("", {
      params: {
        function: "SYMBOL_SEARCH",
        keywords,
      },
    });
    return response.data as SearchResponse;
  } catch (error) {
    console.error("Error searching symbols:", error);
    throw new Error(
      `Failed to search symbols: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// List of Indian market indices
export const INDIAN_INDICES = [
  { symbol: "^NSEI", name: "Nifty 50", exchange: "NSE" },
  { symbol: "^BSESN", name: "BSE Sensex", exchange: "BSE" },
  { symbol: "^NSEBANK", name: "Nifty Bank", exchange: "NSE" },
  { symbol: "^CNXIT", name: "Nifty IT", exchange: "NSE" },
  { symbol: "^CNXAUTO", name: "Nifty Auto", exchange: "NSE" },
];

// List of popular Indian stocks
export const POPULAR_INDIAN_STOCKS = [
  { symbol: "RELIANCE.BSE", name: "Reliance Industries", exchange: "BSE" },
  { symbol: "TCS.BSE", name: "Tata Consultancy Services", exchange: "BSE" },
  { symbol: "HDFCBANK.BSE", name: "HDFC Bank", exchange: "BSE" },
  { symbol: "INFY.BSE", name: "Infosys", exchange: "BSE" },
  { symbol: "HINDUNILVR.BSE", name: "Hindustan Unilever", exchange: "BSE" },
  { symbol: "ICICIBANK.BSE", name: "ICICI Bank", exchange: "BSE" },
  { symbol: "SBIN.BSE", name: "State Bank of India", exchange: "BSE" },
  { symbol: "BHARTIARTL.BSE", name: "Bharti Airtel", exchange: "BSE" },
  { symbol: "KOTAKBANK.BSE", name: "Kotak Mahindra Bank", exchange: "BSE" },
  { symbol: "TATAMOTORS.BSE", name: "Tata Motors", exchange: "BSE" },
];
