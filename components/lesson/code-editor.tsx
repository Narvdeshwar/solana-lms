'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
    initialCode?: string;
    language?: 'rust' | 'typescript' | 'javascript' | 'json';
    readOnly?: boolean;
    height?: string;
    onRun?: (code: string) => Promise<{ success: boolean; output: string }>;
    testCases?: TestCase[];
    className?: string;
}

interface TestCase {
    id: string;
    description: string;
    input: string;
    expectedOutput: string;
    isHidden: boolean;
}

interface TestResult {
    testCase: TestCase;
    passed: boolean;
    actualOutput?: string;
}

export function CodeEditor({
    initialCode = '',
    language = 'typescript',
    readOnly = false,
    height = '400px',
    onRun,
    testCases = [],
    className,
}: CodeEditorProps) {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [testResults, setTestResults] = useState<TestResult[]>([]);

    const handleReset = () => {
        setCode(initialCode);
        setOutput('');
        setTestResults([]);
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
            }
        } catch (error) {
            setOutput(`// Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsRunning(false);
        }
    };

    const passedTests = testResults.filter((r) => r.passed).length;
    const totalTests = testResults.length;
    const allTestsPassed = totalTests > 0 && passedTests === totalTests;

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
            <div className="flex items-center gap-2">
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

