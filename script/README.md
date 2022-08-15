# JSONディレクトリシステム
## 実行
```bash
npm run setup

( same as )
ts-node script/build-directory
```


## テンプレートの書き方
- ディレクトリは`"dir-name": { ... }` のように表します
- ファイルは `["type", "content"]` で表します
- ファイルの `content` を指定しない または、nullとすると、ローカルから自動でファイルを読み込みます
- ルートディレクトリは `"~"` 固定です

## GitHub のリポジトリを読み込む
- 独自プレフィックス `$import` を使うことで、GitHubからファイルをインポートできます。
- オプションとして exclude と merge を設定できます

例)
```json
"$import": {
    "from": "github:owner/repo",
    "exclude": [
        "package-lock.json"
    ],
    "merge": {
        "repo.link": ["link", "https://github.com/owner/repo"]
    }
}
```
