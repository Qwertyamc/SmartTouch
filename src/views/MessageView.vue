<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Speech from 'speak-tts';

const loaded = ref(false);
const result = ref(false);

const message = ref("");

let client = undefined;

const speech = new Speech();
if(speech.hasBrowserSupport()) { 
    console.log("speech synthesis supported");

    speech.init().then((data) => {
    console.log("Speech is ready, voices are available", data);
    }).catch(e => {
        console.error("An error occured while initializing : ", e);
    })
}

onMounted(()=>{
  const IP = sessionStorage.getItem("IP");

  client = mqtt.connect('wss://'+IP+':9001');
  //client = mqtt.connect('wss://test.mosquitto.org:8081');

  client.on("connect", onConnect);
  client.on("disconnect", onConnectionLost);

  client.on("message", onMessageArrived);

  setTimeout(()=>{if(!client.connected) loaded.value = true;}, 5000);

  console.log(client);
});

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Connected");
  client.subscribe("touch_topic");

  loaded.value = true;
  result.value = true;
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Lost connection: "+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(topic, m) {
  message.value = m.toString();
  console.log("Message arrived: "+m.toString());
}

function handleClick(){
  window.location.reload();
}

// DELETE THIS
function hearMessage(){
  if(speech.hasBrowserSupport()){
    speech.speak({
      text: message.value
    }).then(() => {
        console.log("Success !");
    }).catch(e => {
        console.error("An error occurred :", e);
    })
  }
}
</script>

<template>
  <div v-if="!loaded" class="text-h3">
    Loading...
  </div>
  <div v-else-if="!result" class="wrapper">
    <div class="text-h4 pad-down"><Strong>Could not connect to the MQTT broker</Strong></div>
    <div class="text-h5 pad-down">Perhaps the broker is not operable at this moment.</div>
    <div class="text-h6 pad-down">Are you sure it is the correct IP?</div>
    <div class="button-wrapper">
      <v-btn color='secondary' @click="handleClick" size="large">Refresh</v-btn><router-link to="/"><v-btn color='primary' size="large">Back</v-btn></router-link>
    </div>
  </div>
  <div v-else class="wrapper success">
    <div class="text-h4 message-title">The recieved message was:</div>
    <v-sheet color="primary" rounded elevation="4" class="text-h5 message-box">{{ message }}</v-sheet>
    <div class="button-wrapper">
      <v-btn color='secondary' @click="hearMessage" size="large">Hear out!</v-btn>
      <router-link to="/"><v-btn color='primary' size="large">Back</v-btn></router-link>
    </div>
    
    <!-- DELETE THIS -->
    
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
  width: 100%;
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

.pad-down{
  margin-bottom: 1rem;
}
</style>
