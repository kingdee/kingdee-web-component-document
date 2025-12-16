import React from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';
const Button = (props: ComponentProps) => {
  switch (props.type) {
    case '1':
    return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
      <kdcq-button {...props} variant="primary" />
      <kdcq-button {...props} variant="secondary"/>
      <kdcq-button {...props} variant="ghost" />
      <kdcq-button {...props} variant="text" />
    </div>
    case '2':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
        <kdcq-button {...props} variant="primary" icon-name="kdfont-zengjia3" style={{'--kdds-c-button-prefixicon-margin-right': '0px','--kdds-c-button-sizing-min-width-medium':'auto'}}/>
        <kdcq-button {...props} variant="primary" icon-name="kdfont-zengjia3" label="Button" />
      </div>
    case '3':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
        <kdcq-button {...props} variant="primary" shape='square' label="Button" />
        <kdcq-button {...props} variant="primary" icon-name="kdfont-zengjia3" shape='circle' label="Button"/>
        <kdcq-button {...props} variant="primary" shape='round' label="Button"/>
      </div>
   case '4':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
        <kdcq-button {...props} variant="primary" size='small' label="Button" />
        <kdcq-button {...props} variant="primary" size='middle' label="Button"/>
        <kdcq-button {...props} variant="primary" size='large' label="Button"/>
      </div>
    case '5':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
        <kdcq-button {...props} variant="primary" disabled label="Button" />
      </div>
    case '6':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center' }}>
        <kdcq-button {...props} variant="primary" loading label="Button" />
      </div>
    case '7':
      return <div style={{ display: 'flex', gap: '10px',alignItems: 'center', width: '300px' }}>
        <kdcq-button {...props} variant="primary" label="Button" stretch style={{width: '100%'}} />
      </div>
  }

};

export default withComponent(Button)
