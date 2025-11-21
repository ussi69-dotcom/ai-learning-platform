"use client";

import React from 'react';
import CalloutBox from './CalloutBox';
import CodeBlock from './CodeBlock';
import TryItYourself from './TryItYourself';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Helper to parse content line by line
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // 1. Handle Code Blocks (```)
    if (line.trim().startsWith('```')) {
      const language = line.trim().replace('```', '');
      let codeContent = '';
      let j = i + 1;
      while (j < lines.length && !lines[j].trim().startsWith('```')) {
        codeContent += lines[j] + '\n';
        j++;
      }
      
      // Check if it's a special "TryItYourself" block (custom convention)
      if (language === 'tryit') {
        // Parse tryit block: Task | Prompt | Hint
        const parts = codeContent.split('---');
        const task = parts[0]?.trim() || '';
        const prompt = parts[1]?.trim() || '';
        const hint = parts[2]?.trim();
        
        elements.push(
          <TryItYourself 
            key={`tryit-${i}`} 
            task={task} 
            prompt={prompt} 
            hint={hint} 
          />
        );
      } else {
        // Standard code block
        elements.push(
          <CodeBlock 
            key={`code-${i}`} 
            code={codeContent} 
            language={language || 'python'} 
          />
        );
      }
      
      i = j + 1; // Skip closing ```
      continue;
    }

    // 2. Handle Callouts (> [!TYPE])
    if (line.trim().startsWith('> [!')) {
      const typeMatch = line.match(/> \[!(\w+)\]/);
      const type = typeMatch ? typeMatch[1].toLowerCase() : 'note';
      let calloutContent: React.ReactNode[] = [];
      let j = i + 1;
      
      // Read callout content (lines starting with >)
      while (j < lines.length && lines[j].trim().startsWith('>')) {
        const contentLine = lines[j].replace(/^>\s?/, '');
        // Basic formatting for callout content
        if (contentLine.trim() === '') {
          calloutContent.push(<br key={`br-${j}`} />);
        } else if (contentLine.includes('**')) {
           const parts = contentLine.split('**');
           calloutContent.push(
             <p key={`p-${j}`} className="mb-1">
               {parts.map((part, k) => k % 2 === 1 ? <strong key={k}>{part}</strong> : part)}
             </p>
           );
        } else {
          calloutContent.push(<p key={`p-${j}`} className="mb-1">{contentLine}</p>);
        }
        j++;
      }
      
      elements.push(
        <CalloutBox key={`callout-${i}`} type={type as any}>
          {calloutContent}
        </CalloutBox>
      );
      
      i = j;
      continue;
    }

    // 3. Handle Tables
    if (line.includes('|') && line.split('|').length > 2 && !line.trim().startsWith('>')) {
      // Check if it's a table header (next line has ---)
      const nextLine = lines[i + 1];
      if (nextLine && nextLine.includes('---') && nextLine.includes('|')) {
        const headerCells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        const rows: string[][] = [];
        let j = i + 2; // Skip header and separator
        
        while (j < lines.length && lines[j].includes('|')) {
          rows.push(lines[j].split('|').filter(c => c.trim()).map(c => c.trim()));
          j++;
        }
        
        elements.push(
          <div key={`table-${i}`} className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse border border-slate-300 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-slate-100">
                <tr>
                  {headerCells.map((cell, k) => (
                    <th key={k} className="border border-slate-300 px-4 py-3 text-left font-semibold text-slate-900">
                      {cell.replace(/\*\*/g, '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {rows.map((row, rIndex) => (
                  <tr key={rIndex} className="hover:bg-slate-50 transition-colors">
                    {row.map((cell, cIndex) => (
                      <td key={cIndex} className="border border-slate-200 px-4 py-3 text-slate-700">
                        {cell.includes('**') ? (
                          <span>
                            {cell.split('**').map((part, k) => k % 2 === 1 ? <strong key={k}>{part}</strong> : part)}
                          </span>
                        ) : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        
        i = j;
        continue;
      }
    }

    // 4. Handle Headings
    if (line.startsWith('# ')) {
      elements.push(<h1 key={`h1-${i}`} className="text-3xl font-bold mt-8 mb-4 text-slate-900">{line.substring(2)}</h1>);
      i++; continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={`h2-${i}`} className="text-2xl font-bold mt-8 mb-4 text-slate-800 border-b pb-2">{line.substring(3)}</h2>);
      i++; continue;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={`h3-${i}`} className="text-xl font-semibold mt-6 mb-3 text-slate-800">{line.substring(4)}</h3>);
      i++; continue;
    }

    // 5. Handle Images
    if (line.match(/^!\[.*\]\(.*\)/)) {
      const match = line.match(/^!\[(.*)\]\((.*)\)/);
      if (match) {
        const alt = match[1];
        const src = match[2];
        elements.push(
          <div key={`img-${i}`} className="my-8">
            <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200">
              <img src={src} alt={alt} className="w-full h-auto object-cover" />
            </div>
            <p className="text-center text-sm text-slate-500 mt-2 italic">
              {alt}
            </p>
          </div>
        );
        i++; continue;
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
            <li key={k}>
              {item.includes('**') ? (
                <span>
                  {item.split('**').map((part, p) => p % 2 === 1 ? <strong key={p}>{part}</strong> : part)}
                </span>
              ) : item}
            </li>
          ))}
        </ul>
      );
      
      i = j;
      continue;
    }

    // 7. Regular Paragraphs
    if (line.trim() !== '') {
      // Handle bold text inside paragraphs
      if (line.includes('**')) {
        const parts = line.split('**');
        elements.push(
          <p key={`p-${i}`} className="mb-4 text-slate-700 leading-relaxed">
            {parts.map((part, k) => k % 2 === 1 ? <strong key={k}>{part}</strong> : part)}
          </p>
        );
      } else {
        elements.push(<p key={`p-${i}`} className="mb-4 text-slate-700 leading-relaxed">{line}</p>);
      }
    } else {
      // Empty line
      // elements.push(<br key={`br-${i}`} />);
    }

    i++;
  }

  return <div className="markdown-content">{elements}</div>;
}
