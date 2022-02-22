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

      <div class="line">
      </div>

       <label class="label">Adicionar comentário</label>
      <textarea class="input-text-comment" rows="5"></textarea>

      <div style="text-align: right">
        <span v-if="this.status == 'inactive'" class="inactive-warning">Usuários inativos não podem fazer comentários</span>
        <button v-if="this.status == 'active'" class="btn-comment" @click="test">Comentar</button>
      </div>

    </div>
    
  </div>
</template>

<script>
export default {
  props: [
    'postId',
    'title', 
    'body', 
    'userName',
    'userStatus',
    'status'
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

.label {
  display: block;
  font-size: 12px;
  padding-top: 2px;
  margin-top: 3%;
  color: white;
  font-family: sans-serif;
}

.input-text-comment {
  background-color: #525252;
  border: solid thin #7a7a7a;
  color: #222222;
  width: 100%;
  padding: 2%;
  margin-top: 1%;
  height: 4rem;
  border-radius: 10px;
  color: #c5c5c5;
}

.inactive-warning {
  font-size: 12px;
  color: #bebebe;
  font-family: sans-serif;
  padding-right: 2%;
}

.btn-comment {
  background-color: #969696;
  border-radius: 10px;
  width: 90px;
  height: 20px;
  color: white;
  margin-top: 1%;
	border: none;
	padding: 0;
	font-family: sans-serif;
  font-size: 12px;
	cursor: pointer;
	outline: inherit;
  transition: 0.3s;
}

.btn-comment:hover {
  background-color: #2c2c2c;
  color: white;
}

.input-text-comment:focus {
  border: solid thin #c4c4c4;
  outline: none;
  width: 100%
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

.line {
  border-bottom: solid thin #7a7a7a;
  margin-top: 3%;
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