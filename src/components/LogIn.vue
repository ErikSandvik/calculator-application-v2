<template>
  <div class="log-window">
    <h2>{{ isLoginMode ? "Login" : "Register" }}</h2>
    <form @submit.prevent="isLoginMode ? login() : register()">
      <div>
        <label for="username">Username</label>
        <input id="username" v-model="credentials.username" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" type="password" v-model="credentials.password" required>
      </div>
      <button type="submit">{{ isLoginMode ? "Login" : "Register" }}</button>
    </form>
    <button @click="toggleMode">
      Switch to {{ isLoginMode ? "Register" : "Login" }}
    </button>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService"; // Ensure you have created this service

export default {
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      isLoginMode: true,
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthService.login(this.credentials.username, this.credentials.password);
        const accessToken = response.data.accessToken;
        console.log(response.data);
        sessionStorage.setItem("token", accessToken);
        console.log(sessionStorage.getItem("token"));
        this.$router.push({ name: 'Calculator' });
      } catch (error) {
        alert("Login failed: " + error.response.data);
      }
    },
    async register() {
      try {
        await AuthService.register(this.credentials.username, this.credentials.password);
        this.isLoginMode = true; // Switch to login mode after successful registration
        alert("Registration successful, please login.");
      } catch (error) {
        alert("Registration failed: " + error.response.data);
      }
    },
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
    }
  }
};
</script>

<style scoped>
.log-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.log-window form {
  margin-bottom: 10px;
}

.log-window label {
  margin-right: 5px;
}

.log-window input {
  margin-bottom: 10px;
}
</style>
