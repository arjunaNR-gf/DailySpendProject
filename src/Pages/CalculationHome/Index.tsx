
import { useState } from 'react';
import { data } from '../../Services/api/DailySpendApi';
import '../CalculationHome/index.css'
import EntryPage from '../EntryPage/EntryPage';
import HomePage from '../Home/HomePage';
import Trade from '../Trade/Trade';
import Profile from '../Profile/Profile';
import { url } from 'inspector';




const CalculationEntryHome = () => {
    const DailSpendEntryPage = 'https://arjunanr-gf.github.io/DailySpendLocal/'
    const headigList = ['HOME', 'DAILY SPEND', 'TRADE', 'HELP', 'PROFILE']

    const [route, setRoute] = useState<number>(0)

    const application_Redirect=(urlData)=>{
        window.location.replace(urlData);
    }

    return (
        <>

            <div className="calculation_box">
                <div className="nav--menu">
                    <div className="heading_text">
                    <h3>{data.CalculationEntryHome.CalculationEntryHomeTitle}</h3>
                    </div>
                    
                    <div className='heading_option_main'>

                        <ul >
                            {
                                data.CalculationEntryHome.Navigation.map((item, i) => {
                                    if (Boolean(item.active))
                                        return (
                                            <>
                                                <li key={i + 'header_list'} onClick={() => setRoute(i)}>
                                                    {item.name}
                                                </li>
                                            </>
                                        )
                                })
                            }
                        </ul>
                    </div>
                </div>


                <div className="calculation_input_box">
                    {
                        route === 0 ? <HomePage /> : route === 1 ? application_Redirect(DailSpendEntryPage) : route == 2 ? <Trade /> : route == 5 ? <Profile /> : ''

                    }
                </div>

            </div>



        </>
    )
}

export default CalculationEntryHome;