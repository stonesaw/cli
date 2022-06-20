/* eslint-disable no-unused-vars */
import {
    directory,
    pathHelper
} from './utils';

export default function (current_dir, options) {
    const target_dir = pathHelper(current_dir, options[0]);

    var current_dir_content = directory;
    for (let index = 0; index < target_dir.length; index++) {
        const element = target_dir[index];
        if (current_dir_content[element] == undefined) {
            return ["そのようなファイルやディレクトリはありません", null];
        }
        current_dir_content = current_dir_content[element];
    }

    var str = "";
    for (const [key, value] of Object.entries(current_dir_content)) {
        if (typeof value === typeof {}) {
            str = str.concat(key, "/   "); // directory
        } else {
            str = str.concat(key, "    "); // file
        }
    }

    return [str, null];
}
