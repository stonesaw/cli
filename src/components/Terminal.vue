<template>
  <div class="terminal" ref="cli">
    <TerminalStart />
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
        <span class="cli-result">{{ result }}</span>
      </div>
    </div>
    <!--  -->
    <div>
      <span class="cli-head">stonesaw.github.io </span>
      <span class="cli-dir">{{ dir.join("/") }}</span>
      <span class="cli-head"> $ </span>
      <InputCli @exec-cmd="inputEvent" />
    </div>
    <!--  -->
  </div>
</template>

<script>
// Vue Component
import TerminalStart from './TerminalStart.vue'
import InputCli from './InputCli.vue'

// JS func
import cmd_cd from './commands/cd'
import cmd_ls from './commands/ls'


export default {
  name: 'Terminal',
  components: {
    TerminalStart,
    InputCli
  },

  data() {
    return {
      inputText: "", // emitted: InputCli
      dir: ["~", "cli"], // current directory (array)
      histories: [
        // {input: "", dir: [], result_ary: []} ...
      ]
    }
  },

  methods: {
    inputEvent(value) {
      const result_ary = this.terminalProc(value)
                         .split("\n");
      this.histories.push({
        input: value,
        dir: this.dir,
        result_ary: result_ary
      });
    },

    terminalProc(input) {
      if  (input === "")  {
        return "";
      } else if (/^help\s*$/.test(input)) {
        return `Command list
                cat [file]
                cd [dir]
                history
                ls
                open
                share
                `
      } else if (/(^cd$)|(^cd\s\w+$)/.test(input)) {
        return cmd_cd(input, this.dir);
      } else if (/^ls\s*$/.test(input)) {
        return cmd_ls(input, this.dir);
      } else {
        return `Command '${input}' is not found! Use 'help' to see the command list.`;
      }
    }
  }
}
</script>

<style scoped>
.terminal {
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
