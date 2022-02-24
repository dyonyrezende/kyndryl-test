<template>
  <div id="new-post-container" class="container">
    <img class="user-photo" src="./../../../public/user.png">
    <span class="text">{{ this.userName }}</span>
   
    <div>
      <label class="label">Titulo da Publicação</label>
      <input id="post-title" class="input-post" type="text" v-model="postTitle">
      <div id="title-error" v-if="noTitleError" class="error-message">Titulo é obrigatório.</div>
      <br>

      <label class="label">Texto da Publicação</label>
      <textarea class="input-text-area" rows="5" v-model="postContent"></textarea>
      <div v-if="noContentError" class="error-message">Conteúdo da publicação é obrigatório.</div>

      <div v-if="userInactiveError" class="error-message">O usuário precisa estar ativo para realizar uma publicação.</div>
      <div v-if="requestError" class="error-message">Falha ao publicar.</div>
      <div v-if="sucessCreatedPost" class="success-message">Publicação criada com sucesso.</div>

      <div style="text-align: right">
        <button id="new-post-btn" class="btn-create" @click="createPost">Publicar</button>
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