<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link :to="postUrl">POSTS</router-link>
        </li>
        <li>
          <router-link :to="profileUrl">PERFIL</router-link>
        </li>
      </ul>
    </nav>
    <div>
      <label>Status do usuário: </label>
      <input type="radio" class="radio-status" name="status" id="active" :checked="this.status == 'active'" @click="changeStatus('active', this.$route.params.id)">
      <label for="active">Ativo</label>
      <input type="radio" class="radio-status" name="status" id="inactive" :checked="this.status == 'inactive'" @click="changeStatus('inactive', this.$route.params.id)">
      <label for="inactive">Inativo</label>
      <img @click="logout" class="logout-icon" src="./../../../public/logout.png">
    </div>
  </header>
</template>

<script>
export default {
  props: ['status'],
  data() {
    return {
      postUrl: '/user/' + this.$route.params.id + '/posts',
      profileUrl: '/user/' + this.$route.params.id + '/profile'
    };
  },
  methods: {
    logout() {
      this.$router.replace('/');
    },

    changeStatus(status, userId) {
      const axios = require('axios');
      let data = {
        status: status
      };

      let headers = { 
        headers: {
          'Authorization': 'Bearer ' + '84e64107e4ddd45adeb21fb85978690ed0b9750f8f10d15d7bd2bb13ea0f447d'
          }
        } 

      axios.put('https://gorest.co.in/public/v2/users/' + userId, data, headers)
        .catch((err) => {
          console.log(err)
        });

      
    }
  },
}
</script>

<style scoped>
header {
  width: 100%;
  height: 3rem;
  background-color: #3a3a3a;
  border-bottom: 1px solid #7b7b7b;
  display: flex;
  justify-content: center;
  align-items: center;
}

header div {
  align-items: right;
  display:block;
  position: absolute;
  margin-left: 70%;
  color: white;
}

header a {
  text-decoration: none;
  background-color: transparent;
  color: black;
  display: inline-block;
  padding: 0.2rem 4rem;
  border: 1px solid white;
  border-radius: 20px;
  color: white;
  transition: 0.3s;
}

a:active,
a:hover,
a.router-link-active {
  background-color: #c4c4c4;
  border: 1px solid transparent;
  color:black;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

.radio-status {
  margin-left: 1rem;
}

.logout-icon {
  width: 5%;
  height: 5%;
  filter: invert(100%);
  margin-left: 8%;
  transition: all 0.3s ease-in-out

}

.logout-icon:hover {
  cursor: pointer;
  filter: invert(50%);
}
</style>