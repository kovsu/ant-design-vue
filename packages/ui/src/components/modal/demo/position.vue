<template>
  <div>
    <a-button variant="solid" @click="modal1Open = true">
      Display a modal dialog at 20px to Top
    </a-button>
    <a-modal
      v-model:open="modal1Open"
      title="20px to Top"
      style="top: 20px"
      @ok="modal1Open = false"
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </a-modal>
    <br /><br />
    <a-button variant="solid" @click="modal2Open = true">
      Vertically centered modal dialog
    </a-button>
    <a-modal
      v-model:open="modal2Open"
      title="Vertically centered modal dialog"
      centered
      @ok="modal2Open = false"
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const modal1Open = ref(false)
const modal2Open = ref(false)
</script>
