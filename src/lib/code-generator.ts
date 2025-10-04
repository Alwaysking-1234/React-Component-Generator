import { ShadcnComponent } from '@/types/component';

export const generateComponentCode = (
  component: ShadcnComponent,
  props: Record<string, string | number | boolean | string[]>
): string => {
  // Special handling for Sonner (toast) since usage differs from typical component mounting
  if (component.name === 'sonner') {
    const duration = typeof props.duration === 'number' ? props.duration : Number(props.duration ?? 4000);
    const position = (props.position as import('sonner').ToasterProps['position']) ?? 'bottom-right';
    const richColors = Boolean(props.richColors);
    return `<>
  <Toaster position="${position}" richColors={${richColors}} />
  <Button onClick={() => toast.success('Hello World!', { duration: ${duration} })}>
    Show Toast
  </Button>
</>`;
  }

  const componentName = component.displayName;
  
  // Filter out props with default values and format the remaining ones
  const filteredProps = Object.entries(props).reduce((acc, [key, value]) => {
    const propDef = component.props.find(p => p.name === key);
    const isDefaultValue = propDef && value === propDef.defaultValue;
    
    if (!isDefaultValue && value !== undefined && value !== '') {
      acc[key] = value as string | number | boolean | string[];
    }
    return acc;
  }, {} as Record<string, string | number | boolean | string[]>);

  // Generate props string
  const propsString = Object.entries(filteredProps)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      } else if (typeof value === 'boolean') {
        return value ? key : '';
      } else if (typeof value === 'number') {
        return `${key}={${value}}`;
      } else if (Array.isArray(value)) {
        return `${key}={${JSON.stringify(value)}}`;
      } else if (key === 'children') {
        return ''; // Handle children separately
      } else {
        return `${key}={${JSON.stringify(value)}}`;
      }
    })
    .filter(Boolean)
    .join(' ');

  const children = filteredProps.children || component.props.find(p => p.name === 'children')?.defaultValue || '';
  
  // Generate the component code
  if (children) {
    return `<${componentName}${propsString ? ' ' + propsString : ''}>${children}</${componentName}>`;
  } else {
    return `<${componentName}${propsString ? ' ' + propsString : ''} />`;
  }
};

export const generateFullCode = (
  component: ShadcnComponent,
  props: Record<string, string | number | boolean | string[]>
): string => {
  const componentCode = generateComponentCode(component, props);
  const importStatements = generateImportStatements(component);
  
  return `${importStatements}

export default function Example() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      ${componentCode}
    </div>
  );
}`;
};

export const generateImportStatements = (component: ShadcnComponent): string => {
  // Sonner requires a special import footprint
  if (component.name === 'sonner') {
    const imports = [
      `import { Toaster } from '${component.importPath}';`,
      `import { Button } from '@/components/ui/button';`,
      `import { toast } from 'sonner';`
    ];
    return imports.join('\n');
  }
  const imports = [`import { ${component.displayName} } from '${component.importPath}';`];
  
  // Add imports for child components based on component type
  switch (component.name) {
    case 'card':
      imports.push(`import { CardHeader, CardTitle, CardDescription, CardContent } from '${component.importPath}';`);
      break;
    case 'alert':
      imports.push(`import { AlertTitle, AlertDescription } from '${component.importPath}';`);
      break;
    case 'dialog':
      imports.push(`import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '${component.importPath}';`);
      break;
    case 'table':
      imports.push(`import { TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '${component.importPath}';`);
      break;
    case 'accordion':
      imports.push(`import { AccordionContent, AccordionItem, AccordionTrigger } from '${component.importPath}';`);
      break;
    case 'radio-group':
      imports.push(`import { RadioGroupItem } from '${component.importPath}';`);
      imports.push(`import { Label } from '@/components/ui/label';`);
      break;
  }
  
  return imports.join('\n');
};

export const downloadComponent = (
  component: ShadcnComponent,
  props: Record<string, string | number | boolean | string[]>,
  filename: string = 'component.tsx'
): void => {
  const code = generateFullCode(component, props);
  const blob = new Blob([code], { type: 'text/typescript' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};