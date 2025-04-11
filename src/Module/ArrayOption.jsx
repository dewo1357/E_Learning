const ArrayOption = ({CheckSubModule,SetCheckSubModule,ListSubModule,idSubModule=0,MethodCheck,NumberExercise=false,insAns=false,learn=false}) => {
    console.log(NumberExercise)
    return (
        <>
            <div onClick={!CheckSubModule ? () => {
                SetCheckSubModule(true)
            } : () => { }} className="ListSubModule"
                style={{
                    width: CheckSubModule ? "300px" : "50px",
                    alignItems: CheckSubModule ? "normal" : "center",
                    display: CheckSubModule ? "block" : "flex",
                    cursor: CheckSubModule ? "default" : "pointer",
                    transition: "1000ms"
                }}>
                {CheckSubModule
                    ?
                    <div>
                        <div className="HeaderListSubModule">
                            <button id="Close" onClick={(e) => {
                                console.log(e)
                                if (e.target.id == "images") {
                                    console.log("oke")
                                    SetCheckSubModule(false)
                                }
                            }}>
                                <img id="images" src="/Images/icons8-forward-button-50.png" alt="" />
                            </button>
                            <h2>{learn?"List Number":"RoadMap"}</h2>
                        </div>

                        <ol className="ol" style={{display:insAns?"":"block"}}>
                            {ListSubModule?
                                ListSubModule.map((item,index) => (
                                    <li key={index} className={`ComponentSubModule ${NumberExercise===index?"choose":insAns && insAns[index]!==false?"isAans":null}`}
                                    style={{width:!insAns?"100%":""}}
                                    >
                                        <button  style={{width:!insAns?"100%":"",textAlign:!insAns?"left":""}} onClick={item.id !== idSubModule  || learn  ?
                                            ()=>{MethodCheck(item.id?item.id:index)} : () => { }
                                        }>{item.SubTitle?item.SubTitle:`${index+1}`}</button>
                                    </li>
                                ))
                                : null}
                        </ol>
                    </div>
                    : <div className="optionsToOpen">
                        <img src="/Images/icons8-double-left-50.png" alt="" />
                    </div>
                }

            </div>
        </>
    )
}

export default ArrayOption