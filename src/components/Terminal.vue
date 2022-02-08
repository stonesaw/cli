<template>
  <div class="terminal" ref="cli">
    <TerminalStart />
    <!-- history-lines -->
    <div
     v-for="(hist, i) in cui_histories"
     :key="i"
    >
      <span class="cli-head">stonesaw.github.io </span>
      <span class="cli-dir">{{ hist.dir.join("/") }}</span>
      <span class="cli-head"> $ </span>
      <span class="cli-input-history">{{ hist.input }}</span>
      <div>
        <span class="cli-result">{{ hist.result }}</span>
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
      cui_histories: [
        // {input: "", dir: "", result: ""} ...
      ]
    }
  },

  methods: {
    inputEvent(value) {
      const result =  this.terminalProc(value);
      this.cui_histories.push({
        input: value,
        dir: this.dir,
        result: result
      });
    },

    terminalProc(input) {
      if  (input === "")  {
        return "";
      } else if (input.match(/(^cd$)|(^cd\s\w+$)/) !== null) {
        return cmd_cd(input, this.dir);
      } else if (input.match(/^ls$/) !== null) {
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
  font-family: 'Roboto Mono', monospace;
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
