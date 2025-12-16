import React from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';
const Switch = (props: ComponentProps) => {
  return <kd-switch {...props} />
};

const Disabled = (props: ComponentProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <kd-switch {...props} disabled />
      <kd-switch {...props} checked disabled />
    </div>
  )
};

const Size = (props: ComponentProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <kd-switch {...props} size="small" />
      <kd-switch {...props} size="medium" />
      <kd-switch {...props} size="large" />
    </div>
  )
}

const Loading = (props: ComponentProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <kd-switch {...props} loading />
        <kd-switch {...props} checked loading />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <kd-switch {...props} loading size="small" />
        <kd-switch {...props} checked loading size="small"/>
      </div>
    </div>
  )
}

const Label = (props: ComponentProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <kd-switch {...props} label="Label"/>
      <kd-switch {...props} label="Switch Title" />
    </div>
  )
}

const LabelPosition = (props: ComponentProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
      <div><kd-switch {...props} label="Vertical Label" label-position="vertical"/></div>
      <div><kd-switch {...props} label="Inline" label-position="inline" /></div>
      <div><kd-switch {...props} label="Hidden" label-position="hidden" /></div>
    </div>
  )
}

export default {
  Default: withComponent(Switch),
  Disabled: withComponent(Disabled),
  Size: withComponent(Size),
  Loading: withComponent(Loading),
  Label: withComponent(Label),
  LabelPosition: withComponent(LabelPosition),
}
