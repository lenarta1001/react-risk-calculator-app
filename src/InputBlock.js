import React from "react";

function InputBlock(){
    return (
        <>
            <input type="text" name="item-name"></input>
            <input type="number" name="importancy" placeholder="On a scale from 1 to 10 "></input>
        </>
    )
}

export default InputBlock;