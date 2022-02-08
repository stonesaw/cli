<template>
  <div class="terminal">
    <TerminalStart />
    <!--  -->
    <div class="line">
      <span class="cli-head">stonesaw.github.io </span>
      <span class="cli-dir">{{ dir }}</span>
      <span class="cli-head"> $ </span>
      <InputCli @key-input="inputEvent" />
    </div>
    <!--  -->
    <div>
      <span class="cli-result">{{ inputText }}</span>
    </div>
  </div>
</template>

<script>
import TerminalStart from './TerminalStart.vue'
import InputCli from './InputCli.vue'

export default {
  name: 'Terminal',
  components: {
    TerminalStart,
    InputCli
  },

  data() {
    return {
      inputText: "",
      dir: "cli"
    }
  },

  methods: {
    inputEvent(value) {
      this.terminalProc(value);
      // terminal_process(value)
      // -> result (html)
      // add html elm
      // currentInput -> p  and  create new input
    },

    terminalProc(input) {
      if (input.match(/^cd$/) !== null) {
        this.inputText = "do Command cd!";
      } else {
        this.inputText = `Command '${input}' is not found! Use 'help' to see the command list.`;
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
