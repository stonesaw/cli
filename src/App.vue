<template>
  <div id="app">
    <CLI />
  </div>
</template>

<script>
import CLI from './components/CLI.vue'

export default {
  name: 'App',
  components: {
    CLI
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
</style>
