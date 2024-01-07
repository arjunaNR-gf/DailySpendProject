import { FC } from "react";
import '../Input/index.css'

interface IInput {
    label?:string;
    type: string;
    placeholder: string;
    name: string;
    val:string;
    onchange(e: React.ChangeEvent<HTMLElement>) : void;
    size: string;
}

const Input: FC<IInput> = (props) => {
    return (
        <>
        <div style={{width:'100%',display:"flex",flexDirection:'column',alignItems:'start',lineHeight:'300%'}}>
        {props.label != undefined ? <label>{props.label} </label> :''}
            <input
                type={props.type}
                name={props.name}
                onChange={ props.onchange}
                placeholder={props.placeholder}
                value={props.val}
                className={props.size === 'full' ? 'input_full' : props.size === 'medium' ? 'input_medium' : 'input_small'}
                required
            />
        </div>
    
        </>
    )
}
export default Input;