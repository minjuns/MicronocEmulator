import {Chart} from './Chart.js'

export class App {
    // Constructor
    constructor() {
        //UI Components
      this.signInButton = $('#button');
      this.but = $('#send-addition-button')
      this.dialog = $('#dialog')
      this.loading = $('#loading')
  
      this.chart1 = new Chart('line')
      this.chart2 = new Chart('multibar')
      this.chart3 = new Chart('multibar')
      this.chart4 = new Chart('line')
      
      // Set handlers
      this.but.on('click', e => {this.buttonPressed()});
  
      // Init components
    }
  
    //Event Handlers
    buttonPressed() {
      //alert('yay')
      this.showDialogMessage('msg', "Hello NOCers!");;
    }
  
    showDialogMessage(title, message) {
      this.dialog.attr('title', title)
      this.dialog.html(message);
      this.dialog.dialog();
    }
    showLoading() {
      var _this = this;
      this.loading.dialog({ 
        modal: true, 
        closeOnEscape: false, 
        open: function(event, ui) { 
          $(".ui-dialog-titlebar-close", $(this).parent()).hide();
          _this.__timer = setInterval(function(){ _this.loading.html(_this.loading.html() + "."); console.log('hello') }, 500);
        }
      });
    }
    hideLoading() {
      if(this.__timer)
        clearInterval(this.__timer);
      this.loading.dialog('close');
    }
  }