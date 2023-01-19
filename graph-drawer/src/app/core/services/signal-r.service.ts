import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {GraphValueContent} from "../domain/GraphValueContent";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private readonly hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/graph')
      .configureLogging(signalR.LogLevel.Trace)
      .build();
    this.startConnection();
  }

  startConnection = () => {
    this.hubConnection.start()
      .then(() => console.log('Connection with Graph Information Hub started'))
      .catch(err => console.log(`Error while starting connection with Graph Information Hub: ${err}`));
  };

  stopConnection = () => {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => {
        console.log('Connection closed with Graph Information Hub');
      });
    }
  };

  addGraphValueListener = () => {
    this.hubConnection.on('sendValue', (content: GraphValueContent) => {
      console.log(content);
    })
  };
}
