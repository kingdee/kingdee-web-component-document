import { Tooltip } from '@kdcloudjs/kdesign';
import LZString from 'lz-string';
import React, { useRef } from 'react';

function compress(string: string): string {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

interface LiveDemoProps {
  isEnglish: boolean;
}

export default function LiveDemo(props: LiveDemoProps) {
  const codeSandboxIconRef = useRef<HTMLFormElement>(null);

  const { isEnglish } = props;
  const code = '';

  const codesandboxPackage = {
    title: 111,
    main: 'index.jsx',
    dependencies: {
      react: '^18.0.0',
      'react-dom': '^18.0.0',
      'react-scripts': '^5.0.0',
      '@kdcloudjs/kdesign': 'latest',
    },
    devDependencies: {
      typescript: '^5.0.2',
    },
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test --env=jsdom',
      eject: 'react-scripts eject',
    },
    browserslist: ['>0.2%', 'not dead'],
  };
  const indexCssContent = `@import '@kdcloudjs/kdesign/dist/kdesign.css';`;
  const indexJsContent = `import React from 'react';
  import { createRoot } from 'react-dom/client';
  import './index.css';
  import Demo from './demo';

  createRoot(document.getElementById('container')).render(<Demo />);
  `;
  const demoJsContent = code.replace(
    'ReactDOM.render(<Demo />, mountNode)',
    `export default Demo`,
  );
  const html = `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width">
          <meta name="theme-color" content="#000000">
        </head>
        <body>
          <div id="container" style="padding: 24px" />
          <script>const mountNode = document.getElementById('container');</script>
        </body>
      </html>
    `;
  const codesanboxPrefillConfig = {
    files: {
      'package.json': { content: codesandboxPackage },
      'index.css': { content: indexCssContent },
      [`index.tsx`]: { content: indexJsContent },
      [`demo.tsx`]: { content: demoJsContent },
      'index.html': {
        content: html,
      },
    },
  };

  const tip = isEnglish ? 'Open in CodeSandbox' : '在 CodeSandbox 中打开';
  return (
    <form
      action="https://codesandbox.io/api/v1/sandboxes/define"
      method="POST"
      target="_blank"
      ref={codeSandboxIconRef}
      onClick={() => {
        codeSandboxIconRef.current?.submit();
      }}
    >
      <input
        type="hidden"
        name="parameters"
        value={compress(JSON.stringify(codesanboxPrefillConfig))}
      />
      <Tooltip tip={tip} placement="top">
        <span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 1024 1024"
            fill="currentColor"
          >
            <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
          </svg>
        </span>
      </Tooltip>
    </form>
  );
}
