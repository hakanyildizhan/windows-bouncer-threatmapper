import { Module } from '@nestjs/common';
import { ThreatService } from './threat.service';
import { ThreatController } from './threat.controller';

@Module({
  controllers: [ThreatController],
  providers: [ThreatService]
})
export class ThreatModule {}
