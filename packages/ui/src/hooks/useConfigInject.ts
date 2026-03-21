import { inject, computed } from 'vue'
import type {
  ConfigProviderContext,
  SizeType,
  DirectionType,
  Locale,
  FormConfig,
  RenderEmptyHandler,
  WaveConfig,
} from '../components/config-provider/types'
import { CONFIG_PROVIDER_KEY } from '../components/config-provider/types'
import { useThemeInject, type ThemeContext } from '../components/theme/hooks'
import defaultLocale from '../components/config-provider/locale/en_US'

export interface ConfigContext {
  size: ConfigProviderContext['size']
  direction: ConfigProviderContext['direction']
  disabled: ConfigProviderContext['disabled']
  getPopupContainer: ConfigProviderContext['getPopupContainer']
  locale: ConfigProviderContext['locale']
  form: ConfigProviderContext['form']
  renderEmpty: ConfigProviderContext['renderEmpty']
  virtual: ConfigProviderContext['virtual']
  autoInsertSpaceInButton: ConfigProviderContext['autoInsertSpaceInButton']
  wave: ConfigProviderContext['wave']
  theme: ThemeContext
}

export function useConfigInject(): ConfigContext {
  const config = inject(CONFIG_PROVIDER_KEY, null)
  const theme = useThemeInject()

  return {
    size: config?.size ?? computed(() => 'md' as SizeType),
    direction: config?.direction ?? computed(() => 'ltr' as DirectionType),
    disabled: config?.disabled ?? computed(() => false),
    getPopupContainer: config?.getPopupContainer ?? computed(() => {
      return () => (typeof document !== 'undefined' ? document.body : null) as HTMLElement
    }),
    locale: config?.locale ?? computed(() => defaultLocale as Locale),
    form: config?.form ?? computed(() => undefined as FormConfig | undefined),
    renderEmpty: config?.renderEmpty ?? computed(() => undefined as RenderEmptyHandler | undefined),
    virtual: config?.virtual ?? computed(() => undefined as boolean | undefined),
    autoInsertSpaceInButton: config?.autoInsertSpaceInButton ?? computed(() => undefined as boolean | undefined),
    wave: config?.wave ?? computed(() => undefined as WaveConfig | undefined),
    theme,
  }
}
