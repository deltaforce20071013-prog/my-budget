
const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

let transactions = [];

try {
  transactions = JSON.parse(
    localStorage.getItem("myBudgetTransactions") || "[]"
  );

  if (!Array.isArray(transactions)) {
    transactions = [];
  }
} catch {
  transactions = [];
}

let currentType = "income";

const currencySelect = document.getElementById("currency");
const languageSelect = document.getElementById("language");
const modal = document.getElementById("modal");
const form = document.getElementById("transactionForm");

const categoryNames = {
  Food: "food",
  Transport: "transport",
  Shopping: "shopping",
  Salary: "salary",
  Other: "other"
};

function formatMoney(value, currency) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: currency === "UZS" || currency === "KRW" ? 0 : 2
  }).format(value) + " " + currency;
}

function saveData() {
  localStorage.setItem(
    "myBudgetTransactions",
    JSON.stringify(transactions)
  );
}

function getSelectedCurrency() {
  return currencySelect.value;
}

function updateDashboard() {
  const currency = getSelectedCurrency();

  const filtered = transactions.filter(
    item => item.currency === currency
  );

  const income = filtered
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = filtered
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  document.getElementById("balance").textContent =
    formatMoney(balance, currency);

  document.getElementById("income").textContent =
    formatMoney(income, currency);

  document.getElementById("expense").textContent =
    formatMoney(expense, currency);

  renderTransactions(filtered);
}

function renderTransactions(items) {
  const list = document.getElementById("transactionList");
  const lang = languageSelect.value;
  const dictionary = translations[lang] || translations.uz;

  list.replaceChildren();

  document.getElementById("transactionCount").textContent =
    items.length;

  if (items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = dictionary.empty;
    list.appendChild(empty);
    return;
  }

  [...items].reverse().forEach(item => {
    const row = document.createElement("div");
    row.className = "transaction";

    const info = document.createElement("div");
    info.className = "transaction-info";

    const title = document.createElement("strong");
    const categoryKey = categoryNames[item.category];
    title.textContent = item.note ||
      dictionary[categoryKey] || item.category;

    const date = document.createElement("small");
    date.textContent = new Date(item.date).toLocaleDateString(
      lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru-RU" : "en-US"
    );

    info.append(title, date);

    const amount = document.createElement("span");
    amount.className = "transaction-amount " +
      (item.type === "income" ? "positive" : "negative");

    amount.textContent =
      (item.type === "income" ? "+" : "−") +
      formatMoney(item.amount, item.currency);

    row.append(info, amount);
    list.appendChild(row);
  });
}

function openModal(type) {
  currentType = type;

  const lang = languageSelect.value;
  const dictionary = translations[lang] || translations.uz;

  document.getElementById("modalTitle").textContent =
    type === "income"
      ? dictionary.incomeTitle
      : dictionary.expenseTitle;

  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  form.reset();
}

document.getElementById("incomeBtn").addEventListener(
  "click", () => openModal("income")
);

document.getElementById("expenseBtn").addEventListener(
  "click", () => openModal("expense")
);

document.getElementById("closeModal").addEventListener(
  "click", closeModal
);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

form.addEventListener("submit", event => {
  event.preventDefault();

  const amount = Number(document.getElementById("amount").value);

  if (!Number.isFinite(amount) || amount <= 0) {
    return;
  }

  const transaction = {
    id: Date.now().toString(),
    type: currentType,
    amount,
    currency: getSelectedCurrency(),
    category: document.getElementById("category").value,
    note: document.getElementById("note").value.trim(),
    date: new Date().toISOString()
  };

  transactions.push(transaction);

  saveData();
  updateDashboard();
  closeModal();
});

currencySelect.addEventListener("change", updateDashboard);

languageSelect.addEventListener("change", () => {
  setLanguage(languageSelect.value);
  updateDashboard();
});

setLanguage(languageSelect.value);
updateDashboard();
