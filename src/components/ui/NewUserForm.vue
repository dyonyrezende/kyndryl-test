<template>
  <div class="modal" v-if="showModal">
    <div class="card-new-user">
      <label for="newUserName" class="label-new-user">Nome do Usuário</label>
      <input type="text" id="newUserName" class="input-text-form-new-user" v-model="newUserName">
      <div v-if="noUserNameError" class="error-message-new-user">Nome de usuário é obrigatório.</div>

      <label for="newUserEmail" class="label-new-user">Email do Usuário</label>
      <input type="text" id="newUserEmail" class="input-text-form-new-user" v-model="newUserEmail">
      <div v-if="noUserEmailError" class="error-message-new-user">Email não preenchido ou inválido.</div>

      <div class="gender-container">
          <input type="radio" class="radio-gender" name="gender" value="1" v-model="newUserGender">
          <label class="label-new-user" for="active">Masculino</label>
          <input type="radio" class="radio-gender" name="gender" value="2" v-model="newUserGender">
          <label class="label-new-user" for="inactive">Feminino</label>
      </div>
      <div v-if="noUserGenderError" class="error-message-new-user">Sexo não selecionado.</div>

      <div v-if="errorCreatingUser" class="error-message-new-user">Erro ao tentar criar o usuário.</div>
      <div v-if="userCreated" class="success-message-new-user">Usuário criado com sucesso.</div>
      <div v-if="loginId != ''" class="show-login-id">Seu ID para login é: {{ loginId }}</div>
      <div class="btn-container-new-user">
        <button class="btn-create-user" @click="createNewUser">Criar Usuário</button>
        <button class="btn-close" @click="$emit('closeModal')">Fechar</button>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  props: ['showModal'],
  data() {
    return {
      newUserName: '',
      newUserEmail: '',
      newUserGender: '',
      newUserStatus: 'active',
      noUserNameError: false,
      noUserEmailError: false,
      noUserGenderError: false,
      userCreated: false,
      errorCreatingUser: false,
      loginId: ''
    }
  },
 
  methods: {
    createNewUser() {

      const axios = require('axios');

      if (this.newUserName == '') {
        this.noUserNameError = true;
        return;
      }

      if (this.newUserEmail == '' || !this.newUserEmail.includes('@')) {
        this.noUserEmailError = true;
        return;
      }

      if (this.newUserGender == '') {
        this.noUserGenderError = true;
        return;
      }

      let gender = '';

      if (this.newUserGender == 1) {
        gender = 'male';
      }

      if (this.newUserGender == 2) {
        gender = 'female';
      }

      let data = {
        name: this.newUserName,
        email: this.newUserEmail,
        gender: gender,
        status: this.newUserStatus
      };

      axios.post('https://gorest.co.in/public/v2/users', data, 
        {
          headers: {
            'Authorization': 'Bearer ' + '84e64107e4ddd45adeb21fb85978690ed0b9750f8f10d15d7bd2bb13ea0f447d'
            }
        }).then((response) => {
      
          this.loginId = response.data.id;
          this.userCreated = true;
          this.newUserName = '';
          this.newUserEmail = '';
          this.newUserGender = '';
          
        }).catch(() => {
          this.errorCreatingUser = true;
        });


    }
  },
};
</script>