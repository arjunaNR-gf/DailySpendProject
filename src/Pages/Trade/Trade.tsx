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


    //this use to push all data by yearly base and rarely use
    const OverAllSpendPush_Sync = () => {
        const overAllSpendAddress = 'DailySpend/Profile/OverAllSpendMonth'

        getOverAllMonthDetails().then(async (res) => {
            if (res.status == '200') {

                const getData = await Get_sync(overAllSpendAddress)
                if (getData.exists()) {
                    console.log('data exist!')
                    const tempDB = getData.val()
                    const tempData = Object.keys(tempDB).map((key, i) => {
                        return key
                    })

                    for(let i = 0 ;i<tempData.length;i++)
                    await Delete_Sync(overAllSpendAddress+'/', tempData[0]);

                    setTimeout(async () => {
                    await Push_Sync(overAllSpendAddress, res.data);
                    }, 30);

                }
                else {

                    await Push_Sync(overAllSpendAddress, res.data);
                }
            }
        }).catch((err) => {
            console.log(" server error!!!")
        })
    }

    //this use to send all spend details by dateof spend of each element
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
                    for(let i = 0 ;i<tempData.length;i++)
                    await Delete_Sync(DailyspendInfo+'/', tempData[i]);

                    setTimeout(async () => {
                    await Push_Sync(DailyspendInfo, res.data);
                    }, 30);

                }
                else {

                    await Push_Sync(DailyspendInfo, res.data);
                }
            }
        }).catch((err) => {
            console.log(" server error!!!")
        })
    }

    //just for menu purpose
    const PaymentMenu_sync = () => {
        const addressPayment='DailySpend/Payment/DropDownList'
        getPaymentMenu().then(async (res) => {
            const getData = await Get_sync(addressPayment)
            if (getData.exists()) {
                const tempDB = getData.val()
                const tempData = Object.keys(tempDB).map((key, i) => {
                    return key
                })
                for(let i = 0 ;i<tempData.length;i++)
                await Delete_Sync(addressPayment+'/',tempData[i])

                setTimeout(async () => {
                await Push_Sync(addressPayment, res.data)
                },30)
            }else
            {
                Push_Sync(addressPayment, res.data)
            }
        })
    }




    return (
        <>
            <div className='sync-btn'>
            <Button size='full' Btext='Payment Menu' onclick={() => { PaymentMenu_sync() }} />
            <Button size='full' Btext='Year Spend  ' onclick={() => { OverAllSpendPush_Sync() }} />
            <Button size='full' Btext='Day Spend' onclick={() => { PushDailySpendInfo() }} />


            </div>
            
        </>
    )
}

export { PushToFirebaseFromSql };