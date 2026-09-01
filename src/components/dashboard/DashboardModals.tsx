'use client';

import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { QuickPayModal } from '@/components/modals/QuickPayModal';
import { CautionModal } from '@/components/modals/CautionModal';
import { ProlongLocationModal } from '@/components/modals/ProlongLocationModal';
import { SwapVehicleModal } from '@/components/modals/SwapVehicleModal';

export function DashboardModals() {
  return (
    <>
      <ConfirmModal />
      <QuickPayModal />
      <CautionModal />
      <ProlongLocationModal />
      <SwapVehicleModal />
    </>
  );
}
