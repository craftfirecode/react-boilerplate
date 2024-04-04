import axios from 'axios';
import qs from 'qs';

class ApiService {
    apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:1337';
    }

    async fetchGet(path: any, urlParamsObject: any) {
        try {
            const queryString = qs.stringify(urlParamsObject);
            const requestUrl = `${this.apiUrl}/api${path}${queryString ? `?${queryString}` : ""}`;

            const headers = {
                Authorization: 'Bearer ' + 'e6e60e40786b183ed463b3e5ab541db15f1e3da314f0d9b52e2abc27491ed01a8a3d353f24745e085b7a1ab77b1e3c2a2accc281f708e9195860939793763a68380a99b08aa0c26bc85119b2875e20aaae52d6437815f25b86c0397b533c46a166b561ab8ff267d62893aea7d23d38071c7af0cea82f4b118435b99527ceaf89', // Passe dies entsprechend an
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
