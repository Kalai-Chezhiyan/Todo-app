export default function Button(props) {
  return (
    <button
      type={props.type}
      className={` text-white w-full h-13 rounded-2xl ${props.disabled === true ? "opacity-50  bg-red-400" : " bg-red-400"}  `}
    >
      {props.label}
    </button>
  );
}
