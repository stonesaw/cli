import { pathHelper } from  './utils'

export default function (current_dir, options) {
    const target_dir = pathHelper(current_dir, options[0]);
    if (target_dir["error"] != undefined) {
        return {error: target_dir["error"]};
    }

    return {
        msg: `debug: cd (${current_dir.join("/")} -> ${target_dir.dirs.join("/")})`,
        data: target_dir.dirs
    };
}