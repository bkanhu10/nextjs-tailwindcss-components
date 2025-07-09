import { cn } from "@/lib/utils";

/**
 * A component to display a form data in a view mode.
 *
 * @param {{ title: string, value: string, className?: string, ...props: any }} props
 * @returns {JSX.Element} The component.
 */
const ViewFormData = ({ title, value, className, ...props }) => {
  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
        {title}
      </p>
      <p
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background file:rounded file:border-0 file:bg-brand-800 file:text-sm file:font-normal file:text-white placeholder:text-xs placeholder:text-gray-400 hover:file:bg-brand-600 focus:border-transparent focus:ring-brand-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {value}
      </p>
    </div>
  );
};

export default ViewFormData;
