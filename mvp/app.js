const DATA_URL = "./data/sample-burndown.json";
const CHART_WIDTH = 760;
const CHART_HEIGHT = 320;
const PADDING = { top: 24, right: 24, bottom: 36, left: 48 };

const sprintSelect = document.querySelector("#sprint-select");
const userSelect = document.querySelector("#user-select");
const statusMessage = document.querySelector("#status-message");
const summaryPeriod = document.querySelector("#summary-period");
const summaryPlanned = document.querySelector("#summary-planned");
const summaryCompleted = document.querySelector("#summary-completed");
const summaryRemaining = document.querySelector("#summary-remaining");
const chartTitle = document.querySelector("#chart-title");
const chartSubtitle = document.querySelector("#chart-subtitle");
const chart = document.querySelector("#burndown-chart");
const chartEmpty = document.querySelector("#chart-empty");
const dailyTableBody = document.querySelector("#daily-table-body");

const state = {
  dataset: null,
  sprintId: null,
  userId: null,
};

function readQueryParam(name) {
  const value = new URLSearchParams(window.location.search).get(name);
  return value && value.trim() ? value.trim() : null;
}

function formatDateRange(startDate, endDate) {
  return `${startDate} 〜 ${endDate}`;
}

function formatPoints(value) {
  return `${value} pt`;
}

function showStatus(message) {
  statusMessage.hidden = !message;
  statusMessage.textContent = message || "";
}

function getBurndown(dataset, sprintId, userId) {
  return dataset.burndowns.find(
    (burndown) => burndown.sprintId === sprintId && burndown.userId === userId,
  );
}

function resolveSprintId(dataset) {
  const requestedSprint = readQueryParam("sprint");
  const ids = dataset.sprints.map((sprint) => sprint.id);

  if (requestedSprint && ids.includes(requestedSprint)) {
    return requestedSprint;
  }

  return state.sprintId && ids.includes(state.sprintId) ? state.sprintId : ids[0] || null;
}

function resolveUserId(dataset, sprintId) {
  const requestedUser = readQueryParam("user");
  const userIds = dataset.burndowns
    .filter((burndown) => burndown.sprintId === sprintId)
    .map((burndown) => burndown.userId);

  if (requestedUser && userIds.includes(requestedUser)) {
    return requestedUser;
  }

  if (state.userId && userIds.includes(state.userId)) {
    return state.userId;
  }

  return userIds[0] || null;
}

function updateOptions(dataset) {
  sprintSelect.innerHTML = "";
  dataset.sprints.forEach((sprint) => {
    const option = document.createElement("option");
    option.value = sprint.id;
    option.textContent = `${sprint.name} (${formatDateRange(sprint.startDate, sprint.endDate)})`;
    option.selected = sprint.id === state.sprintId;
    sprintSelect.append(option);
  });

  const availableUserIds = new Set(
    dataset.burndowns
      .filter((burndown) => burndown.sprintId === state.sprintId)
      .map((burndown) => burndown.userId),
  );

  userSelect.innerHTML = "";
  dataset.users
    .filter((user) => availableUserIds.has(user.id))
    .forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.textContent = user.name;
      option.selected = user.id === state.userId;
      userSelect.append(option);
    });
}

function drawChart(series) {
  chart.innerHTML = "";

  if (!series.length) {
    chart.hidden = true;
    chartEmpty.hidden = false;
    return;
  }

  chart.hidden = false;
  chartEmpty.hidden = true;

  const maxValue = Math.max(...series.map((point) => point.remainingPoints), ...series.map((point) => point.idealRemainingPoints), 1);
  const innerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const stepX = series.length === 1 ? 0 : innerWidth / (series.length - 1);

  const scaleX = (index) => PADDING.left + stepX * index;
  const scaleY = (value) => PADDING.top + innerHeight - (value / maxValue) * innerHeight;

  const actualPoints = series.map((point, index) => `${scaleX(index)},${scaleY(point.remainingPoints)}`).join(" ");
  const idealPoints = series.map((point, index) => `${scaleX(index)},${scaleY(point.idealRemainingPoints)}`).join(" ");

  const axisGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");

  for (let tick = 0; tick <= 4; tick += 1) {
    const yValue = (maxValue / 4) * tick;
    const y = scaleY(yValue);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(PADDING.left));
    line.setAttribute("x2", String(CHART_WIDTH - PADDING.right));
    line.setAttribute("y1", String(y));
    line.setAttribute("y2", String(y));
    line.setAttribute("stroke", "#d7deea");
    line.setAttribute("stroke-width", "1");
    axisGroup.append(line);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(PADDING.left - 8));
    label.setAttribute("y", String(y + 4));
    label.setAttribute("text-anchor", "end");
    label.setAttribute("fill", "#5f6b7a");
    label.setAttribute("font-size", "12");
    label.textContent = String(Math.round(yValue));
    axisGroup.append(label);
  }

  series.forEach((point, index) => {
    const x = scaleX(index);
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(x));
    label.setAttribute("y", String(CHART_HEIGHT - 10));
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("fill", "#5f6b7a");
    label.setAttribute("font-size", "12");
    label.textContent = point.date.slice(5);
    axisGroup.append(label);
  });

  const idealLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  idealLine.setAttribute("points", idealPoints);
  idealLine.setAttribute("fill", "none");
  idealLine.setAttribute("stroke", "#f97316");
  idealLine.setAttribute("stroke-width", "3");
  idealLine.setAttribute("stroke-dasharray", "8 6");

  const actualLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  actualLine.setAttribute("points", actualPoints);
  actualLine.setAttribute("fill", "none");
  actualLine.setAttribute("stroke", "#2563eb");
  actualLine.setAttribute("stroke-width", "4");

  const dots = document.createElementNS("http://www.w3.org/2000/svg", "g");
  series.forEach((point, index) => {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", String(scaleX(index)));
    dot.setAttribute("cy", String(scaleY(point.remainingPoints)));
    dot.setAttribute("r", "4");
    dot.setAttribute("fill", "#2563eb");
    dots.append(dot);
  });

  chart.append(axisGroup, idealLine, actualLine, dots);
}

function renderTable(series) {
  dailyTableBody.innerHTML = "";

  series.forEach((point) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${point.date}</td>
      <td>${formatPoints(point.remainingPoints)}</td>
      <td>${formatPoints(point.idealRemainingPoints)}</td>
      <td>${formatPoints(point.completedPoints)}</td>
    `;
    dailyTableBody.append(row);
  });
}

function render() {
  const dataset = state.dataset;
  if (!dataset) {
    return;
  }

  const sprint = dataset.sprints.find((item) => item.id === state.sprintId);
  const user = dataset.users.find((item) => item.id === state.userId);
  const burndown = getBurndown(dataset, state.sprintId, state.userId);

  if (!sprint || !user || !burndown) {
    showStatus("表示対象のスプリントまたはユーザー別データが見つかりません。");
    chart.hidden = true;
    chartEmpty.hidden = false;
    chartEmpty.textContent = "表示対象データがありません。";
    dailyTableBody.innerHTML = "";
    return;
  }

  showStatus("");
  summaryPeriod.textContent = formatDateRange(sprint.startDate, sprint.endDate);
  summaryPlanned.textContent = formatPoints(burndown.plannedPoints);
  summaryCompleted.textContent = formatPoints(burndown.completedPoints);
  summaryRemaining.textContent = formatPoints(burndown.remainingPoints);
  chartTitle.textContent = `${user.name} のバーンダウン`;
  chartSubtitle.textContent = `${sprint.projectName} / ${sprint.name} / ポイント項目: ${sprint.pointField}`;

  drawChart(burndown.series);
  renderTable(burndown.series);
}

function syncStateFromControls() {
  state.sprintId = sprintSelect.value;
  state.userId = userSelect.value;
}

function handleSprintChange() {
  state.sprintId = sprintSelect.value;
  state.userId = resolveUserId(state.dataset, state.sprintId);
  updateOptions(state.dataset);
  render();
}

async function loadData() {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Failed to load ${DATA_URL}: ${response.status}`);
  }

  return response.json();
}

function attachEvents() {
  sprintSelect.addEventListener("change", handleSprintChange);
  userSelect.addEventListener("change", () => {
    syncStateFromControls();
    render();
  });
}

async function init() {
  attachEvents();

  try {
    state.dataset = await loadData();
    state.sprintId = resolveSprintId(state.dataset);
    state.userId = resolveUserId(state.dataset, state.sprintId);
    updateOptions(state.dataset);
    render();
  } catch (error) {
    showStatus("バーンダウンデータを読み込めませんでした。サンプルデータまたはホスティング設定を確認してください。");
    console.error(error);
  }
}

init();
