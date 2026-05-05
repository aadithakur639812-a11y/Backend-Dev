const API_URL = "/api";

let accessToken = localStorage.getItem("accessToken") || "";
let refreshToken = localStorage.getItem("refreshToken") || "";
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

const message = document.querySelector("#message");

function showMessage(text, isError = false) {
  if (!message) return;
  message.textContent = text;
  message.style.color = isError ? "#b42318" : "#0f7b3a";
}

function saveSession(data) {
  accessToken = data.accessToken;
  refreshToken = data.refreshToken || "";
  currentUser = data.user;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function clearSession() {
  accessToken = "";
  refreshToken = "";
  currentUser = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("currentUser");
}

function requireLogin() {
  if (!accessToken) {
    window.location.href = "index.html";
    return false;
  }

  return true;
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function renderAccounts(accounts, targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;

  target.innerHTML = "";

  if (!accounts.length) {
    target.innerHTML = '<div class="muted">No accounts found.</div>';
    return;
  }

  accounts.forEach((account) => {
    const owner = account.userId?.email ? `<div>Owner: ${account.userId.email}</div>` : "";
    target.insertAdjacentHTML(
      "beforeend",
      `<div class="item">
        <strong>${account.accountType}</strong>
        <div>ID: ${account._id}</div>
        <div>Balance: Rs. ${Number(account.balance).toFixed(2)}</div>
        ${owner}
      </div>`
    );
  });
}

function renderTransactions(transactions) {
  const target = document.querySelector("#transactions");
  if (!target) return;

  target.innerHTML = "";

  if (!transactions.length) {
    target.innerHTML = '<div class="muted">No transactions found.</div>';
    return;
  }

  transactions.forEach((transaction) => {
    target.insertAdjacentHTML(
      "beforeend",
      `<div class="item">
        <strong>${transaction.type}</strong>
        <div>Amount: Rs. ${Number(transaction.amount).toFixed(2)}</div>
        <div>From: ${transaction.fromAccount?._id || "Bank"}</div>
        <div>To: ${transaction.toAccount?._id || "Cash"}</div>
        <div>Date: ${new Date(transaction.date).toLocaleString()}</div>
      </div>`
    );
  });
}

async function loadAccounts() {
  const accounts = await request("/accounts/my");
  renderAccounts(accounts, "#accounts");
}

function setupAuthPage() {
  const loginForm = document.querySelector("#loginForm");
  const registerForm = document.querySelector("#registerForm");

  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const data = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: document.querySelector("#loginEmail").value,
          password: document.querySelector("#loginPassword").value
        })
      });

      saveSession(data);
      window.location.href = "accounts.html";
    } catch (error) {
      showMessage(error.message, true);
    }
  });

  registerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await request("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: document.querySelector("#registerName").value,
          email: document.querySelector("#registerEmail").value,
          password: document.querySelector("#registerPassword").value,
          role: document.querySelector("#registerRole").value,
          accountType: document.querySelector("#registerAccountType").value
        })
      });

      registerForm.reset();
      showMessage("Registered successfully. Login now.");
    } catch (error) {
      showMessage(error.message, true);
    }
  });
}

function setupLogout() {
  document.querySelector("#logoutBtn")?.addEventListener("click", async () => {
    try {
      if (accessToken) {
        await request("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refreshToken })
        });
      }
    } finally {
      clearSession();
      window.location.href = "index.html";
    }
  });
}

function setupAccountsPage() {
  if (!document.querySelector("#accounts")) return;
  if (!requireLogin()) return;

  const userInfo = document.querySelector("#userInfo");
  userInfo.textContent = `${currentUser.name} (${currentUser.role}) - ${currentUser.email}`;

  document.querySelector("#loadAccountsBtn").addEventListener("click", async () => {
    try {
      await loadAccounts();
    } catch (error) {
      showMessage(error.message, true);
    }
  });

  document.querySelector("#depositForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await request("/accounts/deposit", {
        method: "POST",
        body: JSON.stringify({
          accountId: document.querySelector("#depositAccountId").value,
          amount: Number(document.querySelector("#depositAmount").value)
        })
      });

      event.target.reset();
      showMessage("Deposit successful");
      await loadAccounts();
    } catch (error) {
      showMessage(error.message, true);
    }
  });

  document.querySelector("#withdrawForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await request("/accounts/withdraw", {
        method: "POST",
        body: JSON.stringify({
          accountId: document.querySelector("#withdrawAccountId").value,
          amount: Number(document.querySelector("#withdrawAmount").value)
        })
      });

      event.target.reset();
      showMessage("Withdraw successful");
      await loadAccounts();
    } catch (error) {
      showMessage(error.message, true);
    }
  });

  document.querySelector("#transferForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      await request("/accounts/transfer", {
        method: "POST",
        body: JSON.stringify({
          fromAccountId: document.querySelector("#fromAccountId").value,
          toAccountId: document.querySelector("#toAccountId").value,
          amount: Number(document.querySelector("#transferAmount").value)
        })
      });

      event.target.reset();
      showMessage("Transfer successful");
      await loadAccounts();
    } catch (error) {
      showMessage(error.message, true);
    }
  });

  loadAccounts().catch((error) => showMessage(error.message, true));
}

function setupTransactionsPage() {
  if (!document.querySelector("#transactions")) return;
  if (!requireLogin()) return;

  async function loadTransactions() {
    const transactions = await request("/transactions/my");
    renderTransactions(transactions);
  }

  document.querySelector("#loadTransactionsBtn").addEventListener("click", async () => {
    try {
      await loadTransactions();
    } catch (error) {
      showMessage(error.message, true);
    }
  });

  loadTransactions().catch((error) => showMessage(error.message, true));
}

function setupAdminPage() {
  if (!document.querySelector("#allAccounts")) return;
  if (!requireLogin()) return;

  async function loadAllAccounts() {
    if (currentUser.role !== "admin") {
      showMessage("Admin access required. Login with an admin account.", true);
      return;
    }

    const accounts = await request("/accounts/all");
    renderAccounts(accounts, "#allAccounts");
  }

  document.querySelector("#loadAllAccountsBtn").addEventListener("click", async () => {
    try {
      await loadAllAccounts();
    } catch (error) {
      showMessage(error.message, true);
    }
  });

  loadAllAccounts().catch((error) => showMessage(error.message, true));
}

setupAuthPage();
setupLogout();
setupAccountsPage();
setupTransactionsPage();
setupAdminPage();
