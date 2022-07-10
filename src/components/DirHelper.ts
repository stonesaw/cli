const directory = require('../assets/directory.json')
import * as types from './Types'

function showDirContent(current_dir: Array<string>, target_dir: string = "./") {
  const target_dir_ary = target_dir.split("/").filter(element => element !== "" && element !== ".");
  const result_ary = (target_dir_ary[0] === "~" ? target_dir_ary : current_dir.concat(target_dir_ary));
  let current = directory;
  const hist = [];
  const dir_name = [];
  for (let index = 0; index < result_ary.length; index++) {
    const element = result_ary[index];
    if (element === "..") { // ref parent dir
      if (dir_name.length <= 0) {
        // hasn't parent
      } else {
        current = hist[hist.length - 1] || directory;
        hist.pop();
        dir_name.pop();
      }
    } else if (current[element] == undefined) {
      return {
        error: "そのようなファイルやディレクトリはありません",
        dir_name: dir_name,
        files_list: current
      };
    } else {
      hist.push(current);
      dir_name.push(element);
      current = current[element];
    }
  }

  if (dir_name[0] !== "~") {
    dir_name.unshift("~");
    current = current["~"];
  }

  // check type ( dir | txt | img ... )
  const type = (types.isObject(current) ? "dir" : current);
  if (type === "dir") {
    return {
      dir_name: dir_name,
      type: type,
      files_list: current
    };
  } else {
    return {
      dir_name: dir_name,
      type: current[0],
      content: current[1]
    };
  }
}

// 最後に / がつくかつかないか
function complementDir(current_dir: Array<string>, input_dir: string  = "./") {
  const target_dir = input_dir.split("/").filter(element => element !== "" && element !== ".");
  const result = showDirContent(current_dir, input_dir);
  if (result.type === "dir" || result.error) {
    let matched_dir;
    if (result.type === "dir") {
      matched_dir = Object.keys(result.files_list);
    } else {
      matched_dir = Object.keys(result.files_list).filter(fname => RegExp(`^${target_dir[target_dir.length - 1] || ''}.*`).test(fname) );
    }
    if (matched_dir.length === 0) { // no match dir
      return { dir: null };
    } else if (matched_dir.length === 1) { // match one dir
      let dir;
      if (result.type === "dir") {
        dir = target_dir.join("/") + "/" + matched_dir[0];
      } else {
        dir = target_dir.length === 1 ? matched_dir[0] : target_dir.splice(0, target_dir.length - 1).join("/") + "/" + matched_dir[0];
      }
      return { dir: dir }
    } else { // match some dirs
      let str = "";
      const dir_with_type: Array<Array<any>> = [];
      matched_dir.forEach(dir => dir_with_type.push([dir, result.files_list[dir]]));
      dir_with_type.forEach(dir => {
        if (types.isObject(dir[1])) {
          str = str.concat(dir[0], "/   "); // directory
        } else {
          str = str.concat(dir[0], "    "); // file
        }
      })
      return { dirs: str }
    }
  }
  return null;
}

export {
  showDirContent,
  complementDir
}
