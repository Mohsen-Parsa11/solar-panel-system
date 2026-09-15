/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect */
'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { deleteProduct } from './actions/product-actions';

type Props = {
  open: boolean;
  onCloseAction: () => void;
  productId: string;
  productName: string;
  onDeleteSuccessAction: () => void;
  t: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
    deleting: string;
    successMessage: string;
  };
};

export function DeleteModal({
  open,
  onCloseAction,
  productId,
  productName,
  onDeleteSuccessAction,
  t,
}: Props) {
  const [state, formAction, isPending] = useActionState(deleteProduct, {
    success: false,
    errors: {},
  });
  const [handled, setHandled] = useState(false);

  useEffect(() => {
    if (state.success && !handled) {
      setHandled(true);

      onCloseAction();
      onDeleteSuccessAction();
      toast.success(t.successMessage);
    } else if (state.errors.productId) {
      toast.error(state.errors.productId);
    }
  }, [state.success, handled, onCloseAction, onDeleteSuccessAction, t.successMessage, state.errors.productId]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">

        <h2 className="text-lg font-semibold text-black">
          {t.title}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          {t.description}
          {' '}
          <b>{productName}</b>
          ?
        </p>

        <form action={formAction} className="mt-6 flex justify-end gap-3">
          <input type="hidden" name="productId" value={productId} />

          <button
            type="button"
            onClick={onCloseAction}
            className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors duration-150 hover:bg-gray-50"
          >
            {t.cancel}
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm text-white transition-colors duration-150 hover:bg-red-500"
          >
            {isPending ? t.deleting : t.confirm}
          </button>
        </form>
      </div>
    </div>
  );
}
