<template>
  <div class="cli-main">
    <CLIStart />
    <!-- history -->
    <div class="cli-history" v-for="(hist, i) in histories" :key="i">
      <span class="cli-head">stonesaw.github.io </span>
      <span class="cli-dir">{{ hist.dir.join("/") }}</span>
      <span class="cli-head"> $ </span>
      <span class="cli-input-history">{{ hist.input }}</span>
      <div v-for="(result, i) in hist.result_ary" :key="i">
        <!-- (!) Be careful with XSS -->
        <span class="cli-result" v-html="result"></span>
      </div>
    </div>
    <!-- input -->
    <div>
      <span class="cli-head">stonesaw.github.io </span>
      <span class="cli-dir">{{ working_dir.join("/") }}</span>
      <span class="cli-head"> $ </span>
      <CLIInput @exec-cmd="inputEnter" ref="input" />
    </div>
    <!--  -->
  </div>
</template>

<script>
// Vue Component
import CLIStart from "./CLIStart.vue";
import CLIInput from "./CLIInput.vue";

// JS func
import * as Commands from "./Commands";

export default {
  name: "CLI",
  components: {
    CLIStart,
    CLIInput,
  },

  props: {
    editor_mode: {
     type: Boolean,
     default: false
    }
  },

  data() {
    return {
      inputText: "", // emitted: CLIInput
      working_dir: ["~", "cli"], // current directory (array)
      histories: [
        // {input: "", dir: [], result_ary: []} ...
      ],

      afterInputActions: []
    };
  },

  methods: {
    focus() {
      if (!this.editor_mode) {
        this.$refs.input.focus();
      }
    },

    inputEnter(value) {
      const executed = this.execCommand(value);
      var result;
      if (executed[0] === null) {
        result = null;
      } else if (executed[1] === "html") {
        // print listed, colored with html
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

      // call after input action
      this.afterInputActions.forEach(callback => {
        callback(this);
      });
      this.afterInputActions = []
    },

    execCommand(input) {
      // return [str, flag]
      // flag: null or "html"
      const args = input.split(" ").filter((s) => s !== "");
      if (args.length === 0) {
        return [null, null];
      }
      switch (args[0]) {
        case "help":
          return [
            `Command list
 * cd [dir]                 :change directory.
 * ls [dir]                 :list segments.
 * cat [file]               :show txt file content.
 * history [-clear]         :command history.
 * lang [en|ja]             :change language.
 * open [link_file]         :open link file.
 * editor [-close|-C]       :open editor.
 * share [-tw]              :share sns.

and some secret commands ...`, null];
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
        case "history": {
          if (args[1] === "-clear") {
            this.$refs.input.clearHistory();
          }
          return Commands.history(args.splice(1));
        }
        case "cat": {
          return Commands.cat(this.working_dir, args.splice(1));
        }
        case "editor": {
          if (args[1] === "-close" || args[1] === "-C") {
            // returned msg
            return [this.closeEditor(), null];
          } else {
            // returned msg
            return [this.openEditor(), null];
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

    openEditor() {
      if (this.editor_mode === false) {
        this.$emit("editor-mode", true);
        return "";
      } else {
        return "editor is already open.";
      }
    },

    closeEditor() {
      if (this.editor_mode === true) {
        this.$emit("editor-mode", false);
        return "";
      } else {
        return "editor is not open.";
      }
    },

    textToHtml(str) {
      return str.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll(" ", "&nbsp;");
    },
  },
};
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
