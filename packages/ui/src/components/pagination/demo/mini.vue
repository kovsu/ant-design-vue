<template>
  <div style="display: flex; flex-direction: column; gap: 24px">
    <a-pagination size="small" :total="50" />
    <a-pagination size="small" :total="50" show-size-changer show-quick-jumper />
    <a-pagination
      size="small"
      :total="50"
      :show-total="(total: number) => `Total ${total} items`"
    />
  </div>
</template>
