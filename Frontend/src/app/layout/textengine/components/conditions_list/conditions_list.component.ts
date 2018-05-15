import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { WebsocketService } from '../../../../shared/services/WebsocketService';
import { Service } from '../../../../shared/services/intervalService';
import { Subject, Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-conditions_list',
  templateUrl: './conditions_list.component.html',
    providers: [WebsocketService, Service],
  styleUrls: ['./conditions_list.component.scss'],

})

export class ConditionsListComponent implements OnInit {
    description: string;
    title: string;
    private socket: Subject<any>;
    private start: number;
    conditions: object;


  constructor(private http: HttpClient, websocketService: WebsocketService, private service: Service) {
      this.socket = websocketService.createWebsocket();
      this.conditions = [
          {'title': 'Example Title', 'description': 'Example Data'},
          {'title': 'Example Title', 'description': 'Example Data'},
      ];
  }

  ngOnInit() {

  }

  public getConditions() {
      let data : Observable<any>;
      this.http.get('http://192.168.2.103:8801/conditions').subscribe(data => {
          this.conditions = JSON.parse(data['body']);
      });
  }

  public ws_getConditions() {
      let data : Observable<any>;
      this.http.get('http://192.168.2.103:8801/wsconditions').subscribe(data => {
          this.conditions = JSON.parse(data['body']);
      });
  }

  public deleteCondition(id) {
      let data : Observable<any>;
      this.http.delete('http://192.168.2.103:8801/conditions/' + id).subscribe(data => {
          this.getConditions();
      });
  }

  public ws_deleteCondition(id) {
      let data : Observable<any>;
      this.http.delete('http://192.168.2.103:8801/wsconditions/' + id).subscribe(data => {
          this.getConditions();
      });
  }

  public deleteAllConditions() {
      let data : Observable<any>;
      this.http.delete('http://192.168.2.103:8801/conditions/all').subscribe(data => {
          console.log('Data from Delete: ', data);

          this.getConditions();
      });
  }

  public saveText() {

      let data: Observable<any>;   // define observable object
      const body = {title: this.title, description: this.description};  // set data which will be send in request
      this.http.post('http://192.168.2.103:8801/condition', body).subscribe(data => {
          this.conditions = JSON.parse(data['body']);
      });



      this.title =  '';
      this.description = '';
  }

  public ws_saveText() {
      let data: Observable<any>;   // define observable object
      const body = {title: this.title, description: this.description};  // set data which will be send in request
      this.http.post('http://192.168.2.103:8801/wscondition', body).subscribe(data => { });
      this.title =  '';
      this.description = '';
  }


}
