import { Button } from './Button';

interface Props {
  loading: boolean;
  title?: string;
  icon?: React.ReactNode;
}

export default function FormSubmitButton({ loading, title, icon }: Props) {
  return (
    <Button
      type="submit"
      className="relative inline-flex items-center"
      disabled={loading}
    >
      <span>{title || 'Send'}</span>
      {icon && <span className="h-4 align-middle ml-2 mb-1.5">{icon}</span>}
      {loading && (
        <div className="h-8 w-8 md:absolute md:top-1/2 md:left-full md:-translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="text-accent w-8 h-8 animate-spin"
          >
            <path
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
    </Button>
  );
}
