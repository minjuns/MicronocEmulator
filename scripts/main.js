'use strict';
import {App} from './App.js'
import {Chart} from './Chart.js'

var handler = function(app, data, error) {
  if (error) {
    console.log('Error' + error);
    return;
  }
  var chart1 = new Chart('line')
  var chart2 = new Chart('multibar')
  var chart3 = new Chart('multibar')
  var chart4 = new Chart('line')

  app.print("15min example")
  app.printHTML(`<div id="chart1"></div>`);
  chart1.setData([{key: 'test', values: data.alldays['20190901'].data, color: "#ff7f0e"}])
  chart1.attachToDiv('#chart1');

  app.print("All Month Max Peak")
  app.printHTML(`<div id="chart2"></div>`);
  chart2.setData([{key: 'MaxPeak', values: Object.entries(data.allmonth).map( ([k,v]) => { return {x:v.data[0].x, y:v.stat.max} }), color: "#ff7f0e"}])
  chart2.getxAxis()
    .tickFormat(function(d) { return d3.time.format('%b %Y')(new Date(d)); })
    .axisLabel("Month").showMaxMin(true)
  chart2.attachToDiv('#chart2');

  app.print("All Days Max Peak")
  app.printHTML(`<div id="chart3"></div>`);
  chart3.setData([{key: 'MaxPeak', values: Object.entries(data.alldays).map( ([k,v]) => { return {x:v.data[0].x, y:v.stat.max} }), color: "#ff7f0e"}])
  chart3.getxAxis()
    .tickFormat(function(d) { return d3.time.format('%m/%d/%Y')(new Date(d)); })
    .axisLabel("Day").showMaxMin(false)
  chart3.attachToDiv('#chart3');

  app.print("15min example - 4 to 9pm")
  app.printHTML(`<div id="chart4"></div>`);
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