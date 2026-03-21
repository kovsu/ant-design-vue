<template>
  <a-app>
    <InnerComponent />
  </a-app>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { useApp } from '../useApp'

const InnerComponent = defineComponent({
  name: 'InnerComponent',
  setup() {
    const { message, notification, modal } = useApp()
    return () =>
      h('div', { style: 'display: flex; gap: 8px' }, [
        h(
          'button',
          {
            class: 'ant-btn ant-btn-solid',
            onClick: () => message.success('Hello from App!'),
          },
          'Show Message',
        ),
        h(
          'button',
          {
            class: 'ant-btn ant-btn-solid',
            onClick: () =>
              notification.success({
                message: 'Notification',
                description: 'This is a notification from useApp().',
              }),
          },
          'Show Notification',
        ),
        h(
          'button',
          {
            class: 'ant-btn ant-btn-solid',
            onClick: () =>
              modal.confirm({
                title: 'Confirm',
                content: 'Are you sure?',
              }),
          },
          'Show Modal',
        ),
      ])
  },
})
</script>
