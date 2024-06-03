import React, { FC } from "react";
import '../Input/index.css'

interface IInput {
    label?:string;
    type: string;
    placeholder: string;
    name: string;
    val:string | number;
    onchange(e: React.ChangeEvent<HTMLElement>) : void;
    size: string;
    transition?:string;
}

const Input: FC<IInput> = (props) => {
    return (
        <>
        <div className={`input--dev ${props.transition} `}
        style={{width:'100%',display:"flex",flexDirection:'column',alignItems:'start',lineHeight:'300%'}}>
        {props.label != undefined ? <label className="lb">{props.label} </label> :''}
            <input
                type={props.type}
                name={props.name}
                onChange={ props.onchange}
                placeholder={props.placeholder}
                value={props.val}
                onKeyDown={()=>onkeydown}
                className={props.size === 'full' ? 'input_full' : props.size === 'medium' ? 'input_medium' : 'input_small'}
                required
            />
        </div>
    
        </>
    )
}
export default Input;