<script setup lang="ts">
import { ref } from "vue";

const IPtext = ref("");
const helper = ref("");

function handleClick(){
  if(/^[\.0-9]{7,16}$/.test(IPtext.value)){
    sessionStorage.setItem("IP", IPtext.value);
    helper.value = "";
    window.location.assign("/message");
  }
  IPtext.value = "";
  helper.value = "The IP entered did not have the correct structure. An IP should be: XXX.XXX.XXX.XXX";
}
</script>

<template>
  <div class="card-wrapper">
    <div class="text-h4 pad-down">
      Connect to your MQTT Broker!
    </div>
    <div class="text-h5 pad-down">
      Write down the IP you want to connect to:
    </div>
    <v-text-field label="IP" variant="outlined" placeholder="XXX.XXX.XXX.XXX" v-model="IPtext"></v-text-field>
    <div class="text-body-1 text-red-accent-4">{{ helper }}</div>
    <div class="button-wrapper">
      <v-btn color='primary' @click="handleClick" size="x-large">submit</v-btn>
    </div>
  </div>
</template>

<style scoped>
.card-wrapper{
  display: flex;
  height:fit-content;
  flex-direction: column;
  width: 80%;
}

.button-wrapper{
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.pad-down{
  margin-bottom: 1rem;
}
</style>
