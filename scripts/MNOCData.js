export class MNOCData {

    constructor(customerid) {
      this.url = `https://firebasestorage.googleapis.com/v0/b/micronoc-web.appspot.com/o/Emulator%2F${customerid}.json?alt=media`
      this.all15 = [];
      this.alldays = []
      this.allmonth = [];
  
    }
    load() {
      return new Promise( (resolve, reject) => {
        var myWorker = new Worker("scripts/MNOCData_worker.js");
        myWorker.postMessage(this.url);
    
        myWorker.onmessage = function(event) {
          this.all15 = event.data.all15;
          this.alldays = event.data.alldays;
          this.allmonth = event.data.allmonth; 
          resolve(event.data);
        }
      })
    }
  }