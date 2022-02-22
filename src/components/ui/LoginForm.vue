<template>
  <div class="card">
    <label for="userId" class="label">ID do Usuário</label>
    <input type="text" id="userId" class="input-text-form" v-model="userId">
    <label for="userEmail" class="label">Email do Usuário</label>
    <input type="text" id="userEmail" class="input-text-form" v-model="email">

    <div v-if="!loginIsValid" class="error-message">Email ou ID não preenchidos ou inválidos.</div>
    <div v-if="error" class="error-message">Erro no retorno da requisição, tente realizar o login com um usuário padrão cadastrado na API.</div>
    <div class="btn-container">
      <button class="btn-login" @click="login()">Login</button>
      <button class="btn-new-user" @click="changeModalStatus(true)">Novo Usuário</button>
    </div>
  </div>
  <new-user-form @close-modal="changeModalStatus(false)" :showModal="showModal"></new-user-form>
</template>

<script>
import NewUserForm from './NewUserForm.vue'

export default {
  components: {
    NewUserForm
  },
  data() {
    return {
      error: false,
      loginIsValid: true,
      email: '',
      userId: '',
      showModal: false,
    };
  },
 
  methods: {
    changeModalStatus(status) {
      this.showModal = status;
    },

    login() {
      const axios = require('axios');

      if (this.email == '' || this.userId == '' || !this.email.includes('@')) {
        this.loginIsValid = false;
        return;
      }

      axios.get('https://gorest.co.in/public/v2/users/' + this.userId)
        .then( (res) => {
          if (res.data.email != this.email) {
            this.loginIsValid = false;
            return;
          }
          
          this.$router.replace('/user/' + this.userId + '/posts');

        }).catch(() => {
          this.error = true
          console.log('user not found')
        });

        
    }
  },
};
</script>

<style scoped>

.input-text-form {
  width: 100%;
  margin-bottom: 10px;
  font-size: 12px;
  height: 25px;
}

.label {
  display: block;
  font-size: 12px;
  padding-top: 2px;
  padding-bottom: 5px;
  color: white;
  font-family: sans-serif;
}

.card {
  border-radius: 18px;
  box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  margin: auto;
  max-width: 32rem;
  background-color: #646464;
  margin-top: 15%;
}

.btn-login {
  background-color: #969696;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 80px;
  height: 25px;
  color: white;
	border: none;
	padding: 0;
	font-family: sans-serif;
  font-size: 12px;
	cursor: pointer;
	outline: inherit;
  transition: 0.3s;
}

.btn-login:hover {
  background-color: #2c2c2c;
  color: #969696;
}

.btn-new-user:hover {
  background-color: #969696;
}

.btn-new-user {
  margin-left: 2%;
  background-color: #2c2c2c;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  color: white;
  width: 110px;
  height: 25px;
  border: none;
	padding: 0;
	font-family: sans-serif;
  font-size: 12px;
	cursor: pointer;
	outline: inherit;
  transition: 0.3s;
}

.btn-container {
  text-align: right;
  padding-top: 5px;
}

.error-message {
  background-color: rgb(212, 138, 138);
  border-radius: 5px;
  color: red;
  padding-left: 10px;
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 11px;
  margin-bottom: 5px;
}
</style>