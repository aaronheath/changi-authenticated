export function copyToClipboard(text: string): void {
  const el = document.createElement('input');
  el.setAttribute('id', 'to-copy');
  el.setAttribute('type', 'text');
  el.setAttribute('value', text);

  document.body.appendChild(el);

  el.select();
  document.execCommand('copy');
  el.remove();
}

// TODO refactor this into codebase. Useful for downloading Blob and setting filename.
// var saveData = (function () {
//   var a = document.createElement("a");
//   document.body.appendChild(a);
//   // a.style = "display: none";
//   return function (blob, fileName) {
//     // var json = JSON.stringify(data),
//     //   blob = new Blob([json], {type: "octet/stream"}),
//       const url = window.URL.createObjectURL(blob);
//     a.href = url;
//     a.download = fileName;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };
// }());
