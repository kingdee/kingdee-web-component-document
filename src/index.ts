import '@kdcloudjs/kdesign/dist/kdesign.css'
import '@kdcloudjs/kwc-synthetic-shadow'
import '../static/kwc/index.css'
import '../static/kwc/index.js'
import { registerIconLibrary } from '@kdcloudjs/shoelace/dist/utilities/icon-library.js';
registerIconLibrary('system', {
  resolver: (name: string) =>
    `../node_modules/@kdcloudjs/shoelace/dist/assets/icons/${name}.svg`, // `/path/to/custom/icons/${name}.svg`
});
export { default as Button } from './Button'
export { default as DataTable } from './DataTable'
export { default as Input } from './Input'
export { default as InputNumber } from './InputNumber'
export { default as Tabset } from './Tabset'
export { default as Tree } from './Tree'
export { default as Switch } from './Switch'
export { default as Tag } from './Tag'
export { default as Card } from './Card'
export { default as Layout } from './Layout'
export { default as Spin } from './Spin'
export { default as Modal } from './Modal';
