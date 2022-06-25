/* eslint-disable no-unused-vars */
import * as types from "./../types"
import {
  directory,
  pathHelper
} from './utils';

export default function (current_dir, options) {
  const target_dir = pathHelper(current_dir, options[0]);
  if (target_dir.error != undefined) {
    return [target_dir.error, null];
  } else if (target_dir.type !== "dir") {
    return [`${options[0]}: ディレクトリではありません`, null];
  }

  var str = "";
  for (const [key, value] of Object.entries(target_dir.files_list)) {
    if (types.isObject(value)) {
      str = str.concat(key, "/   "); // directory
    } else {
      str = str.concat(key, "    "); // file
    }
  }

  return [str, null];
}
