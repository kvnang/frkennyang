import clsx from 'clsx';

export function Hamburger({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      className={clsx(
        `group w-12 h-12 relative rounded-md hover:text-primary focus-visible:text-primary`,
        isOpen ? 'text-white' : 'text-body'
      )}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className="sr-only">Open main menu</span>
      <div className="block w-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden="true"
          className={clsx(
            `block absolute h-0.5 w-6 bg-current transform transition duration-500 ease-in-out group-hover:scale-x-100 group-hover:translate-x-0`,
            isOpen
              ? 'rotate-45 translate-x-0 scale-x-100'
              : '-translate-y-2 -translate-x-[12.5%] scale-x-75'
          )}
        />
        <span
          aria-hidden="true"
          className={clsx(
            `block absolute h-0.5 w-6 bg-current transform transition duration-500 ease-in-out`,
            isOpen ? 'opacity-0' : ''
          )}
        />
        <span
          aria-hidden="true"
          className={clsx(
            `block absolute h-0.5 w-6 bg-current transform transition duration-500 ease-in-out group-hover:scale-x-100 group-hover:translate-x-0`,
            isOpen
              ? '-rotate-45 translate-x-0 scale-x-100'
              : 'translate-y-2 -translate-x-[12.5%] scale-x-75'
          )}
        />
      </div>
    </button>
  );
}
