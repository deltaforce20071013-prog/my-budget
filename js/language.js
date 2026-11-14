
const translations = {
  uz: {
    totalBalance: "Umumiy balans",
    currency: "Valyuta",
    income: "Daromad",
    expense: "Xarajat",
    addIncome: "Daromad qo‘shish",
    addExpense: "Xarajat qo‘shish",
    history: "Operatsiyalar tarixi",
    empty: "Hozircha operatsiyalar mavjud emas",
    amount: "Miqdor",
    category: "Kategoriya",
    note: "Izoh",
    save: "Saqlash",
    incomeTitle: "Yangi daromad",
    expenseTitle: "Yangi xarajat",
    food: "Oziq-ovqat",
    transport: "Transport",
    shopping: "Xaridlar",
    salary: "Maosh",
    other: "Boshqa"
  },

  ru: {
    totalBalance: "Общий баланс",
    currency: "Валюта",
    income: "Доход",
    expense: "Расход",
    addIncome: "Добавить доход",
    addExpense: "Добавить расход",
    history: "История операций",
    empty: "Операций пока нет",
    amount: "Сумма",
    category: "Категория",
    note: "Примечание",
    save: "Сохранить",
    incomeTitle: "Новый доход",
    expenseTitle: "Новый расход",
    food: "Продукты",
    transport: "Транспорт",
    shopping: "Покупки",
    salary: "Зарплата",
    other: "Другое"
  },

  en: {
    totalBalance: "Total balance",
    currency: "Currency",
    income: "Income",
    expense: "Expenses",
    addIncome: "Add income",
    addExpense: "Add expense",
    history: "Transaction history",
    empty: "No transactions yet",
    amount: "Amount",
    category: "Category",
    note: "Note",
    save: "Save",
    incomeTitle: "New income",
    expenseTitle: "New expense",
    food: "Food",
    transport: "Transport",
    shopping: "Shopping",
    salary: "Salary",
    other: "Other"
  }
};

function setLanguage(lang) {
  const dictionary = translations[lang] || translations.uz;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;

    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });
}
