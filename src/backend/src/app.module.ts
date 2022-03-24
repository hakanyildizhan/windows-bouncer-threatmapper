import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThreatModule } from './threat/threat.module';

@Module({
  imports: [ThreatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
