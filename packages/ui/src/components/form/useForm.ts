import { ref } from 'vue'
import type { FormInstance } from './types'

/**
 * Composable for getting a typed template ref to the Form component.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useForm } from '@ant-design-vue/ui'
 * const formRef = useForm()
 * // formRef.value?.validate()
 * // formRef.value?.resetFields()
 * </script>
 * <template>
 *   <a-form ref="formRef" :model="formState">...</a-form>
 * </template>
 * ```
 */
export function useForm() {
  return ref<FormInstance>()
}
