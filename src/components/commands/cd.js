/* eslint-disable no-unused-vars */
import directory from './../../assets/directory.json'
import { is_exist_dir } from  './utils'


export default function (input, current_dit) {
    return `do cd command (${input}, ${current_dit})`; 
    // if (current_dit === "~") {
    //     // do something
    //     return `root directory`;

    // } else if (is_exist_dir(directory, 0)) {
    //     // 
    // }
}
