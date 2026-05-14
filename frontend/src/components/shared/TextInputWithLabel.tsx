interface InputProps {
  elementId: string;
  label: string;
  onChange: any;
  value: string;
}

function TextInputWithLabel({ elementId, label, onChange, value }: InputProps) {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <input type="text" id={elementId} value={value} onChange={onChange} />
    </>
  );
}

export default TextInputWithLabel;
