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

export default {
  name: "CLI",
  components: {
    CLIStart,
    CLIInput,
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
      const result_ary = this.cmdProcess(value)
                             .replaceAll("&", "&amp;")
                             .replaceAll("<", "&lt;")
                             .replaceAll(">", "&gt;")
                             .replaceAll(" ", "&nbsp;")
                             .split("\n");
      this.histories.push({
        input: value,
        dir: this.dir,
        result_ary: result_ary,
      });
    },

    cmdProcess(input) {
      const args = input.split(" ").filter((s) => s !== "");
      if (args.length === 0) {
        return "";
      }
      switch (args[0]) {
        case "help":
          return `Command list
                cat [file]
                cd [dir]
                history [-clear]
                ls
                open
                share
                `;
        case "cd":
          return cmd_cd(this.dir, args[1]);
        case "ls":
          return cmd_ls(this.dir, args.shift);
        case "history":
          if (args[1] === "-clear") {
            // have a -clear flag
            this.$refs.input.clearHistory();
          }
          return cmd_history(args.splice(1));
        default:
          return `Command '${args[0]}' is not found! Use 'help' to see the command list.`;
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
