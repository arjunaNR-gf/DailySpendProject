import { FC } from "react";
import '../Popup/index.css'

interface IPopUp {
    title?: string;
    icon?: any;
    content?: string;
    click?: () => void
}

const PopUp: FC<IPopUp> = (props) => {
    return (
        <>
            <div className="content_popup_box">
                {props.title !== undefined ?
                    <div className="content_header">
                        <h5>{props.title}</h5>
                        <div className="close_tab">
                            <span onClick={props.click}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </span>
                        </div> </div>
                    : ''}


                <div className="content_info">
                <div className="close_tab">
                        <span onClick={props.click}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="28" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                        </span>
                    </div>
                    <div><p>{props.content}</p></div>

                   

                </div>

            </div>
        </>
    )
}

export default PopUp;