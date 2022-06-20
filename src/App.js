import React, {useState, useEffect} from "react";
import RiskCalculator from "./RiskCalculator";



const LOCAL_STORAGE_KEY_COMPONENT = "calculatorApp.block"

function App() {

  const [calculatorBlocks, setCalculatorBlocks] = useState([{id: 1, isChecked: false}, {id: 2, isChecked: false}]); 
    
  function handleAddCalculatorBlock(){
      if(calculatorBlocks.length < 4){
          setCalculatorBlocks(prevCalculatorBlocks => {
              return [...prevCalculatorBlocks, {id: calculatorBlocks[calculatorBlocks.length - 1].id + 1, isChecked: false}]
                  // ! THERE IS SOMETHING HERE
      })}
      else{
          window.alert('You cannot have more than 4 blocks')
          // TODO Error Component 
      }
  }



  function handleClearCalculatorBlock(){

    const removedBlocks = Array.from(calculatorBlocks.filter(block => block.isChecked))

    const newBlocks = calculatorBlocks.filter(block => !block.isChecked)

    if(removedBlocks.length > 1){
      for(const block of removedBlocks){
          localStorage.removeItem(`calculatorApp.component.${block.id}`)
    }}

    if(removedBlocks.length === 1 && removedBlocks[0].id === 3 && calculatorBlocks.length > 3){

      localStorage.removeItem(`calculatorApp.component.${removedBlocks[0].id}`)

      const storedLastBlock = JSON.parse(localStorage.getItem(`calculatorApp.component.${removedBlocks[0].id + 1}`))
      localStorage.setItem(`calculatorApp.component.${removedBlocks[0].id}`, JSON.stringify(storedLastBlock))


      localStorage.removeItem(`calculatorApp.component.${removedBlocks[0].id + 1}`)
      newBlocks.pop()
      newBlocks.push({id: 3, isChecked: false})
      } 

    setCalculatorBlocks(newBlocks)
    console.log(newBlocks)
      // TODO - save the oreder of the components
  }

  const storedBlocks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_COMPONENT))
  useEffect(() => {
    setCalculatorBlocks(storedBlocks)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_COMPONENT, JSON.stringify(calculatorBlocks))
  }, [calculatorBlocks])

  function toggleBlock(id){

    const newBlocks = [...calculatorBlocks]
    const block = newBlocks.find(block => block.id === id)
    block.isChecked = !block.isChecked
    setCalculatorBlocks(newBlocks)

  }


  return (
    <>
    {calculatorBlocks.map((item) => ( <RiskCalculator id={item.id} key={item.id} isChecked={item.isChecked} toggleBlock={toggleBlock}/>))}
    <button onClick={handleAddCalculatorBlock}>+</button>
    {calculatorBlocks.length > 2 && <button onClick={handleClearCalculatorBlock}>-</button>}
    </>
  )
}

export default App;
