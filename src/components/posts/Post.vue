<template>
  <div v-if="readyToRender" class="container">
    <img class="user-photo" src="./../../../public/user.png">
    <span :class="[ this.userStatus == 'inactive' ? inactiveClass : activeClass ]">{{ this.userName }} {{ this.userStatus == 'inactive' ? '(Usuário Inativo)' : '' }}</span>
   
    <div>
      <div class="post-title">
        {{ this.title }}
      </div>

      <div class="post-body">
        {{ this.body }}
      </div>

      <div class="line">
      </div>

       <label class="label">Adicionar comentário</label>
      <textarea class="input-text-comment" rows="5" v-model="commentBody"></textarea>

      <div style="text-align: right">
        <span v-if="this.status == 'inactive'" class="inactive-warning">Usuários inativos não podem fazer comentários</span>
        <button v-if="this.status == 'active'" class="btn-comment" @click="createComment(this.postId)">Comentar</button>
      </div>

      <div v-for="comment in comments" :key="comment.id">
        <post-comment :body="comment.body" :userName="comment.name">
        </post-comment>
      </div>

    </div>
    
  </div>
</template>

<script>

import PostComment from './PostComment.vue'

export default {
  components: {
    PostComment
  },
  props: [
    'postId',
    'title', 
    'body', 
    'userName',
    'userStatus',
    'status',
    'profileUserName',
    'profileUserEmail'
  ],
  data() {
    return {
      inactiveClass: 'text-inactive',
      activeClass: 'text',
      comments: {},
      commentBody: '',
      readyToRender: false
    };
  },
  beforeMount() {
    this.getPostComments()
  },
  methods: {
    createComment(id) {
      const axios = require('axios');

      let data = {
        post_id: this.postId,
        name: this.profileUserName,
        email: this.profileUserEmail,
        body: this.commentBody
      };

      axios.post('https://gorest.co.in/public/v2/posts/' + id + '/comments', data, 
        {
          headers: {
            'Authorization': 'Bearer ' + '84e64107e4ddd45adeb21fb85978690ed0b9750f8f10d15d7bd2bb13ea0f447d'
            }
        }).then(() => {
          this.commentBody = ''
        }).catch((err) => {
          console.log(err)
        });
    },
    getPostComments() {
      const axios = require('axios');

      axios.get('https://gorest.co.in/public/v2/posts/' + this.postId + '/comments')
        .then( (response) => {
            response.data.forEach((e, key) => {
              this.comments[key] = e
            });
            this.readyToRender = true
        }).catch((err) => {
          console.log(err)
        });
    }
  }
}
</script>
