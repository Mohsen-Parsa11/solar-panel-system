'use client';

import { useFormStatus } from 'react-dom';

type Props = {
  label: string;
  loadingLabel: string;
  disabled?: boolean;
};

export function SubmitButton({
  label,
  loadingLabel,
  disabled,
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="inline-flex h-12 min-w-42 cursor-pointer items-center justify-center rounded-md bg-primary-400 px-6 text-[14px] font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? loadingLabel : label}
    </button>
  );
}
