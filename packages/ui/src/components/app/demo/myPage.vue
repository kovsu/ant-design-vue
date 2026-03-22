<template>
  <a-app>
    <MyPageInner />
  </a-app>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { useApp } from '../useApp'

const MyPageInner = defineComponent({
  name: 'MyPageInner',
  setup() {
    const { message, modal, notification } = useApp()

    const showMessage = () => {
      message.success('Success!')
    }

    const showModal = () => {
      modal.warning({
        title: 'This is a warning message',
        content: 'some messages...some messages...',
      })
    }

    const showNotification = () => {
      notification.info({
        message: 'Notification topLeft',
        description: 'Hello, Ant Design Vue!!',
      })
    }

    return () =>
      h('div', { style: 'display: flex; gap: 8px' }, [
        h(
          'button',
          { class: 'ant-btn ant-btn-solid', onClick: showMessage },
          'Open message',
        ),
        h(
          'button',
          { class: 'ant-btn ant-btn-solid', onClick: showModal },
          'Open modal',
        ),
        h(
          'button',
          { class: 'ant-btn ant-btn-solid', onClick: showNotification },
          'Open notification',
        ),
      ])
  },
})
</script>
