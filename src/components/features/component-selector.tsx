'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Package, AlertCircle } from 'lucide-react';
import { useComponentStore } from '@/stores/component-store';
import { getAvailableComponents } from '@/lib/component-data';
import { ShadcnComponent } from '@/types/component';
import { useDebounce } from '@/hooks/use-debounce';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

// Removed category filter section per user request

export function ComponentSelector() {
  const { searchQuery, selectedComponent, setSearchQuery, setSelectedComponent } = useComponentStore();
  const [components, setComponents] = useState<ShadcnComponent[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<ShadcnComponent[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    loadComponents();
  }, []);

  useEffect(() => {
    let filtered = components;

    // Filter by search query (case-insensitive)
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(component =>
        component.name.toLowerCase().includes(query) ||
        component.description.toLowerCase().includes(query) ||
        component.displayName.toLowerCase().includes(query)
      );
    }

    // Category filtering removed

    setFilteredComponents(filtered);
  }, [components, debouncedSearchQuery]);

  const loadComponents = async () => {
    try {
      setIsLoading(true);
      const data = await getAvailableComponents();
      setComponents(data);
      

    } catch (error) {
      console.error('Failed to load components:', error);
    } finally {
      setIsLoading(false);
    }
  };



  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Category filter removed

  const handleComponentSelect = (component: ShadcnComponent) => {
    setSelectedComponent(component);
  };

  const getCategoryColor = (category: string) => {
    // Keep badge color mapping simple without filter buttons
    switch (category) {
      case 'ui': return 'bg-green-500';
      case 'form': return 'bg-purple-500';
      case 'layout': return 'bg-orange-500';
      case 'feedback': return 'bg-red-500';
      case 'navigation': return 'bg-indigo-500';
      case 'data-display': return 'bg-pink-500';
      case 'overlay': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter removed */}

      {/* Components Grid */}
      <ScrollArea className="h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredComponents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-center">
                {searchQuery 
                  ? 'No components found matching your criteria'
                  : 'No components available'
                }
              </p>
            </div>
          ) : (
            filteredComponents.map((component) => (
              <Card
                key={component.name}
                className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
                  selectedComponent?.name === component.name
                    ? 'ring-2 ring-primary shadow-lg scale-[1.02]'
                    : 'hover:border-primary'
                }`}
                onClick={() => handleComponentSelect(component)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{component.displayName}</CardTitle>
                    <Badge variant="secondary" className={`${getCategoryColor(component.category)} text-white`}>
                      {component.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {component.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>{component.props.length} props</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{component.variants.length} variants</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}