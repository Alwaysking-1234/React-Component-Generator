import { create } from 'zustand';
import { ShadcnComponent } from '@/types/component';

interface ComponentStore {
  selectedComponent: ShadcnComponent | null;
  customProps: Record<string, string | number | boolean | string[]>;
  searchQuery: string;
  selectedCategory: string;
  
  // Actions
  setSelectedComponent: (component: ShadcnComponent | null) => void;
  setCustomProps: (props: Record<string, string | number | boolean | string[]>) => void;
  updateCustomProp: (key: string, value: string | number | boolean | string[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  resetCustomProps: () => void;
}

export const useComponentStore = create<ComponentStore>((set, get) => ({
  selectedComponent: null,
  customProps: {},
  searchQuery: '',
  selectedCategory: 'all',
  
  setSelectedComponent: (component) => {
    set({ selectedComponent: component });
    // Reset custom props when component changes
    if (component) {
      const defaultProps = component.props.reduce((acc, prop) => {
        if (prop.defaultValue !== undefined) {
          acc[prop.name] = prop.defaultValue;
        }
        return acc;
      }, {} as Record<string, string | number | boolean | string[]>);
      set({ customProps: defaultProps });
    } else {
      set({ customProps: {} });
    }
  },
  
  setCustomProps: (props) => set({ customProps: props }),
  
  updateCustomProp: (key, value) => {
    set((state) => ({
      customProps: {
        ...state.customProps,
        [key]: value
      }
    }));
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  resetCustomProps: () => {
    const { selectedComponent } = get();
    if (selectedComponent) {
      const defaultProps = selectedComponent.props.reduce((acc, prop) => {
        if (prop.defaultValue !== undefined) {
          acc[prop.name] = prop.defaultValue;
        }
        return acc;
      }, {} as Record<string, string | number | boolean | string[]>);
      set({ customProps: defaultProps });
    } else {
      set({ customProps: {} });
    }
  }
}));