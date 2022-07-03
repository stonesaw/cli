const directory = require('../assets/directory.json')
const types = require('./types')

function showDirContent(current_dir, target_dir = "./") {
  let target_dir_ary = target_dir.split("/").filter(element => element !== "" && element !== ".");
  let result_ary = (target_dir[0] === "~" ? target_dir_ary : current_dir.concat(target_dir_ary));
  let current = directory;
  let hist = [];
  let dirs = [];
  for (let index = 0; index < result_ary.length; index++) {
    const element = result_ary[index];
    if (element === "..") { // ref parent dir
      if (dirs.length <= 0) {
        // hasn't parent
      } else {
        current = hist[hist.length - 1] || directory;
        hist.pop();
        dirs.pop();
      }
    } else if (current[element] == undefined) {
      return {
        error: "そのようなファイルやディレクトリはありません",
        dirs: dirs,
        files_list: current
      };
    } else {
      hist.push(current);
      dirs.push(element);
      current = current[element];
    }
  }

  if (dirs[0] !== "~") {
    dirs.unshift("~");
    current = current["~"];
  }

  // check type ( dir | txt | img ... )
  let type = (types.isObject(current) ? "dir" : current);
  if (type === "dir") {
    return {
      dirs: dirs,
      type: type,
      files_list: current
    };
  } else {
    return {
      dirs: dirs,
      type: current[0],
      content: current[1]
    };
  }
}

// 最後に / がつくかつかないか
function complementDir(current_dir, input_dir) {
  console.log(input_dir);
  const result = showDirContent(current_dir, input_dir);
  if (result.type === "dir") {
    console.log(result.files_list);
    var str = "";
    for (const [key, value] of Object.entries(result.files_list)) {
      if (types.isObject(value)) {
        str = str.concat(key, "/   "); // directory
      } else {
        str = str.concat(key, "    "); // file
      }
    }
    return {dirs: str};
  } else if (result.error) {
    console.log(result.dirs);
    console.log(result.files_list);
    let matched_dir = Object.keys(result.files_list).filter(fname => RegExp(`^${input_dir}.*`).test(fname));
    console.log(matched_dir);
    return {dirs: "complement"};
  }
}

export {
  showDirContent,
  complementDir
}
