<template>
  <div id="comment-container" class="container-comment">
    <div>
      <img class="user-photo-comment" src="./../../../public/user.png">
      <div>
        <span id="user-name" class="text">{{ this.userName }}</span>      
        <br>        
        <span id="comment-content" class="text-comment">{{ this.body }}</span>
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