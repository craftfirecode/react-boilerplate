import axios from 'axios';
import qs from 'qs';

class ApiService {
    apiUrl: string;

    constructor() {
        this.apiUrl = 'https://headless.mapztour.de/';
    }

    async fetchGet(path: any, urlParamsObject: any) {
        try {
            const queryString = qs.stringify(urlParamsObject);
            const requestUrl = `${this.apiUrl}/api${path}${queryString ? `?${queryString}` : ""}`;

            const headers = {
                Authorization: 'Bearer ' + '1ccae18636a4041f71b524f6c0663372ec0fb092ade356991a2c0d533d482a72f811049572540a81ec52dc9bf0b5e5ab39c10e6d31d059f08f0d773ed5b27712a0c83081043bef33a82e07d5dc9eec21b829383d49080b71abaa96643eaa2de0894d896af7807972c846fba1928fd6ff0e0f623847025229c907c6665b58315f', // Passe dies entsprechend an
            };

            const response = await axios.get(requestUrl, { headers });
            return response.data;
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
            throw error; // Wirf den Fehler weiter, damit er von außen behandelt werden kann
        }
    }
}

export default new ApiService();
