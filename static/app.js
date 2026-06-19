const state = {
  view: 'dashboard',
  suppliers: [],
  customers: [],
  products: [],
  template: {
    levels: ['A', 'B', 'C'],
    company_types: ['外企', '私企', '个人'],
    settlements: ['预付100%', '预付30%，发货70%', '现金', '月结'],
    units: ['个', 'kg', '件', '套'],
    equipments: ['熔炼', '加热', '其它'],
    part_types: ['电气', '机械', '液体', '液压', '其它'],
    origins: ['中国', '德国', '美国'],
  },
};

const titles = {
  dashboard: ['首页仪表盘', '查看关键数据和库存预警'],
  suppliers: ['供应商管理', '维护供应商资料，支持查询、导入、导出'],
  customers: ['客户管理', '维护客户资料和销售金额'],
  products: ['产品管理', '维护备件资料、安全库存、价格和附件'],
  purchases: ['采购管理', '新增采购单后自动入库'],
  sales: ['销售管理', '新增销售单后自动出库，并检查库存'],
  stock: ['库存管理', '查看实时库存、预警和库存流水'],
  stats: ['统计分析', '按时间范围查看采购、销售、利润和排行'],
  users: ['用户管理', '管理员维护登录账号和角色'],
  logs: ['系统日志', '查看登录、新增、修改、删除等操作记录'],
};

const templateNotes = {
  suppliers: '对应 Excel：采购 → 供应商录入模版。字段顺序：编号、名称、等级、联系人、电话、地址、账户信息、照片、公司资料、公司类型、结算时间。',
  purchases: '对应 Excel：采购 → 采购订单版。字段顺序：采购单号、供应商、采购日期、备件编号、产品名称、技术描述、单位、数量、单价、合计、照片、应用设备、备件类型、质保时间、产地。',
  products: '对应 Excel：仓库 → 产品模版。字段顺序：备件编号、产品名称、技术描述、单位、当前库存、安全库存、照片、应用设备、备件类型、质保时间、产地。',
  customers: '对应 Excel：销售 → 客户录入模版。字段顺序：编号、名称、等级、联系人、电话、地址、账户信息、照片、公司资料、公司类型、结算时间、应付金额、实收金额。',
  sales: '对应 Excel：销售 → 销售订单模版。字段顺序：备件编号、产品名称、技术描述、单位、数量、单价、合计、货期。',
  stats: '对应 Excel：统计 → 可选择时间范围，支持按年、月、周统计，并查看单个产品采购、单个产品销售、单个订单利润、单个客户销售。',
};

const columns = {
  suppliers: [
    ['code', '编号'], ['name', '名称'], ['level', '等级'], ['contact', '联系人'],
    ['phone', '电话'], ['address', '地址'], ['account_info', '账户信息'], ['photo_path', '照片'],
    ['document_path', '公司资料'], ['company_type', '公司类型'], ['settlement', '结算时间'],
    ['attachment_count', '附件数量']
  ],
  customers: [
    ['code', '编号'], ['name', '名称'], ['level', '等级'], ['contact', '联系人'],
    ['phone', '电话'], ['address', '地址'], ['account_info', '账户信息'], ['photo_path', '照片'],
    ['document_path', '公司资料'], ['company_type', '公司类型'], ['settlement', '结算时间'],
    ['total_sales', '应付金额'], ['received_amount', '实收金额']
  ],
  products: [
    ['code', '备件编号'], ['name', '产品名称'], ['description', '技术描述'], ['unit', '单位'],
    ['current_stock', '当前库存'], ['safe_stock', '安全库存'], ['photo_path', '照片'],
    ['equipment', '应用设备'], ['part_type', '备件类型'], ['warranty_until', '质保时间'], ['origin', '产地']
  ],
  purchases: [
    ['order_no', '采购单号'], ['supplier_name', '供应商'], ['order_date', '采购日期'],
    ['product_code', '备件编号'], ['product_name', '产品名称'], ['description', '技术描述'], ['unit', '单位'],
    ['quantity', '数量'], ['unit_price', '单价'], ['amount', '合计'], ['photo_path', '照片'],
    ['equipment', '应用设备'], ['part_type', '备件类型'], ['warranty_until', '质保时间'], ['origin', '产地']
  ],
  sales: [
    ['product_code', '备件编号'], ['product_name', '产品名称'], ['description', '技术描述'], ['unit', '单位'],
    ['quantity', '数量'], ['unit_price', '单价'], ['amount', '合计'], ['delivery_date', '货期'],
    ['order_no', '销售单号'], ['customer_name', '客户'], ['order_date', '销售日期'], ['status', '状态']
  ],
  users: [
    ['username', '用户名'], ['display_name', '显示名称'], ['role', '角色'], ['created_at', '创建时间']
  ],
  logs: [
    ['log_time', '操作时间'], ['username', '操作人员'], ['action', '操作内容'], ['detail', '详情'], ['ip', 'IP地址']
  ],
};

const forms = {
  suppliers: [
    ['name', '名称', 'text', true], ['level', '等级', 'selectKey:levels'], ['contact', '联系人'],
    ['phone', '电话'], ['address', '地址'], ['account_info', '账户信息'],
    ['photo', '照片', 'file'], ['document', '公司资料', 'file'],
    ['company_type', '公司类型', 'selectKey:company_types'], ['settlement', '结算时间'],
    ['attachments', '多个附件', 'files'], ['remark', '备注', 'textarea']
  ],
  customers: [
    ['name', '名称', 'text', true], ['level', '等级', 'selectKey:levels'], ['contact', '联系人'],
    ['phone', '电话'], ['address', '地址'], ['account_info', '账户信息'],
    ['photo', '照片', 'file'], ['document', '公司资料', 'file'],
    ['company_type', '公司类型', 'selectKey:company_types'], ['settlement', '结算时间'],
    ['total_sales', '应付金额', 'number'], ['received_amount', '实收金额', 'number'],
    ['remark', '备注', 'textarea']
  ],
  products: [
    ['code', '备件编号', 'text', true], ['name', '产品名称', 'text', true], ['description', '技术描述'],
    ['unit', '单位', 'selectKey:units'], ['current_stock', '当前库存', 'number'], ['safe_stock', '安全库存', 'number'],
    ['photo', '照片', 'file'],
    ['equipment', '应用设备', 'selectKey:equipments'], ['part_type', '备件类型', 'selectKey:part_types'],
    ['warranty_until', '质保时间'], ['origin', '产地', 'selectKey:origins'],
    ['purchase_price', '采购价', 'number'], ['sale_price', '销售价', 'number'], ['spec', '规格书PDF', 'file'], ['remark', '备注', 'textarea']
  ],
  purchases: [
    ['order_no', '采购单号'], ['supplier_id', '供应商', 'supplier', true], ['order_date', '采购日期', 'date'],
    ['product_code', '备件编号', 'text', true], ['product_name', '产品名称', 'text', true],
    ['description', '技术描述'], ['unit', '单位', 'selectKey:units'],
    ['quantity', '数量', 'number', true], ['unit_price', '单价', 'number', true],
    ['amount', '合计', 'number'], ['photo', '照片', 'file'],
    ['equipment', '应用设备', 'selectKey:equipments'], ['part_type', '备件类型', 'selectKey:part_types'],
    ['warranty_until', '质保时间'], ['origin', '产地', 'selectKey:origins']
  ],
  sales: [
    ['product_code', '备件编号', 'text', true], ['product_name', '产品名称', 'text', true],
    ['description', '技术描述'], ['unit', '单位', 'selectKey:units'],
    ['quantity', '数量', 'number', true], ['unit_price', '单价', 'number', true],
    ['amount', '合计', 'number'], ['delivery_date', '货期', 'date']
  ],
  stockManual: [
    ['product_id', '产品', 'product', true], ['movement_type', '类型', 'select:手工入库,手工出库'],
    ['quantity', '数量', 'number', true], ['remark', '备注', 'textarea']
  ],
  users: [
    ['username', '用户名', 'text', true], ['password', '密码', 'password', true],
    ['display_name', '显示名称'], ['role', '角色', 'select:user,admin']
  ],
};

function $(selector) {
  return document.querySelector(selector);
}

function showMessage(text, isOk = false) {
  const box = $('#message');
  box.style.color = isOk ? 'var(--green)' : 'var(--red)';
  box.textContent = text || '';
  if (text) setTimeout(() => box.textContent = '', 4200);
}

async function api(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.ok === false) {
    throw new Error(data.message || '操作失败');
  }
  return data;
}

function money(value) {
  return Number(value || 0).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function tableHtml(cols, rows, options = {}) {
  const actionHead = options.actions ? '<th>操作</th>' : '';
  const body = rows.map(row => {
    const cells = cols.map(([key]) => {
      const value = row[key] ?? '';
      const warn = key === 'current_stock' && Number(row.current_stock) <= Number(row.safe_stock) ? ' class="warn"' : '';
      return `<td${warn}>${value}</td>`;
    }).join('');
    const actions = options.actions ? `<td><div class="actions">${options.actions(row)}</div></td>` : '';
    return `<tr>${cells}${actions}</tr>`;
  }).join('');
  return `<div class="table-wrap"><table><thead><tr>${cols.map(([, label]) => `<th>${label}</th>`).join('')}${actionHead}</tr></thead><tbody>${body || `<tr><td colspan="${cols.length + 1}">暂无数据</td></tr>`}</tbody></table></div>`;
}

function mountToolbar(view) {
  const tpl = $('#toolbarTemplate').content.cloneNode(true);
  const toolbar = tpl.querySelector('.toolbar');
  if (!['suppliers', 'customers', 'products'].includes(view)) {
    toolbar.querySelector('.search').remove();
    toolbar.querySelector('.searchBtn').remove();
  }
  if (['purchases', 'sales'].includes(view) && window.APP_USER.role !== 'admin') {
    toolbar.querySelector('.exportBtn').remove();
  }
  return toolbar;
}

function canEditBase() {
  return window.APP_USER.role === 'admin';
}

function setView(view) {
  state.view = view;
  document.querySelectorAll('.nav').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  $('#pageTitle').textContent = titles[view][0];
  $('#pageSubTitle').textContent = titles[view][1];
  loadView();
}

async function refreshLookups() {
  const [suppliers, customers, products, template] = await Promise.all([
    api('/api/suppliers'),
    api('/api/customers'),
    api('/api/products'),
    api('/api/template-info'),
  ]);
  state.suppliers = suppliers.items;
  state.customers = customers.items;
  state.products = products.items;
  state.template = { ...state.template, ...template };
}

async function renderDashboard() {
  const data = await api('/api/dashboard');
  const c = data.cards;
  $('#content').innerHTML = `
    <div class="cards">
      ${card('产品总数', c.product_total)}
      ${card('供应商总数', c.supplier_total)}
      ${card('客户总数', c.customer_total)}
      ${card('库存总金额', money(c.stock_value))}
      ${card('本月采购额', money(c.month_purchase))}
      ${card('本月销售额', money(c.month_sales))}
      ${card('本月利润', money(c.month_profit))}
      ${card('库存不足产品', c.low_stock, c.low_stock > 0)}
    </div>
    <div class="panel">
      <h2>库存预警</h2>
      ${tableHtml([['code','编号'],['name','产品'],['current_stock','当前库存'],['safe_stock','安全库存']], data.low_stock_items)}
    </div>
  `;
}

function card(label, value, warn = false) {
  return `<div class="card"><div class="label">${label}</div><div class="value ${warn ? 'warn' : ''}">${value}</div></div>`;
}

async function renderCrud(view) {
  const data = await api(`/api/${view}`);
  const content = $('#content');
  content.innerHTML = '';
  if (templateNotes[view]) {
    content.insertAdjacentHTML('beforeend', `<div class="panel"><strong>模板对应：</strong>${templateNotes[view]}</div>`);
  }
  const toolbar = mountToolbar(view);
  toolbar.querySelector('.newBtn').style.display = canEditBase() ? '' : 'none';
  toolbar.querySelector('.newBtn').onclick = () => openForm(view);
  toolbar.querySelector('.exportBtn').onclick = () => location.href = `/api/export/${view}`;
  const search = toolbar.querySelector('.search');
  if (search) {
    toolbar.querySelector('.searchBtn').onclick = async () => {
      const result = await api(`/api/${view}?q=${encodeURIComponent(search.value)}`);
      renderRows(view, result.items);
    };
  }
  content.appendChild(toolbar);
  const holder = document.createElement('div');
  holder.id = 'tableHolder';
  content.appendChild(holder);
  renderRows(view, data.items);
  if (['suppliers', 'customers', 'products'].includes(view) && canEditBase()) {
    const importPanel = document.createElement('div');
    importPanel.className = 'panel';
    importPanel.innerHTML = `<strong>批量导入</strong><p>支持 CSV 或 XLSX。可以使用 Excel 模板里的中文表头，例如：名称、电话、结算时间、备件编号、技术描述、当前库存。</p><input type="file" id="importFile"><button id="importBtn">导入</button>`;
    content.appendChild(importPanel);
    importPanel.querySelector('#importBtn').onclick = () => importData(view);
  }
}

function renderRows(view, rows) {
  const holder = $('#tableHolder');
  holder.innerHTML = tableHtml(columns[view], rows, {
    actions: canEditBase() ? (row) => `
      ${view === 'suppliers' ? `<button onclick='openSupplierAttachments(${row.id}, ${JSON.stringify(row.name)})'>附件</button>` : ''}
      <button onclick='openForm("${view}", ${JSON.stringify(row)})'>修改</button>
      <button class="danger" onclick='deleteItem("${view}", ${row.id})'>删除</button>
    ` : null
  });
}

async function renderOrders(view) {
  await refreshLookups();
  const data = await api(`/api/${view}`);
  const content = $('#content');
  content.innerHTML = '';
  if (templateNotes[view]) {
    content.insertAdjacentHTML('beforeend', `<div class="panel"><strong>模板对应：</strong>${templateNotes[view]}</div>`);
  }
  const toolbar = mountToolbar(view);
  toolbar.querySelector('.newBtn').onclick = () => openForm(view);
  const exportBtn = toolbar.querySelector('.exportBtn');
  if (exportBtn) exportBtn.onclick = () => location.href = `/api/export/${view}`;
  content.appendChild(toolbar);
  if (canEditBase()) {
    const importPanel = document.createElement('div');
    importPanel.className = 'panel';
    const name = view === 'purchases' ? '采购订单' : '销售订单';
    const extra = view === 'purchases' ? '按 Excel 的“采购订单版”字段导入。Excel 里可以填写采购单号、供应商、采购日期；如果供应商不填，系统会自动归到“未指定供应商”。' : '按 Excel 的“销售订单模版”字段导入。可在这里选择客户；如果不选，系统会自动使用“未指定客户”。库存不足的行会跳过。';
    const supplierSelect = view === 'purchases' ? `<select id="importSupplierId"><option value="">选择供应商（采购导入用）</option>${state.suppliers.map(item => `<option value="${item.id}">${item.code} - ${item.name}</option>`).join('')}</select>` : '';
    const customerSelect = view === 'sales' ? `<select id="importCustomerId"><option value="">选择客户（销售导入用）</option>${state.customers.map(item => `<option value="${item.id}">${item.code} - ${item.name}</option>`).join('')}</select>` : '';
    importPanel.innerHTML = `<strong>${name}批量导入</strong><p>${extra}</p>${supplierSelect}${customerSelect}<input type="file" id="importFile"><button id="importBtn">导入</button>`;
    content.appendChild(importPanel);
    importPanel.querySelector('#importBtn').onclick = () => importData(view);
  }
  content.insertAdjacentHTML('beforeend', tableHtml(columns[view], data.items, {
    actions: (row) => `
      ${view === 'purchases' && canEditBase() ? `<button onclick='openForm("${view}", ${JSON.stringify(row)})'>修改</button>` : ''}
      ${view === 'sales' && canEditBase() && row.status !== 'voided' ? `<button onclick='openForm("${view}", ${JSON.stringify(row)})'>修改</button><button class="danger" onclick='voidSalesOrder(${row.id})'>作废</button>` : ''}
      <button onclick='printOrder("${view}", ${JSON.stringify(row)})'>打印</button>
    `
  }));
}

async function renderStock() {
  await refreshLookups();
  const data = await api('/api/stock');
  $('#content').innerHTML = `
    <div class="panel"><strong>模板对应：</strong>${templateNotes.products}</div>
    <div class="toolbar">
      <input id="stockSearch" placeholder="产品名称、编号、设备、类型">
      <button id="stockSearchBtn">查询</button>
      <button id="stockImportBtn" class="primary admin-only">导入产品Excel</button>
      <button id="manualStockBtn" class="primary admin-only">手工出入库</button>
      <button onclick="location.href='/api/export/stock'">导出流水</button>
    </div>
    <div id="stockImportPanel" class="panel hidden">
      <strong>库存产品批量导入</strong>
      <p>对应 Excel：仓库 → 产品模版。字段：备件编号、产品名称、技术描述、单位、当前库存、安全库存、照片、应用设备、备件类型、质保时间、产地。</p>
      <input type="file" id="importFile" accept=".xlsx,.xlsm,.csv">
      <button id="importBtn">导入</button>
    </div>
    <h2>实时库存</h2>
    ${tableHtml(columns.products, data.items)}
    <div class="panel"><h2>最近库存流水</h2>${tableHtml([['movement_time','时间'],['movement_type','类型'],['product_code','编号'],['product_name','产品'],['quantity','数量'],['operator','操作人'],['source_no','来源单号'],['remark','备注']], data.movements)}</div>
  `;
  $('#stockSearchBtn').onclick = async () => {
    const result = await api(`/api/stock?q=${encodeURIComponent($('#stockSearch').value)}`);
    $('#content').querySelector('.table-wrap').outerHTML = tableHtml(columns.products, result.items);
  };
  $('#stockImportBtn').onclick = () => $('#stockImportPanel').classList.toggle('hidden');
  $('#stockImportPanel').querySelector('#importBtn').onclick = () => importData('products');
  $('#manualStockBtn').onclick = () => openForm('stockManual');
  applyRole();
}

async function renderStats() {
  const today = new Date().toISOString().slice(0, 10);
  const monthStart = today.slice(0, 8) + '01';
  await refreshLookups();
  $('#content').innerHTML = `
    <div class="panel"><strong>模板对应：</strong>${templateNotes.stats}</div>
    <div class="toolbar">
      <select id="periodSelect">
        <option value="custom">自定义</option>
        <option value="day">今日</option>
        <option value="week">本周</option>
        <option value="month" selected>本月</option>
        <option value="quarter">本季度</option>
        <option value="year">本年</option>
      </select>
      <input id="startDate" type="date" value="${monthStart}">
      <input id="endDate" type="date" value="${today}">
      ${selectInline('productFilter', '全部产品', state.products)}
      ${selectInline('customerFilter', '全部客户', state.customers)}
      ${selectInline('supplierFilter', '全部供应商', state.suppliers)}
      <input id="orderFilter" placeholder="订单号">
      <button id="statsBtn" class="primary">统计</button>
    </div>
    <div id="statsResult"></div>
  `;
  $('#periodSelect').onchange = () => {
    const custom = $('#periodSelect').value === 'custom';
    $('#startDate').disabled = !custom;
    $('#endDate').disabled = !custom;
  };
  $('#periodSelect').dispatchEvent(new Event('change'));
  $('#statsBtn').onclick = loadStats;
  await loadStats();
}

async function loadStats() {
  const params = new URLSearchParams({
    period: $('#periodSelect').value,
    start: $('#startDate').value,
    end: $('#endDate').value,
    product_id: $('#productFilter').value,
    customer_id: $('#customerFilter').value,
    supplier_id: $('#supplierFilter').value,
    order_no: $('#orderFilter').value,
  });
  const data = await api(`/api/stats?${params.toString()}`);
  $('#statsResult').innerHTML = `
    <div class="panel"><strong>统计范围：</strong>${data.start} 至 ${data.end}</div>
    <div class="cards">
      ${card('采购金额', money(data.purchase.amount))}
      ${card('采购数量', data.purchase.quantity)}
      ${card('采购次数', data.purchase.count)}
      ${card('销售金额', money(data.sales.amount))}
      ${card('销售数量', data.sales.quantity)}
      ${card('销售次数', data.sales.count)}
      ${card('利润', money(data.profit), data.profit < 0)}
    </div>
    <div class="rank-grid">
      <div class="panel"><h2>客户销售额排行</h2>${tableHtml([['name','客户'],['amount','销售额']], data.customer_rank)}</div>
      <div class="panel"><h2>供应商采购金额排行</h2>${tableHtml([['name','供应商'],['amount','采购额']], data.supplier_rank)}</div>
    </div>
    <div class="panel"><h2>产品统计</h2>${tableHtml([['code','编号'],['name','产品'],['purchase_qty','采购量'],['sales_qty','销售量'],['current_stock','库存量']], data.product_rank)}</div>
    <div class="panel"><h2>单个订单利润统计</h2>${tableHtml([['order_no','销售单号'],['order_date','日期'],['customer_name','客户'],['product_code','产品编号'],['product_name','产品'],['sales_qty','销售数量'],['sales_amount','销售金额'],['estimated_cost','估算成本'],['profit','利润']], data.order_profit)}</div>
  `;
}

function selectInline(id, placeholder, items) {
  const opts = items.map(item => `<option value="${item.id}">${item.code} - ${item.name}</option>`).join('');
  return `<select id="${id}"><option value="">${placeholder}</option>${opts}</select>`;
}

async function renderSimple(view) {
  const data = await api(`/api/${view}`);
  $('#content').innerHTML = `
    <div class="toolbar">${view === 'users' ? '<button class="newBtn primary">新增用户</button>' : ''}</div>
    ${tableHtml(columns[view], data.items)}
  `;
  const btn = $('.newBtn');
  if (btn) btn.onclick = () => openForm(view);
}

function inputHtml(field, row = {}) {
  const [name, label, typeRaw = 'text', required = false] = field;
  const value = row[name] ?? '';
  const req = required ? 'required' : '';
  const wide = typeRaw === 'textarea' ? ' wide' : '';
  if (typeRaw.startsWith('select:')) {
    const opts = typeRaw.replace('select:', '').split(',');
    return `<label class="${wide}">${label}<select name="${name}" ${req}>${opts.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('')}</select></label>`;
  }
  if (typeRaw.startsWith('selectKey:')) {
    const key = typeRaw.replace('selectKey:', '');
    const opts = state.template[key] || [];
    const customOption = value && !opts.includes(value) ? `<option value="${value}" selected>${value}</option>` : '';
    return `<label class="${wide}">${label}<select name="${name}" ${req}>${customOption}${opts.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('')}</select></label>`;
  }
  if (typeRaw === 'textarea') return `<label class="wide">${label}<textarea name="${name}">${value}</textarea></label>`;
  if (typeRaw === 'files') return `<label class="wide">${label}<input name="${name}" type="file" multiple></label>`;
  if (typeRaw === 'supplier') return selectHtml(name, label, state.suppliers, value, req);
  if (typeRaw === 'customer') return selectHtml(name, label, state.customers, value, req);
  if (typeRaw === 'product') return selectHtml(name, label, state.products, value, req, true);
  return `<label class="${wide}">${label}<input name="${name}" type="${typeRaw}" value="${value}" ${req}></label>`;
}

function selectHtml(name, label, items, value, req, showStock = false) {
  const opts = items.map(item => {
    const text = showStock ? `${item.code} - ${item.name}（库存 ${item.current_stock}）` : `${item.code} - ${item.name}`;
    return `<option value="${item.id}" ${Number(value) === Number(item.id) ? 'selected' : ''}>${text}</option>`;
  }).join('');
  return `<label>${label}<select name="${name}" ${req}><option value="">请选择</option>${opts}</select></label>`;
}

async function openForm(view, row = null) {
  if (['purchases', 'sales', 'stockManual'].includes(view)) await refreshLookups();
  $('#modalTitle').textContent = row ? `修改${titles[view][0]}` : `新增${titles[view]?.[0] || '数据'}`;
  const form = $('#modalForm');
  form.innerHTML = forms[view].map(field => inputHtml(field, row || {})).join('') +
    `<div class="form-actions"><button type="button" id="cancelBtn">取消</button><button class="primary" type="submit">保存</button></div>`;
  $('#modal').classList.remove('hidden');
  $('#cancelBtn').onclick = closeModal;
  form.onsubmit = (event) => saveForm(event, view, row);
  if (view === 'purchases' || view === 'sales') {
    bindOrderExcelForm(form, view);
  }
}

function bindOrderExcelForm(form, view) {
  const codeInput = form.elements.product_code;
  const qtyInput = form.elements.quantity;
  const priceInput = form.elements.unit_price;
  const amountInput = form.elements.amount;
  if (amountInput) {
    amountInput.readOnly = true;
    amountInput.placeholder = '自动计算';
  }
  const updateAmount = () => {
    const qty = Number(qtyInput?.value || 0);
    const price = Number(priceInput?.value || 0);
    if (amountInput) amountInput.value = qty && price ? (qty * price).toFixed(2) : '';
  };
  const fillProductInfo = () => {
    const product = state.products.find(item => item.code === codeInput.value.trim());
    if (!product) return;
    if (form.elements.product_name && !form.elements.product_name.value) form.elements.product_name.value = product.name || '';
    if (form.elements.description && !form.elements.description.value) form.elements.description.value = product.description || '';
    if (form.elements.unit && !form.elements.unit.value) form.elements.unit.value = product.unit || '';
    if (form.elements.equipment && !form.elements.equipment.value) form.elements.equipment.value = product.equipment || '';
    if (form.elements.part_type && !form.elements.part_type.value) form.elements.part_type.value = product.part_type || '';
    if (form.elements.warranty_until && !form.elements.warranty_until.value) form.elements.warranty_until.value = product.warranty_until || '';
    if (form.elements.origin && !form.elements.origin.value) form.elements.origin.value = product.origin || '';
    if (priceInput && !priceInput.value) priceInput.value = view === 'purchases' ? (product.purchase_price || '') : (product.sale_price || '');
    updateAmount();
  };
  codeInput?.addEventListener('change', fillProductInfo);
  qtyInput?.addEventListener('input', updateAmount);
  priceInput?.addEventListener('input', updateAmount);
}

function closeModal() {
  $('#modal').classList.add('hidden');
  $('#modalForm').reset();
}

async function saveForm(event, view, row) {
  event.preventDefault();
  const form = event.target;
  const usesFile = Array.from(form.elements).some(el => el.type === 'file' && el.files.length);
  const body = usesFile ? new FormData(form) : JSON.stringify(Object.fromEntries(new FormData(form)));
  const headers = usesFile ? {} : { 'Content-Type': 'application/json' };
  const urlMap = { stockManual: '/api/stock/manual' };
  const url = row ? `/api/${view}/${row.id}` : (urlMap[view] || `/api/${view}`);
  const method = row ? 'PUT' : 'POST';
  try {
    const result = await api(url, { method, headers, body });
    closeModal();
    showMessage(result.order_no ? `保存成功，单号：${result.order_no}` : '保存成功', true);
    await loadView();
  } catch (error) {
    showMessage(error.message);
  }
}

async function deleteItem(view, id) {
  if (!confirm('确认删除吗？删除后不能直接恢复，请先确认数据不再需要。')) return;
  try {
    await api(`/api/${view}/${id}`, { method: 'DELETE' });
    showMessage('删除成功', true);
    await loadView();
  } catch (error) {
    showMessage(error.message);
  }
}

async function voidSalesOrder(id) {
  if (!confirm('确认作废这张销售单吗？系统会自动回补库存，并回滚客户应付金额。')) return;
  try {
    const result = await api(`/api/sales/${id}/void`, { method: 'POST' });
    showMessage(`销售单已作废：${result.order_no}`, true);
    await loadView();
  } catch (error) {
    showMessage(error.message);
  }
}

async function importData(view) {
  const file = $('#importFile').files[0];
  if (!file) {
    showMessage('请先选择文件');
    return;
  }
  const form = new FormData();
  form.append('file', file);
  const supplierSelect = $('#importSupplierId');
  if (supplierSelect && supplierSelect.value) form.append('supplier_id', supplierSelect.value);
  const customerSelect = $('#importCustomerId');
  if (customerSelect && customerSelect.value) form.append('customer_id', customerSelect.value);
  try {
    const result = await api(`/api/import/${view}`, { method: 'POST', body: form });
    const successText = result.imported_rows_count ? `（${result.imported_rows.join('、')}${result.imported_rows_count > result.imported_rows.length ? '等' : ''}）` : '';
    const skippedText = result.skipped_count ? `；跳过 ${result.skipped_count} 条：${result.skipped.join('；')}` : '';
    showMessage(`导入成功：${result.count} 条${successText}${skippedText}`, result.count > 0);
    await loadView();
  } catch (error) {
    showMessage(error.message);
  }
}

async function openSupplierAttachments(supplierId, supplierName) {
  try {
    const result = await api(`/api/suppliers/${supplierId}/attachments`);
    $('#modalTitle').textContent = `${supplierName} - 附件`;
    const rows = result.items.map(item => `
      <tr>
        <td>${item.file_name}</td>
        <td>${item.file_type || ''}</td>
        <td>${item.uploaded_at}</td>
        <td>
          <button type="button" onclick="location.href='/api/attachments/${item.id}/download'">下载</button>
          ${state.user.role === 'admin' ? `<button type="button" onclick="deleteSupplierAttachment(${item.id}, ${supplierId}, ${JSON.stringify(supplierName)})">删除</button>` : ''}
        </td>
      </tr>
    `).join('');
    $('#modalForm').innerHTML = `
      <div class="wide">
        <div class="table-wrap">
          <table>
            <thead><tr><th>文件名</th><th>类型</th><th>上传时间</th><th>操作</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="4">暂无附件</td></tr>'}</tbody>
          </table>
        </div>
      </div>
      <label class="wide">继续上传附件<input name="attachments" type="file" multiple></label>
      <div class="form-actions">
        <button type="button" id="cancelBtn">关闭</button>
        <button class="primary" type="submit">上传</button>
      </div>
    `;
    $('#modal').classList.remove('hidden');
    $('#cancelBtn').onclick = closeModal;
    $('#modalForm').onsubmit = async (event) => {
      event.preventDefault();
      const form = new FormData(event.target);
      try {
        const uploadResult = await api(`/api/suppliers/${supplierId}/attachments`, { method: 'POST', body: form });
        showMessage(`上传成功：${uploadResult.count} 个附件`, true);
        closeModal();
        await loadView();
      } catch (error) {
        showMessage(error.message);
      }
    };
  } catch (error) {
    showMessage(error.message);
  }
}

async function deleteSupplierAttachment(attachmentId, supplierId, supplierName) {
  if (!confirm('确认删除这个附件吗？')) return;
  try {
    await api(`/api/attachments/${attachmentId}`, { method: 'DELETE' });
    showMessage('附件已删除', true);
    await openSupplierAttachments(supplierId, supplierName);
    await loadView();
  } catch (error) {
    showMessage(error.message);
  }
}

function printOrder(view, row) {
  const title = view === 'purchases' ? '采购单' : '销售单';
  const html = `
    <html><head><title>${title}${row.order_no}</title><style>body{font-family:Arial,"Microsoft YaHei";padding:30px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:8px;text-align:left}</style></head>
    <body><h1>${title}</h1><table>
    ${Object.entries(row).filter(([key]) => !['id','created_at','updated_at'].includes(key)).map(([key, value]) => `<tr><th>${key}</th><td>${value ?? ''}</td></tr>`).join('')}
    </table><script>window.print()</script></body></html>`;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}

async function loadView() {
  try {
    if (state.view === 'dashboard') await renderDashboard();
    else if (['suppliers', 'customers', 'products'].includes(state.view)) await renderCrud(state.view);
    else if (['purchases', 'sales'].includes(state.view)) await renderOrders(state.view);
    else if (state.view === 'stock') await renderStock();
    else if (state.view === 'stats') await renderStats();
    else if (['users', 'logs'].includes(state.view)) await renderSimple(state.view);
    applyRole();
  } catch (error) {
    showMessage(error.message);
  }
}

function applyRole() {
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = window.APP_USER.role === 'admin' ? '' : 'none';
  });
}

document.querySelectorAll('.nav').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
$('#closeModal').onclick = closeModal;
$('#logoutBtn').onclick = async () => {
  await fetch('/api/logout', { method: 'POST' });
  location.href = '/login';
};
$('#backupBtn').onclick = async () => {
  try {
    const result = await api('/api/backup', { method: 'POST' });
    showMessage(`备份成功：${result.file}`, true);
  } catch (error) {
    showMessage(error.message);
  }
};

applyRole();
loadView();
