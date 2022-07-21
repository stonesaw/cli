import { isPresent } from './Utils'
import { showDirContent, isDir, isDirFile, printChildDir } from './DirHelper'
import I18n from './I18n';

function cd(current_dir: string[], options: string[]): { dir?: string[], error?: string } {
  const target_dir = showDirContent(current_dir, options[0] || "~");
  if (isDirFile(target_dir)) {
    return { error: I18n.t("errors.is_not_dir", { dir_name: options[0] }) };
  } else if (!isDir(target_dir)) {
    return { error: target_dir.error };
  } else {
    return { dir: target_dir.path.split("/") }
  };
}

function ls(current_dir: string[], options: string[]): [string, "html" | null] {
  const target_dir = showDirContent(current_dir, options[0]);
  if (isDirFile(target_dir)) {
    return [I18n.t("errors.is_not_dir", { dir_name: options[0] }), null ];
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
    return [I18n.t("errors.is_not_text", { dir_name: options[0] }), null];
  } else {
    return [target_dir.content, null];
  }
}


function history(options: string[]): [string, "html" | null] {
  if (options.includes("-clear")) {
    localStorage.removeItem('history');
    return [I18n.t("messages.clear_history"), null];
  }

  let history = [];
  if (localStorage.getItem('history')) {
    try {
      history = JSON.parse(localStorage.getItem('history')!);
    } catch (e) {
      localStorage.removeItem('history');
    }
  } else {
    return [I18n.t("messages.no_history"), null];
  }
  const len = Math.log10(history.length) + 1;
  let str = "";
  history.forEach((cmd: any, i: number) => {
    str += ` ${i.toString().padStart(len, " ")}  ${cmd}\n`;
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
    return { error: I18n.t("errors.is_not_link", { dir_name: options[0] }) };
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
