<template>
  <div class="log-window">
    <h2>{{ isLoginMode ? "Login" : "Register" }}</h2>
    <form @submit.prevent="isLoginMode ? login() : register()" class="log-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" type="text" v-model="credentials.username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="credentials.password" required>
      </div>
      <button type="submit" class="submit-btn">{{ isLoginMode ? "Login" : "Register" }}</button>
    </form>

    <button @click="toggleMode" class="toggle-btn">
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
  justify-content: space-between;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 35rem;
  height: 25rem;
  background-color: #fff;
  box-sizing: border-box;
}

h2 {
  color: #333;
}

.form-group {
  width: 100%;
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

.form-group input {
  width: calc(100% - 20px);
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.log-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submit-btn, .toggle-btn {
  width: 18rem;
  padding: 12px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  box-sizing: border-box;
  text-align: center;
}

.submit-btn {
  background-color: #5cb85c;
  margin-bottom: 1rem;
}

.toggle-btn {
  background-color: #5bc0de;
}

.submit-btn:hover, .toggle-btn:hover {
  opacity: 0.9;
}
</style>



