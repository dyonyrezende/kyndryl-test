<template>
  <div class="container">
    <img class="user-photo" src="./../../../public/user.png">
    <span :class="[ this.userStatus == 'inactive' ? inactiveClass : activeClass ]">{{ this.userName }} {{ this.userStatus == 'inactive' ? '(Usuário Inativo)' : '' }}</span>
   
    <div>
      <div class="post-title">
        {{ this.title }}
      </div>
      <div class="post-body">
        {{ this.body }}
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: [
    'title', 
    'body', 
    'userName',
    'userStatus'
  ],
  data() {
    return {
      inactiveClass: 'text-inactive',
      activeClass: 'text',
    };
  }
}
</script>

<style scoped>

.container {
  border-radius: 18px;
  box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  margin: auto;
  max-width: 40rem;
  background-color: #3a3a3a;
  margin-top: 2%;
}

.post-title {
  background-color: #525252;
  border: solid thin #7a7a7a;
  color: white;
  width: 100%;
  padding-left: 2%;
  padding-top: 1%;
  padding-bottom: 1%;
  font-size: 14px;
  margin-top: 1%;
  border-radius: 10px;
}

.post-body {
  background-color: #525252;
  border: solid thin #7a7a7a;
  color: #c5c5c5;
  width: 100%;
  padding: 2%;
  font-size: 14px;
  margin-top: 1%;
  border-radius: 10px;
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

.text-inactive {
  font-size: 13px;
  color: #c5c5c5;
  font-family: sans-serif;
  padding-left: 2%;
  vertical-align: top;
}
</style>