<template>
  <div class="modal" v-if="showModal">
    <div class="card">
      <label for="newUserName" class="label">Nome do Usuário</label>
      <input type="text" id="newUserName" class="input-text-form" v-model="newUserName">
      <div v-if="noUserNameError" class="error-message">Nome de usuário é obrigatório.</div>

      <label for="newUserEmail" class="label">Email do Usuário</label>
      <input type="text" id="newUserEmail" class="input-text-form" v-model="newUserEmail">
      <div v-if="noUserEmailError" class="error-message">Email não preenchido ou inválido.</div>

      <div class="gender-container">
          <input type="radio" class="radio-gender" name="gender" value="1" v-model="newUserGender">
          <label class="label" for="active">Masculino</label>
          <input type="radio" class="radio-gender" name="gender" value="2" v-model="newUserGender">
          <label class="label" for="inactive">Feminino</label>
      </div>
      <div v-if="noUserGenderError" class="error-message">Sexo não selecionado.</div>

      <div v-if="errorCreatingUser" class="error-message">Erro ao tentar criar o usuário.</div>
      <div v-if="userCreated" class="success-message">Usuário criado com sucesso.</div>
      <div v-if="loginId != ''" class="show-login-id">Seu ID para login é: {{ loginId }}</div>
      <div class="btn-container">
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
          if (response.status == 201) {
            this.loginId = response.data.id;
            this.userCreated = true;
            this.newUserName = '';
            this.newUserEmail = '';
            this.newUserGender = '';
          } else {
            this.errorCreatingUser = true;
          }
        });


    }
  },
};
</script>

<style scoped>

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


.success-message {
  background-color: rgb(138, 212, 171);
  border-radius: 5px;
  color: rgb(2, 87, 6);
  padding-left: 10px;
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 11px;
  margin-bottom: 5px;
}

.show-login-id {
  background-color: rgb(138, 212, 171);
  border-radius: 5px;
  color: rgb(2, 87, 6);
  padding-left: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 14px;
  margin-bottom: 5px;
}

.gender-container {
  display: flex;
  margin-top: 2%;
}

.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(255, 255, 255); /* Fallback color */
  background-color: rgba(255, 255, 255, 0.4); /* Black w/ opacity */
}

.radio-gender {
  margin-left: 0.4rem;
}

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
  max-width: 25rem;
  background-color: #646464;
  margin-top: 12%;
}

.btn-create-user {
  background-color: #969696;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 100px;
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

.btn-create-user:hover {
  background-color: #2c2c2c;
  color: #969696;
}

.btn-close:hover {
  background-color: #969696;
}

.btn-close {
  margin-left: 2%;
  background-color: #2c2c2c;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  color: white;
  width: 90px;
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

</style>