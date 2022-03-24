<template>
  <div>
    <the-header :status="profileUserStatus">
    </the-header>
    <new-post @postCreated="getPosts" :userName="profileUserName" :userId="this.$route.params.id">
    </new-post>

    
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
  },
  
  activated() {
    setInterval(() => {
      this.getPosts()
    }, 30000);
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

      let headers = {
        headers: {
          'Authorization': 'Bearer ' + '84e64107e4ddd45adeb21fb85978690ed0b9750f8f10d15d7bd2bb13ea0f447d'
          }
      }

      axios.get('https://gorest.co.in/public/v2/users/' + userId, headers)
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

      let headers = {
        headers: {
          'Authorization': 'Bearer ' + '84e64107e4ddd45adeb21fb85978690ed0b9750f8f10d15d7bd2bb13ea0f447d'
          }
      }

      axios.get('https://gorest.co.in/public/v2/posts', headers)
        .then( (res) => {
          let obj = res.data;

          obj.sort((a, b) => (a.id < b.id) ? 1 : -1);

          obj.forEach((element, key) => {

            axios.get('https://gorest.co.in/public/v2/users/' + element.user_id, headers)
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
