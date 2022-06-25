<template>
  <div id="app">
    <MonacoEditor
      v-if="editor_mode"
      v-model="code"
      ref="editor"
      class="editor"
      theme="vs-dark"
      language="javascript"
    />
    <CLI
      :class="{ 'editor-mode': editor_mode }"
      :editor_mode="editor_mode"
      @editor-mode="editor_mode = $event"
      ref="cli"
    />
  </div>
</template>

<script>
import MonacoEditor from 'vue-monaco'
import CLI from './components/CLI.vue'

export default {
  name: 'App',
  components: {
    CLI,
    MonacoEditor
  },

  data() {
    return {
      editor_mode: false,
      code: "// your code here ...\n\nconst msg = 'hello, world!';\nconsole.log(msg);"
    }
  },

  mounted() {
    document.addEventListener('keydown', this.onKeyDown)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  },

  methods: {
    onKeyDown() {
      this.$refs.cli.focus();
      // fix window.innerHeight
      let element = document.documentElement;
      let bottom = element.scrollHeight - element.clientHeight;
      window.scroll(0, bottom);

      // switch (event.key) {
      //   case "Enter":
      //     break;
      //   default:
      //     // any
      //     break;
      // }
    },
  }
}
</script>

<style>
:root {
  --color-default: rgba(0, 0, 0, 0);
  --color-font-main: rgba(255, 255, 255, .85);
  ---color-bg-main: #222;
}

* {
  padding: 0;
  margin: 0;
  /* scrollbar */
  -ms-overflow-style: none;    /* IE, Edge */
  scrollbar-width: none;       /* Firefox */
}

html, body {
  background-color: var(---color-bg-main);
}

::-webkit-scrollbar {  /* Chrome, Safari */
  display:none;
}

button, input, optgroup, select, textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* vertical-align: middle; */
  color: inherit;
  font: inherit;
  border: 0;
  background: var(--color-default);
  outline: 0;
  border-radius: 0;
  text-align: inherit;
}

::-moz-selection { /* Code for Firefox */
  color: var(---color-bg-main);
  background: var(--color-font-main);
}

::selection {
  color: var(---color-bg-main);
  background: var(--color-font-main);
}

a {
  color: #4293b9;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-font-main);
  font-family: 'Roboto Mono', monospace;
}

.editor-mode {
  overflow: scroll;
  height: calc(30vh - 20px);
  border-top: .5px solid gray;
}

.editor {
  width: 100%;
  height: 70vh;
}
</style>
