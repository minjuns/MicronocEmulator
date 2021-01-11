import {getCustomerList} from './Customer.js'
import {getCustomerIDFromURL} from './util.js'
import {MNOCData} from './MNOCData.js'

export class App {
  // Constructor
  constructor(handler) {  
    this.handler = handler || {} ;

    Promise.all( [getCustomerIDFromURL(), getCustomerList() ])
      .then(values => {
        this.customerID = values[0]
        this.listReady(values[1])
      })

    //UI Components
    this.but = $('#send-addition-button')
    this.dialog = $('#dialog')
    this.loading = $('#loading')
    this.customerSelect = $('#customerSelect')
    this.basicPanel = $('#basicPanel')
    this.basicPanel_orig_html = this.basicPanel.html();
    //Enable JqueryUI
    this.customerSelect.selectmenu({
      change: ( event, ui ) => { this.customerChanged(event, ui)}
    });
 
    // Set handlers
    this.but.on('click', e => {this.buttonPressed()});
    // this.customerSelect.on('change', (e) => {console.log('aa'); this.customerChanged(e)})

  }

  //Event Handlers
  buttonPressed() {
    this.showDialogMessage('msg', "Hello NOCers!");;
  }
  listReady(list) {
    var _this = this;
    $.each(list, function (i, item) {
      _this.customerSelect.append($('<option>', { 
          value: item,
          text : item 
      }));
    });
    if (this.customerID) {
      _this.customerSelect.val(this.customerID)
      _this.customerSelect.selectmenu('refresh')
    } else {
      //_this.customerSelect
      _this.customerSelect.selectedIndex = 0;
      _this.customerSelect.selectmenu('refresh')
    }
    this.loadCustomer();
  }
  customerChanged(e,ui) {
    console.log(e)
    console.log(ui)
    // ui.value 
    this.customerID = ui.item.value;
    this.loadCustomer();
  }

  // Methods
  print(msg) {
    this.basicPanel.append(`<p>${msg}</p>`)
  }
  printHTML(msg) {
    this.basicPanel.append(`${msg}`)
  }
  clearPanel() {
    this.basicPanel.html(this.basicPanel_orig_html);
  }
  loadCustomer() {
    this.clearPanel();
    var dataManager = new MNOCData(this.customerID);
    this.showLoading();
    dataManager.load()
      .then((data) => {
        console.log(data);
        //Hide Modal Window
        this.hideLoading();
        //Execute Handler
        this.handler(this, data, null);
      }).catch( (e) => {
        this.handler(null, null, "Data loading error:" + e);
      })
         
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
        _this.loading.html("Loading");
        _this.__timer = setInterval(function(){ _this.loading.html(_this.loading.html() + "."); }, 100);
      }
    });
  }
  hideLoading() {
    if(this.__timer)
      clearInterval(this.__timer);
    this.loading.dialog('close');
  }
}