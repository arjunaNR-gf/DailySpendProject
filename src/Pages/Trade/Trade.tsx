import { useState } from 'react';
import Button from '../../Component/Button';
import { getDailSpendMonthOrYear, getDailySpendInfo, getOverAllMonthDetails, getPaymentMenu } from '../../Services/api/DailySpendApi';
import { app } from '../../Services/FireBaseDB/Configuration';
import './index.css'
import { getDatabase, push, ref, set, get, remove } from 'firebase/database';
import Notification from '../../Component/Notification/NotificationLayout';

const PushToFirebaseFromSql = () => {

    const [data, setData] = useState([])

    const firebaseConfig = (pathLoc: string) => {
        return ref(getDatabase(app), pathLoc)
    }

    const Push_Sync = (pathLoc: string, data: any) => {
       return set(push(firebaseConfig(pathLoc)), data).then((result) => { console.log(result) }).catch(err => { console.log('error!!..') })

    }

    const Get_sync = (pathLoc: string) => {
        return get(firebaseConfig(pathLoc))
    }

    const Delete_Sync = (pathLoc: string, id: string) => {
        remove(firebaseConfig(pathLoc + id))
    }

    const OverAllSpendPush_Sync = () => {
        const overAllSpendAddress = 'DailySpend/Profile/OverAllSpendMonth'

        getOverAllMonthDetails().then(async (res) => {
            if (res.status == '200') {

                const getData = await Get_sync(overAllSpendAddress)
                if (getData.exists()) {
                    const tempDB = getData.val()
                    const tempData = Object.keys(tempDB).map((key, i) => {
                        return key
                    })

                    await Delete_Sync(overAllSpendAddress+'/', tempData[0]);


                    await Push_Sync(overAllSpendAddress, res.data);

                }
                else {

                    await Push_Sync(overAllSpendAddress, res.data);
                }
            }
        }).catch((err) => {
            console.log(" server error!!!")
        })
    }

    const PushDailySpendInfo=()=>{
     const DailyspendInfo = 'DailySpend/Profile/DailyspendInfo'

        getDailySpendInfo().then(async (res) => {
            if (res.status == '200') {

                const getData = await Get_sync(DailyspendInfo)
                if (getData.exists()) {
                    const tempDB = getData.val()
                    const tempData = Object.keys(tempDB).map((key, i) => {
                        return key
                    })

                    await Delete_Sync(DailyspendInfo+'/', tempData[0]);


                    await Push_Sync(DailyspendInfo, res.data);

                }
                else {

                    await Push_Sync(DailyspendInfo, res.data);
                }
            }
        }).catch((err) => {
            console.log(" server error!!!")
        })
    }

    const PaymentMenu_sync = () => {
        const addressPayment='DailySpend/Payment/DropDownList'
        getPaymentMenu().then(async (res) => {
            const getData = await Get_sync(addressPayment)
            if (getData.exists()) {
                const tempDB = getData.val()
                const dataID = Object.keys(tempDB).map((key, i) => {
                    return key
                })[0]
                console.log(dataID,'data id')
                await Delete_Sync(addressPayment+'/',dataID)
                await Push_Sync(addressPayment, res.data)
            }else
            {
                Push_Sync(addressPayment, res.data)
            }
        })
    }


    const FireBasePushFromSql = () => {
        //used to handle over all spend per month and year
        OverAllSpendPush_Sync();
        PaymentMenu_sync();
        PushDailySpendInfo();
    }

    return (
        <>
            <div className='sync-btn'></div>
            <Button size='full' Btext='Sync' onclick={() => { FireBasePushFromSql() }} />
        </>
    )
}

export { PushToFirebaseFromSql };