<template>
  <div style="width: 256px;">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      mode="inline"
      @click="handleClick"
    >
      <a-sub-menu menu-key="sub1" title="Navigation One">
        <a-menu-item-group title="Item 1">
          <a-menu-item item-key="1">Option 1</a-menu-item>
          <a-menu-item item-key="2">Option 2</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item item-key="3">Option 3</a-menu-item>
          <a-menu-item item-key="4">Option 4</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu menu-key="sub2" title="Navigation Two">
        <a-menu-item item-key="5">Option 5</a-menu-item>
        <a-menu-item item-key="6">Option 6</a-menu-item>
        <a-sub-menu menu-key="sub3" title="Submenu">
          <a-menu-item item-key="7">Option 7</a-menu-item>
          <a-menu-item item-key="8">Option 8</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-menu-divider />
      <a-sub-menu menu-key="sub4" title="Navigation Three">
        <a-menu-item item-key="9">Option 9</a-menu-item>
        <a-menu-item item-key="10">Option 10</a-menu-item>
        <a-menu-item item-key="11">Option 11</a-menu-item>
        <a-menu-item item-key="12">Option 12</a-menu-item>
      </a-sub-menu>
      <a-menu-item-group title="Group">
        <a-menu-item item-key="13">Option 13</a-menu-item>
        <a-menu-item item-key="14">Option 14</a-menu-item>
      </a-menu-item-group>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedKeys = ref(['1'])
const openKeys = ref(['sub1'])

function handleClick(info: any) {
  console.log('click', info)
}
</script>
