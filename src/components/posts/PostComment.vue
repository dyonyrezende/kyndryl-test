<template>
  <div class="container-comment">
    <div>
      <img class="user-photo-comment" src="./../../../public/user.png">
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