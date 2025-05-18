export interface Crypto {
    id: string;
    name: string;
    symbol: string;
    price_usd: string;
}

const API_URL = 'https://api.coinlore.net/api/tickers/';

export default {
    async getCryptos(): Promise<Crypto[]> {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
        }
        const json = await res.json();
        // Struktur respons: { data: Crypto[] }
        return json.data as Crypto[];
    }
};
