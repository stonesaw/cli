// TODO: refactor

const fs = require("fs");
const path = require('path');
const util = require('util');
const { Octokit } = require("@octokit/rest");

if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }
const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
});


type ImportObj = {
  from: string,
  exclude?: string[]
  merge?: { [key: string]: string[] }
}

type JSONType = {
  [key: string]: JSONType | string[]
}

function isImportObj(obj: any): obj is ImportObj {
  return (Object.keys(obj).length > 0 && obj?.from);
}

function isJSon(obj: any): obj is JSONType {
  return (Object.keys(obj).length > 0);
}

// purity print
function pp(obj: any, str?: string) {
  console.log(
    (str ? `${str}: ` : "") +
    util.inspect(obj, { showHidden: false, depth: null, colors: true })
  );
}

let imported_json = {};

function writeDir(json: any, path: string[]) {
  let current: any = json;
  for (let i = 0; i < path.length; i++) {
    const p = path[i];
    if (p in current) {
      current = current[p];
    } else {
      current[p] = {};
    }
  }
}

function writeFile(json: any, path: string[], content?: string[]) {
  let current: any = json;
  for (let i = 0; i < path.length - 1; i++) {
    const p = path[i];
    if (p in current) {
      current = current[p];
    } else {
      current[p] = {};
    }
  }
  current[path[path.length - 1]] = content;
}

function fillJSON(path: string[], content: any): string[] | JSONType {
  let current: any = directory;
  for (let i = 0; i < path.length - 1; i++) {
    const p = path[i];
    if (p in current) {
      current = current[p];
    } else {
      throw Error(`cant write directory at ${p}`);
    }
  }
  current[path[path.length - 1]] = { ...content };
  return directory;
}


async function searchAllRepoContent(owner: string, repo: string, path?: string) {
  const { data } = await octokit.repos.getContent({
    owner: owner,
    repo: repo,
    path: path
  });

  if (!Array.isArray(data)) { // is file
    const text_type = /.*\.(html|css|scss|js|ts|md|json|yml|yaml|vue|gitignore|gitmodules)$/i;
    if (text_type.test(data.name)) {
      const buff = Buffer.from(data.content, 'base64').toString();
      return ["txt", buff];
    }
    return;
  }

  for (let i = 0; i < data.length; i++) {
    const dir = data[i];
    if (dir.type === "file") {
      console.log(dir.path);
      if (dir.name === "package-lock.json") {
        writeFile(imported_json, dir.path.split("/"), ["txt", "too longer."]);
      } else {
        const file = await searchAllRepoContent(owner, repo, dir.path);
        writeFile(imported_json, dir.path.split("/"), file);
      }
    } else if (dir.type === "dir" && dir.name !== "node_modules") {
      console.log(dir.path + "/");
      writeDir(imported_json, dir.path.split("/"));
      await searchAllRepoContent(owner, repo, dir.path);
    } else {
      throw Error(`unknown type (${dir.type})`);
    }
  };
}

function loadDirectory(template: JSONType | string[], head: string[] = []) {
  if (Array.isArray(template)) {
    if (template[1] === null) { // load content
      const path_ary = [...head].splice(1); // delete "~"
      const file_path = path.join(__dirname, "../src/assets/directory/", path_ary.join("/"));
      const buff = fs.readFileSync(file_path, "utf8");
      template[1] = buff;
    }
  } else if (isJSon(template)) { // is folder
    const keys = Object.keys(template);
    pp(keys);
    for (let i = 0; i < keys.length; i++) { // search files
      const dir_name = keys[i];
      if (dir_name === "$import") {
        const imported = template[dir_name];
        pp(imported, "imported");
        if (isImportObj(imported)) {
          const from = imported.from;
          if (/^github:\w+\/\w+$/.test(from)) {
            const matched = /^github:(?<owner>\w+)\/(?<repo>\w+)$/.exec(from);
            const owner = matched?.groups?.owner;
            const repo = matched?.groups?.repo;
            if (owner && repo) {
              pp(`searching ${owner}/${repo}`);
              searchAllRepoContent(owner, repo).then(() => {
                const result = { ...imported_json, ...imported?.merge || {} };
                directory = fillJSON(head, result);
                fs.writeFileSync(path.join(__dirname, "../src/assets/directory.json"), JSON.stringify(directory, null, 2));
                // const result = JSON.stringify(imported_json, null, 2);
                // fs.writeFileSync(path.join(__dirname, "../src/assets/test.json"), result);
                imported_json = {};
                pp("filled json");
              })
            } else {
              throw Error(`unknown $import.from (${from})`);
            }
          }
        }
      } else {
        const _head = [...head];
        _head.push(dir_name);
        loadDirectory(template[dir_name], _head);
      }
    }
  }
  return template;
}

const template = require('../src/assets/directory_template.json');
let directory = loadDirectory(template);
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
