<template>
  <div class="terminal">
    <div>Hello, World!</div>
    <div class="cli-aa">
      <div
       v-for="(hello, index) in hello_ary"
       :key="index"
       v-html="hello"
      ></div>
    </div>
    <div>Welcome to cli</div>
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
import InputCli from './InputCli.vue'
const _hello = require('raw-loader!.././assets/hello.txt').default

export default {
  name: 'Terminal',
  components: {
    InputCli
  },

  data() {
    return {
      inputText: "",
      dir: "cli",
      hello_ary: _hello
    }
  },

  mounted() {
    console.log(_hello);
    this.hello_ary = _hello.replace(/export default "/, "")
                           .replace(/";/, "")
                           .replaceAll(/\s/g, "&nbsp;")
                           .split("\\n");
    console.log(this.hello_ary);
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
