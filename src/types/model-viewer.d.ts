import type * as React from 'react';

type ModelViewerElementProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  alt?: string;
  poster?: string;
  loading?: 'eager' | 'lazy';
  reveal?: 'auto' | 'interaction' | 'manual';
  exposure?: string | number;
  autoplay?: boolean;
  ar?: boolean;
  'auto-rotate'?: boolean;
  'camera-controls'?: boolean;
  'disable-pan'?: boolean;
  'disable-zoom'?: boolean;
  'camera-orbit'?: string;
  'field-of-view'?: string;
  'interaction-prompt'?: 'auto' | 'when-focused' | 'none';
  'shadow-intensity'?: string | number;
  'environment-image'?: string;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerElementProps;
    }
  }
}

export {};