'use client';

import { useEffect, useState } from 'react';

interface MarkdownContentProps {
  markdown: string;
}

export default function MarkdownContent({ markdown }: MarkdownContentProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    // Simple Markdown to HTML conversion
    const convertMarkdownToHtml = (md: string) => {
      // Replace headers
      let html = md
        .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
        .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
        .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')
        .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-bold mt-4 mb-2">$1</h4>');

      // Replace code blocks
      html = html.replace(/```([a-z]*)\n([\s\S]*?)```/gm, (match, lang, code) => {
        return `<div class="bg-gray-100 dark:bg-gray-800 rounded-md p-4 my-4 overflow-x-auto"><pre><code class="language-${lang}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre></div>`;
      });

      // Replace inline code
      html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded font-mono text-sm">$1</code>');

      // Replace lists
      html = html.replace(/^\* (.*$)/gm, '<li class="ml-6 list-disc">$1</li>');
      html = html.replace(/^\- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>');
      html = html.replace(/^([0-9]+)\. (.*$)/gm, '<li class="ml-6 list-decimal">$1. $2</li>');
      
      // Wrap lists
      html = html.replace(/<li class="ml-6 list-disc">(.*)<\/li>\n<li class="ml-6 list-disc">/gm, '<li class="ml-6 list-disc">$1</li>\n<li class="ml-6 list-disc">');
      html = html.replace(/<li class="ml-6 list-disc">(.*)<\/li>\n(?!<li)/gm, '<li class="ml-6 list-disc">$1</li>\n</ul>\n');
      html = html.replace(/(?<!<\/ul>\n)(?<!<\/li>\n)<li class="ml-6 list-disc">/gm, '<ul class="my-4">\n<li class="ml-6 list-disc">');
      
      // Replace links
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');

      // Replace paragraphs
      html = html.replace(/^(?!<[a-z]).+$/gm, (match) => {
        if (match.trim() === '') return '';
        return `<p class="my-4">${match}</p>`;
      });

      return html;
    };

    setHtmlContent(convertMarkdownToHtml(markdown));
  }, [markdown]);

  return (
    <div 
      className="prose max-w-none dark:prose-invert prose-a:text-blue-600" 
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
} 