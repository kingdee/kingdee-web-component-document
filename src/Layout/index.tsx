import React from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';
import './index.css'

const Layout = (props: ComponentProps) => {
  return (
    <kdcq-layout {...props}>
      <kdcq-layout-item size={8}>
        <div className="layout-item-wrap-1">Item 1</div>
      </kdcq-layout-item>
      <kdcq-layout-item size={8}>
        <div className="layout-item-wrap-2">Item 2</div>
      </kdcq-layout-item>
      <kdcq-layout-item size={8}>
        <div className="layout-item-wrap-3">Item 3</div>
      </kdcq-layout-item>
    </kdcq-layout>
  );
};

const HorizontalAlign = (props: ComponentProps) => {
  return (
    <div>
      <h4>Start (默认)</h4>
      <kdcq-layout {...props} horizontal-align="start">
        <kdcq-layout-item size={6}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={6}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
      
      <h4 className="section-title">Center</h4>
      <kdcq-layout {...props} horizontal-align="center">
        <kdcq-layout-item size={6}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={6}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
      
      <h4 className="section-title">Space</h4>
      <kdcq-layout {...props} horizontal-align="space">
        <kdcq-layout-item size={6}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={6}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
      
      <h4 className="section-title">Spread</h4>
      <kdcq-layout {...props} horizontal-align="spread">
        <kdcq-layout-item size={6}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={6}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
      
      <h4 className="section-title">End</h4>
      <kdcq-layout {...props} horizontal-align="end">
        <kdcq-layout-item size={6}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={6}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
    </div>
  );
};

const VerticalAlign = (props: ComponentProps) => {
  return (
    <div>
      <h4>Start (默认)</h4>
      <kdcq-layout {...props} style={{ height: '150px', backgroundColor: '#fafafa' }}>
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
      
      <h4 style={{ marginTop: '24px' }}>Center</h4>
      <kdcq-layout {...props} vertical-align="center" style={{ height: '150px', backgroundColor: '#fafafa' }}>
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
      
      <h4 style={{ marginTop: '24px' }}>End</h4>
      <kdcq-layout {...props} vertical-align="end" style={{ height: '150px', backgroundColor: '#fafafa' }}>
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
      
      <h4 style={{ marginTop: '24px' }}>Stretch</h4>
      <kdcq-layout {...props} vertical-align="stretch" style={{ height: '150px', backgroundColor: '#fafafa' }}>
        <kdcq-layout-item size={8}>
          <div className="layout-item-1-stretch">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={8}>
          <div className="layout-item-2-stretch">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
    </div>
  );
};

const MultipleRows = (props: ComponentProps) => {
  return (
    <div>
      <h4>允许换行</h4>
      <kdcq-layout {...props} multiple-rows="true">
        {[...Array(5)].map((_, index) => (
          <kdcq-layout-item key={index} size={6}>
            <div className={index % 2 === 0 ? 'layout-item-wrap-1' : 'layout-item-wrap-2'}>
              Item {index + 1}
            </div>
          </kdcq-layout-item>
        ))}
      </kdcq-layout>
      
      <h4 className="section-title">不允许换行，超出一行宽度横向滚动 (默认)</h4>
      <div className="scrollable-container">
        <kdcq-layout {...props}>
          {[...Array(5)].map((_, index) => (
            <kdcq-layout-item key={index} size={6}>
              <div className={index % 2 === 0 ? 'layout-item-wrap-1' : 'layout-item-wrap-2'}>
                Item {index + 1}
              </div>
            </kdcq-layout-item>
          ))}
        </kdcq-layout>
      </div>
    </div>
  );
};

const PullToBoundary = (props: ComponentProps) => {
  return (
    <div className="demo-container-bordered">
      <h4>Small</h4>
      <kdcq-layout {...props} pull-to-boundary="small">
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
      
      <h4 className="section-title">Medium</h4>
      <kdcq-layout {...props} pull-to-boundary="medium">
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
      
      <h4 className="section-title">Large</h4>
      <kdcq-layout {...props} pull-to-boundary="large">
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-1">Item 1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={8}>
          <div className="layout-item-wrap-2">Item 2</div>
        </kdcq-layout-item>
      </kdcq-layout>
    </div>
  );
};

const LayoutItemSize = () => {
  return (
    <div>
      <h4>不同尺寸的布局项</h4>
      <kdcq-layout>
        <kdcq-layout-item size={12} xs={2} sm={4} md={6} lg={8} xl={10}>
          <div className="layout-item-wrap-1">Item1</div>
        </kdcq-layout-item>
        <kdcq-layout-item size={12} xs={20} sm={16} md={12} lg={8} xl={4}>
          <div className="layout-item-wrap-2">Item2</div>  
        </kdcq-layout-item>
        <kdcq-layout-item size={12} xs={2} sm={4} md={6} lg={8} xl={10}>
          <div className="layout-item-wrap-3">Item3</div>  
        </kdcq-layout-item>
      </kdcq-layout>
    </div>
  );
};

const LayoutItemPadding = (props: ComponentProps) => {
  return (
    <div>
      <h4>水平内边距 padding="horizontal-small"</h4>
      <div className='demo-container-bordered'>
        <kdcq-layout>
          <kdcq-layout-item size={8} {...props} padding="horizontal-small">
            <div className="layout-item-wrap-1">horizontal-small</div>
          </kdcq-layout-item>
          <kdcq-layout-item size={8} {...props} padding="horizontal-small">
            <div className="layout-item-wrap-2">horizontal-small</div>
          </kdcq-layout-item>
          <kdcq-layout-item size={8} {...props} padding="horizontal-small">
            <div className="layout-item-wrap-3">horizontal-small</div>
          </kdcq-layout-item>
        </kdcq-layout>
      </div>
      
      <h4 className="section-title">周围内边距 padding="around-medium"</h4>
      <div className="demo-container-bordered">
        <kdcq-layout>
          <kdcq-layout-item size={8} {...props} padding="around-medium">
            <div className="layout-item-wrap-1">around-medium</div>
          </kdcq-layout-item>
          <kdcq-layout-item size={8} {...props} padding="around-medium">
            <div className="layout-item-wrap-2">around-medium</div>
          </kdcq-layout-item>
          <kdcq-layout-item size={8} {...props} padding="around-medium">
            <div className="layout-item-wrap-3">around-medium</div>
          </kdcq-layout-item>
        </kdcq-layout>
      </div>
    </div>
  );
};

export default {
  Default: withComponent(Layout),
  HorizontalAlign: withComponent(HorizontalAlign),
  VerticalAlign: withComponent(VerticalAlign),
  MultipleRows: withComponent(MultipleRows),
  PullToBoundary: withComponent(PullToBoundary),
  LayoutItemSize: withComponent(LayoutItemSize),
  LayoutItemPadding: withComponent(LayoutItemPadding),
};