<template>
  <span ref="currentInput" class="cli-input">
    <input type="text" v-model="inputText" autofocus maxlength="30" @keydown.enter='send'>
    <!-- TODO -->
    <!-- https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/focus -->
  </span>
</template>

<script>
export default {
  data() {
    return {
      inputText: "",
      dir: "refs terminal",
      history: [],
      historyIndex: 0
    }
  },

  methods: {
    send() {
      this.$emit("key-input", this.inputText);
    }
  }
}
</script>

<style scoped>
.cli-input > input {
  width: 50%
}
</style>