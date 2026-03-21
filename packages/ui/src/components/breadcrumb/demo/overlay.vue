<template>
  <a-breadcrumb>
    <a-breadcrumb-item href="/">Home</a-breadcrumb-item>
    <a-breadcrumb-item href="/apps">
      <a-dropdown>
        <a @click.prevent>Applications</a>
        <template #overlay>
          <a-menu>
            <a-menu-item item-key="app1">Application 1</a-menu-item>
            <a-menu-item item-key="app2">Application 2</a-menu-item>
            <a-menu-item item-key="app3">Application 3</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-breadcrumb-item>
    <a-breadcrumb-item>Current Page</a-breadcrumb-item>
  </a-breadcrumb>
</template>
