import { jwtDecode } from 'jwt-decode'
import { DecodedToken } from '@/models/jwt';
export function checkIfTokenExpired(token: string): boolean {
    if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        console.log(decodedToken);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp ? decodedToken.exp < currentTime : true;
    }
    return false;
}