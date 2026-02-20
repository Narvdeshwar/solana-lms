'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SkillAssessment } from '@/components/learning-path/skill-assessment';
import { LearningPathDashboard } from '@/components/learning-path/learning-path-dashboard';
import { TrendingUp, Target } from 'lucide-react';

interface SkillLevel {
    level: 'beginner'
