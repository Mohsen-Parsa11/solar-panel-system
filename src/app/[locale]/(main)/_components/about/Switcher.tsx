'use client';
import { useState } from 'react';
import CartModal from '../CartModal';
import ReadyToSwitch from '../ReadyToSwitch';

export default function Switcher() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  return (
    <>
      <ReadyToSwitch
        onBtnClick={() => setIsCartModalOpen(true)}
      />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </>
  );
}
