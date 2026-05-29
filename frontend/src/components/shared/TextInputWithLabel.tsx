interface InputProps {
  elementId: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    'bg-white border-3 border-indigo-500/50 hover:border-[#d1b1ff] mb-3 rounded-3xl p-1';
  const labelStyling = 'm-auto mb-3 justify-right';
  return (
    <div className=' p-1  m-auto '>
      <label className={labelStyling} htmlFor={elementId}>
        {label}
      </label><br/>

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