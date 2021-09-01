import { Injectable } from '@angular/core';
import * as ROSLIB from 'roslib';
import { Subject, Observable } from 'rxjs';

// Here you define the type (as in your .msg, but in Typescript)
export interface String {
  data: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoslibService {
  private _ros: ROSLIB.Ros;
  private _connected = new Subject<boolean>();
  private _chat = new Subject<String>();

  private _topic?: ROSLIB.Topic;

  constructor() {
    this._connected.next(false);

    this._ros = new ROSLIB.Ros({});
    this._ros.connect('ws://127.0.0.1:9090');
    this._ros.on('connection', (event: any) => {
      this._connected.next(true);
      this.subscribeToTopics();
      this.publishMsgToTopics();
    });
    // TODO : Manage the events "disconnect" and "error".
  }

  get connected(): Observable<boolean> {
    return this._connected.asObservable();
  }

  get chat(): Observable<String> {
    return this._chat.asObservable();
  }

  private subscribeToTopics() {
    this._topic = new ROSLIB.Topic({
      ros: this._ros,
      name: '/chat',
      messageType: 'std_msgs/String',
    });
    this._topic.subscribe((msg: String) => {
      this._chat.next(msg);
    });
  }

  publishMsgToTopics(): void {
    this._topic = new ROSLIB.Topic({
      ros: this._ros,
      name: '/Angular_Ros_msg',
      messageType: 'std_msgs/String',
    });
  }
  publish(msg: string): void {
    const Message: String = { data: msg };
    this._topic.publish(Message);
  }
}
