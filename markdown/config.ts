import mergeDefault from '@gem-mine/cli-plugin-doc/docsify/defaults'
import './demo'

declare global {
  interface Window {
    $docsify: any;
  }
}

// docsify配置
window.$docsify = mergeDefault({
  name: 'immutable',
  repo: 'https://github.com/gem-mine/immutable',
  plugins: []
})
