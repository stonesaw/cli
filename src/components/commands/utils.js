import directory from './../../assets/directory.json'

// return target Dir
function pathHelper(current_dir, target_dir = "./") {
    // TODO: regexp target_dir
    var target_dir_ary = target_dir.split("/").filter(element => element !== "" && element !== ".");
    var result_ary = current_dir.concat(target_dir_ary); // ["~", "cli", "src", ".."]

    // complete path
    var current = directory;
    var hist = [];
    var dirs = [];
    for (let index = 0; index < result_ary.length; index++) {
        const element = result_ary[index];
        console.log(dirs);
        if (element === "..") { // ref parent dir
            if (dirs.length <= 0) {
                // hasn't parent
            } else {
                current = hist[hist.length - 1] || directory;
                hist.pop();
                dirs.pop();
            }
        } else if (current[element] == undefined) {
            return {error: "そのようなファイルやディレクトリはありません"};
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

    return {
        dirs: dirs,
        files_list: current
    };
}

function isExistDir(target) {
    for (let i = 0; i <= target.length - 1; i++)  {
        if (directory[target[i]] === undefined) {
            return false;
        }
    }
    return true;
}

export {
    directory,
    pathHelper,
    isExistDir
};
