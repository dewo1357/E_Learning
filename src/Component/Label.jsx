const Label = ({Content,For})=>{
    return (
        <>
        <div>
            <label htmlFor={For}>{Content}</label>
        </div>
        </>
    )
}

export default Label