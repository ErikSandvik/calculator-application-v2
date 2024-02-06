<template>
  <header>
    <img :src="getImagePath()" alt="Logo"/>
    Calculator Application
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {

    }
  },
  methods: {
    getImagePath() {
      return require('@/assets/logo.png');
    },
  }
}
</script>

<style scoped>
header {
  padding-top: var(--padding);
  border-radius: var(--radius);
  font-family: Inter, sans-serif;
  color: black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}


header img {
  max-width: 70px;
  height: auto;
  margin-right: 0.3rem;
}
</style>