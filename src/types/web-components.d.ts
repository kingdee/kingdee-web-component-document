// src/types/web-components.d.ts
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'kdcq-layout': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'horizontal-align'?: 'start' | 'center' | 'space' | 'spread' | 'end';
        'vertical-align'?: 'start' | 'center' | 'end' | 'stretch';
        'multiple-rows'?: boolean;
        'pull-to-boundary'?: 'small' | 'medium' | 'large';
      };
      'kdcq-layout-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'alignment-bump'?: 'left' | 'top' | 'right' | 'bottom';
        'flexibility'?: 'auto' | 'shrink' | 'no-shrink' | 'grow' | 'no-grow' | 'no-flex';
        'padding'?: 'horizontal-small' | 'horizontal-medium' | 'horizontal-large' | 'around-small' | 'around-medium' | 'around-large';
        size?: number;
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
      };
      'kdcq-spin': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'alternative-text'?: string;
        size?: 'large' | 'medium' | 'small';
        indicator?: string;
        delay?: number;
        loading?: boolean;
      };
    }
  }
}