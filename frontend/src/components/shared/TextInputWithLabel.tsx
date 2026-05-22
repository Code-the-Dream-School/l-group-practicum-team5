interface InputProps {
  elementId: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement >) => void; // Is this how I should set the type for onChange?
  value: string;
  type?: string;
}

function TextInputWithLabel({ elementId, label, onChange, value, type }: InputProps) {
  return (
    <div>
      <label htmlFor={elementId}>{label}</label>
      <input type={type ?? "text"} id={elementId} value={value} onChange={onChange} />
    </div>
  );
}

export default TextInputWithLabel;