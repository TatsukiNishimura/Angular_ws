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
  // SubjectはObservableとObserverの両方の役目を果たす
  // このオブジェクトにnext関数でデータを投げると同期的に反映される
  private _connected: Subject<boolean> = new Subject<boolean>();
  private _error: Subject<boolean> = new Subject<boolean>();
  private _chat = new Subject<String>();
  private _topic?: ROSLIB.Topic;
  private roscoreIp: string = '127.0.0.1';

  constructor() {
    this._connected.next(false);
    this._error.next(false);
    this._ros = new ROSLIB.Ros({});

    this._ros.connect(`ws://${this.roscoreIp}:9090`);
    this._ros.on('connection', (event: any) => {
      this._connected.next(true);
      console.log('connected');
      this.subscribeToTopics();
      this.publishMsgToTopics();
    });
    this._ros.on('error', (error: any) => {
      this._error.next(true);
      console.log('connection error', error);
    });
    this._ros.on('close', (close: any) => {
      this._connected.next(false);
      console.log('close');
    });
  }

  /**
   * @readonly
   * @type {Observable<boolean>}
   * @memberof RoslibService
   * Subjectオブジェクトを取得する
   * なぜasObservableでObservableとして渡すのかというと、DI先で
   * next()などの関数を使って値を書き換えられないように機能を
   * 制限するため
   * 参考:https://www.l08084.com/entry/2021/04/04/181407#%E3%81%8A%E3%81%BE%E3%81%91-%E3%81%A9%E3%81%86%E3%81%97%E3%81%A6Subject%E3%81%ABasObservable%E3%81%8C%E5%BF%85%E8%A6%81%E3%81%AA%E3%81%AE%E3%81%8B
   */
  get connected(): Observable<boolean> {
    return this._connected.asObservable();
  }

  /**
   *
   *
   * @readonly
   * @type {Observable<String>}
   * @memberof RoslibService
   */
  get chat(): Observable<String> {
    return this._chat.asObservable();
  }

  /**
   *
   *
   * @private
   * @memberof RoslibService
   */
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

  /**
   *
   *
   * @memberof RoslibService
   */
  publishMsgToTopics(): void {
    this._topic = new ROSLIB.Topic({
      ros: this._ros,
      name: '/Angular_Ros_msg',
      messageType: 'std_msgs/String',
    });
  }

  /**
   *
   *
   * @param {string} msg
   * @memberof RoslibService
   */
  publish(msg: string): void {
    const Message: String = { data: msg };
    this._topic.publish(Message);
  }
}
