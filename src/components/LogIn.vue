<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input
            type="text"
            id="username"
            v-model="loginForm.username"
            required
            autofocus
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            v-model="loginForm.password"
            required
        />
      </div>
      <div class="form-group">
        <button type="submit" class="login-button">Login</button>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      error: null
    };
  },
  methods: {
    handleLogin() {
      // Here you would integrate with your authentication service
      // This is just a stub to simulate an async login operation
      if (this.loginForm.username && this.loginForm.password) {
        this.error = null;
        this.$emit('login', { ...this.loginForm });
        // You might want to redirect or do something else on successful login
      } else {
        this.error = 'Please enter both username and password.';
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.login-button {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: #5cb85c;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #4cae4c;
}

.error-message {
  color: #d9534f;
}
</style>
