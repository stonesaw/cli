<template>
  <div class="cli-main">
    <CLIStart />
    <!-- history-lines -->
    <div class="cli-history"
     v-for="(hist, i) in histories"
     :key="i"
    >
      <span class="cli-head">stonesaw.github.io </span>
      <span class="cli-dir">{{ hist.dir.join("/") }}</span>
      <span class="cli-head"> $ </span>
      <span class="cli-input-history">{{ hist.input }}</span>
      <div
       v-for="(result, i) in hist.result_ary"
       :key="i"
      >
        <!-- (!) TODO: measures XSS -->
        <span class="cli-result" v-html="result"></span>
      </div>
    </div>
    <!--  -->
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
import CLIStart from './CLIStart.vue'
import CLIInput from './CLIInput.vue'

// JS func
import cmd_cd from './commands/cd'
import cmd_ls from './commands/ls'
import cmd_history from './commands/history'


export default {
  name: 'CLI',
  components: {
    CLIStart,
    CLIInput
  },

  data() {
    return {
      inputText: "", // emitted: CLIInput
      dir: ["~", "cli"], // current directory (array)
      histories: [
        // {input: "", dir: [], result_ary: []} ...
      ]
    }
  },

  methods: {
    inputEnter(value) {
      const result_ary = this.cmdProcess(value)
                         .replaceAll(" ", "&nbsp;")
                         .split("\n");
      this.histories.push({
        input: value,
        dir: this.dir,
        result_ary: result_ary
      });
    },

    cmdProcess(input) {
      if  (input === "")  {
        return "";
      } else if (/^help\s*$/.test(input)) {
        return `Command list
                cat [file]
                cd [dir]
                history [-clear]
                ls
                open
                share
                `
      } else if (/(^cd$)|(^cd\s\w+$)/.test(input)) {
        return cmd_cd(input, this.dir);
      } else if (/^ls\s*$/.test(input)) {
        return cmd_ls(input, this.dir);
      } else if (/(^history\s*$)|(^history\s+-?\w+$)/.test(input)) {
        // if have -clear flag, call method CLIInput.clearHistory
        if (/-clear/.test(input)) {
          this.$refs.input.clearHistory();
        }
        return cmd_history(input);
      } else {
        return `Command '${input}' is not found! Use 'help' to see the command list.`;
      }
    }
  }
}
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
