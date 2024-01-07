import './index.css'
import Button from '../../Component/Button';
import Input from '../../Component/Input/Index';
import { pushSpendMoney,data } from '../../Services/api/DailySpendApi';
import IMoney from '../../Services/api/ApiInterface';
import { useState } from 'react';
import Notification from '../../Component/Notification/NotificationLayout';
import { ArrowDownCircle, RefreshIcon } from '../../assests/image/icon';


const EntryPage=()=>{
    

    const [inputField, setInputField] = useState({
        amount: '',
        description: '',
        date: ''
    })

    const [notification, setNotification] = useState({
        activeStatus: false,
        subject: ''
    });

    const Refresh = () => {
        setTimeout(() => {
            setInputField({
                amount: '',
                description: '',
                date: ''
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

    const OnclickSubmit = () => {

        const idata: IMoney = { Amount: parseInt(inputField.amount), Date: new Date(inputField.date), Description: inputField.description.toUpperCase() }
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
            }
            else {
                setNotification((prevStatus) => ({
                    ...prevStatus,
                    activeStatus: true,
                    subject: data.CalculationEntryHome.CalculationHomePopup.contentFailure
                }))
            }
        })
        // setNotification(true)
    }
    const CloseFun = () => {
        setNotification({ activeStatus: false, subject: '' })
    }

    return(
        <>
         {notification.activeStatus && <Notification click={CloseFun} content={notification.subject} />}
        <div className='Entry_page_main'>
      
                    <div className='form_divider'>
                        <Input placeholder='Amount' label='Amount' type='text' name='amount' val={inputField.amount} onchange={InputHandler} size='small' />
                    </div>
                    <div className='form_divider'>
                        <Input placeholder='Enter Description' label='Description' type='text' name='description' val={inputField.description} onchange={InputHandler} size='full' />
                    </div>
                    <div className='form_divider'>
                        <Input placeholder='Enter Date Spend' label='Date' type='date' name='date' val={inputField.date} onchange={InputHandler} size='medium' />
                    </div>

                    <div className='form_divider'>
                        <Button Btext='SUBMIT' icon={<ArrowDownCircle color='white' />} onclick={OnclickSubmit} disabled={false} size='full' />
                        <Button Btext='REFRESH' icon={<RefreshIcon color='white' />}  onclick={Refresh} disabled={false} size='small' />
                    </div>

                </div>
  
        </>
    )
}

export default EntryPage;