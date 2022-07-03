const directory = require('../assets/directory.json')
const types = require('./types')

function showDirContent(current_dir, target_dir = "./") {
  let target_dir_ary = target_dir.split("/").filter(element => element !== "" && element !== ".");
  let result_ary = (target_dir[0] === "~" ? target_dir_ary : current_dir.concat(target_dir_ary));

  // complete path
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
      return { error: "そのようなファイルやディレクトリはありません" };
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

function complementDir() {

}

export {
  showDirContent,
  complementDir
}
