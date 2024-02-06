<template>
  <button id="logButton" @click="handleLogButtonPress()" :class="{ 'logButtonPressed': isLogButtonPressed }">{{ logButtonText }}</button>
</template>

<script>
export default {
  name: "LogButton",
  data() {
    return {
      logButtonText : "Show Log",
      log: [],
      showLog: false,
      logButtonIsPressed : false,
    }
  },
  methods: {
    handleLogButtonPress() {
      this.toggleLog();
      this.toggleLogButtonText();
      this.isLogButtonPressed = !this.isLogButtonPressed;
    },
    toggleLogButtonText() {
      if (this.logButtonText === "Show Log") {
        this.logButtonText = "Hide Log";
      } else {
        this.logButtonText = "Show Log";
      }
    },
    toggleLog() {
      console.log('Emitting toggleLog event');
      this.$emit('toggleLog')
    },
  }
}
</script>

<style scoped>
#logButton {
  margin-bottom: 10px;
}

#logButton {
  font-family: "Tahoma", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: var(--radius);
  padding-top: var(--padding);
  color: white;
  background-color: #701e50;
}

#logButton.logButtonPressed {
  background-color: #500334;
}

#logButton:hover {
  cursor: pointer;
}
</style>