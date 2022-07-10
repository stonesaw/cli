<template>
  <div class="cli-main">
    <CLIStart />
    <!-- history -->
    <div
      v-for="(hist, i) in histories"
      :key="i"
      class="cli-history"
    >
      <span class="cli-head">stonesaw.github.io </span>
      <span class="cli-dir">{{ hist.dir.join("/") }}</span>
      <span class="cli-head"> $ </span>
      <span class="cli-input-history">{{ hist.input }}</span>
      <div
        v-for="(result, j) in hist.result_ary"
        :key="j"
      >
        <!-- (!) Be careful with XSS -->
        <!-- eslint-disable vue/no-v-html -->
        <span
          class="cli-result"
          v-html="result"
        />
      </div>
    </div>
    <!-- input -->
    <div>
      <span class="cli-head">stonesaw.github.io </span>
      <span class="cli-dir">{{ working_dir.join("/") }}</span>
      <span class="cli-head"> $ </span>
      <CLIInput
        ref="input"
        @exec-cmd="inputEnter"
        @complement-dir="inputTab"
      />
    </div>
    <!--  -->
  </div>
</template>

<script>
// TODO: typescript 対応
import { defineComponent } from 'vue';

// Vue Component
import CLIStart from "./CLIStart.vue";
import CLIInput from "./CLIInput.vue";

// JS func
import * as Commands from "./Commands";
import { complementDir } from "./DirHelper";

export default defineComponent({
  name: "CLI",
  components: {
    CLIStart,
    CLIInput,
  },

  data() {
    return {
      inputText: "", // emitted: CLIInput
      working_dir: ["~", "cli"], // current directory (array)
      histories: [
        // {input: "", dir: [], result_ary: []} ...
      ],
      commands: [
        { name: "cd",      args: "[dir]",       desc: "change directory." },
        { name: "ls",      args: "[dir]",       desc: "list segments." },
        { name: "cat",     args: "[file]",      desc: "show txt file content." },
        { name: "history", args: "[-clear]",    desc: "command history." },
        { name: "lang",    args: "[en|ja]",     desc: "change language." },
        { name: "open",    args: "[link_file]", desc: "open link file." },
        { name: "editor",  args: "[-close|-C]", desc: "open editor." },
        { name: "share",   args: "[-tw]",       desc: "share sns." },
      ],

      afterInputActions: []
    };
  },

  methods: {
    focus() {
      this.$refs.input.focus();
    },

    inputEnter(value) {
      // CommandHelper.parse(value)
      const executed = this.execCommand(value);
      var result;
      if (executed[0] === null) {
        result = null;
      } else if (executed[1] === "html") {
        // print listed, colored with html
        // TODO: sanitize html
        result = executed[0].split("\n");
      } else {
        // print plane text
        result = this.textToHtml(executed[0]).split("\n");
        result = result.map(x => x === "" ? "&nbsp;" : x);
      }
      this.histories.push({
        input: value,
        dir: this.working_dir,
        result_ary: result,
      });

      // CommandHelper.callAfterActions

      // call after input action
      this.afterInputActions.forEach(callback => {
        callback(this);
      });
      this.afterInputActions = []
    },

    // TODO: 適当なコマンドの時だけ補完する
    inputTab(input) {
      const args = input.split(" ").filter((s) => s !== "");
      if (args.length === 0 || !["cd", "ls"].includes(args[0])) { return null; }
      const result = complementDir(this.working_dir, args[1]);
      if (result.dirs) {
        // print dirs
        let result_ary = this.textToHtml(result.dirs).split("\n");
        result_ary = result_ary.map(x => x === "" ? "&nbsp;" : x);
        this.histories.push({
          input: input,
          dir: this.working_dir,
          result_ary: result_ary,
        });
      } else if (result.dir) {
        this.$refs.input.inputText = `${args[0]} ${result.dir}`;
      } else {
        return null;
      }
    },

    execCommand(input) {
      // return [str, flag]
      // flag: null or "html"
      const args = input.split(" ").filter((s) => s !== "");
      if (args.length === 0) {
        return [null, null];
      }
      switch (args[0]) {
        case "help": {
          let max_len = 0;
          this.commands.forEach(c => { max_len = Math.max(max_len, c.name.length + c.args.length)});
          let str = "Command list\n";
          this.commands.forEach(c => {
            let len = c.name.length + c.args.length;
            str += ` * ${c.name} ${c.args}${" ".repeat(max_len - len + 4)}:${c.desc}\n`
          });
          str += "\nand some secret commands ..."
          return [str, null];
        }
        case "cd": {
          let cd = Commands.cd(this.working_dir, args.splice(1));
          if (cd["error"] != undefined) {
            return [cd["error"], null];
          } else {
            this.afterInputActions.push(function (component) {
              component.working_dir = cd.data;
            })
            return [null, null];
          }
        }
        case "ls": {
          return Commands.ls(this.working_dir, args.splice(1));
        }
        case "cat": {
          return Commands.cat(this.working_dir, args.splice(1));
        }
        case "history": {
          if (args[1] === "-clear") {
            this.$refs.input.clearHistory();
          }
          return Commands.history(args.splice(1));
        }
        case "lang": {
          // TODO
          return ["set language : coming soon!", null];
        }
        case "open": {
          let open = Commands.open(this.working_dir, args.splice(1));
          if (open.error) {
            return [open.error, null];
          } else if (open.msg) {
            return [open.msg, null];
          } else {
            window.open(open.data);
            return [`open: ${open.data}`, null];
          }
        }
        case "editor": {
          return ["sorry... editor command was deleted.", null];
        }
        case "share": {
          if (args[1] === "-tw") {
            window.open("http://twitter.com/share?text=%F0%9F%AB%A1%20Hello,%20web-cli%0Acheck%20it%20...%20&url=https://stonesaw.github.io/cli/%0A&hashtags=indiedev,webdev,opensource&related=sou_0x0v");
            return [`<a href="http://twitter.com/share?text=%F0%9F%AB%A1%20Hello,%20web-cli%0Acheck%20it%20...%20&url=https://stonesaw.github.io/cli/%0A&hashtags=indiedev,webdev,opensource&related=sou_0x0v" target="_blank">Share on Twitter</a>`, "html"];
          } else {
            return ["<u>https://stonesaw.github.io/cli/</u>", "html"];
          }
        }
        default: {
          return [
            `Command '${args[0]}' is not found! Use 'help' to see the command list.`,
            null
          ];
        }
      }
    },

    textToHtml(str) {
      return str.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll(" ", "&nbsp;");
    },
  },
});
</script>

<style scoped>
.cli-main {
  padding: 6px 10px;
}

.cli-head {
  color: aquamarine;
}

.cli-head::selection {
  color: red;
}

.cli-dir {
  color: dodgerblue;
}
</style>
