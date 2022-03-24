export class ThreatDto {

    lat: number;
    lon: number;
    city: string;
    country: string;
    countryFlag: string;
    ip: string;
    isp: string;
    type: string;
    attemptedLogin: string;
    attemptDate: Date;
    isKnownAttacker: boolean;
    isKnownAbuser: boolean;
}