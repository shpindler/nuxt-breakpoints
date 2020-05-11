/** Записывает в каждый компонент аттрибут $bp, который содержит хранилище
 * брейкпоинтов. */
import Vue from 'vue'
import { forOwn } from 'lodash'

class BreakpointStore {
  constructor() {
    this.VM = new Vue({
      data() {
        return {
          breakpoints: {
            xs: [0, 575],
            sm: [576, 767],
            md: [768, 991],
            lg: [992, 1199],
            xl: [1200, Infinity],
          },
          screenWidth: document.documentElement.clientWidth,
        }
      },
      computed: {
        bp() {
          let result = null

          forOwn(this.breakpoints, (v, k) => {
            if (v[0] <= this.screenWidth && v[1] >= this.screenWidth) {
              result = k
            }
          })

          return result
        },
        xs() {
          return this.bp === 'xs'
        },
        sm() {
          return this.bp === 'sm'
        },
        md() {
          return this.bp === 'md'
        },
        lg() {
          return this.bp === 'lg'
        },
        xl() {
          return this.bp === 'xl'
        },
        isMobile() {
          return this.xs || this.sm
        },
        isTablet() {
          return this.md
        },
        isDesktop() {
          return this.lg || this.xl
        },
        isMobileOrTablet() {
          return this.isMobile || this.isTablet
        },
        isDesktopOrTablet() {
          return this.isDesktop || this.isTablet
        },
      },
      created() {
        addEventListener('resize', this.updateScreenWidth)
        addEventListener('orientationchange', this.updateScreenWidth)
      },
      methods: {
        updateScreenWidth() {
          this.screenWidth = document.documentElement.clientWidth
        },
      },
    })
  }

  get value() {
    return this.VM.bp
  }
}

const DevicePlugin = {
  Store: BreakpointStore,
  install(Vue, options) {
    Vue.mixin({
      beforeCreate() {
        this.$bp = options.store.VM
      },
    })
  },
}

Vue.use(DevicePlugin, {
  store: new DevicePlugin.Store(),
})
