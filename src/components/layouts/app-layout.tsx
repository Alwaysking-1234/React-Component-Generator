'use client';

import { ComponentSelector } from '@/components/features/component-selector';
import { ComponentPreview } from '@/components/features/component-preview';
import { PropertyCustomizer } from '@/components/features/property-customizer';
import { StyleControls } from '@/components/features/style-controls';
import { ActionButtons } from '@/components/features/action-buttons';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useComponentStore } from '@/stores/component-store';
import { toast } from 'sonner';

export function AppLayout() {
  const { } = useComponentStore();

  // Add keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'k',
      ctrl: true,
      callback: () => {
        // Focus search input - this would need a ref in the component selector
        toast.info('Press Ctrl+K to focus search (feature coming soon)');
      },
      description: 'Focus search'
    },
    {
      key: 'r',
      ctrl: true,
      shift: true,
      callback: () => {
        // Reset all properties
        toast.info('Press Ctrl+Shift+R to reset properties (feature coming soon)');
      },
      description: 'Reset properties'
    }
  ]);

  return (
    <div className="h-screen bg-background">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Left Panel - Component Selector */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="h-full border-r">
            <ComponentSelector />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Middle Panel - Component Preview */}
        <ResizablePanel defaultSize={50} minSize={40}>
          <div className="h-full p-6 overflow-y-auto">
            <ComponentPreview />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Panel - Customizer and Actions */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="h-full border-l">
            <Tabs defaultValue="customize" className="h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customize">Customize</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>
              
              <TabsContent value="customize" className="h-full p-4 overflow-y-auto">
                <div className="space-y-4">
                  <StyleControls />
                  <PropertyCustomizer />
                </div>
              </TabsContent>
              
              <TabsContent value="export" className="h-full p-4 overflow-y-auto">
                <ActionButtons />
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}