
import {
    Radio, 
    RadioGroup

  } from "@headlessui/react";
  import { useState } from "react";

function classNames(...classes: unknown[]) {
    return classes.filter(Boolean).join(" ");
}


export default function AvatarGroup( { options }: { options: { name: string, color: string }[] }) {
    const [selectedColor, setSelectedColor] = useState(options[1]);
    return (
    
        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3 p-2">
        {options.map((option) => (
          <Radio
            key={option.name}
            value={option}
            aria-label={option.name}
            className={classNames(
              option.color,
              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-current focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
            )}
          >
            <span aria-hidden="true" className="size-8 rounded-full border border-black/10 bg-current" />
          </Radio>
        ))}
      </RadioGroup>)}