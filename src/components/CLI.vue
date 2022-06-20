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
      <span class="cli-dir">{{ dir.join("/") }}</span>
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
import cmd_cd from "./commands/cd";
import cmd_ls from "./commands/ls";
import cmd_history from "./commands/history";
import cmd_cat from "./commands/cat";

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
      dir: ["~", "cli"], // current directory (array)
      histories: [
        // {input: "", dir: [], result_ary: []} ...
      ],
    };
  },

  methods: {
    inputEnter(value) {
      const executed = this.execCommand(value)
      var result;
      if (executed[1] === "html") {
        // print listed, colored with html
        result = executed[0].split("\n");
      } else {
        // print plane text
        result = executed[0].replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll(" ", "&nbsp;")
                    .split("\n");
      }
      this.histories.push({
        input: value,
        dir: this.dir,
        result_ary: result,
      });
    },

    execCommand(input) {
      // return [str, flag]
      // flag: null or "html"
      const args = input.split(" ").filter((s) => s !== "");
      if (args.length === 0) {
        return ["", null];
      }
      switch (args[0]) {
        case "help":
          return [
            `Command list
cd [dir]
ls
history [-clear]
lang [en|ja]
open [link]
editor [-close|-C]
share

and some secret commands ...`, null];
        case "cd":
          return cmd_cd(this.dir, args[1]);
        case "ls":
          return cmd_ls(this.dir, args.splice(1, args.length - 1));
        case "history":
          if (args[1] === "-clear") {
            this.$refs.input.clearHistory();
          }
          return cmd_history(args.splice(1));
        case "cat":
          return cmd_cat(this.dir, args[1]);
        case "editor":
          if (args[1] === "-close" || args[1] === "-C") {
            // returned msg
            return [this.closeEditor(), null];
          } else {
            // returned msg
            return [this.openEditor(), null];
          }
        default:
          return [
            `Command '${args[0]}' is not found! Use 'help' to see the command list.`,
            null
          ];
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
  },
};
</script>

<style scoped>
.cli-main {
  padding: 10px;
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
