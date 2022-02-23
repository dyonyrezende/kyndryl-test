<template>
  <div class="container-comment">
    <div>
      <img class="user-photo" src="./../../../public/user.png">
      <div>
        <span class="text">{{ this.userName }}</span>      
        <br>        
        <span class="text-comment">{{ this.body }}</span>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  props: [
    'body', 
    'userName'
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

.container-comment {
  border-radius: 3rem;
  box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.25);
  padding: 2%;
  padding-left: 4%;
  margin: auto;
  min-height: 3.5rem;
  max-width: 100%;
  background-color: #525252;
  margin-top: 1%;
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
  width: 30px;
  height: 30px;
  float: left;
}

.text {
  font-size: 13px;
  color: white;
  font-family: sans-serif;
  padding-left: 2%;
  vertical-align: top;
}

.text-comment {
  font-size: 13px;
  color: #c5c5c5;
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