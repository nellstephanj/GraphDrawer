import {Component} from '@angular/core';
import {multi} from '../data';
import {SignalRService} from "../core/services/signal-r.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  startedStreaming = false;

  constructor(
    public signalRService: SignalRService,
  ) {
    Object.assign(this, {multi});
    this.signalRService.startConnection();
    this.signalRService.addGraphValueListener();
  }

  startReceiving() {
    this.signalRService.startConnection();
    this.startedStreaming = true;
  }
}






