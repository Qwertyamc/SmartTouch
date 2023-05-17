<script setup lang="ts">
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <router-link to="/"><v-btn variant="text" color='secondary'><img src="./assets/logo-name.png"/></v-btn></router-link>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
  
  
</template>

<style scoped>
img{
  height: 2rem;
}
</style>
