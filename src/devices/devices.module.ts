import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalar/date.scalar';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';
import { RoolResolver } from './room.resolver';
import { RoomService } from './room.service';
import { ControllerService } from './controller.service';
import { ControllerResolver } from './controller.resolver';
import { SensorService } from './sensors.service';
import { SensorResolver } from './sensors.resolver';
import { ScenariosService } from './scenarios.service';
import { ScenarioResolver } from './scenarios.resolver';

@Module({
  providers: [
    DateScalar,
    DevicesResolver, DevicesService,
    RoolResolver, RoomService,
    ControllerResolver, ControllerService,
    SensorService, SensorResolver,
    ScenariosService, ScenarioResolver
  ],
})
export class DevicesModule {}