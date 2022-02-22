<template>
  <div class="container">
    <img class="user-photo" src="./../../../public/user.png">
    <span class="text">{{ this.userName }}</span>
   
    <div>
      <label class="label">Titulo da Publicação</label>
      <input class="input-post" type="text" v-model="postTitle">
      <div v-if="noTitleError" class="error-message">Titulo é obrigatório.</div>
      <br>

      <label class="label">Texto da Publicação</label>
      <textarea class="input-text-area" rows="5" v-model="postContent"></textarea>
      <div v-if="noContentError" class="error-message">Conteúdo da publicação é obrigatório.</div>

      <div v-if="userInactiveError" class="error-message">O usuário precisa estar ativo para realizar uma publicação.</div>
      <div v-if="requestError" class="error-message">Falha ao publicar.</div>
      <div v-if="sucessCreatedPost" class="success-message">Publicação criada com sucesso.</div>

      <div style="text-align: right">
        <button class="btn-create" @click="createPost">Publicar</button>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ['userId', 'userName'],
  data() {
    return {
      postTitle: '',
      postContent: '',
      userInactiveError: false,
      sucessCreatedPost: false,
      requestError: false,
      noTitleError: false,
      noContentError: false,
    };
  },
  methods: {

    createPost() {
      const axios = require('axios');

      if (this.postTitle == '') {
        this.noTitleError = true;

        setTimeout(() => {
                    this.noTitleError = false;
                  }, 3000);

        return;
      }

      if (this.postContent == '') {
        this.noContentError = true;

        setTimeout(() => {
                    this.noContentError = false;
                  }, 3000);

        return;
      }


      let data = {
        user_id: this.userId,
        title: this.postTitle,
        body: this.postContent
      }

      let headers = {
        headers: {
          'Authorization': 'Bearer ' + '84e64107e4ddd45adeb21fb85978690ed0b9750f8f10d15d7bd2bb13ea0f447d'
          }
      }
      

      axios.get('https://gorest.co.in/public/v2/users/' + this.userId)
        .then( (response) => {
          if (response.data.status == 'inactive') {
            this.userInactiveError = true;
            return;
          }

          if (response.data.status == 'active') {
            this.userInactiveError = false;
            
            axios.post('https://gorest.co.in/public/v2/users/' + this.userId + '/posts', data, headers)
              .then( (res) => {
                if (res.status == 201) {
                  this.sucessCreatedPost = true;
                  this.postTitle = '';
                  this.postContent = '';

                  setTimeout(() => {
                    this.sucessCreatedPost = false;
                  }, 2000);

                  return;
                } else {
                    this.requestError = true;
                    return;
                }
              });
          }
        });
    }
  },
}
</script>

<style scoped>
.btn-create {
  background-color: #2c2c2c;
  box-shadow: 0 0 4px 1px rgba(211, 211, 211, 0.25);
  border-radius: 10px;
  width: 110px;
  height: 25px;
  color: white;
  margin-top: 3%;
	border: none;
	padding: 0;
	font-family: sans-serif;
  font-size: 12px;
	cursor: pointer;
	outline: inherit;
  transition: 0.3s;
}

.btn-create:hover {
  background-color: #969696;
  color: white;
}

.container {
  border-radius: 18px;
  box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  margin: auto;
  max-width: 40rem;
  background-color: #3a3a3a;
  margin-top: 2%;
}

.input-post {
  background-color: #525252;
  border: solid thin #7a7a7a;
  color: #222222;
  width: 40%;
  padding: 2%;
  height: 25px;
  border-radius: 10px;
  transition: 0.3s;
  margin-top: 1%;
  color: #c5c5c5;
  font-weight: bold;
}

.input-text-area {
  background-color: #525252;
  border: solid thin #7a7a7a;
  color: #222222;
  width: 100%;
  padding: 2%;
  margin-top: 1%;
  border-radius: 10px;
  color: #c5c5c5;
}

.input-text-area:focus {
  border: solid thin #c4c4c4;
  outline: none;
  width: 100%
}

.input-post:focus {
  border: solid thin #c4c4c4;
  outline: none;
  width: 100%
}

.user-photo {
  width: 40px;
  height: 40px;
}

.text {
  font-size: 13px;
  color: white;
  font-family: sans-serif;
  padding-left: 2%;
  vertical-align: top;
}

.label {
  display: block;
  font-size: 12px;
  padding-top: 2px;
  margin-top: 3%;
  color: white;
  font-family: sans-serif;
}

.error-message {
  background-color: rgb(212, 138, 138);
  border-radius: 5px;
  color: red;
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 11px;
  margin-top: 1%;
}

.success-message {
  background-color: rgb(167, 248, 187);
  border-radius: 5px;
  color: rgb(5, 92, 20);
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 11px;
  margin-top: 1%;
}
</style>