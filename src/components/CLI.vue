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

<script lang="ts">
import { defineComponent } from 'vue';
import CLIStart from "./CLIStart.vue";
import CLIInput from "./CLIInput.vue";

import * as Commands from "./Commands";
import { complementDir } from "./DirHelper";
import I18n from "./I18n";

type history = {
  input: string
  dir: string[]
  result_ary: string[]
}

interface CLIData {
  working_dir: string[],
  histories: history[],
  commands: {name: string, args: string}[],
  afterInputActions: any[]
}

export default defineComponent({
  name: "CLI",
  components: {
    CLIStart,
    CLIInput,
  },

  data() {
    return {
      working_dir: ["~", "cli"],
      histories: [],
      commands: [
        { name: "cd",      args: "[dir]" },
        { name: "ls",      args: "[dir]" },
        { name: "cat",     args: "[file]" },
        { name: "history", args: "[-clear]" },
        { name: "lang",    args: "[en|ja]" },
        { name: "open",    args: "[link_file]" },
        { name: "share",   args: "[-tw]" },
      ],

      afterInputActions: []
    } as CLIData;
  },

  methods: {
    refs(): any {
      return this.$refs;
    },

    focus() {
      this.refs().input.focus();
    },

    inputEnter(value: string) {
      // CommandHelper.parse(value)
      const executed = this.execCommand(value);
      var result: string[];
      if (executed[0] === null) {
        result = [""];
      } else if (executed[1] === "html") {
        // print listed, colored with html
        // TODO: sanitize html
        result = executed[0].split("\n");
      } else {
        // print plane text
        result = this.textToHtml(executed[0]).split("\n");
        result = result.map((x: string) => x === "" ? "&nbsp;" : x);
      }
      this.histories.push({
        input: value,
        dir: this.working_dir,
        result_ary: result,
      } as history);

      // CommandHelper.callAfterActions

      // call after input action
      this.afterInputActions.forEach(callback => {
        callback(this);
      });
      this.afterInputActions = []
    },

    inputTab(input: string) {
      const args = input.split(" ").filter((s) => s !== "");
      if (args.length === 0 || !["cd", "ls", "cat", "open"].includes(args[0])) { return null; }
      const result = complementDir(this.working_dir, args[1]);
      if (typeof result === "string") {
        let result_ary = this.textToHtml(result).split("\n");
        this.histories.push({
          input: input,
          dir: this.working_dir,
          result_ary: result_ary,
        } as history);
      } else if (result?.dir) {
        this.refs().input.inputText = `${args[0]} ${result.dir}`;
      } else {
        return null;
      }
    },

    // return [message, flag]
    // message: null ... enter next line.
    execCommand(input: string): [string | null, "html" | null] {
      const args = input.split(" ").filter((s) => s !== "");
      if (args.length === 0) {
        return [null, null];
      }
      switch (args[0]) {
        case "help": {
          let max_len = 0;
          let str = "Command list\n";
          this.commands.forEach(c => { max_len = Math.max(max_len, c.name.length + c.args.length)});
          this.commands.forEach(c => {
            let len = c.name.length + c.args.length;
            str += ` * ${c.name} ${c.args}${" ".repeat(max_len - len + 4)}:${I18n.t(`help.summary.${c.name}`)}\n`
          });
          // str += "\nand some secret commands ..."
          return [str.trim(), null];
        }
        case "cd": {
          let cd = Commands.cd(this.working_dir, args.splice(1));
          if (cd.error == undefined) {
            this.afterInputActions.push(function (component: any) {
              component.working_dir = cd.dir;
            });
          }
          return [cd.error || null, null];
        }
        case "ls": { return Commands.ls(this.working_dir, args.splice(1)); }
        case "cat": { return Commands.cat(this.working_dir, args.splice(1)); }
        case "history": {
          if (args[1] === "-clear") { this.refs().input.clearHistory(); }
          return Commands.history(args.splice(1));
        }
        case "lang": {
          if (!args[1] || args[1] === "") {
            return [`current lang is ${I18n.locale}`, null];
          }
          try{
            I18n.setLocale(args[1]);
            return [`lang: set language '${args[1]}'`, null];
          } catch (error) {
            return [`lang: can't set language '${args[1]}'`, null];
          }
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

    textToHtml(str: string) {
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
