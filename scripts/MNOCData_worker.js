var pattern = /(([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(\d{2})\:(\d{2})\:(\d{2}))/
let str2date = function(str) {
    var a = pattern.exec(str);
    return newDate = new Date(a[2],a[3]-1,a[4],a[5],a[6],a[7]);
};
let _pad = x => (x).toLocaleString(undefined, {minimumIntegerDigits: 2})

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
    this.alldays = []
    this.allmonth = [];

    fetch(e.data)
    .then(response => response.json())
    .then(result => { 
        this.data = result; 

        var _min = Number.MAX_VALUE;
        var _max = Number.MIN_VALUE;
        var _minObj = null;
        var _maxObj = null;
        this.all15 = { stat: {sum:0}, data: [] }
        for(let i = 0 ; i < this.data.length; i++) {
          var nObj = { x: str2date(this.data[i][0]), y: this.data[i][1]}
          this.all15.data.push(nObj);
          this.all15.stat['sum'] += this.data[i][1]
          _min = (nObj.y < _min) ? ( () => { _minObj = nObj; return nObj.y })() : _min;
          _max = (nObj.y > _max) ? ( () => { _maxObj = nObj; return nObj.y })() : _max;

        }
        this.all15.stat['avg'] = this.all15.stat['sum'] / this.data.length;
        this.all15.stat['max'] = _max;
        this.all15.stat['min'] = _min;
        this.all15.stat['minObj'] = _minObj;
        this.all15.stat['maxObj'] = _maxObj;

        for( let i = 0 ; i < this.all15.data.length; i++) {
          let ref = this.all15.data;

          let key1 = ref[i]['x'].getFullYear() + "" + _pad(ref[i]['x'].getMonth()+1) + "" + _pad(ref[i]['x'].getDate());
          if(!this.alldays[key1]) {
            this.alldays[key1] = {}
            this.alldays[key1]['data'] = []
          }
          this.alldays[key1]['data'].push(ref[i])

          let key2 = ref[i]['x'].getFullYear() + "" + _pad(ref[i]['x'].getMonth()+1);
          if(!this.allmonth[key2]) {
            this.allmonth[key2] = {}
            this.allmonth[key2]['data'] = []
          }
          this.allmonth[key2]['data'].push(ref[i])          
        }
        for (const [key, value] of Object.entries(this.alldays)) {
          var ref = this.alldays[key].data;
          this.alldays[key]['stat'] = getStat(ref);
        }
        for (const [key, value] of Object.entries(this.allmonth)) {
          var ref = this.allmonth[key].data;
          this.allmonth[key]['stat'] = getStat(ref);
        }

        postMessage({ 'all15': this.all15, 'alldays': this.alldays, 'allmonth' : this.allmonth });
    });
}