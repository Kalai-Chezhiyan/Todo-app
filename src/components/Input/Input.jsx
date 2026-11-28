export default function Input(props) {
  return (
    <input
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      className={`border border-black border-b-8 border-b-black rounded-2xl w-full capitalize ${props.height ? props.height : "h-15"} px-3`}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
  );
}
