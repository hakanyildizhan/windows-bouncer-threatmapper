import { Injectable } from '@nestjs/common';
import { ThreatDto } from './threat.dto';
import { Threat } from './threat.entity';

@Injectable()
export class ThreatService {
    private readonly Data = require('../../data')

    async findAllThreats() {
      let processedData: ThreatDto[] = []
      for (let i = 0; i < this.Data.length; i++) {
        if (!this.Data[i].Latitude || !this.Data[i].Longtitude) {
          continue;
        }

        let point: ThreatDto = new ThreatDto()
        point.attemptDate = this.Data[i].Date;
        point.attemptedLogin = this.Data[i].Login;
        
        if (this.Data[i].IpInfo.city) {
          point.city = this.Data[i].IpInfo.city;
        } else {
          point.city = "Unknown"
        }

        point.country = this.Data[i].Country
        point.countryFlag = this.Data[i].IpInfo.emoji_flag
        point.ip = this.Data[i].Ip

        if (!this.Data[i].IpInfo.asn) {
          point.isp = "Unknown"
          point.type = "Unknown"
        } else {
          if (this.Data[i].IpInfo.asn.name) {
            point.isp = this.Data[i].IpInfo.asn.name
          } else if (this.Data[i].IpInfo.asn.domain) {
            point.isp = this.Data[i].IpInfo.asn.domain
          } else {
            point.isp = "Unknown"
          }

          if (this.Data[i].IpInfo.asn.type) {
            point.type = this.Data[i].IpInfo.asn.type
          } else {
            point.type = "Unknown"
          }
        }

        point.lat = this.Data[i].Latitude
        point.lon = this.Data[i].Longtitude
        point.isKnownAbuser = this.Data[i].IpInfo.threat.is_known_abuser
        point.isKnownAttacker = this.Data[i].IpInfo.threat.is_known_attacker
        processedData.push(point)
      }

      return processedData
    }
}
