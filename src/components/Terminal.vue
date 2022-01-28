<template>
  <div class="terminal">
    <div>Hello, World!</div>
    <div class="cli-aa">
      <div>&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;________&nbsp;&nbsp;&nbsp;&nbsp;____&nbsp;&nbsp;&nbsp;__</div>
      <div>|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;/__&nbsp;&nbsp;/&nbsp;/________&nbsp;&nbsp;____&nbsp;___&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;/_____&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;____/&nbsp;/&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;_/&nbsp;&nbsp;/&nbsp;/</div>
      <div>|&nbsp;|&nbsp;/|&nbsp;/&nbsp;/&nbsp;_&nbsp;\/&nbsp;/&nbsp;___/&nbsp;__&nbsp;\/&nbsp;__&nbsp;`__&nbsp;\/&nbsp;_&nbsp;\&nbsp;&nbsp;&nbsp;/&nbsp;__/&nbsp;__&nbsp;\&nbsp;&nbsp;&nbsp;/&nbsp;/&nbsp;&nbsp;&nbsp;/&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;/&nbsp;&nbsp;&nbsp;/&nbsp;/&nbsp;</div>
      <div>|&nbsp;|/&nbsp;|/&nbsp;/&nbsp;&nbsp;__/&nbsp;/&nbsp;/__/&nbsp;/_/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;&nbsp;__/&nbsp;&nbsp;/&nbsp;/_/&nbsp;/_/&nbsp;/&nbsp;&nbsp;/&nbsp;/___/&nbsp;/____/&nbsp;/&nbsp;&nbsp;&nbsp;/_/&nbsp;&nbsp;</div>
      <div>|__/|__/\___/_/\___/\____/_/&nbsp;/_/&nbsp;/_/\___/&nbsp;&nbsp;&nbsp;\__/\____/&nbsp;&nbsp;&nbsp;\____/_____/___/&nbsp;&nbsp;(_)&nbsp;&nbsp;&nbsp;</div>
    </div>
    <div>Welcome to cli</div>
    <div class="line">
      <span class="cli-head">stonesaw.github.io $ </span>
      <span ref="currentInput" class="cli-input">
        <input type="text" v-model="inputText">

      </span>
    </div>
    <!--  -->
    <div class="line">
      <span class="cli-result">input: {{ inputText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Terminal',
  data() {
    return {
      inputText: ""
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
</style>
