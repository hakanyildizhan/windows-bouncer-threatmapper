import { Controller, Get, Post, Body } from '@nestjs/common';
import { ThreatService } from './threat.service';

@Controller('threat')
export class ThreatController {
  constructor(private readonly threatService: ThreatService) {}

  @Get()
   async get() {
    const threats = await this.threatService.findAllThreats();
      return threats;
  }
}
