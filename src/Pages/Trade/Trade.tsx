import './index.css'
import Button from '../../Component/Button';
import Input from '../../Component/Input/Index';
import { useEffect, useState } from 'react';
import Notification from '../../Component/Notification/NotificationLayout';
import { ArrowDownCircle, RefreshIcon } from '../../assests/image/icon';
import Dropdown from '../../Component/Dropdown/Dropdown';
import ITrade from '../../Services/Interface/Trade/ITrade';
import { getOverallBuy, getPlatFormNames, getShareNames, postTradeBuy, postTradeSell } from '../../Services/api/DailySpendApi';

const Trade = () => {


    const tableHeadings = [
        'Share Name',
        'Trade PlatForm',
        'Action'
    ]

    const [tradeAction, setTradeAction] = useState('')

    const [notification, setNotification] = useState({
        activeStatus: false,
        subject: ''
    });


    const [sellPage, setSellPage] = useState(false)

    const [inputField, setInputField] = useState({
        TID: '234B5C87-C435-48BC-A306-B9D169425304',
        shareName: '',
        tradeActionType: '',
        dateShareB: '',
        AmountPurchasedAt: '',
        AmountSoldAt: '',
        NumberOfShare: '',
        TradePlatForm: '',
        dateShareS: '',
    })
    const Refresh = () => {
        setTimeout(() => {
            setInputField({
                TID: '234B5C87-C435-48BC-A306-B9D169425304',
                shareName: '',
                tradeActionType: '',
                dateShareB: '',
                AmountPurchasedAt: '',
                AmountSoldAt: '',
                NumberOfShare: '',
                TradePlatForm: '',
                dateShareS: '',
            })
            setSellPage(false)
        }, 20);

    }

    const InputHandler = (e: any) => {
        const { name, value } = e.target;
        setInputField((prevState) => ({ ...prevState, [name]: value }))
    }

    const OnclickSubmit = () => {
        if (tradeAction === 'B') {

            const bdata: ITrade
                =
            {
                TradeAction: tradeAction,
                TID: inputField.TID,
                ShareName: shareNamesList.filter((item) => item.description === inputField.shareName && item.sharecd)[0].sharecd,
                TradePlatForm: tradePlatFOrmList.filter((item) => item.description === inputField.TradePlatForm && item.platformcd)[0].platformcd,
                Buy:
                {
                    dateShareB: new Date(inputField.dateShareB),
                    NumberOfShare: parseInt(inputField.NumberOfShare),
                    AmountPurchasedAt: parseFloat(inputField.AmountPurchasedAt),

                },
                Sell: null
            }
            postTradeBuy(bdata).then(res => {
                if (res.status === 200) {
                    if (res.data.result === 'Saved') {
                        setTimeout(() => {
                            Refresh();
                            setNotification({ activeStatus: true, subject: 'Data saved successfully' })
                        }, 10);
                    } else {
                        setTimeout(() => {
                            Refresh();
                            setNotification({ activeStatus: true, subject: 'Error' })
                        }, 10);
                    }

                }
            }).catch((error: any) => {
                console.log(error, 'error')
                setNotification({ activeStatus: true, subject: error })
            })

        }
        else if (tradeAction === 'S') {
            const bdata: ITrade =
            {
                TradeAction: tradeAction,
                TID: inputField.TID,
                ShareName: inputField.shareName,
                TradePlatForm: inputField.TradePlatForm,
                Buy: null,
                Sell:
                {
                    dateShareS: new Date(inputField.dateShareS),
                    NumberOfShare: parseInt(inputField.NumberOfShare),
                    AmountSoldAt: parseFloat(inputField.AmountSoldAt),
                    PorL: 0

                }
            }
            postTradeSell(bdata).then(res => {
                if (res.status === 200) {
                    setTimeout(() => {
                        Refresh();
                        setNotification({ activeStatus: true, subject: 'Data saved successfully' })
                    }, 10);
                    displayBuy();
                }
            }).catch((error: any) => {
                console.log(error, 'error')
                setNotification({ activeStatus: true, subject: error })
            })

        }

    }
    const CloseFun = () => {
        setNotification({ activeStatus: false, subject: '' })
    }



    const [overAllBuy, setOverAllBuy] = useState([{
        TID: '',
        ShareName: '',
        TradePlatForm: '',
        ShareKhanToltal: '',
        KotakNeonTotal: 0
    }])
    const displayBuy = () => {
        displayTradePlatformName()
        let total = 0
        getOverallBuy().then(res => {
            if (res.status === 200) {
                setOverAllBuy(
                    res.data.filter((item: any) => item.sell === null).map((item: any) =>
                    ({
                        ShareName: item.shareName,
                        TID: item.tid,
                        TradePlatForm: tradePlatFOrmList.filter((itm) => itm.platformcd === item.tradePlatForm && itm.description)[0].description,


                    }))
                )

                var j =res.data.filter((item: any) => item.sell === null).map((item: any) => {
                    return item.buy.numberOfShare * item.buy.amountPurchasedAt
                }
                ).reduce((accumulator:any, currentValue:any) => accumulator + currentValue,
                total,
              );

                console.log(j, 'dskadljkl')
            }
        }).catch(() => {
            console.log('server offline!!')
        })

    }

    useEffect(() => {

    }, [])

    const [shareNamesList, setShareNamesList] = useState([{
        sharecd: '',
        description: ''
    }])
    const displayShareName = () => {
        getShareNames().then((res) => {
            if (res.status === 200) {
                setShareNamesList(
                    res.data.map((item: any) => ({
                        sharecd: item.shareNamecd,
                        description: item.description
                    }))
                )
            }
        }).catch(() => {
            console.log('server offline!!')
        })
    }
    const [tradePlatFOrmList, setTradePlatFOrmList] = useState([{
        platformcd: '',
        description: ''
    }])
    const displayTradePlatformName = () => {

        getPlatFormNames().then(res => {
            if (res.status === 200) {
                setTradePlatFOrmList(
                    res.data.map((item: any) => ({
                        platformcd: item.platFormCD,
                        description: item.description
                    }))
                )
            }
        }).catch(() => {
            console.log('server offline!!')
        })
    }


    const dropdown_Click = (name: string, value: string) => {
        setInputField((prevState) => ({ ...prevState, [name]: value }))
        if (value.toLowerCase() == "buy" || value.toLocaleLowerCase() === 'sell') {
            Refresh();
            if (value.toLowerCase() == "buy") {
                setTradeAction('B')
                displayShareName();
                setTimeout(() => {
                    displayTradePlatformName();
                }, 30);
            }
            else if (value.toLocaleLowerCase() === 'sell') {
                setTradeAction('S')
                displayBuy();
            }
        }

    }

    const dropdown_List = (data: any) => {
        return data.map((item: any) => { return (item.description) })
    }


    const changeAction = () => {
        setTradeAction('')
        Refresh();

    }




    const onSellbtn = (id: string) => {
        var data = overAllBuy.filter(item => item.TID === id)
        setInputField((prevState) => ({
            ...prevState,
            TID: data[0].TID,
            shareName: data[0].ShareName,
            TradePlatForm: data[0].TradePlatForm,
        }))
        console.log(inputField, 'inputfield')
        setSellPage(true)
    }

    return (
        <>
            {notification.activeStatus && <Notification click={CloseFun} content={notification.subject} />}
            <div className='Entry_page_main'>
                <div className='form_divider'>
                    <h4>WELCOME TO TRADE UPDATE</h4>
                </div>


                {
                    tradeAction === 'B' ?
                        <>
                            <div className='form_divider'>
                                <Input placeholder='Enter Date You Traded' label='Date of Trade Buy :' type='date' name='dateShareB' val={inputField.dateShareB} onchange={InputHandler} size='small' />
                            </div>
                            <div className='form_divider'>
                                <Dropdown title='Traded Platform :' size='full' placeholder='Select  Platform' name='TradePlatForm' value={inputField.TradePlatForm} dataAry={dropdown_List(tradePlatFOrmList)} onclick={dropdown_Click} />
                            </div>
                            <br></br><br></br>
                            <div className='form_divider'>
                                <Dropdown title='Name of The Share :' size='full' placeholder='Select  Share' name='shareName' value={inputField.shareName} dataAry={dropdown_List(shareNamesList)} onclick={dropdown_Click} />
                            </div>
                            <br></br><br></br>
                            <div className='form_divider'>
                                <Input placeholder='Enter Number of Share' label='Total Number Share  Purchased :' type='text' name='NumberOfShare' val={inputField.NumberOfShare} onchange={InputHandler} size='medium' />
                            </div>
                            <div className='form_divider'>
                                <Input placeholder='Enter Amount' label='Share Purchased At :' type='text' name='AmountPurchasedAt' val={inputField.AmountPurchasedAt} onchange={InputHandler} size='medium' />
                            </div>


                        </>
                        :
                        tradeAction === 'S' ?
                            <>
                                <div className='form_divider'>
                                    {(overAllBuy.length > 0 && !sellPage) &&
                                        <table >
                                            <thead>
                                                <tr>
                                                    {
                                                        tableHeadings.map((item, i) => {
                                                            return (
                                                                <th key={i}>{item}</th>
                                                            )
                                                        })

                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    overAllBuy.map((item) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{item.ShareName}</td>
                                                                    <td>{item.TradePlatForm}</td>
                                                                    <td><Button onclick={() => onSellbtn(item.TID)} size='small' Btext='sell'></Button></td>
                                                                </tr>
                                                            </>

                                                        )
                                                    })
                                                }

                                            </tbody>


                                        </table>
                                    }
                                </div>
                                {sellPage &&
                                    <>
                                        <div className='form_divider'>
                                            <Input placeholder='Enter Date You Sold' label='Date of Trade Sold' type='date' name='dateShareS' val={inputField.dateShareS} onchange={InputHandler} size='medium' />
                                        </div>
                                        <div className='form_divider'>
                                            <Input placeholder='Name of The Share' label='shareName' type='text' name='sharename' val={inputField.shareName} onchange={InputHandler} size='full' />
                                        </div>

                                        <div className='form_divider'>
                                            <Input placeholder='Enter Number of Share Sold' label=' Number Share Sell :' type='text' name='NumberOfShare' val={inputField.NumberOfShare} onchange={InputHandler} size='full' />
                                        </div>

                                        <div className='form_divider'>
                                            <Input placeholder='Enter Amount' label='Share Sell At :' type='text' name='AmountSoldAt' val={inputField.AmountSoldAt} onchange={InputHandler} size='medium' />
                                        </div>


                                        <div className='form_divider'>
                                            <Dropdown title='Traded Platform :' size='full' placeholder='Select  Platform' name='TradePlatForm' value={inputField.TradePlatForm} dataAry={['ShareKhan', 'Kotak neon']} onclick={dropdown_Click} />
                                        </div>
                                    </>
                                }
                            </>
                            :
                            <div className='form_divider'>
                                <Dropdown size='medium' title='Trade Type' placeholder='Select Traded Platform' name='tradeActionType' value={inputField.tradeActionType} dataAry={['Buy', 'Sell']} onclick={dropdown_Click} />
                            </div>

                }
                <br></br>
                <div className='form_divider--foot'>
                    <Button Btext='SUBMIT' icon={<ArrowDownCircle color='white' />} disabled={tradeAction === '' ? true : false} onclick={OnclickSubmit} size='full' />
                    <Button Btext='REFRESH' icon={<RefreshIcon color='white' />} disabled={tradeAction === '' ? true : false} onclick={Refresh} size='small' />
                    <Button Btext='MAIN' onclick={changeAction} disabled={tradeAction === '' ? true : false} size='small' />

                </div>

            </div>
        </>
    )
}

export default Trade;