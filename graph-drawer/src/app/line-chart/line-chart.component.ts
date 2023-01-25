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

  colorScheme: Color = {
    name: "Line-Drawer",
    selectable: false,
    group: ScaleType.Time,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private signalRService: SignalRService) {
    Object.assign(this, this.multi);
    this.multi = [];
  }

  onSelect(data: any[]): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any[]): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any[]): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.signalRService.onMessageReceived.subscribe((message: GraphValueContent) => {
      console.log(message);
      let index = this.multi.findIndex((multiElement:any) => multiElement.name === message.graphName);
      if(index === -1){
        index = this.multi.length;
        this.multi[index] = {
          "name": message.graphName,
          "series": []
        }
      }
      // TODO: Transform data for graph
      this.addData(message, index);
      Object.assign(this, this.multi)
    });
  }

  addData(message: GraphValueContent, index: number) {
    if(this.multi[index].series.length > 1000){
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
