const fs = require("fs");
const path = require('path');
const util = require('util');

type JSONType = {
  [key: string]: JSONType | string[]
}

function isJSon(obj: any): obj is JSONType {
  return (Object.keys(obj).length > 0);
}

function pp(obj: any, str?: string) {
  console.log(
    (str ? `${str}: ` : "") +
    util.inspect(obj, {showHidden: false, depth: null, colors: true})
  );
}

const template: JSONType = require('../src/assets/directory_template.json');

function loadDirectory(template: JSONType | string[], head: string[] = []) {
  if (Array.isArray(template)) {
    if (template[0] === "txt") { // load content
      const path_ary = [...head].splice(1); // delete "~"
      const file_path = path.join(__dirname, "../src/assets/directory/", path_ary.join("/"));
      const buff = fs.readFileSync(file_path, "utf8");
      template[1] = buff;
    }
  } else if (isJSon(template)) { // is folder
    const keys = Object.keys(template);
    for (let i = 0; i < keys.length; i++) { // search files
      const dir_name = keys[i];
      const _head = [...head];
      _head.push(dir_name);
      loadDirectory(template[dir_name], _head);
    }
  }
  return template;
}

const directory = loadDirectory(template);
const result = JSON.stringify(directory, null, 2);
fs.writeFileSync(path.join(__dirname, "../src/assets/directory.json"), result);


// TODO: auto compile directory.json with webpack
/*
class BundleDirectoryPlugin {
  // compiler を引数として受け取る apply メソッド
  apply(compiler) {
    // plugin メソッドにイベント名とハンドラー関数を渡す
    compiler.plugin('compile', (params) => {
      console.log('compile開始時の処理');
    });

    compiler.plugin('compilation', (compilation, params) => {
      // compilation もまた plugin メソッドを持つので、各イベントに処理を追加できる
      compilation.plugin('optimize', () => {
        console.log('optimize(最適化)開始時の処理');
      });
    });

    // 非同期に実行されるイベントは callback を引数で受取り、適宜実行する
    compiler.plugin('emit', (compilation, callback) => {
      console.log('emit(アセット出力)開始時の処理');
      callback();
    });
  }
}

module.exports = BundleDirectoryPlugin
*/
