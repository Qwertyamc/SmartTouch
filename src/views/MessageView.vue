<script setup lang="ts">
import { ref, onMounted } from 'vue';

const loaded = ref(false);
const result = ref(false);

const message = ref("");

let client = undefined;

onMounted(()=>{
  const IP = sessionStorage.getItem("IP");

  client = new Paho.MQTT.Client(IP, 9001, "PC");

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({onSuccess:onConnect})

  setTimeout(()=>{if(!client.isConnected()) loaded.value = true;}, 5000);

  console.log(client);
});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("touch_topic");

  loaded.value = true;
  result.value = true;
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Lost connection:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(m) {
  message.value = m.payloadString;
  console.log("onMessageArrived:"+m.payloadString);
}

function handleClick(){
  window.location.reload();
}

</script>

<template>
  <div v-if="!loaded" class="text-h4">
    Loading...
  </div>
  <div v-else-if="!result" class="wrapper">
    <div class="text-h4">Could not connect to the MQTT broker</div>
    <div class="text-body-1">Perhaps the broker is not operable at this moment.</div>
    <div class="text-body-1">Are you sure it is the correct IP?</div>
    <div class="button-wrapper">
      <v-btn color='secondary' @click="handleClick">Refresh</v-btn><router-link to="/"><v-btn color='primary'>Back</v-btn></router-link>
    </div>
  </div>
  <div v-else class="wrapper success">
    <div class="text-h4 message-title">The recieved message was:</div>
    <v-sheet color="primary" rounded elevation="4" class="text-h5 message-box">{{ message }}</v-sheet>
    <router-link to="/"><v-btn color='primary'>Back</v-btn></router-link>
  </div>
</template>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  width: 80%;
  height: fit-content;
}

.success{
  align-items: center;
  justify-content: center;
}

.button-wrapper{
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.message-title{
  margin-bottom: 2rem;
}

.message-box{
  width: 100%;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}
</style>
