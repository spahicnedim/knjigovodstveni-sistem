import React from "react";
import { Transition } from "@headlessui/react"; // Headless UI for animation

const DrawerDokument = ({ isOpen, onClose, brojDokumenta, children }) => {
  return (
    <>
      {/* Background overlay */}
      <Transition
        show={isOpen}
        enter='transition-opacity duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={onClose}
        />
      </Transition>

      {/* Drawer */}
      <Transition
        show={isOpen}
        enter='transition-transform duration-300'
        enterFrom='translate-x-full'
        enterTo='translate-x-0'
        leave='transition-transform duration-300'
        leaveFrom='translate-x-0'
        leaveTo='translate-x-full'
      >
        <div className='fixed right-0 top-0 h-full w-1/2 bg-white shadow-lg z-50 overflow-y-auto'>
          <div className='p-2 ml-3 flex justify-between items-center border-b border-gray-300'>
            <h2 className='text-xl font-semibold'>
              Broj Dokumenta: {brojDokumenta}
            </h2>
            <button
              className='text-gray-500 hover:text-gray-700'
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          <div className='p-3'>{children}</div>
        </div>
      </Transition>
    </>
  );
};

export default DrawerDokument;
