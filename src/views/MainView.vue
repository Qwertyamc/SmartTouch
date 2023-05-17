<template>
    <div class="card-wrapper">
      <div class="text-h3">
        Welcome to <br><strong>スマルト Touch's</strong><br> message reception board!
      </div>
      <div class="button-wrapper">
        <router-link to="/ip"><v-btn color='primary' size="x-large">Connect</v-btn></router-link>
      </div>
    </div>
  </template>

<style scoped>
.card-wrapper{
  display: flex;
  height:fit-content;
  flex-direction: column;
  width: 90%;
  text-align: center;
}

.button-wrapper{
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>
