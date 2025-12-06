#!/usr/bin/env node
// scripts/check-mdx-content.js

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'courses');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
};

// Check result types
const CHECK_PASS = 'pass';
const CHECK_WARN = 'warn';
const CHECK_FAIL = 'fail';

/**
 * Recursively find all .mdx files in a directory
 */
function findMdxFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    console.error(`${colors.red}Error: Directory not found: ${dir}${colors.reset}`);
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      findMdxFiles(fullPath, files);
    } else if (entry.name.endsWith('.mdx') && !entry.name.includes('.cs.')) {
      // Only add English .mdx files (not .cs.mdx)
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Check if file has frontmatter (starts with ---)
 */
function checkFrontmatter(content) {
  const hasFrontmatter = content.trimStart().startsWith('---');
  
  if (!hasFrontmatter) {
    return { status: CHECK_WARN, message: 'No frontmatter found' };
  }

  // Check if frontmatter is properly closed
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { status: CHECK_FAIL, message: 'Frontmatter not properly closed' };
  }

  return { status: CHECK_PASS, message: 'Frontmatter present' };
}

/**
 * Check for <ConceptCard> component usage
 */
function checkConceptCard(content) {
  const hasConceptCard = /<ConceptCard[\s>]/i.test(content);
  
  if (!hasConceptCard) {
    return { status: CHECK_WARN, message: 'No <ConceptCard> component found' };
  }

  // Count occurrences
  const matches = content.match(/<ConceptCard[\s>]/gi) || [];
  return { status: CHECK_PASS, message: `${matches.length} <ConceptCard> component(s) found` };
}

/**
 * Check for <Diagram> component usage
 */
function checkDiagram(content) {
  const hasDiagram = /<Diagram[\s>]/i.test(content);
  
  if (!hasDiagram) {
    return { status: CHECK_WARN, message: 'No <Diagram> component found' };
  }

  // Extract diagram types used - simplified regex to avoid escaping issues
  const typeRegex = /type=[\"']([^\"']+)[\"']/g;
  const types = [];
  let match;
  
  // Find all matches
  while ((match = typeRegex.exec(content)) !== null) {
    types.push(match[1]);
  }

  return { 
    status: CHECK_PASS, 
    message: types.length > 0 
      ? `Diagram types: ${types.join(', ')}` 
      : '<Diagram> component found' 
  };
}

/**
 * Check for Lab section (## Lab or similar heading with lab content)
 */
function checkLabSection(content) {
  // Check for Lab headings
  const labHeadingPatterns = [
    /^#{1,3}\s+(?:🧪\s*)?Lab/mi,
    /^#{1,3}\s+(?:🔬\s*)?Practical/mi,
    /^#{1,3}\s+(?:💻\s*)?Exercise/mi,
    /^#{1,3}\s+(?:✍️\s*)?Hands[- ]?on/mi,
  ];

  for (const pattern of labHeadingPatterns) {
    if (pattern.test(content)) {
      return { status: CHECK_PASS, message: 'Lab section found' };
    }
  }

  // Check for <LabSection> component
  if (/<LabSection[\s>]/i.test(content)) {
    return { status: CHECK_PASS, message: '<LabSection> component found' };
  }

  return { status: CHECK_WARN, message: 'No Lab section found' };
}

/**
 * Check for corresponding Czech (.cs.mdx) file
 */
function checkCzechVersion(mdxPath) {
  const dir = path.dirname(mdxPath);
  const basename = path.basename(mdxPath, '.mdx');
  const czechPath = path.join(dir, `${basename}.cs.mdx`);

  // Also check for content.cs.mdx pattern
  const contentCzechPath = path.join(dir, 'content.cs.mdx');

  if (fs.existsSync(czechPath)) {
    return { status: CHECK_PASS, message: `Czech version: ${basename}.cs.mdx` };
  }

  if (basename === 'content' && fs.existsSync(contentCzechPath)) {
    return { status: CHECK_PASS, message: 'Czech version: content.cs.mdx' };
  }

  // For content.mdx, look for content.cs.mdx
  if (basename === 'content') {
    return { status: CHECK_FAIL, message: 'Missing content.cs.mdx' };
  }

  return { status: CHECK_FAIL, message: `Missing ${basename}.cs.mdx` };
}

/**
 * Check a single MDX file
 */
function checkMdxFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relativePath = path.relative(CONTENT_DIR, filePath);

  const checks = {
    frontmatter: checkFrontmatter(content),
    conceptCard: checkConceptCard(content),
    diagram: checkDiagram(content),
    labSection: checkLabSection(content),
    czechVersion: checkCzechVersion(filePath),
  };

  return {
    file: relativePath,
    checks,
    hasErrors: Object.values(checks).some(c => c.status === CHECK_FAIL),
    hasWarnings: Object.values(checks).some(c => c.status === CHECK_WARN),
  };
}

/**
 * Format and print results
 */
function printResults(results) {
  const totalFiles = results.length;
  const filesWithErrors = results.filter(r => r.hasErrors).length;
  const filesWithWarnings = results.filter(r => r.hasWarnings && !r.hasErrors).length;
  const filesOk = totalFiles - filesWithErrors - filesWithWarnings;

  console.log('\n' + '='.repeat(70));
  console.log(`${colors.cyan}MDX Content Quality Check${colors.reset}`);
  console.log('='.repeat(70) + '\n');

  for (const result of results) {
    const icon = result.hasErrors ? '❌' : result.hasWarnings ? '⚠️' : '✅';
    console.log(`${icon} ${colors.blue}${result.file}${colors.reset}`);

    for (const [checkName, checkResult] of Object.entries(result.checks)) {
      let statusIcon, statusColor;
      
      switch (checkResult.status) {
        case CHECK_PASS:
          statusIcon = '  ✓';
          statusColor = colors.green;
          break;
        case CHECK_WARN:
          statusIcon = '  ⚠';
          statusColor = colors.yellow;
          break;
        case CHECK_FAIL:
          statusIcon = '  ✗';
          statusColor = colors.red;
          break;
      }

      console.log(`${statusColor}${statusIcon} ${checkName}: ${checkResult.message}${colors.reset}`);
    }
    console.log('');
  }

  // Summary
  console.log('='.repeat(70));
  console.log(`${colors.cyan}Summary${colors.reset}`);
  console.log('='.repeat(70));
  console.log(`Total files scanned: ${totalFiles}`);
  console.log(`${colors.green}✅ Passed: ${filesOk}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Warnings: ${filesWithWarnings}${colors.reset}`);
  console.log(`${colors.red}❌ Errors: ${filesWithErrors}${colors.reset}`);
  console.log('');

  return filesWithErrors > 0 ? 1 : 0;
}

/**
 * Main execution
 */
function main() {
  console.log(`${colors.dim}Scanning: ${CONTENT_DIR}${colors.reset}`);

  const mdxFiles = findMdxFiles(CONTENT_DIR);

  if (mdxFiles.length === 0) {
    console.log(`${colors.yellow}No .mdx files found in ${CONTENT_DIR}${colors.reset}`);
    process.exit(0);
  }

  console.log(`${colors.dim}Found ${mdxFiles.length} MDX file(s)${colors.reset}`);

  const results = mdxFiles.map(checkMdxFile);
  const exitCode = printResults(results);

  process.exit(exitCode);
}

main();
