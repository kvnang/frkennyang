import Link from 'next/link';

export function ButtonLink({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`group relative py-1.5 transition-colors leading-normal inline-flex font-semibold disabled:pointer-events-none disabled:opacity-50`}
    >
      <div className="absolute w-full bottom-0 left-0 border-t border-current -translate-x-2 transition-all scale-x-0 origin-left group-hover:scale-x-100 group-hover:delay-300 group-hover:translate-x-0"></div>
      <div className="absolute w-full bottom-0 left-0 border-t border-current transition-all scale-x-100 origin-left delay-300 group-hover:opacity-0 group-hover:delay-0 group-hover:translate-x-0.5"></div>
      {children}
    </Link>
  );
}

export function Button({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & React.ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={`group relative py-1.5 transition-colors leading-normal inline-flex font-semibold disabled:pointer-events-none disabled:opacity-50`}
    >
      <div className="absolute w-full bottom-0 left-0 border-t border-current -translate-x-2 transition-all scale-x-0 origin-left group-hover:scale-x-100 group-hover:delay-300 group-hover:translate-x-0"></div>
      <div className="absolute w-full bottom-0 left-0 border-t border-current transition-all scale-x-100 origin-left delay-300 group-hover:opacity-0 group-hover:delay-0 group-hover:translate-x-0.5"></div>
      {children}
    </button>
  );
}
