import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgJoystickComponent } from 'ng-joystick';
@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
})
export class JoystickComponent implements OnInit, AfterViewInit {
  @ViewChild('joystick') joystickComp: NgJoystickComponent;
  @ViewChild('joystick2') joystickComp2: NgJoystickComponent;
  constructor() {}
  ngOnInit(): void {}

  default_x_1: number = 500;
  default_y_1: number = 300;
  default_x_2: number = 700;

  ngAfterViewInit(): void {
    this.joystickComp.joystickMove$.subscribe((data) =>
      console.log(
        this.default_x_1 - data.clampedPos.x,
        this.default_y_1 - data.clampedPos.y
      )
    );
    this.joystickComp2.joystickMove$.subscribe((data) =>
      console.log(
        this.default_x_2 - data.clampedPos.x,
        this.default_y_1 - data.clampedPos.y
      )
    );
  }
}
