<script setup lang="ts">
import { ref } from 'vue'
import type { DotPosition } from '../types'

const dotPosition = ref<DotPosition>('bottom')
const positions: DotPosition[] = ['top', 'bottom', 'left', 'right']
</script>

<template>
  <div style="margin-bottom: 16px; display: flex; gap: 8px;">
    <a-radio-group v-model:value="dotPosition">
      <a-radio-button v-for="pos in positions" :key="pos" :value="pos">
        {{ pos }}
      </a-radio-button>
    </a-radio-group>
  </div>
  <a-carousel :dot-position="dotPosition" style="height: 200px;">
    <div class="carousel-slide" style="background: #364d79;">
      <h3>1</h3>
    </div>
    <div class="carousel-slide" style="background: #364d79;">
      <h3>2</h3>
    </div>
    <div class="carousel-slide" style="background: #364d79;">
      <h3>3</h3>
    </div>
    <div class="carousel-slide" style="background: #364d79;">
      <h3>4</h3>
    </div>
  </a-carousel>
</template>

<style>
.carousel-slide {
  height: 160px;
  color: #fff;
  line-height: 160px;
  text-align: center;
  font-size: 24px;
}

.carousel-slide h3 {
  color: #fff;
  margin: 0;
}
</style>
