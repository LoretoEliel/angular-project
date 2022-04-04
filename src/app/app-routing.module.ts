import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutHomeComponent } from './layout/layout-home/layout-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: LayoutHomeComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'empleados',
    component: LayoutHomeComponent,
    loadChildren: () => import('./employes/employes.module').then((m) => m.EmployesModule),
  },
  {
    path: 'demo',
    component: LayoutHomeComponent,
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
