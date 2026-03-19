<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-avatar-group>
      <a-avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" alt="User 1" />
      <a-avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" alt="User 2" />
      <a-avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" alt="User 3" />
      <a-avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=4" alt="User 4" />
    </a-avatar-group>

    <a-avatar-group :max-count="2" :max-style="{ backgroundColor: '#f56a00' }">
      <a-avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=5" alt="User 5" />
      <a-avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=6" alt="User 6" />
      <a-avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=7" alt="User 7" />
      <a-avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" alt="User 8" />
    </a-avatar-group>

    <a-avatar-group size="large" shape="square">
      <a-avatar>A</a-avatar>
      <a-avatar>B</a-avatar>
      <a-avatar>C</a-avatar>
    </a-avatar-group>
  </div>
</template>
