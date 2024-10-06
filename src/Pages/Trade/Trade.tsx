import { useState } from 'react';
import Button from '../../Component/Button';
import { getDailSpendMonthOrYear, getOverAllMonthDetails } from '../../Services/api/DailySpendApi';
import { app } from '../../Services/FireBaseDB/Configuration';
import './index.css'
import { getDatabase, push, ref, set, get, remove } from 'firebase/database';
import Notification from '../../Component/Notification/NotificationLayout';

const PushToFirebaseFromSql = () => {

    const [data, setData] = useState([])

    const FireBasePushFromSql = () => {
        getOverAllMonthDetails().then(async (res) => {
            if (res.status == '200') {
                console.log(res.data)
                const db = getDatabase(app);
                const dbRef = ref(db, 'DailySpend/Profile/OverAllSpendMonth')
                const getData = await get(dbRef)
                if (getData.exists()) {
                    const tempDB = getData.val()
                    const tempData = Object.keys(tempDB).map((key, i) => {
                        return key
                    })
                    const dbf = getDatabase(app);
                    const dbRef = ref(dbf, 'DailySpend/Profile/OverAllSpendMonth/' + tempData[0]);
                    await remove(dbRef)

                    const db = getDatabase(app)
                    const pushRef = push(ref(db, 'DailySpend/Profile/OverAllSpendMonth'));
                    set(pushRef, res.data).then((result) => {
                        console.log('success')
                    }).catch(err => {
                        console.log(err, 'error')
                    })
                }
                else {
                   const db = getDatabase(app)
                    const pushRef = push(ref(db, 'DailySpend/Profile/OverAllSpendMonth'));
                    set(pushRef, res.data).then((result) => {
                        console.log('success')
                    }).catch(err => {
                        console.log(err, 'error')
                    })
                }
            }
        }).catch((err) => {
            console.log(" server error!!!")
        })



    }

    return (
        <>
        <div className='sync-btn'></div>
            <Button size='full' Btext='Sync'  onclick={() => { FireBasePushFromSql() }} />
        </>
    )
}

export { PushToFirebaseFromSql };