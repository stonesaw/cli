import {
  pathHelper,
  isPresent
} from './utils'

export default function (current_dir, options) {
  if ((!isPresent(options[0])) || options[0] === "-h" || options[0] === "--help") {
    return [`cat help`, null];
  }
  const target_dir = pathHelper(current_dir, options[0]);
  if (target_dir.error != undefined) {
    return [target_dir.error, null];
  } else if (target_dir.type !== "txt") {
    return [`${options[0]}: テキストファイルではありません`, null];
  } else {
    return [target_dir.content, null];
  }
}
