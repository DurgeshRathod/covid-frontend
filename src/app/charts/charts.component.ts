import { Component, OnInit, ViewChild, Input, ElementRef, ChangeDetectorRef } from '@angular/core';

declare var Plotly: any;
declare var d3

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) { }

  @ViewChild("chart")
  chart: ElementRef;



  @Input()
  set _chartData(val) {
    if (val) {
      this.chartData = val

      this.rerender()
      
    }
  }


  @Input()
  set _chartLayout(val) {
    if (val) {
      this.chartLayout = val
      this.rerender();
      
    }
  };

  chartLayout = {}
  chartData:any ={}
  

  ngOnInit() {
    // this.renderGraph()
   
  }

  rerender() {
   
    Plotly.newPlot(this.chart.nativeElement, this.chartData, this.chartLayout ? this.chartLayout : {} )
  }
}
