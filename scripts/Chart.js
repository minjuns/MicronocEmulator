export class Chart {
    // fields
    updateChartOnResize

    constructor(type) {
      this.data = [];
      this.chart = null;
      this.updateChartOnResize = false;
      this.manualUpdate = (chart, d3) => {};

      var option ={ duration: 300, useInteractiveGuideline: true}
      if(type == 'line') {
        this.chart = nv.models.lineChart()
      } else if (type == 'multibar') {
        this.chart = nv.models.multiBarChart()
      }
    }
    // Setter and Getter
    get updateChartOnResize() {
      return this.updateChartOnResize
    }
    set updateChartOnResize(boolValue) {
      this.updateChartOnResize = boolValue
    }
    attachToDiv(divid) {
      this.divid = divid;
      
      d3.select(divid).append('svg')
          .datum(this.data)
          .call(this.chart);
      //this.onResize();      
      this.manualUpdate(this, d3);
      nv.utils.windowResize(this.onResize.bind(this));
    }
    onResize() {
      
      if( this.updateChartOnResize) {
        this.chart.update();
        this.manualUpdate(this, d3);
      }
    }
    setManualUpdate(fn) {
      this.manualUpdate = fn;
    }
    setData(data) {
      this.data = data;
    }
    getxAxis() {
      return this.chart.xAxis
    }
    getyAxis() {
      return this.chart.yAxis
    }
    getChart() {
      return this.chart;
    }
    getChartContainer() {
      return $(this.divid)
    }
    forceY(y) {
      this.chart.forceY(y);
    }
    forceX(x) {
      this.chart.forceX(x);
    }
    hide() {
      this.getChartContainer().hide('slow')
    }
    show() {
      this.getChartContainer().show('slow')
    }
  
  }