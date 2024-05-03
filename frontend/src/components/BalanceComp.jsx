
export function BalanceComp({balance}){

    
    function numberWithCommas(x) {
        return Number(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return <div className="flex p-5">
        <div className="mr-2 font-bold">Balance: </div> <span className="font-bold">₹ {numberWithCommas(balance)}</span>
    </div>
}