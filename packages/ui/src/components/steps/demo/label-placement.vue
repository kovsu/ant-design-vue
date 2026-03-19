<template>
  <div>
    <a-steps :current="1" label-placement="vertical">
      <a-step title="Finished" description="This is a description." />
      <a-step title="In Progress" description="This is a description." />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
    <br />
    <a-steps :current="1" :percent="60" label-placement="vertical">
      <a-step title="Finished" description="This is a description." />
      <a-step title="In Progress" description="This is a description." />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
    <br />
    <a-steps :current="1" size="small" label-placement="vertical">
      <a-step title="Finished" description="This is a description." />
      <a-step title="In Progress" description="This is a description." />
      <a-step title="Waiting" description="This is a description." />
    </a-steps>
  </div>
</template>
