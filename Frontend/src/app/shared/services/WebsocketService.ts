import { Injectable } from '@angular/core';
import { Subject, Observer, Observable } from 'rxjs/Rx';
@Injectable()
export class WebsocketService{
    public createWebsocket(): Subject<MessageEvent> {
        const socket = new WebSocket('ws://192.168.178.74:9003');
        const observable = Observable.create(
            (observer: Observer<MessageEvent>) => {
                socket.onmessage = observer.next.bind(observer);
                socket.onerror = observer.error.bind(observer);
                socket.onclose = observer.complete.bind(observer);
                return socket.close.bind(socket);
            }
        );
        const observer = {
            next: (data: Object) => {
                console.log(data);
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(data));
                }
            }
        };
        return Subject.create(observer, observable);
    }
}