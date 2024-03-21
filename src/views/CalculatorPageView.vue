<template>
<div class="container" :class="{ 'logButtonPressed': isLogButtonPressed }">
  <Header class="header"></Header>
  <Calculator :calcLog="calcLog" @log-update="handleLogUpdate" :isLogButtonPressed="isLogButtonPressed" class="calculator"></Calculator>
  <LogButton @toggleLog="toggleLogWindow()" class="logButton"></LogButton>
  <LogWindow v-show="showLog" class="logWindow"  :trigger-method="logMethodTriggered"></LogWindow>
  <div class="reviewButton">
    <img :src="getImagePath()" alt="reviewButton" title="Go to Contact-forms" @click="goToContactForm()"/>
  </div>
</div>
</template>

<script>
import Header from "@/components/Header.vue";
import Calculator from "@/components/Calculator.vue";
import LogButton from "@/components/LogButton.vue";
import LogWindow from "@/components/LogWindow.vue";

export default {
  name: "CalculatorPage",
  components: {
    LogButton,
    LogWindow,
    Header,
    Calculator,
  },
  data() {
    return {
      showLog: false,
      calcLog: [],
      isLogButtonPressed: false,
      logMethodTriggered: false,

    }
  },
  methods: {
    toggleLogWindow() {
      this.showLog = !this.showLog
      this.isLogButtonPressed = !this.isLogButtonPressed;
    },
    updateCalcLog(calcLog) {
      this.calcLog = calcLog;
    },
    getImagePath() {
      return require('@/assets/Chatbubble.png');
    },
    goToContactForm() {
      this.$router.push({ name: 'Contact-form' });
    },
    handleLogUpdate() {
      this.logMethodTriggered = true;
    }
  },
}
</script>

<style scoped>
.container {
  font-family: Inter, sans-serif;
  font-weight: 800;
  color: white;
  text-transform: uppercase;
  font-size: 12px;
  text-align: center;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 1.2fr;
  grid-template-rows: 0.2fr 2fr 0.5fr;
  grid-template-areas:
    "header header header"
    "log calculator ."
    ". logButton reviewButton";
  grid-gap: 1rem;
  height: 100vh;
}

.header {
  grid-area: header;
}

.calculator {
  grid-area: calculator;
}

.logWindow {
  grid-area: log;
}

.logButton {
  grid-area: logButton;
}

.reviewButton {
  grid-area: reviewButton;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 20px;
  margin-bottom: 20px;
}

.reviewButton img {
  cursor: pointer;
  width: 80px; /* Set the width as per your requirement */
  height: 80px; /* Set the height as per your requirement */
}
.reviewButton img:hover {
  transform: scale(1.05);
}


@media only screen and (max-width: 650px) {
  .container {

    grid-template-columns: 0.1fr 1fr 0.1fr;
    grid-template-rows: 0.2fr 2fr 0.4fr;
    grid-template-areas:
        ". header ."
        ". calculator ."
        ". logButton reviewButton";
  }

  .container.logButtonPressed {
    grid-template-areas:
        ". header ."
        ". log ."
        ". logButton reviewButton";
  }

  .reviewButton img {
    width: 40px; /* Set the width as per your requirement */
    height: 40px; /* Set the height as per your requirement */
  }

}
</style>