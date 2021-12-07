import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JoystickComponent } from './ros/joystick/joystick.component';
import { RosComponent } from './ros/ros.component';

const routes: Routes = [
  { path: 'ros', component: RosComponent },
  { path: 'joystick', component: JoystickComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
