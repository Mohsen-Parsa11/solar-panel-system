import type { ChangeEvent } from 'react';
import { ChevronDown, Search } from 'lucide-react';

type SearchInputProps = {
  placeholder: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

type SelectOption = {
  value: string;
  label: string;
};

type SelectControlProps = {
  label: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function SearchInput({ placeholder, value, onChange, className = '' }: SearchInputProps) {
  return (
    <label className={`flex h-12 items-center gap-3 rounded-md border border-[#dfe4ea] bg-white px-4 text-[#748296] transition duration-200 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-400 ${className}`}>
      <Search size={20} />
      <input
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-[15px] outline-none placeholder:text-[#748296]"
        placeholder={placeholder}
      />
    </label>
  );
}

export function SelectControl({ label, options, value, onChange, className = '' }: SelectControlProps) {
  if (!options?.length || !onChange) {
    return (
      <button
        type="button"
        className={`flex h-12 min-w-37 items-center justify-between gap-4 rounded-md border border-[#dfe4ea] bg-white px-5 text-[15px] text-[#2f3746] ${className}`}
      >
        <span>{label}</span>
        <ChevronDown size={18} className="text-[#6e7785]" />
      </button>
    );
  }

  const selectedLabel = options.find(option => option.value === value)?.label ?? label;

  return (
    <label className={`relative flex h-12 min-w-37 cursor-pointer items-center justify-between gap-4 rounded-md border border-[#dfe4ea] bg-white px-5 text-[15px] text-[#2f3746] transition duration-200 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-400 ${className}`}>
      <span className="truncate">{selectedLabel}</span>
      <select
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={18} className="text-[#6e7785]" />
    </label>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    // Raw DB values (from getOrderById)
    'PENDING': 'bg-[#fff4bf] text-[#a06d18]',
    'COMPLETED': 'bg-[#d9f8e4] text-[#2e8a53]',
    'CANCELLED': 'bg-[#ffe0e0] text-[#c03939]',
    // English (localized)
    'Active': 'bg-[#d9f8e4] text-[#2e8a53]',
    'Completed': 'bg-[#d9f8e4] text-[#2e8a53]',
    'Pending': 'bg-[#fff4bf] text-[#a06d18]',
    'Cancelled': 'bg-[#ffe0e0] text-[#c03939]',
    // Farsi (localized)
    'فعال': 'bg-[#d9f8e4] text-[#2e8a53]',
    'تکمیل شده': 'bg-[#d9f8e4] text-[#2e8a53]',
    'در انتظار': 'bg-[#fff4bf] text-[#a06d18]',
    'لغو شده': 'bg-[#ffe0e0] text-[#c03939]',
    // Pashto (localized)
    'بشپړ شوی': 'bg-[#d9f8e4] text-[#2e8a53]',
    'په تمه': 'bg-[#fff4bf] text-[#a06d18]',
    'لغوه شوی': 'bg-[#ffe0e0] text-[#c03939]',
  };

  const cancelledStyle = 'bg-[#ffe0e0] text-[#c03939]';
  const lowerStatus = status.toLowerCase();
  const defaultStyle = lowerStatus.includes('cancel') || lowerStatus.includes('لغو') || lowerStatus.includes('لغوه')
    ? cancelledStyle
    : lowerStatus.includes('pend') || lowerStatus.includes('انتظار') || lowerStatus.includes('تمه')
      ? 'bg-[#fff4bf] text-[#a06d18]'
      : 'bg-[#d9f8e4] text-[#2e8a53]';

  return (
    <span className={`inline-flex min-w-19.5 justify-center rounded-full px-3 py-1 text-[13px] font-bold ${styles[status] ?? defaultStyle}`}>
      {status}
    </span>
  );
}
