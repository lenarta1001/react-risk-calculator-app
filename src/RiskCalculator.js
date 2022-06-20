import React, {useState, useRef, useEffect} from 'react';
import InputBlock from './InputBlock';


function RiskCalculator( props ) {

    const { id, isChecked, toggleBlock } = props

    const LOCAL_STORAGE_KEY_BLOCK = `calculatorApp.component.${id}`

    const [component, setComponent] = useState({name: "", saved: false})

    const inputRef = useRef()
    const buttonRef = useRef()
    const paraRef = useRef()

    function handleSaveOrModifyItem(){
        if(component.name !== "" && component.saved === false){
            inputRef.current.style.display = "none"
            buttonRef.current.style.value = "Modify the name of the item"
            paraRef.current.style.display = "inline"
            setComponent({name: component.name, saved: true})

        } 
        
        if(component.saved === true){
            inputRef.current.style.display = "inline"
            buttonRef.current.style.value = "Modify the name of the item"
            paraRef.current.style.display = "none"
            setComponent({name: component.name, saved: false})
        }
        
        if(component.name === "") {
            alert("You have to name the item")
            // TODO Error component
        }
    }

    const storedComponent = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_BLOCK))

    useEffect(() => {
        setComponent(storedComponent)
        // TODO - save the state of the component
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY_BLOCK, JSON.stringify(component))
        // eslint-disable-next-line
    }, [component.name, component.saved])


    function handleClick(){
        toggleBlock(id)
    }

    return (
    <>
        <div>
            <div>{id}. component to compare</div>
            <div>
                    <input ref={inputRef} type="text" name="item-name" placeholder="Name of the item" onChange={(e) => {setComponent({name: e.target.value, saved: false})}} value={component.name} />
                    <p style={{display: "none"}} ref={paraRef}>{component.name}</p>
                    <button ref={buttonRef} onClick={handleSaveOrModifyItem}>Save the name of the item</button>
                    {id > 2 && <input type="checkbox" name="remove-block" checked={isChecked} onChange={handleClick}/>} 
            </div>
                    <InputBlock />
        </div>
    </>
    )

}

export default RiskCalculator;