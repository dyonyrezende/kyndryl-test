<template>
  <div class="card">
    <label for="userId" class="label-login">ID do Usuário</label>
    <input type="text" id="userId" class="input-text-form" v-model="userId">
    <label for="userEmail" class="label-login">Email do Usuário</label>
    <input type="text" id="userEmail" class="input-text-form" v-model="email">

    <div id="email-id-error" v-if="!loginIsValid" class="error-message">Email ou ID não preenchidos ou inválidos.</div>
    <div v-if="error" class="error-message-login">Erro no retorno da requisição, tente realizar o login com um usuário padrão cadastrado na API.</div>
    <div class="btn-container">
      <button id="btn-login" class="btn-login" @click="login()">Login</button>
      <button id="btn-new-user" class="btn-new-user" @click="changeModalStatus(true)">Novo Usuário</button>
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

          setInterval(() => {
            this.error = false;
          }, 10000);
          console.log('user not found')
        });

        
    }
  },
};
</script>
