import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject, Observable, Subscription } from 'rxjs/Rx';

@Injectable()

export class Service {

    constructor(private http: HttpClient) { }

    public start: number;
    public end: number;

    getNewValue = () => {
        this.start = (new Date).getTime();
        return Observable
            .interval(5000)
            .flatMap((i) => this.http.get('http://192.168.178.74:8801/conditions'));
    }
}
