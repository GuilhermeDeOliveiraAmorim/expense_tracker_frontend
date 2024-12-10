export const apiRoutes = {
  createUser: "/signup",
  login: "/login",
  createCategory: "/categories",
  createExpense: "/expenses",
  deleteExpense: "/expenses",
  getCategories: "/categories/all",
  getExpenses: "/expenses/all",
  getTags: "/tags/all",
  createTag: "/tags",
  deleteTag: "/tags",
  deleteCategory: "/categories",
  updateCategory: "/categories",
  updateExpense: "/expenses",
  updateTag: "/tags",
  getTotalExpensesForPeriod: "/expenses/total",
  getExpensesByCategoryPeriod: "/expenses/categories",
  getMonthlyExpensesByCategoryYear: "/expenses/categories/monthly",
  getMonthlyExpensesByTagYear: "/expenses/tags/monthly",
  getExpensesByMonthYear: "/expenses/monthly/year",
  getTotalExpensesForCurrentMonth: "/expenses/monthly/total",
  getTotalExpensesMonthCurrentYear: "/expenses/total/monthly/year",
  getCategoryTagsTotalsByMonthYear: "/expenses/tags/monthly/total",
  getAvailableMonthsYears: "/util/months/years",
  getDayToDayExpensesPeriod: "/expenses/day/day/period",
  getTagsDayToDay: "/expenses/tags/day/day",
};
