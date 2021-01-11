var pattern = /(([12]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\s(\d{2})\:(\d{2})\:(\d{2}))/
export let str2date = function(str) {
  var a = pattern.exec(str);
  return newDate = new Date(a[2],a[3]-1,a[4],a[5],a[6],a[7]);
};
export let _pad = x => (x).toLocaleString(undefined, {minimumIntegerDigits: 2})

export let getCustomerIDFromURL = () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('customerid')
}
// // shortcut for document.querySelectorAll
// function $$(expr, con) {
//   return Array.prototype.slice.call((con || document).querySelectorAll(expr));
// }

// // hide an element
// function hide(el) {
//   el.style.display = 'none';
// }

// // hide all divs via forEach
// $$('div').forEach(hide); 

// // hide all divs via for
// for (var divs = $$('div'), i = 0; i < divs.length; i++) {
//   hide(divs[i])
// }