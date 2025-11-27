"use client";

import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { Fragment } from "react";

/**
 * CustomSelect - A reusable dropdown component using Headless UI's Listbox
 *
 * Provides consistent appearance across all browsers, full accessibility support,
 * and matches the existing design system with dark mode support.
 *
 * @param {string | number} value - Current selected value
 * @param {function} onChange - Callback function that receives the selected value directly (not an event)
 * @param {Array<{value: string|number, label: string}>} options - Array of options to display
 * @param {string} [placeholder="Select an option"] - Placeholder text when no option is selected
 * @param {boolean} [disabled=false] - Whether the dropdown is disabled
 * @param {string} [className=""] - Additional CSS classes to apply to the wrapper
 * @param {string} [id] - Optional id for label association
 *
 * @example
 * <CustomSelect
 *   value={statusFilter}
 *   onChange={setStatusFilter}
 *   options={[
 *     { value: "all", label: "All Status" },
 *     { value: "active", label: "Active" },
 *     { value: "inactive", label: "Inactive" }
 *   ]}
 * />
 */
export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  id,
}) {
  // Find the currently selected option
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <div className={`relative ${className}`}>
          <Listbox.Button
            id={id}
            className={`
              relative w-full cursor-pointer rounded-lg py-2 pl-4 pr-10 text-left
              border transition-all duration-200
              border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-theme-primary focus:border-transparent
              ${
                disabled
                  ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-60"
                  : "bg-white dark:bg-gray-900 hover:border-gray-400 dark:hover:border-gray-500"
              }
              text-gray-900 dark:text-white
            `}
          >
            <span className="block truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="
                absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg
                bg-white dark:bg-gray-900
                border border-gray-300 dark:border-gray-600
                shadow-lg
                py-1 text-base
                focus:outline-none
              "
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active, selected }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-theme-primary/10 text-theme-primary dark:bg-theme-primary/20"
                        : "text-gray-900 dark:text-white"
                    } ${selected ? "font-semibold" : "font-normal"}`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className="block truncate">{option.label}</span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-theme-primary">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
