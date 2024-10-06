import Profile from "../../Pages/Profile/Profile";
import ITrade from "../Interface/Trade/ITrade";
import ClientApi from "./ApiConfigSetup";
import IMoney from "./ApiInterface";

const data =
{
    "CalculationEntryHome": {
        "CalculationEntryHomeTitle": "DailySpend(Service Layer)",
        "CalculationHomePopup": {
            "contentSuccess": "Information saved successfully!",
            "contentFailure": "Information not saved!"
        },
        "Entry":{
            "DailyspendPaymentToList":['Marchant', 'Loan', 'Hotel','Snacks', 'Family','Rent','Zomato']
        },
        "Navigation":  [
            {
                "name": "Home",
                "active": 1,
                "routeSN":0                
            },
            {
                "name": "DailySpend",
                "active": 1,
                "routeSN":1  
            },
            {
                "name": "Trade",
                "active": 0,
                "routeSN":2 
            },
            {
                "name": "Account Data Sync",
                "active": 1,
                "routeSN":6
            },
            {
                "name": "Help",
                "active": 0,
                "routeSN":3
            },
            {
                "name":"Profile",
                "active":0,
                 "routeSN":4
            }
        ]
    }

}
const pushSpendMoney = (data: IMoney) => {
    return ClientApi.post('DailSpend', data)
}
const postTradeBuy = (data: ITrade) => {
   console.log('clickSell', data)
    return ClientApi.post('Trade/Buy', data)
}

const postTradeSell = (data: ITrade) => {
    //console.log('clickSell', data)
    return ClientApi.post('Trade/Sell', data)
}

const getOverallBuy = () => {
    return ClientApi.get('Trade/getTrade')
}

const getShareNames = () => {
    return ClientApi.get('Trade/getTradeShareNames')
}

const getPlatFormNames = () => {
    return ClientApi.get('Trade/getTradePlatForms')
}

const getDailSpendMonthOrYear=(type:number,month:string,year:string)=>{
    console.log(type,month,year)
    return ClientApi.get(`DailSpend/getExpenditure/${type}/${month}/${year}`)
}

const getLastUpdateDailySpend=()=>{
    return ClientApi.get('DailSpend/getLastUpdate')
}

const getMonthMenu=()=>{
    return ClientApi.get('DailSpend/getMonthMenu')
}

const getPaymentMenu=()=>{
    return ClientApi.get('DailSpend/getPaymentTypes')
}

const getPaymentMenuByRs=()=>{
    return ClientApi.get('DailSpend/getPaymentMenuByRs')
}

const getOverAllMonthDetails=()=>{
    return ClientApi.get('DailSpend/getOverallMonthDetails')
}

export { pushSpendMoney, getOverAllMonthDetails,data, postTradeBuy,getPaymentMenu,postTradeSell,getMonthMenu,getShareNames,getOverallBuy,getPlatFormNames,getDailSpendMonthOrYear,getLastUpdateDailySpend,getPaymentMenuByRs }

