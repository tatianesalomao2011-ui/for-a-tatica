const icons = {
  alert:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  award:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.5 13.2 17 22l-5-3-5 3 1.5-8.8"/></svg>',
  book:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4v15.5"/><path d="M20 22V6a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 6.5"/></svg>',
  database:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></svg>',
  file:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/></svg>',
  grid:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  lock:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  megaphone:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 18-5v12L3 14v-3Z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
  shield:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z"/></svg>',
  users:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
};

const STORAGE_KEY = "ft13.database.v3";
const SESSION_KEY = "ft13.session.v3";

const patentes = [
  "Cabo",
  "3° Sargento",
  "2° Sargento",
  "1° Sargento",
  "Subtenente",
  "2° Tenente",
  "1° Tenente",
  "Capitao",
  "Major",
  "Tenente Coronel",
  "Coronel",
];

const cargos = [
  "Comandante da Força Tática",
  "Sub Comando da Força Tática",
  "Administrativo Força Tática",
  "Membro Força Tática",
  "Aluno",
];

const approverRoles = new Set([
  "Comandante da Força Tática",
  "Sub Comando da Força Tática",
  "Administrativo Força Tática",
]);

const managementDefinitions = {
  member: {
    label: "membro",
    dataKey: "members",
    userKey: "users",
    activity: (data) => `${data.patente} ${data.nome} cadastrado como ${data.cargo}.`,
    createRecord: (data) => ({
      nome: data.nome.trim(),
      patente: data.patente,
      discord: data.discord.trim(),
      cargo: data.cargo,
      status: "Ativo",
    }),
    createUser: (data) => ({
      nome: data.nome.trim(),
      patente: data.patente,
      discord: data.discord.trim(),
      senha: "",
      cargo: data.cargo,
      status: "approved",
    }),
  },
  record: {
    label: "registro",
    dataKey: "records",
    activity: (data) => `Registro ${data.tipo} adicionado.`,
    createRecord: (data) => ({
      tipo: data.tipo.trim(),
      descricao: data.descricao.trim(),
      responsavel: data.responsavel.trim(),
    }),
  },
  warning: {
    label: "advertencia",
    dataKey: "warnings",
    activity: (data) => `Advertencia atribuida para ${data.membro}.`,
    createRecord: (data) => ({
      membro: data.membro.trim(),
      motivo: data.motivo.trim(),
      prazo: data.prazo,
    }),
  },
  certificate: {
    label: "certificado",
    dataKey: "certificates",
    activity: (data) => `Certificado emitido para ${data.aluno}.`,
    createRecord: (data) => ({
      aluno: data.aluno.trim(),
      curso: data.curso.trim(),
      carga: data.carga.trim(),
      codigo: nextCode("FT13-CERT"),
    }),
  },
  course: {
    label: "curso",
    dataKey: "courses",
    activity: (data) => `Turma ${data.curso} criada.`,
    createRecord: (data) => ({
      curso: data.curso.trim(),
      instrutor: data.instrutor.trim(),
      periodo: data.periodo.trim(),
    }),
  },
};

const starterData = {
  users: [],
  pendingRequests: [],
  members: [],
  records: [],
  warnings: [],
  certificates: [],
  courses: [],
  activity: ["Sistema iniciado. Cadastre o primeiro operador para acessar o painel."],
};

const panelTitles = {
  dashboard: "Visão geral",
  members: "Cadastro de membros",
  records: "Registros internos",
  warnings: "Advertências",
  certificates: "Certificados",
  courses: "Cursos",
  pending: "Solicitações pendentes",
};

function createOption(value, text = value, hidden = false) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  if (hidden) option.hidden = true;
  return option;
}

function populateSelectOptions(name, values, placeholderText) {
  document.querySelectorAll(`select[name="${name}"]`).forEach((select) => {
    select.replaceChildren();
    if (placeholderText) {
      const placeholder = createOption("", placeholderText, true);
      placeholder.selected = true;
      placeholder.disabled = true;
      select.append(placeholder);
    }
    values.forEach((item) => select.append(createOption(item)));
  });
}

function initializeFormControls() {
  populateSelectOptions("cadastroPatente", patentes, "Selecione");
  populateSelectOptions("patente", patentes, "Selecione");
  populateSelectOptions("cargo", cargos, "Selecione");
}

let database = loadDatabase();
let currentUser = null;

document.querySelectorAll("[data-icon]").forEach((node) => {
  node.innerHTML = icons[node.dataset.icon] || "";
});

function loadDatabase() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starterData));
    return structuredClone(starterData);
  }

  try {
    const parsed = JSON.parse(stored);
    const merged = { ...structuredClone(starterData), ...parsed };
    merged.pendingRequests = merged.pendingRequests || [];
    merged.users = (merged.users || []).map((user) => ({
      ...user,
      status: user.status || "approved",
      cargo: user.cargo === "Administrativo Força Tática (permissao geral)" ? "Administrativo Força Tática" : user.cargo,
    }));
    merged.members = (merged.members || []).map((member) => ({
      ...member,
      status: "Ativo",
      cargo: member.cargo === "Administrativo Força Tática (permissao geral)" ? "Administrativo Força Tática" : member.cargo,
    }));
    merged.users = merged.users.map((user) => {
      const member = merged.members.find((item) => normalize(item.discord) === normalize(user.discord));
      return { ...user, cargo: user.cargo || member?.cargo || "Aluno" };
    });
    return merged;
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starterData));
    return structuredClone(starterData);
  }
}

function saveDatabase() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(database));
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function addActivity(message) {
  const time = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  database.activity.unshift(`${time} - ${message}`);
  database.activity = database.activity.slice(0, 8);
}

function nextCode(prefix) {
  return `${prefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function setMetric(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function canApprove() {
  return currentUser && approverRoles.has(currentUser.cargo);
}

function removeItem(collection, index, label) {
  database[collection].splice(index, 1);
  addActivity(`${label} removido do sistema.`);
  saveDatabase();
  renderAll();
}

function renderMembers() {
  const table = document.getElementById("membersTable");
  table.replaceChildren();

  if (!database.members.length) {
    const row = document.createElement("tr");
    const cell = createElement("td", "empty-cell", "Nenhum policial cadastrado.");
    cell.colSpan = 7;
    row.append(cell);
    table.append(row);
    return;
  }

  database.members.forEach((member, index) => {
    const row = document.createElement("tr");
    row.append(createElement("td", "", member.nome));
    row.append(createElement("td", "", member.patente));
    row.append(createElement("td", "", member.discord));

    const cargoCell = createElement("td");
    const cargoSelect = createElement("select", "inline-select");
    cargos.forEach((cargo) => {
      const option = createElement("option", "", cargo);
      option.value = cargo;
      option.selected = cargo === member.cargo;
      cargoSelect.append(option);
    });
    cargoSelect.addEventListener("change", () => {
      database.members[index].cargo = cargoSelect.value;
      const user = database.users.find((item) => normalize(item.discord) === normalize(member.discord));
      if (user) user.cargo = cargoSelect.value;
      if (currentUser && normalize(currentUser.discord) === normalize(member.discord)) currentUser.cargo = cargoSelect.value;
      addActivity(`Cargo de ${member.nome} alterado para ${cargoSelect.value}.`);
      saveDatabase();
      renderDashboard();
    });
    cargoCell.append(cargoSelect);
    row.append(cargoCell);

    const warningCount = database.warnings.filter((warning) => normalize(warning.membro) === normalize(member.nome)).length;
    const certificateCount = database.certificates.filter(
      (certificate) => normalize(certificate.aluno) === normalize(member.nome),
    ).length;
    row.append(createElement("td", "", String(warningCount)));
    row.append(createElement("td", "", String(certificateCount)));

    const actionCell = createElement("td");
    const removeButton = createElement("button", "button danger compact", "Remover");
    removeButton.type = "button";
    removeButton.addEventListener("click", () => {
      database.users = database.users.filter((user) => normalize(user.discord) !== normalize(member.discord));
      removeItem("members", index, member.nome);
    });
    actionCell.append(removeButton);
    row.append(actionCell);
    table.append(row);
  });
}

function renderPending() {
  const list = document.getElementById("pendingList");
  list.replaceChildren();

  if (!database.pendingRequests.length) {
    const empty = createElement("li");
    empty.append(createElement("strong", "", "Sem solicitações"));
    empty.append(createElement("span", "", "Nenhum registro aguardando avaliação."));
    list.append(empty);
    return;
  }

  database.pendingRequests.forEach((request, index) => {
    const item = document.createElement("li");
    const info = createElement("span", "", `${request.patente} ${request.nome} | Discord ${request.discord}`);
    item.append(createElement("strong", "", request.nome));
    item.append(info);

    const actions = createElement("div", "row-actions");
    const approveButton = createElement("button", "button primary compact", "Aceitar");
    const rejectButton = createElement("button", "button danger compact", "Recusar");
    approveButton.type = "button";
    rejectButton.type = "button";
    approveButton.disabled = !canApprove();
    rejectButton.disabled = !canApprove();

    approveButton.addEventListener("click", () => approveRequest(index));
    rejectButton.addEventListener("click", () => rejectRequest(index));
    actions.append(approveButton, rejectButton);
    item.append(actions);
    list.append(item);
  });
}

function renderRecords() {
  const list = document.getElementById("recordsList");
  list.replaceChildren();

  if (!database.records.length) {
    const empty = createElement("li");
    empty.append(createElement("strong", "", "Sem registros"));
    empty.append(createElement("span", "", "Nenhum registro interno cadastrado."));
    list.append(empty);
    return;
  }

  database.records.forEach((record) => {
    const item = document.createElement("li");
    item.append(createElement("strong", "", record.tipo));
    item.append(createElement("span", "", `${record.descricao} - ${record.responsavel}`));
    list.append(item);
  });
}

function renderWarnings() {
  const list = document.getElementById("warningsList");
  list.replaceChildren();

  if (!database.warnings.length) {
    const empty = createElement("li");
    empty.append(createElement("strong", "", "Sem advertências"));
    empty.append(createElement("span", "", "Nenhum registro administrativo pendente."));
    list.append(empty);
    return;
  }

  database.warnings.forEach((warning, index) => {
    const item = document.createElement("li");
    item.append(createElement("strong", "", warning.membro));
    item.append(createElement("span", "", `${warning.motivo} - prazo ${warning.prazo}`));
    const removeButton = createElement("button", "button danger compact", "Remover");
    removeButton.type = "button";
    removeButton.addEventListener("click", () => removeItem("warnings", index, `Advertencia de ${warning.membro}`));
    item.append(removeButton);
    list.append(item);
  });
}

function renderCertificates() {
  const preview = document.getElementById("certificatePreview");
  const list = document.getElementById("certificatesList");
  preview.replaceChildren();
  list.replaceChildren();

  const latest = database.certificates[0];
  preview.append(createElement("small", "", "Certificado digital"));

  if (!latest) {
    preview.append(createElement("h3", "", "Sem certificado emitido"));
    preview.append(createElement("p", "", "Emita o primeiro certificado para gerar código de validação."));
    preview.append(createElement("code", "", "FT13-VALIDA"));
    return;
  }

  preview.append(createElement("h3", "", latest.aluno));
  preview.append(createElement("p", "", `Concluiu ${latest.curso}, com carga horária de ${latest.carga}.`));
  preview.append(createElement("code", "", latest.codigo));

  database.certificates.forEach((certificate, index) => {
    const item = document.createElement("li");
    item.append(createElement("strong", "", certificate.aluno));
    item.append(createElement("span", "", `${certificate.curso} - ${certificate.codigo}`));
    const removeButton = createElement("button", "button danger compact", "Remover");
    removeButton.type = "button";
    removeButton.addEventListener("click", () => removeItem("certificates", index, `Certificado de ${certificate.aluno}`));
    item.append(removeButton);
    list.append(item);
  });
}

function renderCourses() {
  const board = document.getElementById("courseBoard");
  board.replaceChildren();

  if (!database.courses.length) {
    const empty = document.createElement("article");
    empty.append(createElement("strong", "", "Sem turmas"));
    empty.append(createElement("span", "", "Nenhum curso cadastrado."));
    board.append(empty);
    return;
  }

  database.courses.forEach((course) => {
    const card = document.createElement("article");
    card.append(createElement("strong", "", course.curso));
    card.append(createElement("span", "", `${course.instrutor} | ${course.periodo}`));
    board.append(card);
  });
}

function renderDashboard() {
  setMetric("membersCount", database.members.length);
  setMetric("recordsCount", database.records.length);
  setMetric("pendingCount", database.pendingRequests.length);
  setMetric("dashMembers", database.members.length);
  setMetric("dashCourses", database.courses.length);
  setMetric("dashCertificates", database.certificates.length);
  setMetric("dashPending", database.pendingRequests.length);

  const activity = document.getElementById("activityList");
  activity.replaceChildren();
  database.activity.forEach((item) => activity.append(createElement("li", "", item)));
}

function renderAll() {
  renderMembers();
  renderRecords();
  renderWarnings();
  renderCertificates();
  renderCourses();
  renderPending();
  renderDashboard();
}

function openTab(tab) {
  document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".tab-panel").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(`[data-tab="${tab}"]`).forEach((item) => item.classList.add("active"));
  document.getElementById(tab).classList.add("active");
  document.getElementById("panelTitle").textContent = panelTitles[tab];
}

function enterPanelMode(tab = "dashboard") {
  document.body.classList.add("panel-mode");
  openTab(tab);
}

function showApp() {
  document.body.classList.remove("locked");
  document.getElementById("authScreen").setAttribute("aria-hidden", "true");
  document.getElementById("appShell").removeAttribute("aria-hidden");
  renderAll();
  enterPanelMode("dashboard");
}

function showLogin() {
  document.body.classList.add("locked");
  document.body.classList.remove("panel-mode");
  document.getElementById("authScreen").removeAttribute("aria-hidden");
  document.getElementById("appShell").setAttribute("aria-hidden", "true");
  showAuthView("login");
}

function findUser(identifier, password) {
  const key = normalize(identifier);
  return database.users.find((user) => {
    const sameName = normalize(user.nome) === key;
    const sameDiscord = normalize(user.discord) === key;
    return (sameName || sameDiscord) && user.senha === password && user.status === "approved";
  });
}

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const message = document.getElementById("loginMessage");
  const user = findUser(data.identificador, data.senha);

  if (user) {
    currentUser = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ nome: user.nome, discord: user.discord }));
    addActivity(`${user.patente} ${user.nome} acessou o painel.`);
    saveDatabase();
    event.currentTarget.reset();
    message.textContent = "";
    showApp();
    return;
  }

  message.textContent = "Registro não encontrado, pendente de aprovação ou senha incorreta.";
});

function showAuthView(view) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginMessage = document.getElementById("loginMessage");
  const registerMessage = document.getElementById("registerMessage");

  loginForm.hidden = view !== "login";
  registerForm.hidden = view !== "register";
  loginMessage.textContent = "";
  registerMessage.textContent = "";
}

document.getElementById("showRegisterButton").addEventListener("click", () => showAuthView("register"));
document.getElementById("showLoginButton").addEventListener("click", () => showAuthView("login"));

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const message = document.getElementById("registerMessage");

  if (!data.cadastroNome || !data.cadastroPatente || !data.cadastroDiscord || !data.cadastroSenha) {
    message.textContent = "Preencha Nome Operacional, Patente, ID do Discord e Senha para criar registro.";
    return;
  }

  const alreadyExists = database.users.some(
    (user) =>
      normalize(user.nome) === normalize(data.cadastroNome) ||
      normalize(user.discord) === normalize(data.cadastroDiscord),
  );
  const alreadyPending = database.pendingRequests.some(
    (user) =>
      normalize(user.nome) === normalize(data.cadastroNome) ||
      normalize(user.discord) === normalize(data.cadastroDiscord),
  );

  if (alreadyExists || alreadyPending) {
    message.textContent = "Ja existe registro com esse Nome Operacional ou ID do Discord.";
    return;
  }

  const isFirstUser = database.users.length === 0 && database.pendingRequests.length === 0;
  const user = {
    nome: data.cadastroNome.trim(),
    patente: data.cadastroPatente,
    discord: data.cadastroDiscord.trim(),
    senha: data.cadastroSenha,
    status: isFirstUser ? "approved" : "pending",
    cargo: isFirstUser ? "Comandante da Força Tática" : "Aluno",
  };

  if (isFirstUser) {
    database.users.unshift(user);
    database.members.unshift({
      nome: user.nome,
      patente: user.patente,
      discord: user.discord,
      cargo: user.cargo,
      status: "Ativo",
    });
    currentUser = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify({ nome: user.nome, discord: user.discord }));
    addActivity(`${user.patente} ${user.nome} criou o primeiro acesso como Comandante.`);
    saveDatabase();
    message.textContent = "";
    form.reset();
    showApp();
    return;
  }

  database.pendingRequests.unshift(user);
  addActivity(`${user.patente} ${user.nome} enviou solicitação de registro.`);
  saveDatabase();
  message.textContent = "Solicitação enviada. Aguarde aprovação do comando ou administrativo.";
  form.reset();
});

function approveRequest(index) {
  if (!canApprove()) return;
  const request = database.pendingRequests.splice(index, 1)[0];
  const user = { ...request, status: "approved", cargo: "Aluno" };
  database.users.unshift(user);
  database.members.unshift({
    nome: user.nome,
    patente: user.patente,
    discord: user.discord,
    cargo: user.cargo,
    status: "Ativo",
  });
  addActivity(`${request.nome} aprovado por ${currentUser.nome}.`);
  saveDatabase();
  renderAll();
}

function rejectRequest(index) {
  if (!canApprove()) return;
  const request = database.pendingRequests.splice(index, 1)[0];
  addActivity(`${request.nome} recusado por ${currentUser.nome}.`);
  saveDatabase();
  renderAll();
}

document.getElementById("logoutButton").addEventListener("click", () => {
  localStorage.removeItem(SESSION_KEY);
  currentUser = null;
  addActivity("Sessão encerrada pelo operador.");
  saveDatabase();
  showLogin();
});

initializeFormControls();

document.getElementById("enterPanelButton").addEventListener("click", () => enterPanelMode());

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => enterPanelMode(button.dataset.tab));
});

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => enterPanelMode(button.dataset.target));
});

document.querySelectorAll(".management-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const type = form.dataset.form;
    const definition = managementDefinitions[type];

    if (!definition) return;

    database[definition.dataKey].unshift(definition.createRecord(data));

    if (definition.userKey) {
      database[definition.userKey].unshift(definition.createUser(data));
    }

    addActivity(definition.activity(data));
    saveDatabase();
    renderAll();
    form.reset();
  });
});

const storedSession = localStorage.getItem(SESSION_KEY);
if (storedSession) {
  const session = JSON.parse(storedSession);
  currentUser =
    database.users.find((user) => normalize(user.discord) === normalize(session.discord) && user.status === "approved") ||
    null;
  if (!currentUser) {
    localStorage.removeItem(SESSION_KEY);
    showLogin();
  } else {
    showApp();
  }
} else {
  showLogin();
}
