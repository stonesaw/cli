const util = require('util');

function debug(obj: any) {
  console.log(util.inspect(obj, {showHidden: false, depth: null, colors: true}))
}

import {
  directory,
  isDir,
  isDirFile,
  isRoot
} from "@/components/DirHelper"


test("DirHelper", () => {
  debug(directory);
  expect(isDir(directory)).toBe(true);
  if (isDir(directory)) {
    // test Dir property
    expect(directory.path).toBe("~");
    expect(directory.name).toBe("~");
    expect(directory.parentDir).toBe(null);
  }
  const cli = directory.childDir[0];
  expect(isDir(cli)).toBe(true);
  if (isDir(cli)) {
    expect(cli.name).toBe("cli");
    const readme = cli.childDir[0];
    if (isDirFile(readme)) {
      expect(readme.name).toBe("README.md");
      expect(readme.path).toBe("~/cli/README.md");
      expect(readme.type).toBe("txt");
      expect(/# 🎈/.test(readme.content)).toBe(true);
    }
    expect(readme.parentDir).toBe(cli);

    // is root
    expect(isRoot(directory)).toBe(true);
    expect(isDir(cli.parentDir)).toBe(true);
    if (isDir(cli.parentDir)) {
      expect(isRoot(cli.parentDir)).toBe(true);
    }

    const src = cli.childDir[2];
    expect(isDir(src)).toBe(true);
    if (isDir(src)) {
      expect(src.name).toBe("src");
      expect(src.path).toBe("~/cli/src");
      expect(src.parentDir).toBe(cli);
    }
  }
})
