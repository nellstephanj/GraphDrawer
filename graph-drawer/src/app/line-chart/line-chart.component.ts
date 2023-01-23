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
  view: [number, number] = [700, 300];
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
    this.multi = [{
      "name": "Graph Drawer",
      "series": []
    }];
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
      this.multi[0].name = message.graphName;
      Object.assign(this, this.multi)
      // TODO: Transform data for graph
      this.addData(message)
    });
  }

  addData(message: GraphValueContent) {
    if(this.multi[0].series.length > 1000){
      this.multi[0].series.shift();
    }

    const data =
      {
        "name": message.yAxis,
        "value": message.xAxis
      }
    this.multi[0].series.push(data);
    this.multi = [...this.multi];
  }

}
