"use client";

import React from 'react';
import MDXImage from './MDXImage';
import Callout from './mdx/Callout';
import Steps from './mdx/Steps';
import ConceptCard from './mdx/ConceptCard';
import LabSection from './mdx/LabSection';
import LabComplete from './mdx/LabComplete';
import CodeBlock from './CodeBlock';
import Diagram from './mdx/Diagram';
import KeyTakeaway from './mdx/KeyTakeaway';
import { YouTube } from './mdx/YouTube';

interface MarkdownRendererProps {
  content: string;
  courseSlug?: string;
  lessonSlug?: string;
}

export default function MarkdownRenderer({ content, courseSlug, lessonSlug }: MarkdownRendererProps) {
  
  const parseContent = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;

    // Helper to read multi-line opening tag (e.g. <ConceptCard ... >)
    const readOpeningTag = (startIndex: number): { endIndex: number, tagContent: string } => {
      let j = startIndex;
      let tagContent = lines[j];
      // Naive check for closing '>' of the opening tag. 
      // We assume '>' is not used inside prop values for now, or is rare.
      while (j < lines.length && !tagContent.includes('>')) {
        j++;
        if (j < lines.length) {
          tagContent += ' ' + lines[j].trim();
        }
      }
      return { endIndex: j, tagContent };
    };

    // Helper to find closing tag (e.g. </ConceptCard>)
    const findClosingTag = (startIndex: number, tagName: string): { end: number, content: string } => {
      let j = startIndex + 1;
      const contentLines: string[] = [];
      const closeTag = `</${tagName}>`;
      
      while (j < lines.length && !lines[j].trim().startsWith(closeTag)) {
        contentLines.push(lines[j]);
        j++;
      }
      return { end: j + 1, content: contentLines.join('\n') };
    };

    while (i < lines.length) {
      const line = lines[i];

      // 0. Handle <YouTube> component
      if (line.trim().startsWith('<YouTube')) {
        const { endIndex: openEnd, tagContent } = readOpeningTag(i);
        
        const idMatch = tagContent.match(/id=['"]([^'"']+)['"]/);
        const titleMatch = tagContent.match(/title=['"]([^'"']+)['"]/);
        
        const id = idMatch?.[1] || '';
        const title = titleMatch?.[1] || 'YouTube Video';
        
        elements.push(
          <YouTube key={`youtube-${i}`} id={id} title={title} />
        );
        
        i = openEnd + 1;
        continue;
      }

      // 1. Handle <Callout> component
      if (line.trim().startsWith('<Callout')) {
        const { endIndex: openEnd, tagContent } = readOpeningTag(i);
        
        const typeMatch = tagContent.match(/type=['"](\w+)['"]/);
        const type = (typeMatch?.[1] as any) || 'info';
        
        const { end: closeEnd, content: innerContent } = findClosingTag(openEnd, 'Callout');
        
        elements.push(
          <Callout key={`callout-${i}`} type={type}>
            {parseInlineMarkdown(innerContent)}
          </Callout>
        );
        
        i = closeEnd;
        continue;
      }

      // 2. Handle <ConceptCard> component
      if (line.trim().startsWith('<ConceptCard')) {
        const { endIndex: openEnd, tagContent } = readOpeningTag(i);

        const titleMatch = tagContent.match(/title=['"]([^'"']+)['"]/);
        const iconMatch = tagContent.match(/icon=['"]([^'"']+)['"]/);
        const diffMatch = tagContent.match(/difficulty=['"]([^'"']+)['"]/);
        const jediMatch = tagContent.match(/jediQuote=['"]([^'"']+)['"]/);
        const sithMatch = tagContent.match(/sithQuote=['"]([^'"']+)['"]/);

        const props = {
          title: titleMatch?.[1] || 'Concept',
          icon: iconMatch?.[1] || '💡',
          difficulty: diffMatch?.[1],
          jediQuote: jediMatch?.[1],
          sithQuote: sithMatch?.[1]
        };
        
        const { end: closeEnd, content: innerContent } = findClosingTag(openEnd, 'ConceptCard');
        
        elements.push(
          <ConceptCard key={`concept-${i}`} {...props}>
            {parseInlineMarkdown(innerContent)}
          </ConceptCard>
        );
        
        i = closeEnd;
        continue;
      }

      // 3. Handle <LabSection> component
      if (line.trim().startsWith('<LabSection')) {
        const { endIndex: openEnd, tagContent } = readOpeningTag(i);

        const titleMatch = tagContent.match(/title=['"]([^'"']+)['"]/);
        const diffMatch = tagContent.match(/difficulty=['"]([^'"']+)['"]/);
        
        const title = titleMatch?.[1] || 'Lab';
        const difficulty = diffMatch?.[1] || 'Builder';
        
        const { end: closeEnd, content: innerContent } = findClosingTag(openEnd, 'LabSection');
        
        const parsedLabContent = parseLabContent(innerContent);

        elements.push(
          <LabSection key={`lab-${i}`} title={title} difficulty={difficulty}>
            {parsedLabContent}
          </LabSection>
        );
        
        i = closeEnd;
        continue;
      }

      // 3.5 Handle <LabComplete> component
      if (line.includes('<LabComplete')) {
        const { endIndex: openEnd, tagContent } = readOpeningTag(i);
        const labIdMatch = tagContent.match(/labId=['"]([^'"']+)['"]/);
        const labId = labIdMatch?.[1] || 'unknown-lab';
        
        elements.push(
          <LabComplete key={`lab-complete-${i}`} labId={labId} />
        );
        
        i = openEnd + 1;
        continue;
      }

      // 4. Handle <Diagram> component
      if (line.trim().startsWith('<Diagram')) {
        const { endIndex: openEnd, tagContent } = readOpeningTag(i);
        const typeMatch = tagContent.match(/type=['"]([\w-]+)['"]/);
        const type = (typeMatch?.[1] as any) || 'neural-network';
        
        elements.push(
          <Diagram key={`diagram-${i}`} type={type} />
        );
        
        i = openEnd + 1;
        continue;
      }

      // 4.5 Handle <KeyTakeaway> component
      if (line.trim().startsWith('<KeyTakeaway')) {
        const { endIndex: openEnd, tagContent } = readOpeningTag(i);

        const titleMatch = tagContent.match(/title=['"]([^'"']+)['"]/);
        const iconMatch = tagContent.match(/icon=['"]([^'"']+)['"]/);
        const colorMatch = tagContent.match(/color=['"]([^'"']+)['"]/);

        const props = {
          title: titleMatch?.[1] || 'Takeaway',
          icon: iconMatch?.[1] || '🔑',
          color: (colorMatch?.[1] as any) || 'slate'
        };
        
        const { end: closeEnd, content: innerContent } = findClosingTag(openEnd, 'KeyTakeaway');
        
        elements.push(
          <KeyTakeaway key={`takeaway-${i}`} {...props}>
            {parseInlineMarkdown(innerContent)}
          </KeyTakeaway>
        );
        
        i = closeEnd;
        continue;
      }

      // 5. Handle Code Blocks (```)
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
          <CodeBlock key={`code-${i}`} language={language}>
            {codeLines.join('\n')}
          </CodeBlock>
        );
        
        i = j + 1;
        continue;
      }

      // 6. Handle <Steps> component
      if (line.trim().startsWith('<Steps>')) {
        const { endIndex: openEnd } = readOpeningTag(i); // Just to consume it
        const { end: closeEnd, content: innerContent } = findClosingTag(openEnd, 'Steps');
        const stepElements = parseStepsContent(innerContent);
        
        elements.push(
          <Steps key={`steps-${i}`}> 
            {stepElements}
          </Steps>
        );
        
        i = closeEnd;
        continue;
      }

      // 6.5 Handle <div> component (Generic wrapper) - FIX for div appearing as text
      if (line.trim().startsWith('<div')) {
        const { endIndex: openEnd, tagContent } = readOpeningTag(i);
        
        // Extract className
        const classMatch = tagContent.match(/className=['"]([^'"]+)['"]/);
        const className = classMatch?.[1] || '';
        
        const { end: closeEnd, content: innerContent } = findClosingTag(openEnd, 'div');
        
        elements.push(
          <div key={`div-${i}`} className={className}>
            {parseContent(innerContent)} {/* Recursive parse! */}
          </div>
        );
        
        i = closeEnd;
        continue;
      }

      // 7. Headings
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('# ')) {
        elements.push(<h1 key={`h1-${i}`} className="text-4xl font-bold mb-4 text-foreground text-wrap">{trimmedLine.substring(2)}</h1>);
        i++; continue;
      }
      if (trimmedLine.startsWith('## ')) {
        elements.push(<h2 key={`h2-${i}`} className="text-3xl font-bold mt-8 mb-4 text-foreground text-wrap">{trimmedLine.substring(3)}</h2>);
        i++; continue;
      }
      if (trimmedLine.startsWith('### ')) {
        elements.push(<h3 key={`h3-${i}`} className="text-2xl font-semibold mt-6 mb-3 text-foreground text-wrap">{trimmedLine.substring(4)}</h3>);
        i++; continue;
      }

      // 8. Images
      if (line.match(/^!.*]\(.*\)/)) {
        const match = line.match(/^!\[(.*)\]\((.*)\)/);
        if (match) {
          elements.push(
            <MDXImage 
              key={`img-${i}`} 
              src={match[2]} 
              alt={match[1]} 
              courseSlug={courseSlug}
              lessonSlug={lessonSlug}
            />
          );
          i++; continue;
        }
      }

      // 9. Lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const items: string[] = [];
        let j = i;
        while (j < lines.length && (lines[j].trim().startsWith('- ') || lines[j].trim().startsWith('* '))) {
          items.push(lines[j].trim().substring(2));
          j++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="list-disc ml-6 mb-4 space-y-2 text-slate-700 dark:text-slate-300">
            {items.map((item, k) => <li key={k}>{parseInlineText(item)}</li>)}
          </ul>
        );
        i = j; continue;
      }

      // 10. Numbered Lists
      if (line.trim().match(/^\d+\.\s/)) {
        const items: string[] = [];
        let j = i;
        while (j < lines.length && lines[j].trim().match(/^\d+\.\s/)) {
          items.push(lines[j].trim().replace(/^\d+\.\s/, ''));
          j++;
        }
        elements.push(
          <ol key={`ol-${i}`} className="list-decimal ml-6 mb-4 space-y-2 text-slate-700 dark:text-slate-300">
            {items.map((item, k) => <li key={k}>{parseInlineText(item)}</li>)}
          </ol>
        );
        i = j; continue;
      }

      // 11. Horizontal Rule
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${i}`} className="my-8 border-slate-200 dark:border-slate-700" />);
        i++; continue;
      }

      // 12. Tables
      if (line.trim().startsWith('|')) {
         const tableLines: string[] = [];
         let j = i;
         while (j < lines.length && lines[j].trim().startsWith('|')) {
           tableLines.push(lines[j].trim());
           j++;
         }
         if (tableLines.length >= 2 && tableLines[1].includes('-')) {
            const headers = tableLines[0].split('|').filter(c => c.trim()).map(c => c.trim());
            const rows = tableLines.slice(2).map(l => l.split('|').filter(c => c.trim()).map(c => c.trim()));
            elements.push(
              <div key={`table-${i}`} className="overflow-x-auto mb-6">
                <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-700">
                  <thead>
                    <tr className="bg-muted/50">
                      {headers.map((h, k) => (
                        <th key={k} className="border border-border p-2 text-left text-sm font-semibold text-foreground whitespace-nowrap">{parseInlineText(h)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, r) => (
                      <tr key={r} className="even:bg-muted/20">
                        {row.map((cell, c) => (
                          <td key={c} className="border border-border p-2 text-muted-foreground min-w-[100px]">{parseInlineText(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
            i = j; continue;
         }
      }

      // 13. Paragraphs
      if (line.trim() !== '') {
        elements.push(
          <p key={`p-${i}`} className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
            {parseInlineText(line)}
          </p>
        );
      }
      i++;
    }
    return elements;
  };

  // --- Helper Parsing Functions ---

  const parseInlineText = (text: string): React.ReactNode => {
    // Note: Very basic parsing. Doesn't handle nested.
    const parts = text.split(/(\**.*?\**|\*.*?\*|`.*?`)/g);
    return parts.map((part, k) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={k}>{part.slice(2, -2)}</strong>;
      if (part.startsWith('*') && part.endsWith('*')) return <em key={k}>{part.slice(1, -1)}</em>;
      if (part.startsWith('`') && part.endsWith('`')) return <code key={k} className="bg-muted px-1 py-0.5 rounded text-sm font-mono text-primary">{part.slice(1, -1)}</code>;
      return part;
    });
  };

  const parseInlineMarkdown = (text: string): React.ReactNode => {
    return text.split('\n').filter(l => l.trim()).map((line, i) => (
      <p key={i} className="my-2">{parseInlineText(line)}</p>
    ));
  };

  // Lab Content = Steps but inside LabSection
  const parseLabContent = (text: string): React.ReactNode[] => {
     // Use main parser to handle <Steps> or other components inside LabSection
     return parseContent(text);
  };

  const parseStepsContent = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
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
        i = j; continue;
      }

      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('### ')) {
        elements.push(<h3 key={`step-h3-${i}`} className="text-lg font-bold mt-4 mb-2">{trimmedLine.substring(4)}</h3>);
      } else if (trimmedLine !== '') {
        elements.push(<p key={`step-p-${i}`} className="mb-2">{parseInlineText(trimmedLine)}</p>);
      }
    }
    return elements;
  };

  return <div className="markdown-content">{parseContent(content)}</div>;
}