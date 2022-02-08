import directory from './../../assets/directory.json'

function is_exist_dir(target) {
    for (let i = 0; i <= target.length - 1; i++)  {
        if (directory[target[i]] === undefined) {
            return false;
        }
    }
    return true;
}

export default {
    directory,
    is_exist_dir
}
