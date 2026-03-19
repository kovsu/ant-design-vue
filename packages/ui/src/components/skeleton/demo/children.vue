<template>
  <div>
    <div style="margin-bottom: 16px;">
      <label>
        <input type="checkbox" :checked="loading" @change="loading = !loading" />
        Loading
      </label>
    </div>
    <a-skeleton :loading="loading" active>
      <div>
        <h4 style="margin-bottom: 16px;">Ant Design Vue, a design language</h4>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources, to help people create their product prototypes beautifully and efficiently.
        </p>
      </div>
    </a-skeleton>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const loading = ref(true)
</script>
