var pattern = /(([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(\d{2})\:(\d{2})\:(\d{2}))/
let str2date = function(str) {
    var a = pattern.exec(str);
    return newDate = new Date(a[2],a[3]-1,a[4],a[5],a[6],a[7]);
};
// let _pad = x => (x).toLocaleString(undefined, {minimumIntegerDigits: 2})
let _pad = x => (x<10) ? "0"+x : "" + x

function getStat(arr) {
    var _min = Number.MAX_VALUE;
    var _max = Number.MIN_VALUE;
    var _minObj = null;
    var _maxObj = null;
    var stat = { sum:0 };
    for(let i = 0 ; i < arr.length; i++) {
      var nObj = arr[i];
      stat.sum += nObj.y;
      _min = (nObj.y < _min) ? ( () => { _minObj = nObj; return nObj.y })() : _min;
      _max = (nObj.y > _max) ? ( () => { _maxObj = nObj; return nObj.y })() : _max;
    }    
    stat['avg'] = stat['sum'] / arr.length;
    stat['max'] = _max;
    stat['min'] = _min;
    stat['minObj'] = _minObj;
    stat['maxObj'] = _maxObj;    
    return stat;
  }

onmessage = function(e) {
    this.data = [];
    this.all15 = [];
    this.all15_1621 = [];
    this.alldays = [];
    this.alldays_1621 = [];
    this.allmonth = [];
    this.allmonth_1621 = [];

    fetch(e.data)
    .then(response => response.json())
    .then(result => { 
        this.data = result; 
        
        // Creating all 15 min data
        var _min = Number.MAX_VALUE;
        var _max = Number.MIN_VALUE;
        var _minObj = null;
        var _maxObj = null;
        // Creating all 15 min data (16-21)
        var _min_1621 = Number.MAX_VALUE;
        var _max_1621 = Number.MIN_VALUE;
        var _minObj_1621 = null;
        var _maxObj_1621 = null;

        this.all15 = { stat: {sum:0}, data: [] }
        this.all15_1621 = { stat: {sum:0}, data: [] }
        for(let i = 0 ; i < this.data.length; i++) {
          var nObj = { x: str2date(this.data[i][0]), y: this.data[i][1]}
          this.all15.data.push(nObj);
          this.all15.stat['sum'] += this.data[i][1]
          _min = (nObj.y < _min) ? ( () => { _minObj = nObj; return nObj.y })() : _min;
          _max = (nObj.y > _max) ? ( () => { _maxObj = nObj; return nObj.y })() : _max;

          if (nObj.x.getHours() >= 16 && nObj.x.getHours() <= 21) {
            this.all15_1621.data.push(nObj);
            this.all15_1621.stat['sum'] += this.data[i][1]
            _min_1621 = (nObj.y < _min_1621) ? ( () => { _minObj_1621 = nObj; return nObj.y })() : _min_1621;
            _max_1621 = (nObj.y > _max_1621) ? ( () => { _maxObj_1621 = nObj; return nObj.y })() : _max_1621;
          }
        }
        this.all15.stat['avg'] = this.all15.stat['sum'] / this.data.length;
        this.all15.stat['max'] = _max;
        this.all15.stat['min'] = _min;
        this.all15.stat['minObj'] = _minObj;
        this.all15.stat['maxObj'] = _maxObj;

        this.all15_1621.stat['avg'] = this.all15_1621.stat['sum'] / this.all15_1621.data.length;
        this.all15_1621.stat['max'] = _max_1621;
        this.all15_1621.stat['min'] = _min_1621;
        this.all15_1621.stat['minObj'] = _minObj_1621;
        this.all15_1621.stat['maxObj'] = _maxObj_1621;

        // console.log(this.data);
        // console.log(this.all15_1621);

        for( let i = 0 ; i < this.all15.data.length; i++) {
          let ref = this.all15.data;
          // All days
          let key1 = ref[i]['x'].getFullYear() + "" + _pad(ref[i]['x'].getMonth()+1) + "" + _pad(ref[i]['x'].getDate());
          if(!this.alldays[key1]) {
            this.alldays[key1] = {}
            this.alldays[key1]['data'] = []
          }
          this.alldays[key1]['data'].push(ref[i])
          // All days 16-21
          if (ref[i]['x'].getHours() >= 16 && ref[i]['x'].getHours() <= 21) {
            if(!this.alldays_1621[key1]) {
              this.alldays_1621[key1] = {}
              this.alldays_1621[key1]['data'] = []
            }
            this.alldays_1621[key1]['data'].push(ref[i])     
          }
          // All months
          let key2 = ref[i]['x'].getFullYear() + "" + _pad(ref[i]['x'].getMonth()+1);
          if(!this.allmonth[key2]) {
            this.allmonth[key2] = {}
            this.allmonth[key2]['data'] = []
          }
          this.allmonth[key2]['data'].push(ref[i])
          // All months 16-21
          if (ref[i]['x'].getHours() >= 16 && ref[i]['x'].getHours() <= 21) {
            if(!this.allmonth_1621[key2]) {
              this.allmonth_1621[key2] = {}
              this.allmonth_1621[key2]['data'] = []
            }
            this.allmonth_1621[key2]['data'].push(ref[i]);
          }
          
        }
        // get stat for alldays
        for (const [key, value] of Object.entries(this.alldays)) {
          var ref = this.alldays[key].data;
          this.alldays[key]['stat'] = getStat(ref);
        }
        var _min_alldays = Number.MAX_VALUE;
        var _max_alldays = Number.MIN_VALUE;
        var _sum_alldays = 0;
        var _min_alldays_obj = null;
        var _max_alldays_obj = null;
        var _alldays_cnt = 0;
        for (const [key, value] of Object.entries(this.alldays)) {
          var ref = this.alldays[key].stat;
          _min_alldays = (ref.min < _min_alldays) ? ( () => { _min_alldays_obj = ref; return ref.min;})() : _min_alldays;
          _max_alldays = (ref.max > _max_alldays) ? ( () => { _max_alldays_obj = ref; return ref.max;})()  : _max_alldays;
          _sum_alldays += ref.sum;
          _alldays_cnt++;
        }
        this.alldays['stat'] = {}
        this.alldays['stat']['min'] = _min_alldays
        this.alldays['stat']['max'] = _max_alldays
        this.alldays['stat']['sum'] = _sum_alldays
        this.alldays['stat']['avg'] = _sum_alldays / _alldays_cnt;
        this.alldays['stat']['minObj'] = _min_alldays_obj
        this.alldays['stat']['maxObj'] = _max_alldays_obj
        console.log(_alldays_cnt)
        // get stat for alldays 16-21
        for (const [key, value] of Object.entries(this.alldays_1621)) {
          var ref = this.alldays_1621[key].data;
          this.alldays_1621[key]['stat'] = getStat(ref);
        }        
        var _min_alldays_1621 = Number.MAX_VALUE;
        var _max_alldays_1621 = Number.MIN_VALUE;
        var _sum_alldays_1621 = 0;
        var _min_alldays_obj_1621 = null;
        var _max_alldays_obj_1621 = null;
        var _alldays_1621_cnt = 0;
        for (const [key, value] of Object.entries(this.alldays_1621)) {
          var ref = this.alldays_1621[key].stat;
          _min_alldays_1621 = (ref.min < _min_alldays_1621) ? ( () => { _min_alldays_obj_1621 = ref; return ref.min;})() : _min_alldays_1621;
          _max_alldays_1621 = (ref.max > _max_alldays_1621) ? ( () => { _max_alldays_obj_1621 = ref; return ref.max;})()  : _max_alldays_1621;
          _sum_alldays_1621 += ref.sum;
          _alldays_1621_cnt++;
        }
        this.alldays_1621['stat'] = {}
        this.alldays_1621['stat']['min'] = _min_alldays
        this.alldays_1621['stat']['max'] = _max_alldays
        this.alldays_1621['stat']['sum'] = _sum_alldays_1621
        this.alldays_1621['stat']['avg'] = _sum_alldays_1621 / _alldays_1621_cnt;
        this.alldays_1621['stat']['minObj'] = _min_alldays_obj
        this.alldays_1621['stat']['maxObj'] = _max_alldays_obj
        console.log(_alldays_1621_cnt)
        
        
        // get stat for all month
        for (const [key, value] of Object.entries(this.allmonth)) {
          var ref = this.allmonth[key].data;
          this.allmonth[key]['stat'] = getStat(ref);
        }
        // get stat for all month 16-21
        for (const [key, value] of Object.entries(this.allmonth_1621)) {
          var ref = this.allmonth_1621[key].data;
          this.allmonth_1621[key]['stat'] = getStat(ref);
        }

        postMessage({ 'all15': this.all15, 'all15_1621' : this.all15_1621, 'alldays': this.alldays, 'alldays_1621': this.alldays_1621, 'allmonth' : this.allmonth, 'allmonth_1621' : this.allmonth_1621});
    });
}