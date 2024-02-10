<template>
    <button class="backButton" title="Return to Home-page" @click="goBackToCalc()">
      <img src="@/assets/back.png" alt="Back"/>
    </button>


  <form @submit.prevent="handleSubmit()">
    <label>Name:</label>
    <input type="text" v-model="formData.name"  @blur="handleNameErrorMsg()" @focus="clearNameError()" @input="validateName()" class="nameInputField">
    <div v-if="nameErrorMessage" class="error">{{ nameErrorMessage }}</div>


    <label>Email:</label>
    <input type="email" v-model="formData.email" @blur="handleEmailErrorMsg()" @focus="clearEmailError()" @input="validateEmail()" class="emailInputField">
    <div v-if="emailErrorMessage" class="error">{{ emailErrorMessage }}</div>

    <label>Message:</label>
    <input type="text" v-model="formData.message" @blur="handleMsgErrorMsg()" @focus="clearMsgError()" @input="validateMessage()" class="messageInputField">
    <div v-if="messageErrorMessage" class="error">{{ messageErrorMessage }}</div>

    <div class="submit">
      <button :disabled="isFormInvalid">Submit</button>
      <div v-if="submissionErrorMessage" class="submissionStatus">{{ submissionErrorMessage }}</div>
      <div v-if="submissionSuccessMessage" class="submissionStatus">{{ submissionSuccessMessage }}</div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: "ContactForm",
  data() {
    return {
      nameErrorMessage: null,
      emailErrorMessage: null,
      messageErrorMessage: null,
      submissionErrorMessage: null,
      submissionSuccessMessage: null,
      nameIsInvalid : true,
      emailIsInvalid : true,
      messageIsInvalid : true,
    }
  },
  created() {
    this.validateName();
    this.validateEmail();
    this.validateMessage();
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:3000/contactForms', {
          name: this.formData.name,
          email: this.formData.email,
          message: this.formData.message,
        });

        this.submissionSuccessMessage = 'Form submitted successfully';

        this.$store.commit('setFormData', {
          name: '',
          email: '',
          message: '',
        });
        this.isFormInvalid = true;
      } catch (error) {
        this.submissionErrorMessage = 'Error submitting form. Please try again later.';
      }


    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(this.formData.email)) {
        this.emailIsInvalid = false;
      }
      else {
        this.emailIsInvalid = true;
      }
    },
    validateName() {
      const words = this.formData.name.split(/\s+/);

      if (words.length >= 2) {
        this.nameIsInvalid = false;

      }
      else {
        this.nameIsInvalid = true;
      }
    },
    validateMessage() {
      if (this.formData.message) {
        this.messageIsInvalid = false;
      }
      else {
        this.messageIsInvalid = true;
      }
    },
    handleNameErrorMsg() {
      if (this.nameIsInvalid) {
        this.nameErrorMessage = "Requires at least Firstname and Lastname";
      }
      else {
        this.clearNameError();
      }
    },
    handleEmailErrorMsg() {
      if (this.emailIsInvalid) {
        this.emailErrorMessage = "Invalid Email";
      }
      else {
        this.clearEmailError();
      }
    },
    handleMsgErrorMsg() {
      if (this.messageIsInvalid) {
        this.messageErrorMessage = "Message field cannot be empty";
      }
      else {
        this.clearMsgError();
      }
    },
    clearEmailError() {
      this.emailErrorMessage = "";
    },
    clearNameError() {
      this.nameErrorMessage = "";
    },
    clearMsgError() {
      this.messageErrorMessage = "";
    },
    getImagePath() {
      return require('@/assets/back.png');
    },
    goBackToCalc() {
      this.$router.push('/');
    },
  },
  computed: {
    isFormInvalid() {
      return this.emailIsInvalid || this.nameIsInvalid || this.messageIsInvalid;
    },
    formData() {
      return this.$store.getters.formData;
    }
  },
}
</script>

<style scoped>
form {
  max-width: 840px;
  max-height: 100vh;
  overflow-y: auto;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
  font-size: 0.8em;
}

.submit button {
  background: #7d50b7;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  font-size: 1em;
  cursor: pointer;
}

.submit button:disabled {
  cursor: not-allowed;
  background: #8a8686;
}

.submit button:not(:disabled):active {
  background: #5c357d;

}

.submit {
  text-align: center;
}
.error {
  color: #701e50;
  margin-top: 10px;
  font-size: 1em;
  font-weight: bold;
}

.backButton {
  cursor: pointer;
  position: fixed;
  top: 10px;
  left: 10px;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.backButton:active {
  transform: scale(1.05);
}

.backButton img {
  width: 40px;
  height: 40px;
}

.submissionStatus {
  margin-top: 10px;
  font-size: 1em;
  font-weight: bold;
}
</style>