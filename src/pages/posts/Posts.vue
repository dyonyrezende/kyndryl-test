<template>
  <div>
    <the-header :status="profileUserStatus" @status-change="renderPosts()">
    </the-header>
    <new-post :userName="profileUserName" :userId="this.$route.params.id">
    </new-post>

    <div v-for="post in posts" :key="post.id">
      <post :postId="post.id" :status="profileUserStatus" :userName="post.user_name" :userStatus="post.user_status" :title="post.title" :body="post.body"></post>
    </div>
  </div>
</template>

<script>
import TheHeader from '../../components/layout/TheHeader.vue'
import NewPost from '../../components/posts/NewPost.vue'
import Post from '../../components/posts/Post.vue'

export default {
  components: {
    TheHeader,
    NewPost,
    Post
  },
  mounted() {
    this.getPosts()
  },
  
  beforeMount() {
    this.profileUser()
  },
  
  data() {
    return {
      posts: [],
      interval: 0,
      profileUserStatus: '',
      profileUserName: '',
    }
  },
  methods: {
    renderPosts() {
      this.$forceUpdate()
    },

    profileUser() {
      let userId = this.$route.params.id;

      const axios = require('axios');

      axios.get('https://gorest.co.in/public/v2/users/' + userId)
        .then( (response) => {
          this.profileUserStatus = response.data.status
          this.profileUserName = response.data.name

        });
        
    },

    getPosts() {
      const axios = require('axios');

      axios.get('https://gorest.co.in/public/v2/posts?page=2')
        .then( (res) => {
          let obj = res.data;

          obj.sort((a, b) => (a.id < b.id) ? 1 : -1);

          obj.forEach((element, key) => {

            axios.get('https://gorest.co.in/public/v2/users/' + element.user_id)
              .then( (response) => {

                element['user_name'] = response.data.name
                element['user_status'] = response.data.status   
                this.posts[key] = element 
                
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