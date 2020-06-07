import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalar/date.scalar';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';
import { RoolResolver } from './room.resolver';
import { RoomService } from './room.service';
import { ControllerService } from './controller.service';
import { ControllerResolver } from './controller.resolver';

@Module({
  providers: [
    DateScalar,
    DevicesResolver, DevicesService,
    RoolResolver, RoomService,
    ControllerResolver, ControllerService

  ],
})
export class DevicesModule {}