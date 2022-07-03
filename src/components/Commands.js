const types = require('./types')
import {
  pathHelper,
  isPresent
} from './utils'


function cd(current_dir, options) {
  const target_dir = pathHelper(current_dir, options[0] || "~");
  if (target_dir.error != undefined) {
    return { error: target_dir["error"] };
  } else if (target_dir.type !== "dir") {
    return { error: `${options[0]}: ディレクトリではありません` };
  }

  return {
    msg: `debug: cd (${current_dir.join("/")} -> ${target_dir.dirs.join("/")})`,
    data: target_dir.dirs
  };
}


function ls(current_dir, options) {
  const target_dir = pathHelper(current_dir, options[0]);
  if (target_dir.error != undefined) {
    return [target_dir.error, null];
  } else if (target_dir.type !== "dir") {
    return [`${options[0]}: ディレクトリではありません`, null];
  }

  var str = "";
  for (const [key, value] of Object.entries(target_dir.files_list)) {
    if (types.isObject(value)) {
      str = str.concat(key, "/   "); // directory
    } else {
      str = str.concat(key, "    "); // file
    }
  }

  return [str, null];
}


function cat(current_dir, options) {
  if ((!isPresent(options[0])) || options[0] === "-h" || options[0] === "--help") {
    return [`cat help`, null];
  }
  const target_dir = pathHelper(current_dir, options[0]);
  if (target_dir.error != undefined) {
    return [target_dir.error, null];
  } else if (target_dir.type !== "txt") {
    return [`${options[0]}: テキストファイルではありません`, null];
  } else {
    return [target_dir.content, null];
  }
}


function history(options) {
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

function open(current_dir, options) {
  if (!isPresent(options[0]) || options[0] === "-h" || options[0] === "--help") {
    return { msg: `open help` };
  }
  const target_dir = pathHelper(current_dir, options[0]);
  if (target_dir.error != undefined) {
    return { error: target_dir.error };
  } else if (target_dir.type !== "link") {
    return { error: `${options[0]}: リンクではありません` };
  } else {
    return { data: target_dir.content };
  }
}


export {
  cd,
  ls,
  cat,
  history,
  open
}
