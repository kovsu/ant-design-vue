<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { StatisticProps, StatisticSlots } from './types'
import { statisticDefaultProps } from './types'
import { formatNumber } from './utils'

defineOptions({ name: 'AStatistic' })
const props = withDefaults(defineProps<StatisticProps>(), statisticDefaultProps)
defineSlots<StatisticSlots>()
const slots = useSlots()

const formattedValue = computed(() => {
  if (props.value === undefined || props.value === null) return { int: '', decimal: '' }
  return formatNumber(props.value, {
    decimalSeparator: props.decimalSeparator,
    groupSeparator: props.groupSeparator,
    precision: props.precision,
  })
})

const hasTitle = computed(() => !!props.title || !!slots.title)
const hasPrefix = computed(() => !!props.prefix || !!slots.prefix)
const hasSuffix = computed(() => !!props.suffix || !!slots.suffix)
</script>

<template>
  <div class="ant-statistic" role="group">
    <div v-if="hasTitle" class="ant-statistic-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="ant-statistic-content" :style="valueStyle" aria-live="polite">
      <span v-if="hasPrefix" class="ant-statistic-content-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span class="ant-statistic-content-value">
        <slot name="formatter" :value="value ?? 0">
          <slot>
            <span class="ant-statistic-content-value-int">{{ formattedValue.int }}</span>
            <span v-if="formattedValue.decimal" class="ant-statistic-content-value-decimal">{{ formattedValue.decimal }}</span>
          </slot>
        </slot>
      </span>
      <span v-if="hasSuffix" class="ant-statistic-content-suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
