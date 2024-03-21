
<template>
  <div class="login-view">
    <LogIn/>
  </div>
</template>

<script>
 import LogIn from "@/components/LogIn.vue";

 export default {
   name: "LogInView",
   components: {
     LogIn,
   }
 }
</script>



<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>