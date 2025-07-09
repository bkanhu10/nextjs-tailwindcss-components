const FullTimeline = ({ children }) => {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {children}
    </ol>
  );
};

const Timeline = ({ eyebrow, heading, description, children }) => {
  return (
    <li className="mb-10 ms-4">
      <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
      <p className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {eyebrow}
      </p>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {heading}
      </h3>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
      {children}
    </li>
  );
};

export { FullTimeline, Timeline };
