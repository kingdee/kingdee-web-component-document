import React from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';
const InputNumber = (props: ComponentProps) => {
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <kdcq-input-number {...props} show-stepper value="2" />
      <kdcq-input-number {...props} disabled value="500" />
    </div>
  );
};

const Count = (props: ComponentProps) => {
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <kdcq-input-number {...props} show-stepper stepper-style="counter" />
      <kdcq-input-number
        {...props}
        show-stepper
        stepper-style="counter"
        disabled
      />
    </div>
  );
};

const Size = (props: ComponentProps) => {
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <kdcq-input-number
        {...props}
        label="Label"
        placeholder="small"
        size="small"
      />
      <kdcq-input-number {...props} label="Label" placeholder="medium" />
      <kdcq-input-number
        {...props}
        label="Label"
        placeholder="Large"
        size="large"
      />
    </div>
  );
};

const Precision = (props: ComponentProps) => {
  return (
    <div style={{ display: 'flex', gap: '48px' }}>
      <kdcq-input-number
        {...props}
        show-stepper
        step={0.1}
        precision={1}
        value={3.5}
        min={0}
        max={40}
      />
      <kdcq-input-number
        {...props}
        show-stepper
        value={1.11}
        step={0.01}
        precision={1}
        min={0}
        max={40}
      />
    </div>
  );
};

export default {
  Default: withComponent(InputNumber),
  Count: withComponent(Count),
  Size: withComponent(Size),
  Precision: withComponent(Precision),
};
