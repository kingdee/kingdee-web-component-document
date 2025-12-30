import { animate, createScope } from 'animejs';
import React, { RefObject, useEffect, useRef } from 'react';
import './index.less';

interface UseFloatingPaperDriftOptions {
  containerRef: RefObject<HTMLElement>;
  targetRef: RefObject<HTMLElement>;
  size?: number;
  speed?: number;
  maxRotateSpeed?: number;
  edgePadding?: number;
  direction?: 'topRight' | 'bottomLeft';
}

export function useFloatingPaperDrift({
  containerRef,
  targetRef,
  size = 40,
  speed = 0.5,
  maxRotateSpeed = 0.03,
  edgePadding = 20, // 越大，越早“感知”边缘
  direction = 'topRight',
}: UseFloatingPaperDriftOptions) {
  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    let x = Math.random() * 100;
    let y = Math.random() * 100;

    let vx = 0;
    let vy = 0;

    let rotation = Math.random() * 360;
    let rotationSpeed = (Math.random() - 0.5) * maxRotateSpeed;

    let tx = Math.random() * 1000;
    let ty = Math.random() * 1000;

    const noiseStep = 0.003;
    const damping = 0.98;

    let rafId: number;

    function edgeForce(pos: number, min: number, max: number) {
      if (pos < min) return (min - pos) * 0.01;
      if (pos > max) return (max - pos) * 0.01;
      return 0;
    }

    function animate() {
      const maxX = container!.clientWidth - size - edgePadding;
      const maxY = container!.clientHeight - size - edgePadding;
      const minX = edgePadding;
      const minY = edgePadding;

      // 连续风向（噪声）
      vx += Math.sin(tx) * speed * 0.01;
      vy += Math.cos(ty) * speed * 0.01;

      // 边缘回推（柔）
      vx += edgeForce(x, minX, maxX);
      vy += edgeForce(y, minY, maxY);

      // 阻尼
      vx *= damping;
      vy *= damping;

      x += vx;
      y += vy;

      // 自旋转
      rotation += rotationSpeed;
      rotationSpeed += (Math.random() - 0.5) * 0.001;
      rotationSpeed = Math.max(
        -maxRotateSpeed,
        Math.min(maxRotateSpeed, rotationSpeed),
      );

      let xDirMultiplier = direction === 'bottomLeft' ? -1 : 1;
      let yDirMultiplier = direction === 'topRight' ? -1 : 1;

      target!.style.transform = `
        translate3d(${xDirMultiplier * x}px, ${yDirMultiplier * y}px, 0)
        rotate(${rotation}deg)
      `;

      tx += noiseStep;
      ty += noiseStep * 1.3;

      rafId = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(rafId);
  }, [containerRef, targetRef, size, speed, maxRotateSpeed, edgePadding]);
}

const CustomHomePage = () => {
  const animationRef = useRef<any>(null);
  const scope = useRef<any>(null);
  const paperContainerRef = useRef<any>(null);
  const paperOneRef = useRef<any>(null);
  const paperTwoRef = useRef<any>(null);

  useFloatingPaperDrift({
    containerRef: paperContainerRef,
    targetRef: paperOneRef,
    speed: 1.3,
    maxRotateSpeed: 0.8,
    direction: 'topRight',
  });
  useFloatingPaperDrift({
    containerRef: paperContainerRef,
    targetRef: paperTwoRef,
    maxRotateSpeed: 0.5,
    direction: 'bottomLeft',
  });
  useEffect(() => {
    if (!animationRef.current) return;
    scope.current = createScope({
      root: animationRef.current,
    }).add(() => {
      animate(animationRef.current, {
        y: '2cqh',
        ease: 'inOutSine',
        loop: true,
        duration: 2500,
        alternate: true,
      });
    });
    // 在组件卸载时清理所有 scope 中的 anime.js 实例
    return () => scope.current.revert();
  }, []);

  return (
    <section className="customHomePageSection">
      <div className="leftBlock">
        <div className="title" />
        <div className="description_large animate__animated animate__fadeIn">
          构建企业级 Web 应用的基石
        </div>
        <div className="description_small animate__animated animate__fadeIn">
          拥抱 Web 标准，定义未来架构。 KWC
          是一套高性能、轻量级的前端开发框架，以标准化技术驱动，轻松驾驭从灵动交互到核心业务的无限可能。
        </div>
        <div className="button-group">
          <div className="btn btn-primary">
            <div className="icon rocketIcon" />
            <span>快速开始</span>
          </div>
          <div className="btn btn-secondary">
            <div className="icon elementIcon" />
            <span>浏览组件</span>
          </div>
        </div>
      </div>
      <div className="rightBlock">
        <div ref={animationRef} className="mainImage" />
        <div ref={paperContainerRef} className="paperContainer">
          <div ref={paperOneRef} className="paper_one" />
          <div ref={paperTwoRef} className="paper_two" />
        </div>
      </div>
    </section>
  );
};

export default CustomHomePage;
