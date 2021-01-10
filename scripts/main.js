'use strict';

import {MNOCData} from './MNOCData.js'
import {App} from './App.js'
import {getCustomerIDFromURL} from './util.js'

var app = new App();
var dataManager = new MNOCData(getCustomerIDFromURL());

// DOM Loaded
$(function() {
  app.showLoading();
  dataManager.load()
    .then((data) => {
      console.log(data);

      app.hideLoading();

      app.chart1.setData([{key: 'test', values: data.alldays['20190901'].data, color: "#ff7f0e"}])
      app.chart1.attachToDiv('#chart1');

      app.chart2.setData([{key: 'MaxPeak', values: Object.entries(data.allmonth).map( ([k,v]) => { return {x:v.data[0].x, y:v.stat.max} }), color: "#ff7f0e"}])
      app.chart2.getxAxis()
        .tickFormat(function(d) { return d3.time.format('%b %Y')(new Date(d)); })
        .axisLabel("Month").showMaxMin(true)
      app.chart2.attachToDiv('#chart2');


      app.chart3.setData([{key: 'MaxPeak', values: Object.entries(data.alldays).map( ([k,v]) => { return {x:v.data[0].x, y:v.stat.max} }), color: "#ff7f0e"}])
      app.chart3.getxAxis()
        .tickFormat(function(d) { return d3.time.format('%m/%d/%Y')(new Date(d)); })
        .axisLabel("Day").showMaxMin(false)
      app.chart3.attachToDiv('#chart3');

      app.chart4.setData([{key: '15 Min data', values: data.alldays['20190901'].data, color: "#ff7f0e"}])
      app.chart4.getxAxis()
        .tickFormat(function(d) { return d3.time.format('%d')(new Date(d)); })
        .axisLabel("Day").showMaxMin(false)
      app.chart4.attachToDiv('#chart4');


    });
  console.log('Done Asynchonously')
})
