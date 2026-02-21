export interface Certificate {
    id: string;
    userId: string;
    courseId: string;
    courseName: string;
    studentName: string;
    completionDate: Date;
    issueDate: Date;
    certificateNumber: string;
    grade: string;
    instructorName: string;
    instructorSignature: string;
    skills: string[];
    nftMintAddress?: string;
    isNFT: boolean;
    isVerified: boolean;
    qrCode: string;
    shareUrl: string;
}

export interface CertificateTemplate {
    id: string;
    name: string;
    design: 'classic' | 'modern' | 'minimal' | 'premium';
    backgroundColor: string;
    borderColor: string;
    accentColor: string;
}

export interface NFTMetadata {
    name: string;
    symbol: string;
    description: string;
    image: string;
    attributes: NFTAttribute[];
    properties: {
        category: string;
        files: { uri: string; type: string }[];
    };
}

export interface NFTAttribute {
    trait_type: string;
    value: string | number;
}

export interface VerificationResult {
    isValid: boolean;
    certificate?: Certificate;
    message: string;
}
