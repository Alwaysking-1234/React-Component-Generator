'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { copyToClipboard, downloadComponent, generateFullCode } from '@/lib/code-generator';
import { useComponentStore } from '@/stores/component-store';
import { Copy, Download, Check, Code } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ActionButtons() {
  const { selectedComponent, customProps } = useComponentStore();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!selectedComponent) {
    return null;
  }

  const handleCopyCode = async () => {
    const code = generateFullCode(selectedComponent, customProps);
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Full code copied to clipboard!');
    } else {
      toast.error('Failed to copy code to clipboard');
    }
  };

  const handleDownloadComponent = () => {
    downloadComponent(selectedComponent, customProps);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
    toast.success(`${selectedComponent.displayName} component downloaded!`);
  };

  const handleCopyJSX = async () => {
    const code = generateFullCode(selectedComponent, customProps);
    const jsxOnly = code.split('\n').slice(1, -1).join('\n'); // Remove import and export lines
    const success = await copyToClipboard(jsxOnly);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('JSX code copied to clipboard!');
    } else {
      toast.error('Failed to copy code to clipboard');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Options</CardTitle>
        <CardDescription>Copy or download your customized component</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={handleCopyCode}
          className="w-full flex items-center gap-2"
          size="lg"
          disabled={!selectedComponent}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Full Code
            </>
          )}
        </Button>

        <Button
          onClick={handleCopyJSX}
          variant="outline"
          className="w-full flex items-center gap-2"
          size="lg"
          disabled={!selectedComponent}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Code className="h-4 w-4" />
              Copy JSX Only
            </>
          )}
        </Button>

        <Button
          onClick={handleDownloadComponent}
          variant="secondary"
          className="w-full flex items-center gap-2"
          size="lg"
          disabled={!selectedComponent}
        >
          {downloaded ? (
            <>
              <Check className="h-4 w-4" />
              Downloaded!
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Component
            </>
          )}
        </Button>

        <div className="pt-4 border-t">
          <div className="text-xs text-gray-500 space-y-1">
            <p><strong>Copy Full Code:</strong> Includes imports and export</p>
            <p><strong>Copy JSX Only:</strong> Just the component JSX</p>
            <p><strong>Download:</strong> Saves as a .tsx file</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}