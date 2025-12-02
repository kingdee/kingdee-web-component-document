import { Clipboard, Message } from '@kdcloudjs/kdesign';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  codeString: string;
  language: string;
  isDark: boolean;
}

export default function CodeBlock(props: CodeBlockProps) {
  const { codeString, language, isDark } = props;

  return (
    <div className="kwc-code-block">
      <SyntaxHighlighter
        language={language}
        style={isDark ? a11yDark : atomOneLight}
      >
        {codeString}
      </SyntaxHighlighter>
      <div className="kwc-code-block-copyicon">
        <Clipboard
          content={codeString}
          onSuccess={() => {
            Message.success(`复制成功`);
          }}
        />
      </div>
    </div>
  );
}
