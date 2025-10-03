import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, step, min, max, ...props }, ref) => {
  // 如果 min/max 是 1 和 5，则强制 step 为 0.1（覆盖传入的 step）
  const numericMin = typeof min === 'string' ? Number(min) : (min as number | undefined);
  const numericMax = typeof max === 'string' ? Number(max) : (max as number | undefined);
  const resolvedStep = (numericMin === 1 && numericMax === 5) ? 0.01 : (step ?? 1);

  // 颜色插值函数：基于百分比在 红 -> 黄 -> 绿 之间线性插值
  const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  };
  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const lerpColor = (hexA: string, hexB: string, t: number) => {
    const A = hexToRgb(hexA);
    const B = hexToRgb(hexB);
    return rgbToHex(lerp(A.r, B.r, t), lerp(A.g, B.g, t), lerp(A.b, B.b, t));
  };

  const getColorForPercent = (p: number) => {
    const clamped = Math.max(0, Math.min(1, isNaN(p) ? 0 : p));
    const red = '#ef4444';
    const yellow = '#f59e0b';
    const green = '#10b981';
    if (clamped <= 0.5) {
      return lerpColor(red, yellow, clamped * 2);
    }
    return lerpColor(yellow, green, (clamped - 0.5) * 2);
  };

  const blendWithWhite = (hex: string, amount: number) => lerpColor('#ffffff', hex, amount);

  // 读取当前值：优先使用受控的 props.value，其次 props.defaultValue，否则 numericMin
  const valueProp = (props as any).value ?? (props as any).defaultValue;
  const currentValue = Array.isArray(valueProp) ? Number(valueProp[0]) : undefined;
  const baseValue = currentValue ?? numericMin ?? 0;
  const rangeSpan = (numericMax ?? 1) - (numericMin ?? 0) || 1;
  const percent = ((baseValue - (numericMin ?? 0)) / rangeSpan);
  const activeColor = getColorForPercent(percent);
  const trackBg = undefined;

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      step={resolvedStep}
      min={min}
      max={max}
      {...props}
    >
      {/* 轨道保持中性背景，只有左侧 Range（已填充部分）显示动态颜色 */}
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range
          className="absolute h-full transition-colors duration-150"
          style={{
            background: activeColor
          }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-5 w-5 rounded-full border-2 bg-background ring-offset-background transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        style={{ borderColor: activeColor }}
      />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
