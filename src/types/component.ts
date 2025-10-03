export interface ComponentProp {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'enum' | 'object' | 'function';
  required?: boolean;
  defaultValue?: string | number | boolean | string[] | undefined;
  description?: string;
  options?: string[]; // For enum types
}

export interface ComponentVariant {
  name: string;
  props: Record<string, string | number | boolean>;
  description?: string;
}

export interface ShadcnComponent {
  name: string;
  displayName: string;
  description: string;
  category: string;
  props: ComponentProp[];
  variants: ComponentVariant[];
  importPath: string;
  dependencies: string[];
  demoCode: string;
}

export interface ComponentState {
  selectedComponent: ShadcnComponent | null;
  customProps: Record<string, string | number | boolean>;
  generatedCode: string;
  searchQuery: string;
  selectedCategory: string;
}

export type ComponentCategory = 
  | 'ui'
  | 'form'
  | 'feedback'
  | 'navigation'
  | 'layout'
  | 'data-display'
  | 'overlay'
  | 'typography'
  | 'media';