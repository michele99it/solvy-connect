
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    valueLabelDisplay?: boolean;
    valueLabelFormat?: (value: number) => string;
  }
>(({ className, valueLabelDisplay, valueLabelFormat, ...props }, ref) => (
  <div className="relative flex w-full flex-col">
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
    {valueLabelDisplay && props.value && Array.isArray(props.value) && (
      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium">
        {valueLabelFormat ? valueLabelFormat(props.value[0]) : props.value[0]}
      </span>
    )}
  </div>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
