export class Threat {
    Ip: string;
    Country: string;
    Latitude: number;
    Longtitude: number;
    Login: string;
    Date: Date;
    IpInfo: IpInfo;
}

export class IpInfo {
    ip: string;
    is_eu: boolean;
    country_name: string;
    country_code: string;
    continent_name: string;
    continent_code: string;
    latitude: number;
    longtitude: number;
    asn: Asn;
    calling_code: string;
    flag: string;
    emoji_flag: string;
    emoji_unicode: string;
    languages: Language[];
    threat: Threat;
}

export class Asn {
    asn: string;
    name: string;
    domain: string;
    route: string;
    type: string;
}

export class Language {
    name: string
}

export class ThreatDetails {
    is_tor: boolean;
    is_proxy: boolean;
    is_anonymous: boolean;
    is_known_attacker: boolean;
    is_known_abuser: boolean;
    is_threat: boolean;
    is_bogon: boolean;
}