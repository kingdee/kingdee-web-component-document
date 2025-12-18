import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import withComponent, { ComponentProps } from '../common/withComponent';

const useGenerateTabs = (
  divRef: React.MutableRefObject<HTMLDivElement | null>,
  generateSlotContent,
  length: number,
) => {
  useEffect(() => {
    if (!divRef.current) return;
    const dom = divRef.current.querySelector('kdcq-tabset');
    const slot = dom?.shadowRoot?.querySelector('slot');
    if (!slot) return;
    for (let i = 0; i < length; i++) {
      const tab = generateSlotContent(i + 1);
      slot.appendChild(tab);
    }
  }, [divRef]);
};

const Tabset = (props: ComponentProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const generateSlotContent = (index: number) => {
    const tab = document.createElement('kdcq-tab');
    tab.setAttribute('label', `Tab ${index}`);
    tab.setAttribute('value', `${index}`);
    tab.textContent = `Tab ${index} Content`;

    return tab;
  };
  useGenerateTabs(divRef, generateSlotContent, 3);
  return (
    <div ref={divRef}>
      <kdcq-tabset {...props}></kdcq-tabset>
    </div>
  );
};

const TabsetWithIcon = (props: ComponentProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [iconNames] = useState([
    '',
    'kdfont-riqixuanze',
    'kdfont-xiudingshijian',
    'kdfont-shezhixuanzhong',
  ]);
  const generateSlotContent = (index: number) => {
    const tab = document.createElement('kdcq-tab');
    tab.setAttribute('label', `Tab ${index}`);
    tab.setAttribute('value', `${index}`);
    tab.setAttribute('icon-name', iconNames[index]);
    tab.textContent = `Tab ${index} Content`;

    return tab;
  };
  useGenerateTabs(divRef, generateSlotContent, 3);

  return (
    <div ref={divRef}>
      <kdcq-tabset {...props}></kdcq-tabset>
    </div>
  );
};

// 受控模式
const TabsetControlled = (props: ComponentProps) => {
  const [activeKey, setActiveKey] = useState('1');
  const divRef = React.useRef<HTMLDivElement>(null);
  const generateSlotContent = (index: number) => {
    const tab = document.createElement('kdcq-tab');
    tab.setAttribute('label', `Tab ${index}`);
    tab.setAttribute('value', `${index}`);
    tab.textContent = `Tab ${index} Content`;

    return tab;
  };

  const onChange = (e: any) => {
    setActiveKey(e.detail.value);
  };
  useEffect(() => {
    if (!divRef.current) return;
    const dom = divRef.current.querySelector('kdcq-tabset');
    dom?.addEventListener('tabchange', onChange);

    return () => {
      dom?.removeEventListener('tabchange', onChange);
    };
  }, [divRef]);
  useGenerateTabs(divRef, generateSlotContent, 3);
  return (
    <>
      <div>当前选中的tab index：{activeKey}</div>
      <div ref={divRef}>
        <kdcq-tabset {...props} active-tab-value={activeKey}></kdcq-tabset>
      </div>
    </>
  );
};

const TabsetNestingInside = (props: ComponentProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const generateSlotContent = (index: number) => {
    const tab = document.createElement('kdcq-tab');
    tab.setAttribute('label', `Tab ${index}`);
    tab.setAttribute('value', `${index}`);
    tab.textContent = `Tab ${index} Content`;

    return tab;
  };

  useGenerateTabs(divRef, generateSlotContent, 3);
  return (
    <div ref={divRef} style={{ padding: '20px' }}>
      <kdcq-tabset {...props}></kdcq-tabset>
    </div>
  );
};

// 嵌套使用
const TabsetNesting = (props: ComponentProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  const generateSlotContent = (index: number) => {
    if (index === 1) {
      const tab = document.createElement('kdcq-tab');
      tab.setAttribute('label', `Tab ${index}`);
      tab.setAttribute('value', `${index}`);
      // 创建一个容器元素来挂载 React 组件
      const container = document.createElement('div');
      tab.appendChild(container);

      // 使用 ReactDOM.render 或 createRoot 来渲染组件（取决于你的 React 版本）
      // 对于 React 18+:
      const root = ReactDOM.createRoot(container);
      root.render(<TabsetNestingInside />);

      return tab;
    } else {
      const tab = document.createElement('kdcq-tab');
      tab.setAttribute('label', `Tab ${index}`);
      tab.setAttribute('value', `${index}`);
      tab.textContent = `Tab ${index} Content`;

      return tab;
    }
  };

  useGenerateTabs(divRef, generateSlotContent, 2);
  return (
    <div ref={divRef}>
      <kdcq-tabset {...props}></kdcq-tabset>
    </div>
  );
};

const SizeComp = (props: ComponentProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  useGenerateTabs(
    divRef,
    (index: number) => {
      const tab = document.createElement('kdcq-tab');
      tab.setAttribute('label', `Tab ${index}`);
      tab.setAttribute('value', `${index}`);
      tab.textContent = `Tab ${index} Content`;

      return tab;
    },
    2,
  );

  return (
    <div ref={divRef}>
      <kdcq-tabset {...props}></kdcq-tabset>
    </div>
  );
};

// 不同尺寸
const TabsetSize = (props: ComponentProps) => {
  return (
    <div>
      <div>Small</div>
      <SizeComp {...props} size="small" />
      <br />
      <div>Medium</div>
      <SizeComp {...props} size="medium" />
      <br />
      <div>Large</div>
      <SizeComp {...props} size="large" />
    </div>
  );
};

// 滚动模式
const TabsetScroll = (props: ComponentProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  useGenerateTabs(
    divRef,
    (index: number) => {
      const tab = document.createElement('kdcq-tab');
      tab.setAttribute('label', `Tab ${index}`);
      tab.setAttribute('value', `${index}`);
      tab.textContent = `Tab ${index} Content`;

      return tab;
    },
    20,
  );
  return (
    <div ref={divRef}>
      <kdcq-tabset {...props}></kdcq-tabset>
    </div>
  );
};

export default {
  Default: withComponent(Tabset),
  WithIcon: withComponent(TabsetWithIcon),
  Controlled: withComponent(TabsetControlled),
  Nesting: withComponent(TabsetNesting),
  Size: withComponent(TabsetSize),
  Scroll: withComponent(TabsetScroll),
};
