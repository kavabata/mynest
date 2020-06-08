import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { ScenariosArgs, NewScenarioInput } from './args/scenarios.args';
import { Scenario } from './models/scenario.model';
import { ScenariosService } from './scenarios.service';

const pubSub = new PubSub();

@Resolver(of => Scenario)
export class ScenarioResolver {
  constructor(private readonly scenarioService: ScenariosService) {}

  @Query(returns => Scenario)
  async scenario(@Args('id') id: number): Promise<Scenario> {
    const sensor = await this.scenarioService.findOneById(id);
    console.log('scenarioService???');
    if (!sensor) {
      // throw new NotFoundException(id);
    }
    return sensor;
  }

  @Query(returns => [Scenario])
  scenarios(@Args() scenariosArgsData: ScenariosArgs): Promise<Scenario[]> {
    return this.scenarioService.findAll(scenariosArgsData);
  }

  @Mutation(returns => Scenario)
  async addScenario(
    @Args('newScenarioData') newScenarioData: NewScenarioInput,
  ): Promise<Scenario> {
    const contoller = await this.scenarioService.create(newScenarioData);
    pubSub.publish('sensorAdded', { sensorAdded: contoller });
    return contoller;
  }

  @Mutation(returns => Boolean)
  async removeScenario(@Args('id') id: number) {
    return this.scenarioService.remove(id);
  }

  // @Subscription(returns => Scenario)
  // contollerAdded() {
  //   return pubSub.asyncIterator('contollerAdded');
  // }
}