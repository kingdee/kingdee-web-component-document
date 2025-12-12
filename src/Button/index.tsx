import React from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';
const Button = (props: ComponentProps) => {
  console.log('Button props', props);
  return <kdcq-button {...props} />
};

export default withComponent(Button)
