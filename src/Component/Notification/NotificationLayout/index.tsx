import { FC } from "react";
import '../NotificationLayout/index.css'
import PopUp from "../Popup";

interface INotification{
    title?:string;
    icon?:any;
    content?:string;
    click?:()=>void
}
const Notification:FC<INotification>=(props)=>{
    return(
        <>
        <div className="Notification_base">
            <PopUp click={props.click} content={props.content}/>
        </div>
        </>
    )

}

export default Notification;