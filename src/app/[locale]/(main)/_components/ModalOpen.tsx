'use client';
import React from 'react';
import CartModal from './CartModal';
import ReadyToSwitch from './ReadyToSwitch';

export default function ModalOpen() {
  const [isCartModalOpen, setIsCartModalOpen] = React.useState(false);

  return (
    <>
      <ReadyToSwitch onBtnClick={() => setIsCartModalOpen(true)} />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
}
