import { isPresent } from './Utils'
import { showDirContent, isDir, isDirFile, printChildDir } from './DirHelper'

function cd(current_dir: string[], options: string[]) {
  const target_dir = showDirContent(current_dir, options[0] || "~");
  if (isDirFile(target_dir)) {
    return { error: `${options[0]}: ディレクトリではありません` };
  } else if (!isDir(target_dir)) {
    return { error: target_dir.error };
  } else {
    return { data: target_dir.name }
  };
}

function ls(current_dir: string[], options: string[]): [string, "html" | null] {
  const target_dir = showDirContent(current_dir, options[0]);
  if (isDirFile(target_dir)) {
    return [`${options[0]}: ディレクトリではありません`, null ];
  } else if (!isDir(target_dir)) {
    return [target_dir.error, null];
  } else {
    return [printChildDir(target_dir.childDir), null];
  }
}


function cat(current_dir: string[], options: string[]): [string, "html" | null] {
  if ((!isPresent(options[0])) || options[0] === "-h" || options[0] === "--help") {
    return [`cat help`, null];
  }
  const target_dir = showDirContent(current_dir, options[0]);
  if (!isDir(target_dir) && !isDirFile(target_dir)) {
    return [target_dir.error, null];
  } else if (isDir(target_dir) || target_dir.type !== "txt") {
    return [`${options[0]}: テキストファイルではありません`, null];
  } else {
    return [target_dir.content, null];
  }
}


function history(options: string[]): [string, "html" | null] {
  if (options.includes("-clear")) {
    localStorage.removeItem('history');
    return [`clear history`, null];
  }

  let history = [];
  if (localStorage.getItem('history')) {
    try {
      history = JSON.parse(localStorage.getItem('history')!);
    } catch (e) {
      localStorage.removeItem('history');
    }
  } else {
    return [`no history`, null];
  }
  const len = Math.log10(history.length) + 1;
  let str = "";
  history.forEach((element: any, i: number) => {
    str += ` ${i.toString().padStart(len, " ")}  ${element}\n`;
  });
  return [str.replace(/\n$/, ""), null];
}

function open(current_dir: string[], options: string[]) {
  if (!isPresent(options[0]) || options[0] === "-h" || options[0] === "--help") {
    return { msg: `open help` };
  }
  const target_dir = showDirContent(current_dir, options[0]);
  if (!isDir(target_dir) && !isDirFile(target_dir)) {
    return { error: target_dir.error };
  } else if (isDir(target_dir) || target_dir.type !== "link") {
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
