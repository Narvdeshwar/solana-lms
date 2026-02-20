'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Check, X, Lightbulb, Eye, History, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface TestCase {
    id: string;
    description: string;
    input: string;
    expectedOutput: string;
    isHidden: boolean;
}

interface Hint {
    id: string;
    text: string;
    order: number;
}

interface Submission {
    id: string;
    code: string;
    timestamp: Date;
    passed: boolean;
    testsPassedCount: number;
    totalTests: number;
}

interface AdvancedCodeEditorProps {
    initialCode?: string;
    language?: 'rust' | 'typescript' | 'javascript' | 'json';
    readOnly?: boolean;
    height?: string;
    onRun?: (code: string) => Promise<{ success: boolean; output: string }>;
    testCases?: TestCase[];
    hints?: Hint[];
    solution?: string;
    solutionExplanation?: string;
    className?: string;
}

interface TestResult {
    testCase: TestCase;
    passed: boolean;
    actualOutput?: string;
}

export function AdvancedCodeEditor({
    initialCode = '',
    language = 'typescript',
    readOnly = false,
    height = '400px',
    onRun,
    testCases = [],
    hints = [],
    solution,
    solutionExplanation,
    className,
}: AdvancedCodeEditorProps) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [revealedHints, setRevealedHints] = useState<string[]>([]);
    const [showSolution, setShowSolution] = useState(false);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [showComparison, setShowComparison] = useState(false);

    const handleReset = () => {
        setCode(initialCode);
        setOutput('');
        setTestResults([]);
        setRevealedHints([]);
        setShowSolution(false);
        setShowComparison(false);
    };

    const handleRun = async () => {
        if (!onRun) {
            setOutput('// Run functionality not implemented');
            return;
        }

        setIsRunning(true);
        setOutput('// Running...');

        try {
            const result = await onRun(code);
            setOutput(result.output);

            // Run test cases if available
            if (testCases.length > 0) {
                const results: TestResult[] = testCases.map((testCase) => ({
                    testCase,
                    passed: result.output.trim() === testCase.expectedOutput.trim(),
                    actualOutput: result.output,
                }));
                setTestResults(results);

                // Save submission
                const passedCount = results.filter((r) => r.passed).length;
                const newSubmission: Submission = {
                    id: Date.now().toString(),
                    code,
                    timestamp: new Date(),
                    passed: passedCount === testCases.length,
                    testsPassedCount: passedCount,
                    totalTests: testCases.length,
                };
                setSubmissions([newSubmission, ...submissions].slice(0, 10)); // Keep last 10
            }
        } catch (error) {
            setOutput(`// Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsRunning(false);
        }
    };

    const revealNextHint = () => {
        const nextHint = hints.find((h) => !revealedHints.includes(h.id));
        if (nextHint) {
            setRevealedHints([...revealedHints, nextHint.id]);
        }
    };

    const loadSubmission = (submission: Submission) => {
        setCode(submission.code);
        setShowHistory(false);
    };

    const passedTests = testResults.filter((r) => r.passed).length;
    const totalTests = testResults.length;
    const allTestsPassed = totalTests > 0 && passedTests === totalTests;
    const sortedHints = [...hints].sort((a, b) => a.order - b.order);
    const hasMoreHints = revealedHints.length < hints.length;

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            {/* Editor */}
            <div className="overflow-hidden rounded-lg border">
                <Editor
                    height={height}
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    options={{
                        readOnly,
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: 'on',
                    }}
                />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    onClick={handleRun}
                    disabled={isRunning || readOnly}
                    className="gap-2"
                >
                    <Play className="h-4 w-4" />
                    {isRunning ? 'Running...' : 'Run Code'}
                </Button>
                <Button
                    onClick={handleReset}
                    variant="outline"
                    disabled={readOnly}
                    className="gap-2"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </Button>

                {hints.length > 0 && (
                    <Button
                        onClick={revealNextHint}
                        variant="outline"
                        disabled={!hasMoreHints}
                        className="gap-2"
                    >
                        <Lightbulb className="h-4 w-4" />
                        Hint ({revealedHints.length}/{hints.length})
                    </Button>
                )}

                {solution && (
                    <Button
                        onClick={() => setShowSolution(!showSolution)}
                        variant="outline"
                        className="gap-2"
                    >
                        <Eye className="h-4 w-4" />
                        {showSolution ? 'Hide' : 'Show'} Solution
                    </Button>
                )}

                {submissions.length > 0 && (
                    <Button
                        onClick={() => setShowHistory(!showHistory)}
                        variant="outline"
                        className="gap-2"
                    >
                        <History className="h-4 w-4" />
                        History ({submissions.length})
                    </Button>
                )}

                {solution && code !== initialCode && (
                    <Button
                        onClick={() => setShowComparison(!showComparison)}
                        variant="outline"
                        className="gap-2"
                    >
                        <TrendingUp className="h-4 w-4" />
                        Compare
                    </Button>
                )}

                {/* Test Results Summary */}
                {testResults.length > 0 && (
                    <div
                        className={cn(
                            'ml-auto flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium',
                            allTestsPassed
                                ? 'bg-green-500/10 text-green-600'
                                : 'bg-red-500/10 text-red-600'
                        )}
                    >
                        {allTestsPassed ? (
                            <>
                                <Check className="h-4 w-4" />
                                All tests passed!
                            </>
                        ) : (
                            <>
                                <X className="h-4 w-4" />
                                {passedTests}/{totalTests} tests passed
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Hints */}
            {revealedHints.length > 0 && (
                <Card className="p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        Hints
                    </h4>
                    <div className="space-y-2">
                        {sortedHints
                            .filter((h) => revealedHints.includes(h.id))
                            .map((hint, index) => (
                                <motion.div
                                    key={hint.id}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="rounded-lg bg-yellow-500/10 p-3 text-sm"
                                >
                                    <span className="font-medium">Hint {index + 1}:</span> {hint.text}
                                </motion.div>
                            ))}
                    </div>
                </Card>
            )}

            {/* Solution */}
            <AnimatePresence>
                {showSolution && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                <Eye className="h-4 w-4" />
                                Solution
                            </h4>
                            {solutionExplanation && (
                                <p className="mb-3 text-sm text-muted-foreground">
                                    {solutionExplanation}
                                </p>
                            )}
                            <div className="overflow-hidden rounded-lg border">
                                <Editor
                                    height="300px"
                                    language={language}
                                    value={solution}
                                    theme="vs-dark"
                                    options={{
                                        readOnly: true,
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        scrollBeyondLastLine: false,
                                    }}
                                />
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Code Comparison */}
            <AnimatePresence>
                {showComparison && solution && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="p-4">
                            <h4 className="mb-3 text-sm font-semibold">Code Comparison</h4>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="mb-2 text-sm font-medium">Your Code</p>
                                    <div className="overflow-hidden rounded-lg border">
                                        <Editor
                                            height="300px"
                                            language={language}
                                            value={code}
                                            theme="vs-dark"
                                            options={{
                                                readOnly: true,
                                                minimap: { enabled: false },
                                                fontSize: 12,
                                                scrollBeyondLastLine: false,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium">Solution</p>
                                    <div className="overflow-hidden rounded-lg border">
                                        <Editor
                                            height="300px"
                                            language={language}
                                            value={solution}
                                            theme="vs-dark"
                                            options={{
                                                readOnly: true,
                                                minimap: { enabled: false },
                                                fontSize: 12,
                                                scrollBeyondLastLine: false,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submission History */}
            <AnimatePresence>
                {showHistory && submissions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card className="p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                <History className="h-4 w-4" />
                                Submission History
                            </h4>
                            <div className="space-y-2">
                                {submissions.map((submission) => (
                                    <div
                                        key={submission.id}
                                        className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    className={
                                                        submission.passed
                                                            ? 'bg-green-500'
                                                            : 'bg-red-500'
                                                    }
                                                >
                                                    {submission.testsPassedCount}/{submission.totalTests}
                                                </Badge>
                                                <span className="text-sm text-muted-foreground">
                                                    {submission.timestamp.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => loadSubmission(submission)}
                                            variant="outline"
                                            size="sm"
                                        >
                                            Load
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Output */}
            {output && (
                <div className="rounded-lg border bg-muted/50 p-4">
                    <h4 className="mb-2 text-sm font-semibold">Output:</h4>
                    <pre className="overflow-x-auto text-sm">
                        <code>{output}</code>
                    </pre>
                </div>
            )}

            {/* Test Results */}
            {testResults.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Test Results:</h4>
                    {testResults
                        .filter((result) => !result.testCase.isHidden)
                        .map((result, index) => (
                            <div
                                key={result.testCase.id}
                                className={cn(
                                    'rounded-lg border p-3',
                                    result.passed
                                        ? 'border-green-500/20 bg-green-500/5'
                                        : 'border-red-500/20 bg-red-500/5'
                                )}
                            >
                                <div className="flex items-start gap-2">
                                    {result.passed ? (
                                        <Check className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <X className="h-5 w-5 text-red-600" />
                                    )}
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            Test {index + 1}: {result.testCase.description}
                                        </p>
                                        {!result.passed && (
                                            <div className="mt-2 space-y-1 text-xs">
                                                <p>
                                                    <span className="font-medium">Expected:</span>{' '}
                                                    {result.testCase.expectedOutput}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Got:</span>{' '}
                                                    {result.actualOutput}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
