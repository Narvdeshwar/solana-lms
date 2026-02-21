'use client';

import { Card } from '@/components/ui/card';
import { CertificateCard } from '@/components/certificate/certificate-card';
import { CertificateTemplate } from '@/components/certificate/certificate-template';
import { Award } from 'lucide-react';

export default function CertificatesPage() {
    return (
        <div className="min-h-screen bg-muted/30">
            <div className="border-b bg-background">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">My Certificates</h1>
                    <p className="text-muted-foreground">
                        View and manage your course certificates
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Certificate Preview</h2>
                    <CertificateTemplate
                        studentName="John Doe"
                        courseName="Solana Fundamentals"
                        completionDate={new Date()}
                        certificateNumber="CERT-2026-001"
                        instructorName="Dr. Sarah Chen"
                        className="max-w-4xl mx-auto"
                    />
                </div>

                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Award className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">Earned Certificates</h2>
                    </div>
                    <p className="text-center py-12 text-muted-foreground">
                        No certificates earned yet
                    </p>
                </Card>
            </div>
        </div>
    );
}
