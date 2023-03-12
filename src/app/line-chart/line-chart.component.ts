import {Component, OnInit} from '@angular/core';
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {SignalRService} from "../core/services/signal-r.service";
import {GraphValueContent} from "../core/domain/GraphValueContent";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  multi: any = []
  view: [number, number] = [1000, 500];
  xAxisLabel: string = 'Item';
  yAxisLabel: string = 'Value';
  noData = true;

  colorScheme: Color = {
    name: "Line-Drawer",
    selectable: false,
    group: ScaleType.Time,
    domain: ['#5AA454', '#E44D25', '#020444', '#7aa3e5', '#a8385d', '#aae3f5', '#A10CA8FF', '#A8930CFF', '020444FF']
  };

  constructor(private signalRService: SignalRService) {
    Object.assign(this, this.multi);
    this.multi = [];
  }

  ngOnInit(): void {
    this.signalRService.onMessageReceived.subscribe((message: GraphValueContent) => {
      let index = this.multi.findIndex((multiElement:any) => multiElement.name === message.graphName);
      if(index === -1){
        this.noData = false;
        index = this.multi.length;
        this.multi[index] = {
          "name": message.graphName,
          "series": []
        }
      }
      this.addData(message, index);
      Object.assign(this, this.multi)
    });
  }

  addData(message: GraphValueContent, index: number) {
    if(this.multi[index].series.length > 100){
      this.multi[index].series.shift();
    }

    const data =
      {
        "name": message.yAxis,
        "value": message.xAxis
      }
    this.multi[index].series.push(data);
    this.multi = [...this.multi];
  }

}
