<template>
  <div style="height: 300px; position: relative; overflow: hidden;">
    <!-- Click trigger menu -->
    <a-float-button-group
      trigger="click"
      type="primary"
      style="position: absolute; right: 0; bottom: 24px;"
    >
      <template #icon>
        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
          <path d="M512 128c-212.1 0-384 171.9-384 384v360c0 13.3 10.7 24 24 24h184c35.3 0 64-28.7 64-64V624c0-35.3-28.7-64-64-64H200v-48c0-172.3 139.7-312 312-312s312 139.7 312 312v48H688c-35.3 0-64 28.7-64 64v208c0 35.3 28.7 64 64 64h184c13.3 0 24-10.7 24-24V512c0-212.1-171.9-384-384-384z" />
        </svg>
      </template>
      <a-float-button style="position: relative;">
        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
          <path d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0z" />
        </svg>
      </a-float-button>
      <a-float-button style="position: relative;">
        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
          <path d="M573.7 252.5C422.5 197.4 201.3 96.7 201.3 96.7c-15.7-6.6-33.7 5.2-33.7 22.1v424.7c0 7.8 4 15.1 10.6 19.3l394.2 259.7a26 26 0 0041.2-17.4l36.8-397.8c1.5-14.6-9.3-27.6-23.9-29.8zM649 704.2l-293.5-193 38.9-419.8 254.6 127.6L649 704.2z" />
        </svg>
      </a-float-button>
    </a-float-button-group>

    <!-- Hover trigger menu -->
    <a-float-button-group
      trigger="hover"
      type="primary"
      style="position: absolute; right: 70px; bottom: 24px;"
    >
      <template #icon>
        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
          <path d="M512 128c-212.1 0-384 171.9-384 384v360c0 13.3 10.7 24 24 24h184c35.3 0 64-28.7 64-64V624c0-35.3-28.7-64-64-64H200v-48c0-172.3 139.7-312 312-312s312 139.7 312 312v48H688c-35.3 0-64 28.7-64 64v208c0 35.3 28.7 64 64 64h184c13.3 0 24-10.7 24-24V512c0-212.1-171.9-384-384-384z" />
        </svg>
      </template>
      <a-float-button style="position: relative;">
        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
          <path d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0z" />
        </svg>
      </a-float-button>
      <a-float-button style="position: relative;">
        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
          <path d="M573.7 252.5C422.5 197.4 201.3 96.7 201.3 96.7c-15.7-6.6-33.7 5.2-33.7 22.1v424.7c0 7.8 4 15.1 10.6 19.3l394.2 259.7a26 26 0 0041.2-17.4l36.8-397.8c1.5-14.6-9.3-27.6-23.9-29.8zM649 704.2l-293.5-193 38.9-419.8 254.6 127.6L649 704.2z" />
        </svg>
      </a-float-button>
    </a-float-button-group>
  </div>
</template>
