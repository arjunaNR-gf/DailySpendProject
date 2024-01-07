
import { useState } from 'react';
import { data } from '../../Services/api/DailySpendApi';
import '../CalculationHome/index.css'
import EntryPage from '../EntryPage/EntryPage';
import ViewData from '../ViewData/ViewDataPage';
import HomePage from '../Home/HomePage';




const CalculationEntryHome = () => {
    const headigList = ['Home','EntryMain', 'ViewData', 'Help', 'Profile']

    const [route, setRoute] = useState<number>(0)

    return (
        <>

            <div className="calculation_box">
                <div className="heading_text">
                    <h3>{data.CalculationEntryHome.CalculationEntryHomeTitle}</h3>
                    <div className='heading_option_main'>

                        <ul >
                            {
                                headigList.map((item, i) => {
                                    return (
                                        <>
                                            <li key={i + 'header_list'} onClick={() => setRoute(i)}>{item}</li>
                                        </>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>


                <div className="calculation_input_box">
                    {route === 0 ? <HomePage /> : route === 1 ? <EntryPage /> : route == 2 ? <ViewData /> : ''}



                </div>

            </div>



        </>
    )
}

export default CalculationEntryHome;