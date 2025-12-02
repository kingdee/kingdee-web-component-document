import React from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';
const Button = (props: ComponentProps) => (
  <kd-button {...props} />
);

export default withComponent(Button)
