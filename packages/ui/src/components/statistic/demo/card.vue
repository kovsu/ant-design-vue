<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-card>
        <a-statistic
          title="Active Users"
          :value="112893"
          :value-style="{ color: '#3f8600' }"
          prefix="&#11014;"
        />
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card>
        <a-statistic
          title="Idle Users"
          :value="9280"
          :value-style="{ color: '#cf1322' }"
          prefix="&#11015;"
        />
      </a-card>
    </a-col>
  </a-row>
</template>
