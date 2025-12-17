import React from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';
const Button = (props: ComponentProps) => {
  switch (props.type) {
    case '1':
    return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
      <kdcq-button {...props} variant="primary" label='primary'/>
      <kdcq-button {...props} variant="secondary" label='secondary'/>
      <kdcq-button {...props} variant="ghost" label='ghost'/>
      <kdcq-button {...props} variant="text" label='text'/>
    </div>
    case '2':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
        <kdcq-button {...props} variant="primary" icon-name="kdfont-zengjia3" style={{'--kdds-c-button-prefixicon-margin-right': '0px','--kdds-c-button-sizing-min-width-medium':'auto'}}/>
        <kdcq-button {...props} variant="primary" icon-name="kdfont-zengjia3" label="Button" />
      </div>
    case '3':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
        <kdcq-button {...props} variant="primary" shape='square' label="square" />
        <kdcq-button {...props} variant="primary" icon-name="kdfont-zengjia3" shape='circle' label="Button"/>
        <kdcq-button {...props} variant="primary" shape='round' label="round"/>
      </div>
   case '4':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
        <kdcq-button {...props} variant="primary" size='small' label="small" />
        <kdcq-button {...props} variant="primary" size='middle' label="middle"/>
        <kdcq-button {...props} variant="primary" size='large' label="large"/>
      </div>
    case '5':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
        <kdcq-button {...props} variant="primary" disabled label="disabled" />
      </div>
    case '6':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
        <kdcq-button {...props} variant="primary" loading label="loading" />
      </div>
    case '7':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center', width: '300px',padding: '10px', border: '1px solid #e4e9ec' }}>
        <kdcq-button {...props} variant="primary" label="Button" stretch style={{width: '100%'}} />
      </div>
  }

};

export default withComponent(Button)
