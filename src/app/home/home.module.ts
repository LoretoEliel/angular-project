import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeContainer } from './containers/home/home.container';
import { HomeRoutingModule } from './home-route.routing';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  declarations: [HomeContainer],
})
export class HomeModule {}
