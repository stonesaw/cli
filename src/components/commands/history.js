// history with Web
export default function (options) {
  if (options.includes("-clear")) {
    localStorage.removeItem('history');
    return [`clear history`, null];
  }

  var history = [];
  if (localStorage.getItem('history')) {
    try {
      history = JSON.parse(localStorage.getItem('history'));
    } catch (e) {
      localStorage.removeItem('history');
    }
  } else {
    return [`no history`, null];
  }
  var len = Math.log10(history.length) + 1;
  var str = "";
  history.forEach((element, i) => {
    str += ` ${i.toString().padStart(len, " ")}  ${element}\n`;
  });
  return [str.replace(/\n$/, ""), null];
}
