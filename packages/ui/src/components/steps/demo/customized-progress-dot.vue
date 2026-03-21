<template>
  <div>
    <a-steps :current="1">
      <a-step
        v-for="(item, index) in steps"
        :key="index"
        :title="item.title"
        :description="item.description"
      >
        <template #icon>
          <a-popover :title="`Step ${index + 1}`">
            <template #content>
              <p style="margin: 0;">{{ item.description }}</p>
            </template>
            <span class="custom-dot" />
          </a-popover>
        </template>
      </a-step>
    </a-steps>
  </div>
</template>

<script setup lang="ts">
const steps = [
  { title: 'Finished', description: 'You can hover on the dot.' },
  { title: 'In Progress', description: 'You can hover on the dot.' },
  { title: 'Waiting', description: 'You can hover on the dot.' },
  { title: 'Waiting', description: 'You can hover on the dot.' },
]
</script>

<style scoped>
.custom-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
}
</style>
