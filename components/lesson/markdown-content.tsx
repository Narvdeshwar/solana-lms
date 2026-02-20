'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import 'highlight.js/styles/github-dark.css';

interface MarkdownContentProps {
    content: string;
    className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
    return (
        <div
            className={cn(
                'prose prose-slate dark:prose-invert max-w-none',
                'prose-headings:font-bold prose-headings:tracking-tight',
                'prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl',
                'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5',
                'prose-pre:bg-slate-900 prose-pre:text-slate-50',
                'prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1',
                'prose-ul:list-disc prose-ol:list-decimal',
                'prose-li:text-muted-foreground',
                'prose-table:border prose-th:bg-muted prose-td:border',
                'prose-strong:text-foreground prose-strong:font-semibold',
                className
            )}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // Custom components for better styling
                    h1: ({ node, ...props }) => (
                        <h1 className="mb-6 mt-8 scroll-m-20" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 className="mb-4 mt-6 scroll-m-20" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="mb-3 mt-4 scroll-m-20" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="mb-4 leading-7" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="mb-4 ml-6 list-disc" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="mb-4 ml-6 list-decimal" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="mb-2" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote
                            className="mb-4 border-l-4 border-primary pl-4 italic"
                            {...props}
                        />
                    ),
                    code: ({ node, inline, className, children, ...props }: any) => {
                        if (inline) {
                            return (
                                <code
                                    className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }
                        return (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                    pre: ({ node, ...props }) => (
                        <pre
                            className="mb-4 overflow-x-auto rounded-lg border bg-slate-900 p-4 text-sm"
                            {...props}
                        />
                    ),
                    table: ({ node, ...props }) => (
                        <div className="mb-4 overflow-x-auto">
                            <table className="w-full border-collapse border" {...props} />
                        </div>
                    ),
                    th: ({ node, ...props }) => (
                        <th
                            className="border bg-muted px-4 py-2 text-left font-semibold"
                            {...props}
                        />
                    ),
                    td: ({ node, ...props }) => (
                        <td className="border px-4 py-2" {...props} />
                    ),
                    img: ({ node, ...props }) => (
                        <img
                            className="my-4 rounded-lg shadow-md"
                            loading="lazy"
                            {...props}
                        />
                    ),
                    a: ({ node, ...props }) => (
                        <a
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
