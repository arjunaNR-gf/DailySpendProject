import { FC } from "react"

interface IIcon {
    color?: string
}

const RefreshIcon: FC<IIcon> = (props) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={props.color} className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
        </>
    )
}

const ArrowDownCircle: FC<IIcon> = (props) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={props.color} className="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
            </svg>
        </>
    )
}

export { RefreshIcon,ArrowDownCircle }