import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClientService } from './client.service';
import { CovidData } from 'src/Models/CovidData';
import * as _ from "lodash"
import DateUtils from 'src/Utils/DateUtils';
import { Formats } from 'src/Utils/Formats';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private client:ClientService,private cd:ChangeDetectorRef) { }

  selectedState = "Maharashtra"
  States:string[] = [];
  raw_data:CovidData[] = [];
  barChart15DayData:any = {};
  barChartAgeRangeData:any = {};
  charts:any[] = []

  ngOnInit() {
    this.client.getCovidData().then((data:any)=>{
      this.raw_data = data.raw_data;
      this.States = this.raw_data.map((rd:CovidData)=>{
        return rd.detectedstate
      })
      this.States = _.uniqBy(this.States, function (e) {
        return e;
      });
      this.createGraph()
      this.cd.detectChanges();
    })
  }

  createGraph(){
    this.charts = []
    let _dateUtils = new DateUtils()
    let currDt = new Date();
    currDt.setDate(currDt.getDate() - 15);
    let date15daysAgo = _dateUtils.formatDate(currDt,Formats.dateHash,true);
    
    let selectedStateData = _.cloneDeep(this.raw_data.filter((rd:any)=>{ return rd.detectedstate == this.selectedState })).map((raw_data:any)=>{
      let dt = _dateUtils.formatDate(_dateUtils.parseDate(raw_data.dateannounced,Formats.covidDateFormat,true),Formats.dateHash,true)
      _.set(raw_data,"dateannounced",dt);
      return raw_data;
    });

    let dataof15Days = selectedStateData.filter((f:any)=>{ return f.dateannounced >= date15daysAgo})
    let chart15DayData = _.countBy(dataof15Days, 'dateannounced')
    this.barChart15DayData = {
      chartData: [{
        x: Object.keys(chart15DayData).map((d)=>{return _dateUtils.formatDate(_dateUtils.parseDate(d,Formats.dateHash,true),Formats.covidDateFormat,true)}),
        y: Object.keys(chart15DayData).map((key)=>{return chart15DayData[key]}),
        type: 'bar',
        name: "new count",
        marker: {
        color: 'rgb(128,255,0)'
      }
      }],
      chartLayout:  {
        hovermode: true,
        barmode: 'group',
        yaxis: {
          title: 'NEW PATIENTS'
        }
      },
      tools: []
    }

    let ageRangeData =  _.countBy(selectedStateData.filter((f)=>{return f["agebracket"]?true:false}).map((d)=>{_.set(d,"agebracket",(Math.floor(parseInt(d["agebracket"])/10)).toString()+"0"); return d;}), 'agebracket')
    // _.countBy(selectedStateData, 'agebracket')
    let startCount = 0;

    this.barChartAgeRangeData = {
      chartData: [{
        x: Object.keys(ageRangeData),
        y: Object.keys(ageRangeData).map((key)=>{return ageRangeData[key]}),
        type: 'bar',
        name: "new count",
        marker: {
        color: 'rgb(128,255,0)'}
      }],
      chartLayout:  {
        hovermode: true,
        barmode: 'group',
        yaxis: {
          title: 'Count'
        },
        xaxis:{
          title:"Age Bracket"
        }
      },
      tools: []
    }
    console.log('barChartAgeRangeData',this.barChartAgeRangeData)  
    console.log('barChart15DayData',this.barChart15DayData)  
    this.charts.push(this.barChart15DayData)
    this.charts.push(this.barChartAgeRangeData)
    this.cd.detectChanges();
  }

}
