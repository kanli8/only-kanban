
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,

  } from "@headlessui/react";
  
  import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";

  export default function CategoryItem(
    { title }: { title: string }
) {

    return (
        <li
        key={1}
        className="overflow-hidden rounded-xl border border-gray-200 w-90"
        >
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
          <img
          alt={title}
          src={"https://tailwindui.com/plus/img/logos/48x48/tuple.svg"}
          className="size-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
          />
          <div className="text-sm/6 font-medium text-gray-900">
          {title}
          </div>
          <Menu as="div" className="relative ml-auto">
          <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon
            aria-hidden="true"
            className="size-5"
            />
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
            <a
              href="#"
              className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
            >
              View
              <span className="sr-only">, {title}</span>
            </a>
            </MenuItem>
            <MenuItem>
            <a
              href="#"
              className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
            >
              Edit
              <span className="sr-only">, {title}</span>
            </a>
            </MenuItem>
          </MenuItems>
          </Menu>
        </div>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
          {/* 项目列表内容 */}
        </dl>
        </li>
    
    );
}