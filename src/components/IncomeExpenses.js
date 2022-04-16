import React, {useContext} from 'react';
import {GlobalContext} from "../context/GlobalState";

function moneyFormater(num) {
    let p = num.toFixed(2).split('.');
    return(
        '$' +
        p[0]
            .split('')
            .reverse()
            .reduce(function (acc, num, i, orig) {
                return num === '_' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
            }, '') +
        '.' +
        p[1]
    );
}

export const IncomeExpenses = () => {
    const {transactions} = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);

    const  expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
            -1

    );


    return (
        <div>
            <div>
                <h4>income</h4>
                <p>{moneyFormater(income)}</p>
            </div>
            <div>
                <h4>expense</h4>
                <p>{moneyFormater(expense)}</p>
            </div>
        </div>
    )
}