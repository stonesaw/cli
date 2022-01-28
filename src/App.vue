<template>
  <div id="app">
    <Terminal />
  </div>
</template>

<script>
import Terminal from './components/Terminal.vue'

export default {
  name: 'App',
  components: {
    Terminal
  }
}
</script>

<style>
:root {
  --font-main: rgba(255, 255, 255, .95);
  --bg-main: #222;
}

html, body {
  padding: 0;
  margin: 0;
  background-color: var(--bg-main);
}

button, input, optgroup, select, textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  vertical-align: middle;
  color: inherit;
  font: inherit;
  border: 0;
  background: rgba(0, 0, 0, 0);
  padding: 0;
  margin: 0;
  outline: 0;
  border-radius: 0;
  text-align: inherit;
}

::-moz-selection { /* Code for Firefox */
  color: var(--bg-main);
  background: var(--font-main);
}

::selection {
  color: var(--bg-main);
  background: var(--font-main);
}

a {
  color: #4293b9;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--font-main);
}
</style>
