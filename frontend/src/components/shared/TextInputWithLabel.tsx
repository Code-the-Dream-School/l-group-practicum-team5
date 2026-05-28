interface InputProps {
  elementId: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Is this how I should set the type for onChange?
  value: string;
  type?: string;
}

function TextInputWithLabel({
  elementId,
  label,
  onChange,
  value,
  type,
}: InputProps) {
  const inputStyling =
    'bg-white border-3 border-indigo-500/50 hover:border-[#d1b1ff] m-auto mb-3 rounded-2xl pt-.5 pb-.5 pr-2 pl-2';
  const labelStyling = 'm-auto mb-3';
  return (
    <div className="p-1">
      <label className={labelStyling} htmlFor={elementId}>
        {label}:{' '}
      </label>

      <input
        className={inputStyling}
        type={type ?? 'text'}
        id={elementId}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInputWithLabel;
