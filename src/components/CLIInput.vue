<template>
  <span class="cli-input" @keydown.up="pressKeyUp" @keydown.down="pressKeyDown">
    <input
      type="text"
      v-model="inputText"
      autofocus
      maxlength="50"
      @keydown.enter="pressKeyEnter"
    />
  </span>
</template>

<script>
export default {
  data() {
    return {
      inputText: "",
      history: [],
      historyIndex: null,
    };
  },

  mounted() {
    this.loadHistory();
  },

  methods: {
    loadHistory() {
      if (localStorage.getItem("history")) {
        try {
          this.history = JSON.parse(localStorage.getItem("history"));
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
        this.historyIndex = this.history.length;
        this.saveHistory();
      }
      this.inputText = "";
    },

    pressKeyUp(e) {
      e.preventDefault(); // 上キーを押したときにカーソルが先頭に行くのを防ぐ
      if (this.history.length > 0) {
        this.historyIndex = Math.max(this.historyIndex - 1, 0);
        this.inputText = this.history[this.historyIndex];
      }
    },

    pressKeyDown(e) {
      e.preventDefault();
      if (this.history.length > 0 && this.historyIndex !== null) {
        if (this.historyIndex === this.history.length - 1) {
          this.historyIndex = null;
          this.inputText = "";
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
};
</script>

<style scoped>
.cli-input > input {
  width: 50%;
}
</style>
