'use strict';

import {App} from './App.js'
import {Chart} from './Chart.js'

var handler = function(app, data, error) {
  if (error) {
    console.log('Error' + error);
    return;
  }
  
  
  
  

  app.print("15min example")
  app.printHTML(`<div id="chart1"></div>`);
  var chart1 = new Chart('line')
  chart1.forceY(0);
  chart1.setData([{key: 'kWH', values: data.alldays['20190901'].data, color: "#ff7f0e"}])
  chart1.getxAxis().axisLabel("Time (s)");
  chart1.getxAxis().tickFormat(function(d) { return d3.time.format('%H:%M')(new Date(d));  })
  chart1.getxAxis().staggerLabels(true)
  chart1.getyAxis().axisLabel('kWH')
  chart1.getyAxis().tickFormat(function(d) { return (d == null) ? 'N/A' : d3.format(',.2f')(d); })
  chart1.updateChartOnResize = true;
  chart1.setManualUpdate( (chart, d3) => {
    console.log("handled")
  });
  chart1.attachToDiv('#chart1');

  app.print("All Month Max Peak")
  app.printHTML(`<div id="chart2"></div>`);
  var chart2 = new Chart('multibar')
  chart2.setData([{key: 'MaxPeak', values: Object.entries(data.allmonth).map( ([k,v]) => { return {x:v.data[0].x, y:v.stat.max} }), color: "#ff7f0e"}])
  chart2.getxAxis()
    .tickFormat(function(d) { return d3.time.format('%b %Y')(new Date(d)); })
    .axisLabel("Month").showMaxMin(true)
  chart2.updateChartOnResize = false;
  chart2.setManualUpdate( (chart, d3) => {
    d3.selectAll('#chart2 rect.nv-bar')
      .style('fill', function(each, i){
        if (each.y > 30  )
           return 'red'
        return 'gray';
      })
    d3.selectAll("#chart2 rect.nv-bar").on('click',
      function(e){
        console.log(chart);
          console.log(e);
      });
  });
  chart2.attachToDiv('#chart2');

  app.print("All Month Max Peak 333")
  app.printHTML(`<div id="chart3"></div>`);
  var chart3 = new Chart('multibar')
  chart3.setData([{key: 'MaxPeak', values: Object.entries(data.alldays).slice(0,-1).map( ([k,v]) => { return {x:v.data[0].x, y:v.stat.max} }), color: "#ff7f0e"}])
  chart3.getxAxis().tickFormat(function(d) { return d3.time.format('%m/%d/%Y')(new Date(d)); })
  chart3.getxAxis().axisLabel("Month").showMaxMin(true)
  chart3.updateChartOnResize = true;
  chart3.setManualUpdate( (chart, d3) => {
    d3.selectAll('#chart3 rect.nv-bar')
      .style('fill', function(each, i){
        if (each.y > 30  )
           return 'red'
        return 'gray';
      })
    d3.selectAll("#chart3 rect.nv-bar").on('click',
      function(e){
        console.log(chart);
          console.log(e);
      });
  });
  chart3.attachToDiv('#chart3');


  app.print("15min example - 4 to 9pm")
  app.printHTML(`<div id="chart4"></div>`);
  var chart4 = new Chart('line')
  chart4.forceY(0);
  chart4.setData([{key: '15 Min data', values: data.alldays_1621['20190901'].data, color: "#ff7f0e"}])
  chart4.getxAxis()
    .tickFormat(function(d) { return d3.time.format('%H:%M')(new Date(d)); })
    .axisLabel("Day").showMaxMin(false)
  chart4.attachToDiv('#chart4');

  // Handling
  app.printHTML(`<button id="bt1"> Toggle chart 4</button>`)
  $('#bt1').button(); //Optional: jQueryUI for UI enhancement
  $('#bt1').on('click', function(e) {
    $('#chart4').toggle('slow')
  });
};


// DOM Loaded, Entry point
$(function() {
  window.app2 = new App(handler);
  console.log('Done Asynchonously')
});