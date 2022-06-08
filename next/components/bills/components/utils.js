import { formatMoney } from "../../../utils/moneyUtils";

export function getTransferTotals(income, bills) {
  const toReturn = [];

  if (income && bills) {
    const { herIncomeTotal, myIncomeTotal, totalIncome } = income;
    const { herTotalThisMonth, myTotalThisMonth, totalThisMonth } = bills;

    const herDeficit = herTotalThisMonth > herIncomeTotal ? herTotalThisMonth - herIncomeTotal : 0;
    const herExtra = herIncomeTotal > herTotalThisMonth ? herIncomeTotal - herTotalThisMonth : 0;

    const myDeficit = myTotalThisMonth > myIncomeTotal ? myTotalThisMonth - myIncomeTotal : 0;
    const myExtra = myIncomeTotal > myTotalThisMonth ? myIncomeTotal - myTotalThisMonth : 0;

    const leftover = totalIncome - totalThisMonth;

    let xferToHerForSharedExpenses = 0;
    let xferToHerAsExtra = 0;

    let xferToMeForSharedExpenses = 0;
    let xferToMeAsExtra = 0;

    if (leftover > 0) {
      if (herDeficit) {
        xferToHerForSharedExpenses += herDeficit;
        xferToHerAsExtra += leftover / 2;
      } else if (myDeficit) {
        xferToMeForSharedExpenses += myDeficit;
        xferToMeAsExtra += leftover / 2;
      } else if (myExtra > herExtra) {
        xferToHerAsExtra += (myExtra - herExtra) / 2;
      } else if (herExtra > myExtra) {
        xferToMeAsExtra += (herExtra - myExtra) / 2;
      }
    } else {
      if (herDeficit && myExtra) {
        if (myExtra > herDeficit) xferToHerForSharedExpenses += herDeficit + ((myExtra - herDeficit) / 2);
        else xferToHerForSharedExpenses += myExtra + ((herDeficit - myExtra) / 2);
      }

      if (myDeficit && herExtra) {
        if (herExtra > myDeficit) xferToMeForSharedExpenses += myDeficit + ((herExtra - myDeficit) / 2);
        else xferToMeForSharedExpenses += herExtra + ((myDeficit - herExtra) / 2);
      }

      if (myDeficit && !herDeficit) {
        xferToMeForSharedExpenses += myDeficit / 2;
      }

      if (herDeficit && !myDeficit) {
        xferToHerForSharedExpenses += (herDeficit) / 2;
      }
    }

    if (xferToHerForSharedExpenses) {
      toReturn.push({
        msg: `K xfer to C`,
        amount: formatMoney(xferToHerForSharedExpenses),
        se: true
      });
    }
    if (xferToMeForSharedExpenses) {
      toReturn.push({
        msg: `C xfer to K`,
        amount: formatMoney(xferToMeForSharedExpenses),
        se: true
      });
    }
    if (xferToHerAsExtra) {
      toReturn.push({
        msg: `K xfer to C`,
        amount: formatMoney(xferToHerAsExtra),
        se: false
      });
    }
    if (xferToMeAsExtra) {
      toReturn.push({
        msg: `C xfer to K`,
        amount: formatMoney(xferToMeAsExtra),
        se: false
      });
    }
  }

  return toReturn;
}