import './index.css'
import Button from '../../Component/Button';
import Input from '../../Component/Input/Index';
import { pushSpendMoney, data, getLastUpdateDailySpend, getPaymentMenu } from '../../Services/api/DailySpendApi';
import IMoney from '../../Services/api/ApiInterface';
import { useEffect, useState } from 'react';
import Notification from '../../Component/Notification/NotificationLayout';
import { ArrowDownCircle, RefreshIcon } from '../../assests/image/icon';
import Dropdown from '../../Component/Dropdown/Dropdown';


const EntryPage = () => {
    const [paymentMenu, setPaymentMenu] = useState([{
        paymentID: '',
        paymentDesc: ''
    }])

    const [inputField, setInputField] = useState({
        amount: '',
        description: '',
        date: '',
        paymentType: ''
    })

    const [notification, setNotification] = useState({
        activeStatus: false,
        subject: ''
    });

    const Refresh = () => {
        setPadActive(false)
        setTimeout(() => {
            setInputField({
                amount: '',
                description: '',
                date: '',
                paymentType: ''
            })
        }, 20);

    }

    const InputHandler = (e: any) => {
        const { name, value } = e.target;
        if (name != '') {
            if (name == 'amount') {
                if (inputField.amount !== '') {
                    setInputField((prevState) =>
                        ({ ...prevState, [name]: value }))
                }
                else {
                    setInputField((prevState) => ({ ...prevState, [name]: value }))
                }
            }
            else if (name == 'description' || name == 'date') {
                setInputField((prevState) => ({ ...prevState, [name]: value }))
            }
        }
    }
    const Fun_description = () => {

    }

    const OnclickSubmit = () => {
        if (inputField.amount !== '' && inputField.date !== '' && inputField.description !== '') {
            const idata: IMoney = { Amount: parseInt(inputField.amount), Date: new Date(inputField.date), Description: paymentMenu.filter((item) => item.paymentDesc === inputField.description)[0].paymentID }

            pushSpendMoney(idata).then(res => {
                if (res.data.result === "Saved") {
                    setNotification((prevStatus) => ({
                        ...prevStatus,
                        activeStatus: true,

                        subject: data.CalculationEntryHome.CalculationHomePopup.contentSuccess
                    }))
                    setTimeout(() => {
                        Refresh();
                        
                    }, 10);

                    setTimeout(() => {
                        CloseFun();
                    }, 700);
                }
                else {
                    setNotification((prevStatus) => ({
                        ...prevStatus,
                        activeStatus: true,
                        subject: data.CalculationEntryHome.CalculationHomePopup.contentFailure
                    }))
                }
            }).catch((err: any) => {
                setNotification((prevStatus) => ({
                    ...prevStatus,
                    activeStatus: true,

                    subject: 'service not available'
                }))
            })
        }
        else {
            setNotification({ activeStatus: true, subject: 'Please fill all details' })
        }
        // setNotification(true)
    }
    const CloseFun = () => {
        setNotification({ activeStatus: false, subject: '' })
    }

    const dropdown_Click = (name: string, value: string) => {
        setInputField((prevState) => ({ ...prevState, [name]: value }))
        console.log(name, value)
    }

    const [lastupdate, setLastUpdate] = useState('');


    useEffect(() => {
        getLastUpdateDailySpend().then(res => {
            setLastUpdate(res.data)
        }).catch((error: any) => {
            if (error.message === 'ERR_NETWORK') {
                setLastUpdate('offline')
                console.log("hello")
            }
            else {
                setLastUpdate('server offline')
            }
        })
        getPaymentMenu().then((res: any) => {
            console.log(res, 'payment')
            setPaymentMenu(res.data)
            console.log("hello")

        }).catch((error: any) => {
            if (error.message === 'ERR_NETWORK') {
                setLastUpdate('offline')
                console.log("hello")
            }
            else
            {
                console.log(error)
            }
        })

    }, [setPaymentMenu])

    const NumberData = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    ]

    const [padActive, setPadActive] = useState(false)
    const NumberPad = (num: number) => {

        setInputField((prevState: any) =>
            ({ ...prevState, ["amount"]: inputField.amount == undefined ? num : inputField.amount + '' + num }))
    }

    return (
        <>
            {notification.activeStatus && <Notification click={CloseFun} content={notification.subject} />}
            <div className='Entry_page_main'>
                <div className='hdst'>
                    <strong style={{ padding: '1rem', color: 'white', backgroundColor: '#073d51',borderRadius:"5px" }}>Last Update was on {lastupdate}</strong>
                </div>

                <br></br>
                <div className='input--enrtry--box'>
                {inputField.date == '' && <div className='form_divider'>
                    <Input placeholder='Enter Date Spend'
                     label='Date' type='date' name='date'
                      val={inputField.date} 
                      onchange={InputHandler}
                       size='medium'
                       transition='active'
                        />
                </div> }
               {(inputField.date != '' && inputField.description == '') &&
                <div className='form_divider'>
                    <Dropdown title='Payment To :' size='full' placeholder='select type' name='description' 
                    value={inputField.description} 
                    dataAry={paymentMenu.map((res) => { return res.paymentDesc })} 
                    onclick={dropdown_Click} />
                </div>} 
            
                {(inputField.date != '' && inputField.description != '') &&
                <div className='form_divider' onClick={()=>setPadActive(true)}>
                    <Input placeholder='Amount' label='Amount' type='text' name='amount'
                     val={inputField.amount} 
                     onchange={InputHandler} 
                     size='small'
                     transition='active'  />
                </div> }

                {padActive ? <div className='Number--pad'>
                    {
                        NumberData.map((item, i) => {
                            return (
                                <>
                                    <div className='pad--number--circle' onClick={() => NumberPad(item)}>{item}</div>
                                </>
                            )
                        })
                    }
                </div>
                    : ''}


</div>

               
 


                <div className='form_divider--foot'>
                    {(inputField.date !=''&& inputField.amount !='' && inputField.description != '')&&
                    <Button Btext='SUBMIT' icon={<ArrowDownCircle color='white' />} onclick={OnclickSubmit}
                        size='full' />}
                    <Button Btext='REFRESH' icon={<RefreshIcon color='white' />} onclick={Refresh} disabled={false} size='small' />
                </div>

            </div>

        </>
    )
}

export default EntryPage;