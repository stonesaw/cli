import directory from './../../assets/directory.json'

// return target Dir
function pathHelper(current_dir, target_dir = "./") {
    var dir = target_dir.split("/").filter(element => element !== "" && element !== ".");
    var result_ary = current_dir.concat(dir);

    let index = 0;
    while (index < result_ary.length) {
        if (result_ary[index] === "..") {
            for (let j = index - 1; j >= 0; j--) {
                if (result_ary[j] !== null) {
                    result_ary.splice(j, 1, null);
                    break;
                }
            }
            result_ary.splice(index, 1, null);
        }
        index++;
    }
    result_ary = result_ary.filter(e => e !== null)
    if (result_ary[0] !== "~") {
        result_ary.unshift("~");
    }

    return result_ary;
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
