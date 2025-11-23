"use client";

import React from 'react';
import MDXImage from './MDXImage';
import Callout from './mdx/Callout';
import Steps from './mdx/Steps';
import ConceptCard from './mdx/ConceptCard';
import CodeBlock from './CodeBlock';
import Diagram from './mdx/Diagram';

interface MarkdownRendererProps {
  content: string;
  courseSlug?: string;
  lessonSlug?: string;
}

export default function MarkdownRenderer({ content, courseSlug, lessonSlug }: MarkdownRendererProps) {
  // Parse custom components and markdown
  const parseContent = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // 1. Handle <Callout> component
      if (line.trim().startsWith('<Callout')) {
        const typeMatch = line.match(/type=['"](\w+)['"]/);
        const type = (typeMatch?.[1] as 'info' | 'warning' | 'tip') || 'info';
        
        // Find closing tag
        let j = i + 1;
        const contentLines: string[] = [];
        while (j < lines.length && !lines[j].trim().startsWith('</Callout>')) {
          contentLines.push(lines[j]);
          j++;
        }
        
        elements.push(
          <Callout key={`callout-${i}`} type={type}>
            {parseInlineMarkdown(contentLines.join('\n'))}
          </Callout>
        );
        
        i = j + 1;
        continue;
      }

      // 2. Handle <ConceptCard> component
      if (line.trim().startsWith('<ConceptCard')) {
        const titleMatch = line.match(/title=['"]([^'"]+)['"]/);
        const title = titleMatch?.[1] || 'Concept';
        
        // Find closing tag
        let j = i + 1;
        const contentLines: string[] = [];
        while (j < lines.length && !lines[j].trim().startsWith('</ConceptCard>')) {
          contentLines.push(lines[j]);
          j++;
        }
        
        elements.push(
          <ConceptCard key={`concept-${i}`} title={title}>
            {parseInlineMarkdown(contentLines.join('\n'))}
          </ConceptCard>
        );
        
        i = j + 1;
        continue;
      }

      // 3. Handle <Diagram> component
      if (line.trim().startsWith('<Diagram')) {
        const typeMatch = line.match(/type=['"]([\w-]+)['"]/);
        const type = (typeMatch?.[1] as 'neural-network' | 'training-loop' | 'black-box' | 'learning-types-overview' | 'supervised-learning-flow' | 'clustering-visualization' | 'reinforcement-learning-loop') || 'neural-network';
        
        elements.push(
          <Diagram key={`diagram-${i}`} type={type} />
        );
        
        i++;
        continue;
      }

      // 4. Handle Code Blocks (```)
      if (line.trim().startsWith('```')) {
        const languageMatch = line.trim().match(/^```(\w+)?/);
        const language = languageMatch?.[1] || 'text';
        
        // Find closing ```
        let j = i + 1;
        const codeLines: string[] = [];
        while (j < lines.length && !lines[j].trim().startsWith('```')) {
          codeLines.push(lines[j]);
          j++;
        }
        
        elements.push(
          <CodeBlock key={`code-${i}`} language={language}>
            {codeLines.join('\n')}
          </CodeBlock>
        );
        
        i = j + 1;
        continue;
      }

      // 4. Handle <Steps> component
      if (line.trim().startsWith('<Steps>')) {
        // Find closing tag
        let j = i + 1;
        const contentLines: string[] = [];
        while (j < lines.length && !lines[j].trim().startsWith('</Steps>')) {
          contentLines.push(lines[j]);
          j++;
        }
        
        // Parse steps content
        const stepsContent = contentLines.join('\n');
        const stepElements = parseStepsContent(stepsContent);
        
        elements.push(
          <Steps key={`steps-${i}`}>
            {stepElements}
          </Steps>
        );
        
        i = j + 1;
        continue;
      }

      // 4. Handle Headings
      if (line.startsWith('# ')) {
        elements.push(<h1 key={`h1-${i}`} className="text-4xl font-bold mb-4 text-slate-900">{line.substring(2)}</h1>);
        i++;
        continue;
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={`h2-${i}`} className="text-3xl font-bold mt-8 mb-4 text-slate-900">{line.substring(3)}</h2>);
        i++;
        continue;
      }
      if (line.startsWith('### ')) {
        elements.push(<h3 key={`h3-${i}`} className="text-2xl font-semibold mt-6 mb-3 text-slate-800">{line.substring(4)}</h3>);
        i++;
        continue;
      }

      // 5. Handle Images
      if (line.match(/^!\[.*\]\(.*\)/)) {
        const match = line.match(/^!\[(.*)\]\((.*)\)/);
        if (match) {
          const alt = match[1];
          const src = match[2];
          elements.push(
            <MDXImage 
              key={`img-${i}`} 
              src={src} 
              alt={alt} 
              courseSlug={courseSlug}
              lessonSlug={lessonSlug}
            />
          );
          i++;
          continue;
        }
      }

      // 6. Handle Lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const items: string[] = [];
        let j = i;
        while (j < lines.length && (lines[j].trim().startsWith('- ') || lines[j].trim().startsWith('* '))) {
          items.push(lines[j].trim().substring(2));
          j++;
        }
        
        elements.push(
          <ul key={`ul-${i}`} className="list-disc ml-6 mb-4 space-y-2 text-slate-700">
            {items.map((item, k) => (
              <li key={k}>{parseInlineText(item)}</li>
            ))}
          </ul>
        );
        
        i = j;
        continue;
      }

      // 7. Handle numbered lists
      if (line.trim().match(/^\d+\.\s/)) {
        const items: string[] = [];
        let j = i;
        while (j < lines.length && lines[j].trim().match(/^\d+\.\s/)) {
          items.push(lines[j].trim().replace(/^\d+\.\s/, ''));
          j++;
        }
        
        elements.push(
          <ol key={`ol-${i}`} className="list-decimal ml-6 mb-4 space-y-2 text-slate-700">
            {items.map((item, k) => (
              <li key={k}>{parseInlineText(item)}</li>
            ))}
          </ol>
        );
        
        i = j;
        continue;
      }

      // 8. Handle horizontal rules
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${i}`} className="my-8 border-slate-200" />);
        i++;
        continue;
      }

      // 9. Handle Tables
      if (line.trim().startsWith('|')) {
        const tableLines: string[] = [];
        let j = i;
        while (j < lines.length && lines[j].trim().startsWith('|')) {
          tableLines.push(lines[j].trim());
          j++;
        }

        if (tableLines.length >= 2) {
          const headerLine = tableLines[0];
          const separatorLine = tableLines[1];
          const bodyLines = tableLines.slice(2);

          const headers = headerLine.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
          
          // Simple validation of separator line
          if (separatorLine.includes('-')) {
             elements.push(
              <div key={`table-${i}`} className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800">
                      {headers.map((header, k) => (
                        <th key={k} className="border border-slate-200 dark:border-slate-700 p-3 text-left font-semibold text-slate-900 dark:text-slate-100">
                          {parseInlineText(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bodyLines.map((rowLine, r) => {
                      const cells = rowLine.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
                      return (
                        <tr key={r} className="even:bg-slate-50/50 dark:even:bg-slate-800/50">
                          {cells.map((cell, c) => (
                            <td key={c} className="border border-slate-200 dark:border-slate-700 p-3 text-slate-700 dark:text-slate-300">
                              {parseInlineText(cell)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
            i = j;
            continue;
          }
        }
        // If not a valid table, fall through to paragraph
      }

      // 9. Regular Paragraphs
      if (line.trim() !== '') {
        elements.push(
          <p key={`p-${i}`} className="mb-4 text-slate-700 leading-relaxed">
            {parseInlineText(line)}
          </p>
        );
      }

      i++;
    }

    return elements;
  };

  // Parse inline markdown (bold, italic, links)
  const parseInlineText = (text: string): React.ReactNode => {
    // Handle bold (**text**)
    if (text.includes('**')) {
      const parts = text.split('**');
      return (
        <>
          {parts.map((part, k) => k % 2 === 1 ? <strong key={k}>{part}</strong> : part)}
        </>
      );
    }
    
    // Handle italic (*text*)
    if (text.includes('*')) {
      const parts = text.split('*');
      return (
        <>
          {parts.map((part, k) => k % 2 === 1 ? <em key={k}>{part}</em> : part)}
        </>
      );
    }

    return text;
  };

  // Parse inline markdown for multi-line content (for Callout, ConceptCard)
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    const lines = text.split('\n').filter(l => l.trim());
    return lines.map((line, i) => (
      <p key={i} className="my-2">
        {parseInlineText(line)}
      </p>
    ));
  };

  // Parse steps content (h3 headings + paragraphs + code blocks)
  const parseStepsContent = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle Code Blocks inside steps
      if (line.trim().startsWith('```')) {
        const languageMatch = line.trim().match(/^```(\w+)?/);
        const language = languageMatch?.[1] || 'text';
        
        let j = i + 1;
        const codeLines: string[] = [];
        while (j < lines.length && !lines[j].trim().startsWith('```')) {
          codeLines.push(lines[j]);
          j++;
        }
        
        elements.push(
          <CodeBlock key={`step-code-${i}`} language={language}>
            {codeLines.join('\n')}
          </CodeBlock>
        );
        
        i = j;
        continue;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`step-h3-${i}`}>
            {line.substring(4)}
          </h3>
        );
      } else if (line.trim() !== '') {
        elements.push(
          <p key={`step-p-${i}`}>
            {parseInlineText(line)}
          </p>
        );
      }
    }
    
    return elements;
  };

  return <div className="markdown-content">{parseContent(content)}</div>;
}
