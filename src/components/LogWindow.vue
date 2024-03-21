<template>
  <div id="logWindow">
    <div id="logWindowTitle">Log</div>
    <ul id="logList">
      <li v-for="(logEntry, index) in calculationLog" :key="index" @click="handleLogEntryClick(logEntry)">
        {{ logEntry.number1 }} {{ logEntry.operation }} {{ logEntry.number2 }} = {{ logEntry.result }}
      </li>
    </ul>
  </div>
</template>

<script>
// Import the service
import LogService from '@/services/LogService';
import { mapMutations } from 'vuex';


export default {
  name: "LogWindow",
  props: {
    calcLog: Array,
  },
  data() {
    return {
      logButtonIsPressed: false,
      calculationLog: [],
    };
  },
  mounted() {
    this.fetchCalculationLog();
  },
  methods: {
    fetchCalculationLog() {
      LogService.getCalculationLog()
          .then(response => {
            console.log("Fetched log entries:", response.data); // Log what was returned
            this.calculationLog = response.data;
            console.log("Updated state of calculationLog:", this.calculationLog); // Log the updated state
          })
          .catch(error => {
            console.error("There was an error fetching the calculation log:", error);
          });
    },  ...mapMutations(['setLogEntryDetails']),
    handleLogEntryClick(logEntry) {
      // Directly call the method mapped to the mutation
      this.setLogEntryDetails({
        expression: `${logEntry.number1} ${logEntry.operation} ${logEntry.number2}`,
        result: logEntry.result
      });
    }
  }
}
</script>


<style scoped>
#logWindow {
  border-radius: var(--radius);
  padding-top: var(--padding);
  background-color: #4d4694;
  margin-left: 25%;
  margin-right: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow-y: auto;
}

#logWindow::-webkit-scrollbar{
  width: 0.3rem;
}

#logWindow::-webkit-scrollbar-thumb{
  background-color: rgba(21, 20, 40, 0.87);
  border-radius: var(--radius);
  padding-top: var(--padding);
}

#logWindow::-webkit-scrollbar-track{
  border-radius: var(--radius);
  padding-top: var(--padding);
  background-color: #ffffff;
}

#logList {
  font-weight: 300;
  font-family: palatino, sans-serif;
  font-size: 0.9rem;
  list-style: none;
  text-align: left;
  padding: 0;
}

#logList li {

  margin-bottom: 1.5rem;
  margin-top: 0.8rem;

  text-align: center;
}

#logList li:hover {

  cursor:pointer;
}

#logWindowTitle {
  font-weight: 500;
  font-family: Tahoma, sans-serif;
  font-size: 1.1rem;
  margin: 0;
}

@media only screen and (max-width: 650px) {
  #logWindow {
    background-color: #161634;
    margin: 0;
  }

  #logWindow::-webkit-scrollbar-thumb{
    background-color: rgba(128, 128, 128, 0.61);
    border-radius: var(--radius);
    padding-top: var(--padding);
  }

  #logWindow::-webkit-scrollbar-track{
    border-radius: var(--radius);
    padding-top: var(--padding);
    background-color: #000000;
  }

}
</style>