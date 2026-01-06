import React from 'react';
import './bestpractices.less';
import banner1 from './images/banner1.png';
import banner2 from './images/banner2.png';
import banner3 from './images/banner3.png';
interface CardItem {
  tags: string[];
  title: string;
  description: string;
  cta: string; // call-to-action 按钮
  banner: string; // 横幅图片
  link?: string; // 可选：按钮跳转链接
}
const cardData: CardItem[] = [
  {
    tags: ['UI创新', '新拟态', '多端适配', '自定义控件'],
    title: '下一代视觉风格示例',
    description:
      '基于 KWC 强大的自定义渲染能力，构建的一套全新现代化 UI 风格。突破传统 ERP 界面限制，展示了更加轻量、通透且具有高级交互感的组件设计，适用于未来创新型业务场景。',
    cta: '查看仓库源码',
    link: 'https://github.com/kwcapps/new-style-showcase/',
    banner: banner1,
  },
  {
    tags: ['风格适配', '无缝集成', '1:1还原'],
    title: '苍穹经典风格完美复刻',
    description:
      '演示如何通过 KWC 原子组件，像素级还原现有“苍穹”平台的经典界面风格。确保新开发组件能与存量业务系统在视觉体验上保持高度一致，实现用户体验的零门槛过渡。',
    cta: '查看仓库源码',
    link: 'https://github.com/kwcapps/legacy-style-replica/',
    banner: banner2,
  },
  {
    tags: ['低代码', '属性配置', '交互演示'],
    title: '自定义控件动态属性配置器 ',
    description:
      '展示了如何通过元数据驱动自定义控件的属性面板，支持自定义参数与行为逻辑，并即时预览自定义控件的渲染效果，极大提升开发扩展能力。',
    cta: '查看仓库源码',
    link: 'https://github.com/kwcapps/widget-prop-samples/',
    banner: banner3,
  },
];
const BestPractices = () => {
  const handleBtnClick = (link?: string) => () => {
    if (link) {
      window.open(link, '_blank');
    }
  };
  return (
    <div className="bestPracticesContainer">
      <div className="description">
        <div className="title">最佳实践案例</div>
        <div className="content">
          <span>
            探索
            KWC在真实业务场景中的应用，包含中台表单、大屏可视化、移动端等多种场景
          </span>
        </div>
      </div>
      <div className="cardGroup">
        {cardData.map((item, index) => {
          return (
            <div className="cardItem" key={`${item.title}-${index}`}>
              <img src={item.banner} width="100%"></img>
              <div className="title">{item.title}</div>
              <div className="tagList">
                {item.tags.map((tag, tagIndex) => (
                  <div className="tagItem" key={`${tag}-${tagIndex}`}>
                    {tag}
                  </div>
                ))}
              </div>
              <div className="description">{item.description}</div>
              <div className="ctaButton" onClick={handleBtnClick(item.link)}>
                {item.cta}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestPractices;
