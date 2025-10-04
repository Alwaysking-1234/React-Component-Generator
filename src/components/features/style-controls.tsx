'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useEffect, useMemo, useState } from 'react';
import { useComponentStore } from '@/stores/component-store';

type Option = { label: string; value: string };

const colorOptions: Option[] = [
  { label: 'None', value: 'none' },
  { label: 'Blue', value: 'blue' },
  { label: 'Red', value: 'red' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Purple', value: 'purple' },
  { label: 'Pink', value: 'pink' },
  { label: 'Gray', value: 'gray' },
];

const paddingOptions: Option[] = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'p-2' },
  { label: 'Medium', value: 'p-4' },
  { label: 'Large', value: 'p-6' },
];

const marginOptions: Option[] = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'm-2' },
  { label: 'Medium', value: 'm-4' },
  { label: 'Large', value: 'm-6' },
];

const fontSizeOptions: Option[] = [
  { label: 'Small', value: 'text-sm' },
  { label: 'Base', value: 'text-base' },
  { label: 'Large', value: 'text-lg' },
  { label: 'XL', value: 'text-xl' },
];

const fontWeightOptions: Option[] = [
  { label: 'Normal', value: 'font-normal' },
  { label: 'Medium', value: 'font-medium' },
  { label: 'Semibold', value: 'font-semibold' },
  { label: 'Bold', value: 'font-bold' },
];

const radiusOptions: Option[] = [
  { label: 'None', value: 'rounded-none' },
  { label: 'Small', value: 'rounded-sm' },
  { label: 'Medium', value: 'rounded-md' },
  { label: 'Large', value: 'rounded-lg' },
  { label: 'Full', value: 'rounded-full' },
];

const textColorOptions: Option[] = [
  { label: 'Auto', value: 'auto' },
  { label: 'White', value: 'text-white' },
  { label: 'Black', value: 'text-black' },
  { label: 'Blue', value: 'text-blue' },
  { label: 'Red', value: 'text-red' },
  { label: 'Green', value: 'text-green' },
  { label: 'Gray', value: 'text-gray' },
];

const borderStyleOptions: Option[] = [
  { label: 'None', value: 'none' },
  { label: 'Thin', value: 'border' },
  { label: 'Medium', value: 'border-2' },
  { label: 'Thick', value: 'border-4' },
];

const borderColorOptions: Option[] = [
  { label: 'Default', value: 'default' },
  { label: 'Blue', value: 'border-blue' },
  { label: 'Red', value: 'border-red' },
  { label: 'Green', value: 'border-green' },
  { label: 'Gray', value: 'border-gray' },
];

const hoverEffectOptions: Option[] = [
  { label: 'None', value: 'none' },
  { label: 'Brighten', value: 'hover-brighten' },
  { label: 'Shadow on hover', value: 'hover-shadow' },
];

const shadowOptions: Option[] = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'shadow-sm' },
  { label: 'Default', value: 'shadow' },
  { label: 'Large', value: 'shadow-lg' },
];

const gapOptions: Option[] = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'gap-2' },
  { label: 'Medium', value: 'gap-4' },
  { label: 'Large', value: 'gap-6' },
];

const alignOptions: Option[] = [
  { label: 'Left', value: 'text-left' },
  { label: 'Center', value: 'text-center' },
  { label: 'Right', value: 'text-right' },
];

export function StyleControls() {
  const { selectedComponent, stylePresetClassName, setStylePresetClassName } = useComponentStore();

  const [bgColor, setBgColor] = useState<string>('none');
  const [textColor, setTextColor] = useState<string>('auto');
  const [borderStyle, setBorderStyle] = useState<string>('none');
  const [borderColor, setBorderColor] = useState<string>('default');
  const [padding, setPadding] = useState<string>('none');
  const [margin, setMargin] = useState<string>('none');
  const [fontSize, setFontSize] = useState<string>('text-sm');
  const [fontWeight, setFontWeight] = useState<string>('font-medium');
  const [radius, setRadius] = useState<string>('rounded-md');
  const [hoverEffect, setHoverEffect] = useState<string>('none');
  const [shadow, setShadow] = useState<string>('none');
  const [gap, setGap] = useState<string>('none');
  const [align, setAlign] = useState<string>('text-left');

  // Compose classes when any option changes
  const composed = useMemo(() => {
    const classes: string[] = [];
    if (bgColor && bgColor !== 'none') classes.push(`bg-${bgColor}`);
    if (textColor && textColor !== 'auto') classes.push(textColor);
    if (borderStyle && borderStyle !== 'none') classes.push(borderStyle);
    if (borderColor && borderColor !== 'default') classes.push(borderColor);
    if (padding && padding !== 'none') classes.push(padding);
    if (margin && margin !== 'none') classes.push(margin);
    if (fontSize) classes.push(fontSize);
    if (fontWeight) classes.push(fontWeight);
    if (radius) classes.push(radius);
    if (hoverEffect && hoverEffect !== 'none') classes.push(hoverEffect);
    if (shadow && shadow !== 'none') classes.push(shadow);
    if (gap && gap !== 'none') classes.push(gap);
    if (align) classes.push(align);
    return classes.join(' ').trim();
  }, [bgColor, textColor, borderStyle, borderColor, padding, margin, fontSize, fontWeight, radius, hoverEffect, shadow, gap, align]);

  useEffect(() => {
    setStylePresetClassName(composed);
  }, [composed, setStylePresetClassName]);

  // Reset style controls to defaults whenever the selected component changes.
  // This ensures visual settings do not persist across different components.
  useEffect(() => {
    // Reset local control states
    setBgColor('none');
    setTextColor('auto');
    setBorderStyle('none');
    setBorderColor('default');
    setPadding('none');
    setMargin('none');
    setFontSize('text-sm');
    setFontWeight('font-medium');
    setRadius('rounded-md');
    setHoverEffect('none');
    setShadow('none');
    setGap('none');
    setAlign('text-left');
    // Also clear the composed preset in the store
    setStylePresetClassName('');
  }, [selectedComponent, setStylePresetClassName]);

  const renderSelect = (id: string, label: string, value: string, onChange: (val: string) => void, options: Option[]) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
        <Select value={value} onValueChange={(val) => onChange(val)}>
          <SelectTrigger id={id} className="w-full">
            <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value || 'none'} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Style Controls</CardTitle>
        <CardDescription>Adjust visual attributes in real time</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderSelect('bg-color', 'Background Color', bgColor, setBgColor, colorOptions)}
        <Separator className="my-4" />
        {renderSelect('text-color', 'Text Color', textColor, setTextColor, textColorOptions)}
        <Separator className="my-4" />
        {renderSelect('border-style', 'Border Style', borderStyle, setBorderStyle, borderStyleOptions)}
        {renderSelect('border-color', 'Border Color', borderColor, setBorderColor, borderColorOptions)}
        <Separator className="my-4" />
        {renderSelect('padding', 'Padding', padding, setPadding, paddingOptions)}
        {renderSelect('margin', 'Margin', margin, setMargin, marginOptions)}
        <Separator className="my-4" />
        {renderSelect('font-size', 'Font Size', fontSize, setFontSize, fontSizeOptions)}
        {renderSelect('font-weight', 'Font Weight', fontWeight, setFontWeight, fontWeightOptions)}
        <Separator className="my-4" />
        {renderSelect('radius', 'Border Radius', radius, setRadius, radiusOptions)}
        <Separator className="my-4" />
        {renderSelect('hover', 'Hover Effect', hoverEffect, setHoverEffect, hoverEffectOptions)}
        {renderSelect('shadow', 'Shadow', shadow, setShadow, shadowOptions)}
        <Separator className="my-4" />
        {renderSelect('gap', 'Component Spacing', gap, setGap, gapOptions)}
        {renderSelect('align', 'Alignment', align, setAlign, alignOptions)}
      </CardContent>
    </Card>
  );
}