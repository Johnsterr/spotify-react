import { XIcon } from '@heroicons/react/outline';

function BaseModal() {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-30 flex justify-center items-center"
      role="dialog"
    >
      <div className="relative bg-[#333] h-1/3 w-2/5 rounded-xl">
        <button className="absolute right-0 p-3 text-neutral-500 hover:text-neutral-200">
          <XIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

export default BaseModal;