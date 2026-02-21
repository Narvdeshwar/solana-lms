'use client';

import { Card } from '@/components/ui/card';

interface CertificateTemplateProps {
    studentName: string;
    courseName: string;
    completionDate: Date;
    certificateNumber: string;
    instructorName: string;
}

export function CertificateTemplate(props: CertificateTemplateProps) {
    return (
        <Card className="bg-white shadow-2xl">
            <div className="h-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />

            <div className="p-16">
                <div className="flex justify-between mb-12">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">SUPERTEAM ACADEMY</h1>
                        <p className="text-sm text-gray-600">Solana Blockchain Education</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full" />
                </div>

                <div className="mb-12">
                    <h2 className="text-5xl font-serif text-gray-900 mb-8">Certificate of Completion</h2>

                    <div className="space-y-6">
                        <p className="text-lg text-gray-700">This is to certify that</p>
                        <h3 className="text-4xl font-bold text-gray-900">{props.studentName}</h3>
                        <p className="text-lg text-gray-700">has successfully completed</p>
                        <h4 className="text-3xl font-semibold text-blue-600">{props.courseName}</h4>
                        <p className="text-base text-gray-600">
                            an online course authorized by Superteam Academy
                        </p>
                    </div>
                </div>

                <div className="flex justify-between pt-8 border-t border-gray-200">
                    <div>
                        <div className="mb-8">
                            <p className="text-sm text-gray-600">Completion Date</p>
                            <p className="text-base font-semibold text-gray-900">
                                {props.completionDate.toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <div className="w-48 border-t-2 border-gray-400 mb-2" />
                            <p className="text-base font-semibold text-gray-900">{props.instructorName}</p>
                            <p className="text-sm text-gray-600">Lead Instructor</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Certificate ID</p>
                        <p className="text-sm font-mono text-gray-700">{props.certificateNumber}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
}
