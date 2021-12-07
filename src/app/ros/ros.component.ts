import { Component, OnInit } from '@angular/core';
import { String, RoslibService } from './ros.service';
@Component({
  selector: 'app-ros',
  templateUrl: './ros.component.html',
  styleUrls: ['./ros.component.scss'],
})
export class RosComponent implements OnInit {
  title = 'ng-roslib';
  bgcolor = '#deeaf7';
  active = 1;
  connected = false;
  message = '';
  chiika: boolean = false;
  constructor(private roslibService: RoslibService) {
    this.roslibService.chat.subscribe((msg: String) => {
      this.message = msg.data;
    });
    this.roslibService.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    });
  }
  publishMsg(msg: string): void {
    console.log(msg);
    if (msg.indexOf('R18') > -1 || msg.indexOf('r18') > -1) {
      this.bgcolor = '#FFC0CB';
      this.chiika = true;
    } else {
      this.chiika = false;
      this.bgcolor = '#deeaf7';
    }
    this.roslibService.publish(msg);
  }
  ngOnInit(): void {}
}
