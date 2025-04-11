const Input = ({TypeInput = "text",PlaceHolder,Name,nameId,onChange,hidden=false,max,value,readOnly})=>{
    return (
        <div>
            <input readOnly={readOnly} type={TypeInput} name={Name} id={nameId} placeholder={PlaceHolder} onChange={onChange} value={value} required hidden={hidden} maxLength={max}/>
        </div>
    )
}

export default Input