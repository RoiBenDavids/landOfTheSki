export const getTotalPriceForPax = (pax, prices) =>
    Object.keys(pax).reduce(
        (acc, paxType) => {
            if (pax[paxType]) {
                acc.amount += prices[paxType].amount * pax[paxType]
                acc.currency = prices[paxType].currency
            }
            return acc
        },
        {amount: 0, currency: null}
    )
