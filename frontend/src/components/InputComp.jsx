
export function InputComp({label, placeholder, onChange, type}){

    return <div className="flex flex-col">
        <div className="font-semibold pb-2">{label}</div>
        <input typeof={type} onChange={onChange} type="text" placeholder={placeholder} className="border-2 rounded-lg p-2 mb-4"></input>
    </div>

}