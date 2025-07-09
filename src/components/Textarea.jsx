const Textarea = ({
  name,
  id,
  value,
  onChange,
  required,
  placeholder,
  className,
  ...props
}) => {
  return (
    <>
      <textarea
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-950 ${className}`}
        {...props}
      ></textarea>
    </>
  );
};

export default Textarea;
