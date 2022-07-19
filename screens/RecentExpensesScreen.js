import { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import ExpenseOutput from "../components/ExpenseOutput/ExpensesOutput";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDate } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpensesScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const expenseContext = useContext(ExpenseContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expenseContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsLoading(false);
    }

    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isLoading) {
    return <ErrorOverlay error={error} onConfirm={errorHandler} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
