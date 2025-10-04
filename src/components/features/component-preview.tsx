'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge as BadgeComponent } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Card as CardComponent,
  CardHeader as CardHeaderComponent,
  CardTitle as CardTitleComponent,
  CardDescription as CardDescriptionComponent,
  CardContent as CardContentComponent
} from '@/components/ui/card';

import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle
} from '@/components/ui/resizable';
import { useComponentStore } from '@/stores/component-store';
import { generateComponentCode } from '@/lib/code-generator';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Map component names to actual components
type ComponentMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.ComponentType<any>;
};

const componentMap: ComponentMap = {
  Button,
  Input,
  Badge: BadgeComponent,
  Alert,
  AlertDescription,
  AlertTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Label,
  Switch,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
  ScrollArea,
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
  Toaster,
  Card: CardComponent,
  CardHeader: CardHeaderComponent,
  CardTitle: CardTitleComponent,
  CardDescription: CardDescriptionComponent,
  CardContent: CardContentComponent,
};

export function ComponentPreview() {
  const { selectedComponent, customProps, stylePresetClassName } = useComponentStore();
  // customProps now supports string[] for multi-value props

  const renderedComponent = useMemo(() => {
    if (!selectedComponent) return null;

    try {
      const Component = componentMap[selectedComponent.displayName];
      const name = selectedComponent.name;

      // Helper to filter and normalize props for passing into components
      const validProps = Object.entries(customProps).reduce((acc: Record<string, unknown>, [key, value]) => {
        if (key === 'children' && (typeof value === 'string' || Array.isArray(value))) {
          acc.children = value;
        } else if (key === 'className') {
          const preset = stylePresetClassName ?? '';
          const freeform = (value as string) ?? '';
          acc.className = `${preset} ${freeform}`.trim();
        } else if (key === 'disabled' || key === 'required' || key === 'checked' || key === 'open' || key === 'collapsible') {
          acc[key] = Boolean(value);
        } else if (key === 'rows' || key === 'defaultSize' || key === 'minSize' || key === 'duration') {
          acc[key] = typeof value === 'number' ? value : Number(value);
        } else if (Array.isArray(value)) {
          acc[key] = value;
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, unknown>);

      // Render with sensible defaults for complex components to ensure visibility
      switch (name) {
        case 'accordion': {
          const type = (validProps.type as string) ?? 'single';
          // Avoid passing `collapsible` to DOM to prevent React warning; Radix handles it when type="single"
          return (
            <Accordion type={type as 'single' | 'multiple'} className={(validProps.className as string) ?? 'w-full max-w-md'}>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it responsive?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s built with utility classes and adapts well.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        }
        case 'dialog': {
          const open = (validProps.open as boolean) ?? true;
          return (
            <Dialog open={open}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          );
        }
        case 'table': {
          return (
            <Table className={(validProps.className as string) ?? 'w-full max-w-2xl'}>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          );
        }
        case 'radio-group': {
          const defaultValue = (validProps.defaultValue as string) ?? 'option-one';
          return (
            <RadioGroup defaultValue={defaultValue} className={(validProps.className as string) ?? 'space-y-2'}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Option One</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Option Two</Label>
              </div>
            </RadioGroup>
          );
        }
        case 'select': {
          const placeholder = (validProps.placeholder as string) ?? 'Select an option...';
          const disabled = (validProps.disabled as boolean) ?? false;
          return (
            <Select disabled={disabled}>
              <SelectTrigger className={(validProps.className as string) ?? 'w-[240px]'}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          );
        }
        case 'tabs': {
          const defaultValue = (validProps.defaultValue as string) ?? 'tab1';
          return (
            <Tabs defaultValue={defaultValue} className={(validProps.className as string) ?? 'w-[400px]'}>
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <p>Content for tab 1</p>
              </TabsContent>
              <TabsContent value="tab2">
                <p>Content for tab 2</p>
              </TabsContent>
              <TabsContent value="tab3">
                <p>Content for tab 3</p>
              </TabsContent>
            </Tabs>
          );
        }
        case 'separator': {
          const orientation = (validProps.orientation as string) ?? 'horizontal';
          return (
            <div className="w-full max-w-md">
              <p className="mb-2">Section A</p>
              <Separator orientation={orientation as 'horizontal' | 'vertical'} className={(validProps.className as string) ?? ''} />
              <p className="mt-2">Section B</p>
            </div>
          );
        }
        case 'scroll-area': {
          const className = (validProps.className as string) ?? 'h-[200px] w-[350px] rounded-md border p-4';
          return (
            <ScrollArea className={className}>
              Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king&apos;s pillow, in his soup, everywhere. The king was furious, but he couldn&apos;t seem to stop Jokester. And then, one day, the people of the kingdom realized that along with all the bad jokes, Jokester had also been telling good ones. They just hadn&apos;t been paying attention.
            </ScrollArea>
          );
        }
        case 'resizable': {
          const leftSize = (validProps.defaultSize as number) ?? 50;
          return (
            <ResizablePanelGroup direction="horizontal" className={(validProps.className as string) ?? 'w-[500px]'}>
              <ResizablePanel defaultSize={leftSize}>
                <div className="flex h-[200px] items-center justify-center p-6">
                  <span className="font-semibold">Panel 1</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={100 - leftSize}>
                <div className="flex h-[200px] items-center justify-center p-6">
                  <span className="font-semibold">Panel 2</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          );
        }
        case 'card': {
          return (
            <CardComponent className={(validProps.className as string) ?? ''}>
              <CardHeaderComponent>
                <CardTitleComponent>Card Title</CardTitleComponent>
                <CardDescriptionComponent>Card description goes here</CardDescriptionComponent>
              </CardHeaderComponent>
              <CardContentComponent>
                <p>Card content goes here</p>
              </CardContentComponent>
            </CardComponent>
          );
        }
        case 'alert': {
          const variant = (validProps.variant as string) ?? 'default';
          return (
            <Alert variant={variant as 'default' | 'destructive'} className={(validProps.className as string) ?? 'w-full max-w-md'}>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
          );
        }
        case 'checkbox': {
          const checked = (validProps.checked as boolean) ?? false;
          const disabled = (validProps.disabled as boolean) ?? false;
          return <Checkbox checked={checked} disabled={disabled} className={(validProps.className as string) ?? ''} />;
        }
        case 'switch': {
          const checked = (validProps.checked as boolean) ?? false;
          const disabled = (validProps.disabled as boolean) ?? false;
          return <Switch checked={checked} disabled={disabled} className={(validProps.className as string) ?? ''} />;
        }
        case 'textarea': {
          const placeholder = (validProps.placeholder as string) ?? 'Enter your message...';
          const disabled = (validProps.disabled as boolean) ?? false;
          const rows = (validProps.rows as number) ?? 4;
          return <Textarea placeholder={placeholder} disabled={disabled} rows={rows} className={(validProps.className as string) ?? 'w-[350px]'} />;
        }
        case 'input': {
          const type = (validProps.type as string) ?? 'text';
          const placeholder = (validProps.placeholder as string) ?? 'Enter text...';
          const disabled = (validProps.disabled as boolean) ?? false;
          return <Input type={type} placeholder={placeholder} disabled={disabled} className={(validProps.className as string) ?? 'w-[280px]'} />;
        }
        case 'badge': {
          const variant = (validProps.variant as string) ?? 'default';
          const children = (validProps.children as string) ?? 'Badge';
          return <BadgeComponent variant={variant as 'default' | 'secondary' | 'destructive' | 'outline'} className={(validProps.className as string) ?? ''}>{children}</BadgeComponent>;
        }
        case 'button': {
          const variant = (validProps.variant as string) ?? 'default';
          const size = (validProps.size as string) ?? 'default';
          const disabled = (validProps.disabled as boolean) ?? false;
          const children = (validProps.children as string) ?? 'Button';
          return (
            <Button 
              variant={variant as import('class-variance-authority').VariantProps<typeof buttonVariants>['variant']} 
              size={size as import('class-variance-authority').VariantProps<typeof buttonVariants>['size']} 
              disabled={disabled}
              className={(validProps.className as string) ?? ''}
            >
              {children}
            </Button>
          );
        }
        default: {
          if (!Component) {
            return <div className="text-red-500">Component not available for preview</div>;
          }
          return <Component {...validProps} />;
        }
      }
    } catch (error) {
      console.error('Error rendering component:', error);
      return <div className="text-red-500">Error rendering component</div>;
    }
  }, [selectedComponent, customProps, stylePresetClassName]);

  const generatedCode = useMemo(() => {
    if (!selectedComponent) return '';
    
    // Special case for sonner (toast) component
    if (selectedComponent.name === 'sonner') {
      const duration = typeof customProps.duration === 'number' ? customProps.duration : 4000;
      const position = (customProps.position as import('sonner').ToasterProps['position']) ?? 'bottom-right';
      const richColors = Boolean(customProps.richColors);
      return `<>
  <Toaster position="${position}" richColors={${richColors}} />
  <Button onClick={() => toast.success('Hello World!', { duration: ${duration} })}>
    Show Toast
  </Button>
</>`;
    }
    
    return generateComponentCode(selectedComponent, customProps);
  }, [selectedComponent, customProps]);

  if (!selectedComponent) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium mb-2">No component selected</p>
            <p className="text-sm">Select a component from the list to start customizing</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Component Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{selectedComponent.displayName}</CardTitle>
              <CardDescription>{selectedComponent.description}</CardDescription>
            </div>
            <Badge variant="secondary" className="capitalize">
              {selectedComponent.category}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Live Preview</CardTitle>
          <CardDescription>See your component in action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-8 bg-gray-50 dark:bg-gray-900 min-h-[220px] flex items-start justify-start overflow-auto">
            {selectedComponent?.name === 'sonner' ? (
              <div className="space-y-4">
                {/* Local toaster configured from custom properties to scope changes to this preview only */}
                <Toaster 
                  position={(customProps.position as import('sonner').ToasterProps['position']) ?? 'bottom-right'}
                  richColors={Boolean(customProps.richColors)}
                  duration={typeof customProps.duration === 'number' ? customProps.duration : undefined}
                />
                <Button onClick={() => toast.success('Hello World!', { duration: typeof customProps.duration === 'number' ? customProps.duration : 4000 })}>
                  Show Toast
                </Button>
              </div>
            ) : (
              renderedComponent
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated Code Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generated Code</CardTitle>
          <CardDescription>React component code</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden">
            <SyntaxHighlighter
              language="typescript"
              style={tomorrow}
              customStyle={{
                margin: 0,
                fontSize: '14px',
                borderRadius: '8px'
              }}
            >
              {generatedCode}
            </SyntaxHighlighter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}