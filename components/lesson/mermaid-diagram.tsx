'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface MermaidDiagramProps {
    chart: string;
    title?: string;
    className?: string;
}

export function MermaidDiagram({ chart, title, className }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Dynamically import mermaid only on client side
        const renderDiagram = async () => {
            try {
                const mermaid = (await import('mermaid')).default;

                mermaid.initialize({
                    startOnLoad: true,
                    theme: 'dark',
                    securityLevel: 'loose',
                });

                if (containerRef.current) {
                    containerRef.current.innerHTML = chart;
                    mermaid.contentLoaded();
                }
            } catch (error) {
                console.error('Failed to render Mermaid diagram:', error);
                if (containerRef.current) {
                    containerRef.current.innerHTML = `
                        <div class="p-4 text-center text-muted-foreground">
                            <p>Diagram rendering not available</p>
                            <pre class="mt-2 text-left text-xs">${chart}</pre>
                        </div>
                    `;
                }
            }
        };

        renderDiagram();
    }, [chart]);

    return (
        <Card className={className}>
            {title && (
                <div className="border-b p-4">
                    <h3 className="font-semibold">{title}</h3>
                </div>
            )}
            <div ref={containerRef} className="p-4" />
        </Card>
    );
}
