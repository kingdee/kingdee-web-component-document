import { Icon, Tabs, Tooltip } from '@kdcloudjs/kdesign';
import { useLocale, usePrefersColor } from 'dumi';
import React, { type FC, useEffect, useState } from 'react';
import CodeBlock from './codeBlock';
export interface Info {
  language: string;
  content: string;
  tabName?: string;
}
export interface ComponentProps {
  codeInfo: Info[];
}

export default function withComponent(Component: any): FC<ComponentProps> {
  const ComponentWrap: FC<ComponentProps> = (props) => {
    const { codeInfo, ...rest } = props;
    const [curKey, setCurKey] = useState<string | number>('javascript0');
    const [showCode, setShowCode] = useState<boolean>(false);
    const [direction, setDirection] = useState(
      document.documentElement.getAttribute('data-direction') || 'ltr',
    );
    const locale = useLocale();

    const showChange = (language: string | number) => {
      setCurKey(language);
    };

    const handleChange = () => {
      setShowCode(!showCode);
    };

    useEffect(() => {
      const html = document.documentElement;

      const observer = new MutationObserver(() => {
        setDirection(html.getAttribute('data-direction') || '');
      });

      observer.observe(html, {
        attributes: true,
        attributeFilter: ['data-direction'],
      });

      return () => observer.disconnect();
    }, []);

    const isEnglish: boolean = locale.id === 'en-US';

    const [theme] = usePrefersColor();
    const codeClassName = `kwc-default-previewer-demo-code ${
      showCode ? 'show' : 'hide'
    }`;
    return (
      <div className="kwc-default-previewer-demo-container">
        <div className="kwc-default-previewer-demo-preview">
          <Component
            {...(rest as any)}
            direction={direction}
            theme={theme}
            locale={locale}
          />
        </div>
        <div className="kwc-default-previewer-demo-code-wrap">
          <div className="kwc-default-previewer-demo-action">
            {(() => {
              const tip = showCode
                ? isEnglish
                  ? 'Hide code'
                  : '隐藏代码'
                : isEnglish
                ? 'Show code'
                : '显示代码';

              return (
                <Tooltip placement="top" tip={tip}>
                  <Icon
                    onClick={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleChange();
                      }
                    }}
                    className={`demo-code-icon ${showCode ? 'show' : 'hide'}`}
                    type="code"
                    tabIndex={0}
                    role="button"
                    aria-pressed={showCode}
                  />
                </Tooltip>
              );
            })()}
          </div>
          <div className={codeClassName}>
            <Tabs activeKey={curKey} onChange={showChange}>
              {(codeInfo || []).map((item, index) => (
                <Tabs.TabPane key={item.language + index} tab={item.tabName || item.language}>
                  <CodeBlock
                    codeString={item.content}
                    language={item.language}
                    isDark={theme === 'dark'}
                    isEnglish={isEnglish}
                  />
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

  // 方便调试显示原组件名
  ComponentWrap.displayName =
    Component.displayName || Component.name || 'ComponentWrap';

  return ComponentWrap;
}
