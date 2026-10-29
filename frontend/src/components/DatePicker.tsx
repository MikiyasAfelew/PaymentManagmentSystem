"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  min?: string;
  max?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Select date",
  required = false,
  min,
  max,
  disabled = false,
  className = "",
}: DatePickerProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-sm text-muted-foreground block mb-2">
          {label}
          {required && " *"}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={min}
          max={max}
          disabled={disabled}
          required={required}
          className={`w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
            isFocused ? "ring-2 ring-primary" : ""
          }`}
        />
        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (value: string) => void;
  onEndDateChange?: (value: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  label,
  required = false,
  disabled = false,
  className = "",
}: DateRangePickerProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-sm text-muted-foreground block mb-2">
          {label}
          {required && " *"}
        </label>
      )}
      <div className="flex gap-2">
        <DatePicker
          value={startDate}
          onChange={onStartDateChange}
          placeholder="Start date"
          max={endDate}
          disabled={disabled}
          className="flex-1"
        />
        <DatePicker
          value={endDate}
          onChange={onEndDateChange}
          placeholder="End date"
          min={startDate}
          disabled={disabled}
          className="flex-1"
        />
      </div>
    </div>
  );
}
