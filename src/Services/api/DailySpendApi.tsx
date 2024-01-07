import ClientApi from "./ApiConfigSetup";
import IMoney from "./ApiInterface";

const data =
    {
        "CalculationEntryHome": {
            "CalculationEntryHomeTitle": "!Calculation Home!",
            "CalculationHomePopup": {
                "contentSuccess": "Information saved successfully!",
                "contentFailure": "Information not saved!"
            }
        }

    }
    const pushSpendMoney = (data: IMoney) => {
        console.log(data,"dt")
        return ClientApi.post('DailSpend', data)
    }



export {pushSpendMoney,data}

