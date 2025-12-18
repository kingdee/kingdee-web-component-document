import React from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';

const Card = (props: ComponentProps) => {
  return (
    <kdcq-card {...props}>
      <div>Card Content</div>
    </kdcq-card>
  );
};

const CardWithTitle = (props: ComponentProps) => {
  return (
    <kdcq-card {...props} title="Card Title">
      <div>Card Content with Title</div>
    </kdcq-card>
  );
};

const CardWithIcon = (props: ComponentProps) => {
  return (
    <kdcq-card {...props} title="Card with Icon" icon-name="kdfont-GPT4">
      <div>Card Content with Icon</div>
    </kdcq-card>
  );
};

const CardWithoutHeader = (props: ComponentProps) => {
  return (
    <kdcq-card {...props} hide-header>
      <div>Card Content without Header</div>
    </kdcq-card>
  );
};

const CardWithActions = (props: ComponentProps) => {
  return (
    <kdcq-card {...props} title="Card with Actions">
      <div>Card Content with Actions</div>
      <div slot="actions">
        <button type="button" style={{ marginRight: '8px' }}>Action 1</button>
        <button type="button">Action 2</button>
      </div>
    </kdcq-card>
  );
};

const CardWithFooter = (props: ComponentProps) => {
  return (
    <kdcq-card {...props} title="Card with Footer">
      <div>Card Content with Footer</div>
      <div slot="footer">Card Footer Content</div>
    </kdcq-card>
  );
};

const CardWithCustomTitle = (props: ComponentProps) => {
  return (
    <kdcq-card {...props}>
      <div slot="title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Custom Title</span>
          <span style={{ color: 'red' }}>(Custom)</span>
        </div>
      </div>
      <div>Card Content with Custom Title</div>
    </kdcq-card>
  );
};

export default {
  Default: withComponent(Card),
  WithTitle: withComponent(CardWithTitle),
  WithIcon: withComponent(CardWithIcon),
  WithoutHeader: withComponent(CardWithoutHeader),
  WithActions: withComponent(CardWithActions),
  WithFooter: withComponent(CardWithFooter),
  WithCustomTitle: withComponent(CardWithCustomTitle),
};
