import { FC } from "react";
import '../Button/index.css'

interface IButton{
    Btext? : string;
    disabled? :boolean;
    onclick? :()=>void;
    icon?:any;
    size :string;
}

const Button:FC<IButton>=(props)=>{
return(
    <>
    <button
    disabled={props.disabled}
    onClick={props.onclick}
    className={props.size==='full'?'btn_full':props.size==='medium'?'btn_medium':'btn_small'}
    >
        {props.icon}
        {props.Btext}
    </button>
    </>
)
}

export default Button;