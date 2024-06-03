import { useEffect, useState } from 'react';
import ChartPie from '../../Component/PiChart';
import './index.css'
import { getPaymentMenuByRs } from '../../Services/api/DailySpendApi';
import { useSelect } from '@material-tailwind/react';
import Notification from '../../Component/Notification/NotificationLayout';
const HomePage = () => {
const [val,setVal]=useState({})
const [notification, setNotification] = useState({
    activeStatus: false,
    subject: ''
});
const CloseFun = () => {
    setNotification({ activeStatus: false, subject: '' })
}

    useEffect(() => {
        getPaymentMenuByRs().then((res: any) => {
            setVal({
                "lables":Object.keys(res.data),
                "value":Object.values(res.data)
            })
            setNotification((PreveState:any)=>({...PreveState,activeStatus:false}))
        }).catch((error)=>{
            setNotification((PreveState:any)=>({...PreveState,activeStatus:true,subject:error}))
        })
    }, [setVal])

    return (
        <>
{notification.activeStatus && <Notification click={CloseFun} content={notification.subject} />}
            <div className="view--page--main">
                <h1>welcome to Home!!!!!!</h1>

                <div className='pi--chart-block'>
                    <ChartPie pieData={val} />
                </div>
            </div>

        </>
    )
}

export default HomePage;