<template>
  <div>
    <div
      v-for="(user, index) in users"
      :key="index"
      style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f0f0;"
    >
      <div>
        <strong>{{ user.name }}</strong>
        <div style="color: rgba(0, 0, 0, 0.45);">{{ user.company }}</div>
      </div>
      <a @click="showDrawer(user)">View Profile</a>
    </div>

    <a-drawer
      v-model:open="open"
      :width="640"
      placement="right"
      :closable="false"
    >
      <p :style="titleStyle">User Profile</p>

      <p :style="sectionStyle">Personal</p>
      <a-row>
        <a-col :span="12">
          <div style="margin-bottom: 12px;">
            <span style="color: rgba(0, 0, 0, 0.45);">Full Name: </span>
            <span>{{ currentUser?.name }}</span>
          </div>
        </a-col>
        <a-col :span="12">
          <div style="margin-bottom: 12px;">
            <span style="color: rgba(0, 0, 0, 0.45);">Account: </span>
            <span>{{ currentUser?.account }}</span>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <div style="margin-bottom: 12px;">
            <span style="color: rgba(0, 0, 0, 0.45);">City: </span>
            <span>{{ currentUser?.city }}</span>
          </div>
        </a-col>
        <a-col :span="12">
          <div style="margin-bottom: 12px;">
            <span style="color: rgba(0, 0, 0, 0.45);">Country: </span>
            <span>{{ currentUser?.country }}</span>
          </div>
        </a-col>
      </a-row>

      <a-divider />

      <p :style="sectionStyle">Company</p>
      <a-row>
        <a-col :span="12">
          <div style="margin-bottom: 12px;">
            <span style="color: rgba(0, 0, 0, 0.45);">Position: </span>
            <span>Programmer</span>
          </div>
        </a-col>
        <a-col :span="12">
          <div style="margin-bottom: 12px;">
            <span style="color: rgba(0, 0, 0, 0.45);">Department: </span>
            <span>{{ currentUser?.company }}</span>
          </div>
        </a-col>
      </a-row>

      <a-divider />

      <p :style="sectionStyle">Contacts</p>
      <a-row>
        <a-col :span="12">
          <div style="margin-bottom: 12px;">
            <span style="color: rgba(0, 0, 0, 0.45);">Email: </span>
            <span>{{ currentUser?.account }}</span>
          </div>
        </a-col>
        <a-col :span="12">
          <div style="margin-bottom: 12px;">
            <span style="color: rgba(0, 0, 0, 0.45);">Phone: </span>
            <span>+86 181 0000 0000</span>
          </div>
        </a-col>
      </a-row>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface UserProfile {
  name: string
  company: string
  account: string
  city: string
  country: string
}

const open = ref(false)
const currentUser = ref<UserProfile | null>(null)

const users = reactive<UserProfile[]>([
  {
    name: 'Lily',
    company: 'Progresser XTech',
    account: 'AntDesign@example.com',
    city: 'HangZhou',
    country: 'China',
  },
  {
    name: 'Jack',
    company: 'Progresser XTech',
    account: 'Jack@example.com',
    city: 'Shanghai',
    country: 'China',
  },
])

const titleStyle = {
  fontSize: '16px',
  color: 'rgba(0, 0, 0, 0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: '24px',
}

const sectionStyle = {
  fontSize: '16px',
  color: 'rgba(0, 0, 0, 0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: '16px',
}

function showDrawer(user: UserProfile) {
  currentUser.value = user
  open.value = true
}
</script>
