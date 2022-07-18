import { useContext } from "react";
import { Text } from "react-native";
import ExpenseOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";

function AllExpensesScreen() {
  const expensesContext = useContext(ExpenseContext);
  return (
    <ExpenseOutput
      expensesPeriod="Total"
      expenses={expensesContext.expenses}
      fallBackText="No Expenses"
    />
  );
}

export default AllExpensesScreen;
