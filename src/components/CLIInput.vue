<template>
  <span
    class="cli-input"
    @keydown.up="pressKeyUp"
    @keydown.down="pressKeyDown"
    @keydown.tab="pressKeyTab"
  >
    <input
      ref="input"
      v-model="inputText"
      type="text"
      autofocus
      maxlength="50"
      @keydown.enter="pressKeyEnter"
    >
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface CLIInputData {
  inputText: string,
  history: string[],
  historyIndex: number | null,
  inputCurrent: string
}

export default defineComponent({
  emits: ["exec-cmd", "complement-dir"],

  data() {
    return {
      inputText: "",
      history: [],
      historyIndex: null,
      inputCurrent: "",
    } as CLIInputData;
  },

  mounted() {
    this.loadHistory();
  },

  methods: {
    refs(): any {
      return this.$refs;
    },

    focus() {
      this.refs().input.focus();
    },

    loadHistory() {
      if (localStorage.getItem("history")) {
        try {
          this.history = JSON.parse(localStorage.getItem("history")!);
        } catch (e) {
          localStorage.removeItem("history");
        }
      }
    },

    saveHistory() {
      const parsed = JSON.stringify(this.history);
      localStorage.setItem("history", parsed);
    },

    // called from CLI
    clearHistory() {
      this.history = [];
    },

    pressKeyEnter() {
      this.$emit("exec-cmd", this.inputText);
      if (this.inputText !== "" && this.history[this.history.length - 1] !== this.inputText) {
        this.history.push(this.inputText);
        this.historyIndex = null;
        this.saveHistory();
      }
      this.inputText = "";
      this.inputCurrent = "";
    },

    pressKeyTab(e: Event) {
      e.preventDefault();
      this.$emit("complement-dir", this.inputText);
    },

    pressKeyUp(e: Event) {
      e.preventDefault(); // 上キーを押したときにカーソルが先頭に行くのを防ぐ
      if (this.history.length > 0) {
        if (this.historyIndex === null) {
          this.historyIndex = this.history.length;
          this.inputCurrent = this.inputText;
        }
        this.historyIndex = Math.max(this.historyIndex - 1, 0);
        this.inputText = this.history[this.historyIndex];
      }
    },

    pressKeyDown(e: Event) {
      e.preventDefault();
      if (this.history.length > 0 && this.historyIndex !== null) {
        if (this.historyIndex === this.history.length - 1) {
          this.historyIndex = null;
          this.inputText = this.inputCurrent;
        } else {
          this.historyIndex = Math.min(
            this.historyIndex + 1,
            this.history.length - 1
          );
          this.inputText = this.history[this.historyIndex];
        }
      }
    },
  },
});
</script>

<style scoped>
.cli-input > input {
  width: 50%;
}
</style>
