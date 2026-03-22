<template>
  <div>
    <a-carousel ref="carouselRef" :dots="false" @afterChange="onAfterChange">
      <div v-for="item in images" :key="item" class="carousel-slide">
        <img :src="item" style="width: 100%; display: block;" />
      </div>
    </a-carousel>
    <div class="thumbnail-list">
      <div
        v-for="(item, index) in images"
        :key="item"
        class="thumbnail-item"
        :class="{ 'thumbnail-active': index === currentSlide }"
        @click="goToSlide(index)"
      >
        <img :src="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const baseUrl =
  'https://raw.githubusercontent.com/vueComponent/ant-design-vue/main/components/carousel/demo/'

const images = [
  `${baseUrl}abstract01.jpg`,
  `${baseUrl}abstract02.jpg`,
  `${baseUrl}abstract03.jpg`,
  `${baseUrl}abstract04.jpg`,
]

const carouselRef = ref<{ goTo: (index: number) => void } | null>(null)
const currentSlide = ref(0)

function goToSlide(index: number) {
  carouselRef.value?.goTo(index)
}

function onAfterChange(current: number) {
  currentSlide.value = current
}
</script>

<style scoped>
.carousel-slide img {
  border: 5px solid #fff;
  max-width: 80%;
  margin: auto;
}

.thumbnail-list {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.thumbnail-item {
  width: 60px;
  height: 45px;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  display: block;
}

.thumbnail-active,
.thumbnail-item:hover {
  opacity: 1;
}

.thumbnail-active img {
  filter: grayscale(0%);
}
</style>
