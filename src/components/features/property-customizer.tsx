'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RotateCcw, Code } from 'lucide-react';
import { useComponentStore } from '@/stores/component-store';
import { generateComponentCode } from '@/lib/code-generator';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function PropertyCustomizer() {
  const { selectedComponent, customProps, updateCustomProp, resetCustomProps } = useComponentStore();

  if (!selectedComponent) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <Code className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Select a component to customize its properties</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handlePropChange = (propName: string, value: string | number | boolean) => {
    updateCustomProp(propName, value);
  };

  const renderPropControl = (prop: { name: string; type: string; required?: boolean; defaultValue?: unknown; description?: string; options?: string[] }) => {
    const currentValue = customProps[prop.name] ?? prop.defaultValue;

    switch (prop.type) {
      case 'enum':
        return (
          <div className="space-y-2">
            <Label htmlFor={prop.name} className="text-sm font-medium">
              {prop.name}
              {prop.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={currentValue?.toString()}
              onValueChange={(value) => handlePropChange(prop.name, value)}
            >
              <SelectTrigger id={prop.name} className="w-full">
                <SelectValue placeholder={`Select ${prop.name}`} />
              </SelectTrigger>
              <SelectContent>
                {prop.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {prop.description && (
              <p className="text-xs text-gray-500">{prop.description}</p>
            )}
          </div>
        );

      case 'boolean':
        return (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor={prop.name} className="text-sm font-medium">
                {prop.name}
                {prop.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {prop.description && (
                <p className="text-xs text-gray-500">{prop.description}</p>
              )}
            </div>
            <Switch
              id={prop.name}
              checked={Boolean(currentValue)}
              onCheckedChange={(checked) => handlePropChange(prop.name, checked)}
            />
          </div>
        );

      case 'number':
        return (
          <div className="space-y-2">
            <Label htmlFor={prop.name} className="text-sm font-medium">
              {prop.name}
              {prop.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={prop.name}
              type="number"
              value={currentValue?.toString()}
              onChange={(e) => handlePropChange(prop.name, Number(e.target.value))}
              placeholder={`Enter ${prop.name}`}
            />
            {prop.description && (
              <p className="text-xs text-gray-500">{prop.description}</p>
            )}
          </div>
        );

      case 'string':
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={prop.name} className="text-sm font-medium">
              {prop.name}
              {prop.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={prop.name}
              type="text"
              value={currentValue?.toString()}
              onChange={(e) => handlePropChange(prop.name, e.target.value)}
              placeholder={`Enter ${prop.name}`}
            />
            {prop.description && (
              <p className="text-xs text-gray-500">{prop.description}</p>
            )}
          </div>
        );
    }
  };

  const currentCode = generateComponentCode(selectedComponent, customProps);

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Properties</CardTitle>
              <CardDescription>Customize {selectedComponent.displayName} properties</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetCustomProps}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Variants */}
      {selectedComponent.variants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Variants</CardTitle>
            <CardDescription>Pre-configured component variants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedComponent.variants.map((variant) => (
                <Badge
                  key={variant.name}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    Object.entries(variant.props).forEach(([key, value]) => {
                      updateCustomProp(key, value);
                    });
                  }}
                >
                  {variant.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Property Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Custom Properties</CardTitle>
          <CardDescription>Adjust individual properties</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedComponent.props.map((prop, index) => (
            <div key={prop.name}>
              {renderPropControl(prop)}
              {index < selectedComponent.props.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Current Code Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Code</CardTitle>
          <CardDescription>Real-time code preview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden">
            <SyntaxHighlighter
              language="typescript"
              style={tomorrow}
              customStyle={{
                margin: 0,
                fontSize: '12px',
                borderRadius: '8px'
              }}
            >
              {currentCode}
            </SyntaxHighlighter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}