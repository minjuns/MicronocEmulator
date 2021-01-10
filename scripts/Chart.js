export class Chart {
    constructor(type) {
      this.data = [];
      this.chart = null;
    
      var option ={ duration: 300, useInteractiveGuideline: true}
      if(type == 'line') {
        this.chart = nv.models.lineChart()
      } else if (type == 'multibar') {
        this.chart = nv.models.multiBarChart()
      }
    }
    attachToDiv(divid) {
      this.divid = divid;
      d3.select(divid).append('svg')
          .datum(this.data)
          .call(this.chart);
    }
    setData(data) {
      this.data = data;
    }
    getxAxis() {
      this.chart.xAxis
          .axisLabel("Time (s)")
          .tickFormat(d3.format(',.1f'))
          .staggerLabels(true)
      return this.chart.xAxis
    }
    getyAxis() {
      this.chart.yAxis
          .axisLabel('Voltage (v)')
          .tickFormat(function(d) {
              if (d == null) {
                  return 'N/A';
              }
              return d3.format(',.2f')(d);
          })
      return this.chart.yAxis
    }
    getChart() {
      return this.chart;
    }
    getChartContainer() {
      return $(this.divid)
    }
    hide() {
      this.getChartContainer().hide('slow')
    }
    show() {
      this.getChartContainer().show('slow')
    }
  
  }