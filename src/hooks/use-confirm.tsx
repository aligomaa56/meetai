import { JSX, useState } from 'react';

import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';

export function useConfirm(
  title: string,
  description: string,
): [() => JSX.Element, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmDialog = () => (
    <ResponsiveDialog
      open={promise !== null}
      onOpenChange={handleClose}
      title={title}
      description={description}
    >
      <div className="flex justify-end gap-x-2">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="w-24"
        >
          Cancel
        </Button>
        <Button onClick={handleConfirm} className="w-24">
          Confirm
        </Button>
      </div>
    </ResponsiveDialog>
  );

  return [ConfirmDialog, confirm];
}