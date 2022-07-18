import { useContext } from "react";
import { Text } from "react-native";
import ExpenseOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDate } from "../util/date";

function RecentExpensesScreen() {
  const expenseContext = useContext(ExpenseContext);

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDate(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpenseOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallBackText="No Expenses for the Last 7 Days"
    />
  );
}

export default RecentExpensesScreen;
