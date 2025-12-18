import React from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';
import './index.css';

const Spin = (props: ComponentProps) => {
  return (
    <kdcq-spin {...props} loading />
  );
};

const Size = (props: ComponentProps) => {
  return (
    <div className="spin-demo-container">
      <div className="spin-demo-item">
        <h4>Large</h4>
        <kdcq-spin {...props} loading size="large" />
      </div>
      <div className="spin-demo-item">
        <h4>Medium (默认)</h4>
        <kdcq-spin {...props} loading />
      </div>
      <div className="spin-demo-item">
        <h4>Small</h4>
        <kdcq-spin {...props} loading size="small" />
      </div>
    </div>
  );
};

const WithText = (props: ComponentProps) => {
  return (
    <div className="spin-demo-container">
      <div className="spin-demo-item">
        <kdcq-spin {...props} loading alternative-text="加载中..." />
      </div>
      <div className="spin-demo-item">
        <kdcq-spin {...props} loading size="large" alternative-text="正在加载数据..." />
      </div>
      <div className="spin-demo-item">
        <kdcq-spin {...props} loading size="small" alternative-text="加载中" />
      </div>
    </div>
  );
};

const LoadingControl = (props: ComponentProps) => {
  return (
    <div className="spin-demo-container">
      <div className="spin-demo-item">
        <h4>加载中状态</h4>
        <kdcq-spin {...props} loading={true} alternative-text="加载中" />
      </div>
      <div className="spin-demo-item">
        <h4>非加载中状态</h4>
        <kdcq-spin {...props} loading={false} alternative-text="未加载" />
      </div>
    </div>
  );
};

const WithDelay = (props: ComponentProps) => {
  const [loading, setLoading] = React.useState(false);
  const [delay] = React.useState(3000);
  const handleClick = React.useCallback(() => {
    setTimeout(() => {
      setLoading((value) => !value);
    }, loading ? 0 : delay);
  }, [loading, delay])

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, delay);
  }, []);

  React.useEffect(() => {
    const btn = document.getElementById('toggle-btn');
    if (btn) {
      btn.addEventListener('click', handleClick);
    }
    return () => {
      if (btn) {
        btn.removeEventListener('click', handleClick);
      }
    };
  }, [handleClick]);

  return (
    <div>
      <h4>延迟 3 秒显示加载效果</h4>
      <kdcq-button id="toggle-btn" label="切换loading状态" onClick={handleClick}></kdcq-button>
      <br></br>
      <br></br>
      {loading && <kdcq-spin {...props} loading={loading} delay={delay} alternative-text="延迟加载中..." />}
    </div>
  );
};

const customIndicator = (props: ComponentProps) => {
  return (
    <div>
      <h4>自定义加载图标</h4>
      <kdcq-spin {...props} loading indicator="kdfont-jiazai" />
    </div>
  );
}

export default {
  Default: withComponent(Spin),
  Size: withComponent(Size),
  WithText: withComponent(WithText),
  LoadingControl: withComponent(LoadingControl),
  WithDelay: withComponent(WithDelay),
  CustomIndicator: withComponent(customIndicator),
};
