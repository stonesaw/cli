interface JSONFile {
  [key: string]: Array<string>
}

interface JSONDir {
  [key: string]: JSONDir | JSONFile
}

const directory_json: JSONDir = require('../assets/directory.json')
import * as types from './Types'

type DirFile = {
  path: string;
  name: string;
  parentDir: Dir;
  type: "txt" | "link" | "img";
  content: string;
};

type Dir = {
  path: string;
  name: string;
  parentDir: Dir | null; // null: root dir
  childDir: (Dir | DirFile)[];
};

function isDir(arg: any): arg is Dir {
  return arg.childDir !== undefined;
}

function isDirFile(arg: any): arg is DirFile {
  return arg.content !== undefined;
}

function isRoot(dir: Dir) {
  return dir.parentDir === null;
}

function generateDir(json: any, parent: Dir) {
  for (const [key, value] of Object.entries(json)) {
    if (Array.isArray(value)) { // file
      // eslint-disable-next-line prefer-const
      let file: DirFile = {
        path: `${parent.path}/${key}`,
        name: key,
        type: value[0],
        content: value[1],
        parentDir: parent
      }
      // console.log(file);
      parent.childDir.push(file);
    } else if (types.isObject(value)) { // directory
      // eslint-disable-next-line prefer-const
      let dir: Dir = {
        path: `${parent.path}/${key}`,
        name: key,
        childDir: [],
        parentDir: parent
      }
      parent.childDir.push(dir);
      // console.log(dir);
      generateDir(json[`${key}`], dir);
    } else {
      throw `can't generate directory ( key:${key}, value:${value} )`;
    }
  }
}

// eslint-disable-next-line prefer-const
let directory: Dir = {
  path: "~",
  name: "~",
  childDir: [],
  parentDir: null
}
generateDir(directory_json["~"], directory);

function printChildDir(dir_list: (Dir | DirFile)[]):string {
  let str = "";
  for (let i = 0; i < dir_list.length; i++) {
    const child = dir_list[i];
    if (isDir(child)) {
      str += `${child}/   `;
    } else {
      str += `${child}    `;
    }
  }
  return str;
}

function findAll(parentDir: Dir, pattern: RegExp = /.*/):(Dir | DirFile)[] {
  // TODO filter
  const ary: (Dir | DirFile)[] = [];
  for (let i = 0; i < parentDir.childDir.length; i++) {
    const child = parentDir.childDir[i];
    if (pattern.test(child.name)) {
      ary.push(child);
    };
  }
  return ary;
}

function joinDir(dir_ary: string[], dir_name: string): string[] {
  return [""];
}

function getFullPath(current_dir: string[], target_dir: string): string[] {
  const target_ary = target_dir.split("/")
                                   .filter(d => d !== "" && d !== ".");
  return (target_ary[0] === "~" ? target_ary : current_dir.concat(target_ary));
}

function showDirContent(current_dir: string[], target_dir: string = "./"): Dir | DirFile | { error: string, info: Dir | DirFile } {
  const path_list = getFullPath(current_dir, target_dir);
  let current: Dir | DirFile = JSON.parse(JSON.stringify(directory)); // deep copy
  for (let i = 0; i < path_list.length; i++) {
    const path_name = path_list[i];
    if (isDirFile(current)) { // error: like a 'file_name/dir_name/'
      return { error: "ディレクトリではありません", info: current }
    }
    if (path_name === ".") {
      // no change
    } else if (path_name === "..") { // go to parent dir
      if (current.parentDir === null) { // is root directory
        // go to root directory (no change)
      } else {
        current = current.parentDir;
      }
    } else {
      for (let j = 0; j < current.childDir.length; j++) {
        if (current.childDir[j].name === path_name) {
          current = current.childDir[j];
          break;
        }
      }
      return {
        error: "そのようなファイルやディレクトリはありません",
        info: current
      };
    }
  }
  return current;
}

// 最後に / がつくかつかないか
function complementDir(current_dir: string[], input_dir: string  = "./") {
  const target_dir = input_dir.split("/").filter(element => element !== "" && element !== ".");
  const result = showDirContent(current_dir, input_dir);
  if (!isDirFile(result)) { // dir or error
    let matched_dir: (Dir | DirFile)[];
    if (isDir(result)) {
      matched_dir = result.childDir;
    } else {
      if (isDir(result.info)) {
        matched_dir = findAll(result.info, RegExp(`^${target_dir[target_dir.length - 1] || ''}.*`));
      } else {
        matched_dir = [];
      }
    }
    switch (matched_dir.length) {
      case 0:
        return null;
      case 1:
        let dir: string;
        if (isDir(result)) {
          dir = target_dir.join("/") + "/" + matched_dir[0].name;
        } else {
          dir = target_dir.length === 1 ? matched_dir[0].name : target_dir.splice(0, target_dir.length - 1).join("/") + "/" + matched_dir[0];
        }
        return { dir: dir }
      default:
        return printChildDir(matched_dir)
    }
  }
  return null;
}

export {
  Dir,
  isDir,
  DirFile,
  isDirFile,
  isRoot,
  directory,
  generateDir,
  printChildDir,
  joinDir,
  showDirContent,
  complementDir
}
