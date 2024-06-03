interface IBuy {
    dateShareB: Date,
    NumberOfShare: number,
    AmountPurchasedAt:number,
}
interface ISell {
    dateShareS: Date,
    AmountSoldAt:number;
    NumberOfShare: number,
    PorL:number;
}
interface ITrade {
    TID:string,
    TradeAction: string,
    ShareName: string,
    TradePlatForm: string,
    Buy: IBuy | null,
    Sell: ISell | null

}


export default ITrade;