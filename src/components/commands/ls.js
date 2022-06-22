/* eslint-disable no-unused-vars */
import {
    directory,
    pathHelper
} from './utils';

export default function (current_dir, options) {
    const target_dir = pathHelper(current_dir, options[0]);
    if (target_dir["error"] != undefined) {
        return [target_dir["error"], null];
    }

    var str = "";
    for (const [key, value] of Object.entries(target_dir.files_list)) {
        // TODO: fix typeof
        if (typeof value === typeof {}) {
            str = str.concat(key, "/   "); // directory
        } else {
            str = str.concat(key, "    "); // file
        }
    }

    return [str, null];
}