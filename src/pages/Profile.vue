<template>
  <div>
    <the-header :status="profileUserStatus">
    </the-header>
    <new-post :userName="profileUserName" :userId="this.$route.params.id">
    </new-post>

    <div class="container-no-posts" v-if="Object.keys(posts).length == 0">Você ainda não fez nenhuma publicação</div>

    <div v-for="post in posts" :key="post.id">
      <post 
        :profileUserName="profileUserName" 
        :profileUserEmail="profileUserEmail"
        :postId="post.id" 
        :status="profileUserStatus" 
        :userName="post.user_name" 
        :userStatus="post.user_status" 
        :title="post.title" 
        :body="post.body">
      </post>
    </div>

  </div>
  
</template>

<script>
import TheHeader from '../components/layout/TheHeader.vue'
import NewPost from '../components/posts/NewPost.vue'
import Post from '../components/posts/Post.vue'



export default {
  components: {
    TheHeader,
    NewPost,
    Post
  },
  
  beforeMount() {
    this.profileUser();

    this.getPosts();

    setInterval(() => {
      this.getPosts()
    }, 10000);
  },
  
  data() {
    return {
      posts: {},
      interval: 0,
      profileUserStatus: '',
      profileUserName: '',
      profileUserEmail: ''
    }
  },
  methods: {

    profileUser() {
      let userId = this.$route.params.id;

      const axios = require('axios');

      axios.get('https://gorest.co.in/public/v2/users/' + userId)
        .then( (response) => {
          this.profileUserStatus = response.data.status
          this.profileUserName = response.data.name
          this.profileUserEmail = response.data.email

        }).catch(() => {
          this.$router.replace('/notFound');
        });
        
    },

    getPosts() {
      const axios = require('axios');

      axios.get('https://gorest.co.in/public/v2/users/' + this.$route.params.id + '/posts')
        .then( (res) => {
          let obj = res.data;

          obj.sort((a, b) => (a.id < b.id) ? 1 : -1);

          obj.forEach((element, key) => {

            axios.get('https://gorest.co.in/public/v2/users/' + element.user_id)
              .then( (response) => {
                
                this.posts[key] = {
                  user_name: response.data.name,
                  user_status: response.data.status,
                  id: element.id,
                  user_id: element.user_id,
                  body: element.body,
                  title: element.title
                } 
                
              }).catch(() => {
                console.log('Details not found for user:' + element.user_id)
              });

          });

        }).catch((err) => {
          console.log(err);
        });

    }
  }

};
</script>

<style scoped>
.container-no-posts {
  border-radius: 18px;
  box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  margin: auto;
  max-width: 40rem;
  background-color: #525252;
  margin-top: 2%;
  text-align: center;
  color: white;
}
</style>
