const EQUIVALENCE_TABLE = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100,
};
const TOTAL_COINS_TABLE = {};

function getTotalInCash(cid){
    let totalInCash = 0;
    cid.forEach(e => {
        totalInCash += e[1];
        TOTAL_COINS_TABLE[e[0]] = Math.round(e[1] / EQUIVALENCE_TABLE[e[0]]);
    });
    return totalInCash;
}

function checkCashRegister(price, cash, cid) {

    let change = parseFloat((cash - price).toFixed(2));
    const TOTAL_IN_CASH = getTotalInCash(cid);
    const EQUIVALENCES_OF_CURRENCY = Object.values(EQUIVALENCE_TABLE);//e.g  0.01,0.05
    const KEYS_OF_CURRENCY = Object.keys(EQUIVALENCE_TABLE);//e.g  PENNY,DIME


    if (change == TOTAL_IN_CASH) {
        return {
            "status": "CLOSED",
            "change": cid
        }
    }

    let greater_currency_index = EQUIVALENCES_OF_CURRENCY.length;

    let current_index = 0;
    const response = [];
    while (current_index < greater_currency_index) {


        if (change <= EQUIVALENCES_OF_CURRENCY[current_index] || current_index + 1 == greater_currency_index) {


            let id = current_index == 0 ? 0 : current_index - 1;
            let previousKeyCurrency = KEYS_OF_CURRENCY[id]; // e.g : PENNY
            let totalCoinsAvailable = TOTAL_COINS_TABLE[previousKeyCurrency];
            let totalCoinsNeeded = Math.trunc(change / EQUIVALENCE_TABLE[previousKeyCurrency]);
            let diff = totalCoinsAvailable - totalCoinsNeeded;

            if (diff > 0) {
                let value = parseFloat((totalCoinsNeeded * EQUIVALENCES_OF_CURRENCY[id]).toFixed("2"))
                change = parseFloat((((change * 100) % (EQUIVALENCE_TABLE[previousKeyCurrency] * 100) / 100)).toFixed("2"));
                response.push([previousKeyCurrency, value]);

            } else {
                if (totalCoinsAvailable > 0) {
                    let value = (totalCoinsAvailable * EQUIVALENCES_OF_CURRENCY[id]);
                    change = change - value;
                    response.push([previousKeyCurrency, value]);
                }
            }
            greater_currency_index = current_index;
            if (change == 0) break;
            current_index = -1;

        }
        current_index++;


    }
    let isThereStillChangeToReturn = change > 0;
    if (isThereStillChangeToReturn) return {status: "INSUFFICIENT_FUNDS", change: []}


    return {
        "status": "OPEN",
        "change": response
    }

}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);