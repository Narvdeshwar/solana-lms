'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share2, Award, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificateCardProps {
    certificate: any;
    className?: string;
}

export function CertificateCard({ certificate, className }: CertificateCardProps) {
    return (
        <Card className={cn('p-6 hover:shadow-lg transition-shadow', className)}>
            <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Certificate Title</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        Completed on Date
                    </p>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                        </Button>
                        <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                        </Button>
                        <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
