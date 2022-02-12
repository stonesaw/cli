/* eslint-disable no-unused-vars */
import directory from './../../assets/directory.json'
import { is_exist_dir } from  './utils'


export default function (current_dir, target_dir) {
    return [`change directory (${current_dir} -> ${target_dir})`, null];
    // if (current_dir === "~") {
    //     // do something
    //     return `root directory`;

    // } else if (is_exist_dir(directory, 0)) {
    //     // 
    // }
}
