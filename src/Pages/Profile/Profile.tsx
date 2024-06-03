import { useEffect, useState } from 'react';
import Dropdown from '../../Component/Dropdown/Dropdown';

import './index.css'
import { data, getDailSpendMonthOrYear, getMonthMenu } from '../../Services/api/DailySpendApi';
import ChartPie from '../../Component/PiChart';

const Profile = () => {
    const income = "770000"
    const Buget = "230000"


    const [menuMonth, setMenuMonth] = useState()

    const [totalSpend, setTotalSpend] = useState({ total: '' })


    useEffect(() => {
        getMonthMenu().then((res: any) => {
            setMenuMonth(res.data)
        }

        )

        getDailSpendMonthOrYear(2, "January", "2024").then(res => {
            setTotalSpend((prevState) => ({
                ...prevState,
                total: res.data
            }))
        })
    }, [setMenuMonth, setTotalSpend])

    const month = ['January', 'February']
    const year = ['2023', '2024']

    const [inputField, setInputField] = useState({ month: '', year: '' })
    const [total, setTotal] = useState({ Year: '', Month: '' })



    const dropdown_Click = (name: string, value: string) => {
        setInputField((prevState) => ({ ...prevState, [name]: value.toUpperCase() }))
        if (name === 'month') {

            getDailSpendMonthOrYear(1, value, '2024').then(res => {
                setTotal((prevState) => ({
                    ...prevState,
                    Month: res.data
                }))
            })
        }
        else if (name === 'year') {
            getDailSpendMonthOrYear(2, "January", value).then(res => {
                setTotal((prevState) => ({
                    ...prevState,
                    Year: res.data
                }))
            })
        }

    }

    const data  = [
        { argument: "Monday", value: 10 },
        { argument: "Tuesday", value: 40 },
        { argument: "Wednesday", value: 10 },
        { argument: "Thursday", value: 20 },
        { argument: "Friday", value: 20 },
    ];

    const colors = ['red', 'blue', 'green']

    return (
        <>
            <div className="profile--home">
                {/* <div className='profile--home--client'>
                    <Dropdown  dataAry={month} placeholder='select month' size='small' name='month' value={inputField.month} onclick={dropdown_Click}></Dropdown>
                    <br></br>
                    <Dropdown dataAry={year} placeholder='select year' size='small' name='year' value={inputField.year} onclick={dropdown_Click}></Dropdown>

                </div> */}
                <div className='profile--client--info'>
                    <div className='profile--yearly budget--remain-cal'>
                        <div className='budget--remain-cal--wings'>
                            <span><p><strong>Income</strong> </p></span>
                            <div className='year--exspend'>
                                <h5>{income}</h5>
                            </div>
                        </div>
                        <div className='budget--remain-cal--wings'>
                            <span><p><strong>Savings</strong> </p></span>
                            <div className='year--exspend'>
                                <h5>{parseInt(income) - parseInt(Buget)}</h5>
                            </div>

                        </div>
                        <div className='budget--remain-cal--wings'>
                            <span><p><strong>E-Budget</strong> </p></span>
                            <div className='year--exspend'>
                                <h5>2,30,0000</h5>
                            </div>
                        </div>
                        <div className='budget--remain-cal--wings'>
                            <span><p><strong>Remaining-A-E</strong></p></span>
                            <div className='year--exspend'>
                                <h5>{230000 - parseInt(totalSpend.total)}</h5>
                            </div>
                        </div>






                        {/* <span><p><strong>{inputField.year}</strong>Budget for Exipenditure</p></span>
                       
                        
                        <span><p><strong>{inputField.year}</strong>Budget for Exipenditure</p></span> */}

                    </div>
                </div>
                <div className='profile--client--info'>


                    <div className='profile--yearly'>
                        {inputField.year !== '' &&
                            <div className='year--exspend'>
                                <h5>{total.Year}</h5>
                            </div>
                        }
                        <span><p><strong>{inputField.year}</strong> Expenditure</p></span>
                        <Dropdown dataAry={year} placeholder='SELECT YEAR' size='small' name='year' value={inputField.year} onclick={dropdown_Click}></Dropdown>

                    </div>

                    <div className='profile--yearly'>
                        {inputField.month !== '' &&
                            <div className='year--exspend'>
                                <h5>{total.Month}</h5>
                            </div>
                        }
                        <span><p><strong>{inputField.month}</strong> Expenditure</p></span>
                        <Dropdown dataAry={menuMonth !== undefined ? menuMonth : []} placeholder='SELECT MONTH' size='small' name='month' value={inputField.month} onclick={dropdown_Click}></Dropdown>
                    </div>
                </div>
                
            </div>
        </>
    )
}
export default Profile;