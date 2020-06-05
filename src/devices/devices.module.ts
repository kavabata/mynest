import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalar/date.scalar';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';

@Module({
  providers: [DevicesResolver, DevicesService, DateScalar],
})
export class DevicesModule {}