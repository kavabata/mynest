import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalar/date.scalar';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';
import { RoolResolver } from './room.resolver';
import { RoomService } from './room.service';

@Module({
  providers: [DevicesResolver, DevicesService, DateScalar, RoolResolver, RoomService],
})
export class DevicesModule {}