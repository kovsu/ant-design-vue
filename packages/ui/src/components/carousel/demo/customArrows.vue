<template>
  <div style="position: relative;">
    <a-carousel ref="carouselRef">
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
    <button class="custom-arrow custom-arrow-left" @click="handlePrev">&#8249;</button>
    <button class="custom-arrow custom-arrow-right" @click="handleNext">&#8250;</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const carouselRef = ref<{ prev: () => void; next: () => void } | null>(null)

function handlePrev() {
  carouselRef.value?.prev()
}

function handleNext() {
  carouselRef.value?.next()
}
</script>

<style scoped>
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

.custom-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  font-size: 24px;
  line-height: 1;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.3);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-arrow:hover {
  background-color: rgba(31, 45, 61, 0.6);
}

.custom-arrow-left {
  left: 10px;
  z-index: 1;
}

.custom-arrow-right {
  right: 10px;
  z-index: 1;
}
</style>
