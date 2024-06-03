import { FC, useState } from "react";
import './index.css'
import { DropdownArrowDown } from "../../assests/image/icon";

interface IDropdown {
    icon?: any;
    placeholder: string;
    name: string;
    value: string;
    dataAry: Array<string>;
    onclick: (name: string, value: string) => void;
    size: string;
    title?:string;

}
const Dropdown: FC<IDropdown> = (props) => {

    const [active, setActive] = useState(false)

    return (
        <>
            <div className={`drop--down ${props.size === 'full' ? 'select_full' : props.size === 'medium' ? 'select_medium' : 'select_small'}`}>
                <label>{props.title}</label>
                <div className="drop--down--input--icon" onClick={() => setActive(true)} >
                    <input value={props.value} placeholder={props.placeholder}
                        />
                        <span>
                            <DropdownArrowDown />
                        </span>
                </div>
                {
                    active &&
                    <div className="drop--down--list--dispaly">
                        {
                            props.dataAry.map((item, i) => {
                                return (
                                    <>
                                        <span key={i} onClick={() => { props.onclick(props.name, item); setActive(false) }}  >{item}</span>
                                    </>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </>
    )
}
export default Dropdown;