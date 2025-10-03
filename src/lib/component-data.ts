import { ShadcnComponent } from '@/types/component';

// Mock component data for now - in a real app, this would come from the shadcn registry
export const getAvailableComponents = async (): Promise<ShadcnComponent[]> => {
  return [
    {
      name: 'button',
      displayName: 'Button',
      description: 'A customizable button component with multiple variants and sizes.',
      category: 'ui',
      importPath: '@/components/ui/button',
      dependencies: [],
      props: [
        {
          name: 'variant',
          type: 'enum',
          defaultValue: 'default',
          description: 'The button variant',
          options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
        },
        {
          name: 'size',
          type: 'enum',
          defaultValue: 'default',
          description: 'The button size',
          options: ['default', 'sm', 'lg', 'icon']
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Whether the button is disabled'
        },
        {
          name: 'children',
          type: 'string',
          defaultValue: 'Button',
          description: 'Button content'
        }
      ],
      variants: [
        { name: 'Default', props: { variant: 'default', size: 'default', children: 'Button' } },
        { name: 'Destructive', props: { variant: 'destructive', size: 'default', children: 'Delete' } },
        { name: 'Outline', props: { variant: 'outline', size: 'default', children: 'Outline' } },
        { name: 'Small', props: { variant: 'default', size: 'sm', children: 'Small' } },
        { name: 'Large', props: { variant: 'default', size: 'lg', children: 'Large' } }
      ],
      demoCode: `<Button variant="default" size="default">Button</Button>`
    },
    {
      name: 'alert',
      displayName: 'Alert',
      description: 'A component that displays a short, important message.',
      category: 'ui',
      importPath: '@/components/ui/alert',
      dependencies: [],
      props: [
        {
          name: 'variant',
          type: 'enum',
          defaultValue: 'default',
          description: 'The alert variant',
          options: ['default', 'destructive']
        }
      ],
      variants: [
        { name: 'Default', props: { variant: 'default' } },
        { name: 'Destructive', props: { variant: 'destructive' } }
      ],
      demoCode: `<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`
    },
    {
      name: 'dialog',
      displayName: 'Dialog',
      description: 'A window overlaid on either the primary window or another dialog window.',
      category: 'overlay',
      importPath: '@/components/ui/dialog',
      dependencies: [],
      props: [
        {
          name: 'open',
          type: 'boolean',
          defaultValue: false,
          description: 'The controlled open state of the dialog'
        }
      ],
      variants: [
        { name: 'Default', props: {} }
      ],
      demoCode: `<Dialog open={false}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`
    },
    {
      name: 'table',
      displayName: 'Table',
      description: 'A responsive table component with sorting and filtering capabilities.',
      category: 'data',
      importPath: '@/components/ui/table',
      dependencies: [],
      props: [],
      variants: [
        { name: 'Default', props: {} }
      ],
      demoCode: `<Table>
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
  </TableBody>
</Table>`
    },
    {
      name: 'accordion',
      displayName: 'Accordion',
      description: 'A vertically stacked set of interactive headings that each contain a title and content.',
      category: 'ui',
      importPath: '@/components/ui/accordion',
      dependencies: [],
      props: [
        {
          name: 'type',
          type: 'enum',
          defaultValue: 'single',
          description: 'The type of accordion',
          options: ['single', 'multiple']
        },
        {
          name: 'collapsible',
          type: 'boolean',
          defaultValue: true,
          description: 'Whether the accordion items can be collapsed'
        }
      ],
      variants: [
        { name: 'Single', props: { type: 'single' } },
        { name: 'Multiple', props: { type: 'multiple' } }
      ],
      demoCode: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`
    },
    {
      name: 'checkbox',
      displayName: 'Checkbox',
      description: 'A control that allows the user to toggle between checked and not checked.',
      category: 'form',
      importPath: '@/components/ui/checkbox',
      dependencies: [],
      props: [
        {
          name: 'checked',
          type: 'boolean',
          defaultValue: false,
          description: 'The controlled checked state of the checkbox'
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Whether the checkbox is disabled'
        }
      ],
      variants: [
        { name: 'Default', props: { checked: false } },
        { name: 'Checked', props: { checked: true } },
        { name: 'Disabled', props: { disabled: true } }
      ],
      demoCode: `<Checkbox />`
    },
    {
      name: 'radio-group',
      displayName: 'Radio Group',
      description: 'A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.',
      category: 'form',
      importPath: '@/components/ui/radio-group',
      dependencies: [],
      props: [
        {
          name: 'defaultValue',
          type: 'string',
          defaultValue: 'option-one',
          description: 'The default value of the radio group'
        }
      ],
      variants: [
        { name: 'Default', props: { defaultValue: 'option-one' } }
      ],
      demoCode: `<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>`
    },
    {
      name: 'sonner',
      displayName: 'Sonner (Toasts)',
      description: 'An opinionated toast component for React.',
      category: 'feedback',
      importPath: '@/components/ui/sonner',
      dependencies: [],
      props: [
        {
          name: 'position',
          type: 'enum',
          defaultValue: 'bottom-right',
          options: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'],
          description: 'Position of the toast'
        },
        {
          name: 'duration',
          type: 'number',
          defaultValue: 4000,
          description: 'Duration in milliseconds'
        },
        {
          name: 'richColors',
          type: 'boolean',
          defaultValue: false,
          description: 'Enable rich colors'
        }
      ],
      variants: [
        { name: 'default', props: {} },
        { name: 'success', props: { duration: 3000 } },
        { name: 'error', props: { duration: 5000 } }
      ],
      demoCode: `<Button
  onClick={() => toast.success('Success!', { duration: 3000 })}
>
  Show Success Toast
</Button>`
    },
    {
      name: 'card',
      displayName: 'Card',
      description: 'A flexible card component for displaying content.',
      category: 'layout',
      importPath: '@/components/ui/card',
      dependencies: [],
      props: [
        {
          name: 'className',
          type: 'string',
          defaultValue: '',
          description: 'Additional CSS classes'
        }
      ],
      variants: [
        { name: 'Default', props: {} },
        { name: 'With Header', props: { className: 'shadow-lg' } }
      ],
      demoCode: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>`
    },
    {
      name: 'input',
      displayName: 'Input',
      description: 'A text input component with various types and states.',
      category: 'form',
      importPath: '@/components/ui/input',
      dependencies: [],
      props: [
        {
          name: 'type',
          type: 'enum',
          defaultValue: 'text',
          description: 'Input type',
          options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search']
        },
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: 'Enter text...',
          description: 'Input placeholder'
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Whether the input is disabled'
        },
        {
          name: 'className',
          type: 'string',
          defaultValue: '',
          description: 'Additional CSS classes'
        }
      ],
      variants: [
        { name: 'Default', props: { type: 'text', placeholder: 'Enter text...' } },
        { name: 'Email', props: { type: 'email', placeholder: 'Enter email...' } },
        { name: 'Password', props: { type: 'password', placeholder: 'Enter password...' } },
        { name: 'Disabled', props: { disabled: true, placeholder: 'Disabled input' } }
      ],
      demoCode: `<Input type="text" placeholder="Enter text..." />`
    },
    {
      name: 'badge',
      displayName: 'Badge',
      description: 'A small status indicator component.',
      category: 'ui',
      importPath: '@/components/ui/badge',
      dependencies: [],
      props: [
        {
          name: 'variant',
          type: 'enum',
          defaultValue: 'default',
          description: 'Badge variant',
          options: ['default', 'secondary', 'destructive', 'outline']
        },
        {
          name: 'children',
          type: 'string',
          defaultValue: 'Badge',
          description: 'Badge content'
        }
      ],
      variants: [
        { name: 'Default', props: { variant: 'default', children: 'Badge' } },
        { name: 'Secondary', props: { variant: 'secondary', children: 'Secondary' } },
        { name: 'Destructive', props: { variant: 'destructive', children: 'Error' } },
        { name: 'Outline', props: { variant: 'outline', children: 'Outline' } }
      ],
      demoCode: `<Badge variant="default">Badge</Badge>`
    },
    {
      name: 'switch',
      displayName: 'Switch',
      description: 'A control that allows the user to toggle between checked and not checked.',
      category: 'form',
      importPath: '@/components/ui/switch',
      dependencies: [],
      props: [
        {
          name: 'checked',
          type: 'boolean',
          defaultValue: false,
          description: 'The controlled checked state of the switch'
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Whether the switch is disabled'
        }
      ],
      variants: [
        { name: 'Default', props: { checked: false } },
        { name: 'Checked', props: { checked: true } },
        { name: 'Disabled', props: { disabled: true } }
      ],
      demoCode: `<Switch />`
    },
    {
      name: 'textarea',
      displayName: 'Textarea',
      description: 'A multi-line text input component.',
      category: 'form',
      importPath: '@/components/ui/textarea',
      dependencies: [],
      props: [
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: 'Enter your message...',
          description: 'Textarea placeholder'
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Whether the textarea is disabled'
        },
        {
          name: 'rows',
          type: 'number',
          defaultValue: 4,
          description: 'Number of rows'
        }
      ],
      variants: [
        { name: 'Default', props: { placeholder: 'Enter your message...' } },
        { name: 'Disabled', props: { disabled: true } }
      ],
      demoCode: `<Textarea placeholder="Enter your message..." />`
    },
    {
      name: 'select',
      displayName: 'Select',
      description: 'A form control that allows users to select a value from a list of options.',
      category: 'form',
      importPath: '@/components/ui/select',
      dependencies: [],
      props: [
        {
          name: 'placeholder',
          type: 'string',
          defaultValue: 'Select an option...',
          description: 'Select placeholder'
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
          description: 'Whether the select is disabled'
        }
      ],
      variants: [
        { name: 'Default', props: { placeholder: 'Select an option...' } },
        { name: 'Disabled', props: { disabled: true } }
      ],
      demoCode: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>`
    },
    {
      name: 'tabs',
      displayName: 'Tabs',
      description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
      category: 'navigation',
      importPath: '@/components/ui/tabs',
      dependencies: [],
      props: [
        {
          name: 'defaultValue',
          type: 'string',
          defaultValue: 'tab1',
          description: 'The default tab value'
        }
      ],
      variants: [
        { name: 'Default', props: { defaultValue: 'tab1' } }
      ],
      demoCode: `<Tabs defaultValue="tab1" className="w-[400px]">
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
</Tabs>`
    },
    {
      name: 'separator',
      displayName: 'Separator',
      description: 'A visual separator between sections of content.',
      category: 'ui',
      importPath: '@/components/ui/separator',
      dependencies: [],
      props: [
        {
          name: 'orientation',
          type: 'enum',
          defaultValue: 'horizontal',
          description: 'The orientation of the separator',
          options: ['horizontal', 'vertical']
        }
      ],
      variants: [
        { name: 'Horizontal', props: { orientation: 'horizontal' } },
        { name: 'Vertical', props: { orientation: 'vertical' } }
      ],
      demoCode: `<Separator />`
    },
    {
      name: 'scroll-area',
      displayName: 'Scroll Area',
      description: 'A customizable scroll area component for overflow content.',
      category: 'layout',
      importPath: '@/components/ui/scroll-area',
      dependencies: [],
      props: [
        {
          name: 'className',
          type: 'string',
          defaultValue: '',
          description: 'Additional CSS classes'
        }
      ],
      variants: [
        { name: 'Default', props: {} }
      ],
      demoCode: `<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, everywhere. The king was furious, but he couldn't seem to stop Jokester. And then, one day, the people of the kingdom realized that along with all the bad jokes, Jokester had also been telling good ones. They just hadn't been paying attention.
</ScrollArea>`
    },
    {
      name: 'resizable',
      displayName: 'Resizable',
      description: 'A resizable panel component for creating resizable layouts.',
      category: 'layout',
      importPath: '@/components/ui/resizable',
      dependencies: [],
      props: [
        {
          name: 'defaultSize',
          type: 'number',
          defaultValue: 50,
          description: 'Default size percentage'
        },
        {
          name: 'minSize',
          type: 'number',
          defaultValue: 10,
          description: 'Minimum size percentage'
        }
      ],
      variants: [
        { name: 'Default', props: { defaultSize: 50 } }
      ],
      demoCode: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">Panel 1</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-[200px] items-center justify-center p-6">
      <span className="font-semibold">Panel 2</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>`
    }
  ];
};

export const getComponentByName = async (name: string): Promise<ShadcnComponent | null> => {
  const components = await getAvailableComponents();
  return components.find(comp => comp.name === name) || null;
};

export const searchComponents = async (query: string): Promise<ShadcnComponent[]> => {
  const components = await getAvailableComponents();
  if (!query) return components;
  
  const lowercaseQuery = query.toLowerCase();
  return components.filter(comp => 
    comp.name.toLowerCase().includes(lowercaseQuery) ||
    comp.displayName.toLowerCase().includes(lowercaseQuery) ||
    comp.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const getComponentsByCategory = async (category: string): Promise<ShadcnComponent[]> => {
  const components = await getAvailableComponents();
  return components.filter(comp => comp.category === category);
};