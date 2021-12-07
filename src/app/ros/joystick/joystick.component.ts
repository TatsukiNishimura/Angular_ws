import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgJoystickComponent } from 'ng-joystick';
import { RoslibService } from '../ros.service';
@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
})
export class JoystickComponent implements OnInit, AfterViewInit {
  @ViewChild('joystick') joystickComp: NgJoystickComponent;
  @ViewChild('joystick2') joystickComp2: NgJoystickComponent;
  constructor(private roslibService: RoslibService) {}
  ngOnInit(): void {}

  default_x_1: number = 500;
  default_y_1: number = 300;
  default_x_2: number = 700;

  ngAfterViewInit(): void {
    this.joystickComp.joystickMove$.subscribe((data) => {
      let joydata: number[] = [0, 0];
      let x1: number, y1: number, x2: number, y2: number;
      x1 = ((this.default_x_1 - data.clampedPos.x + 50) * 255) / 100;
      y1 = ((this.default_y_1 - data.clampedPos.y + 50) * 255) / 100;

      // this.joystickComp2.joystickMove$.subscribe((data2) => {
      //   x2 = ((this.default_x_2 - data2.clampedPos.x + 50) * 255) / 100;
      //   y2 = ((this.default_y_1 - data2.clampedPos.y + 50) * 255) / 100;
      //   if (joydata.length < 6) {
      //     joydata.push(x1, y1);
      //     joydata.push(x2, y2);
      //   }
      //   // this.roslibService.publishJoy(joydata);
      // });
      joydata.push(x1, y1);
      console.log(joydata);
      this.roslibService.publishJoy(joydata);
    });
  }
}
