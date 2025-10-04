import { create } from 'zustand';
import { ShadcnComponent } from '@/types/component';

interface ComponentStore {
  selectedComponent: ShadcnComponent | null;
  customProps: Record<string, string | number | boolean | string[]>;
  // Preset styles composed via StyleControls component
  stylePresetClassName: string;
  searchQuery: string;
  selectedCategory: string;
  
  // Actions
  setSelectedComponent: (component: ShadcnComponent | null) => void;
  setCustomProps: (props: Record<string, string | number | boolean | string[]>) => void;
  updateCustomProp: (key: string, value: string | number | boolean | string[]) => void;
  setStylePresetClassName: (className: string) => void;
  resetStylePreset: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  resetCustomProps: () => void;
}

export const useComponentStore = create<ComponentStore>((set, get) => ({
  selectedComponent: null,
  customProps: {},
  stylePresetClassName: '',
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
      // Also reset any composed style preset to avoid visual bleed across components
      set({ stylePresetClassName: '' });
    } else {
      set({ customProps: {} });
      set({ stylePresetClassName: '' });
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
  
  setStylePresetClassName: (className) => set({ stylePresetClassName: className }),
  
  resetStylePreset: () => set({ stylePresetClassName: '' }),
  
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