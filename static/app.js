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
  purchases: ['采购管理', '按整张采购单管理多项备件、分批到货和逾期提醒'],
  sales: ['销售管理', '按整张销售单管理多项备件和分批发货'],
  stock: ['库存管理', '查看实时库存、预警和库存流水'],
  stats: ['统计分析', '按时间范围查看采购、销售、利润和排行'],
  users: ['用户管理', '管理员维护登录账号和角色'],
  logs: ['系统日志', '查看登录、新增、修改、删除等操作记录'],
};

const templateNotes = {
  suppliers: '对应 Excel：采购 → 供应商录入模版。字段顺序：编号、名称、等级、联系人、电话、地址、账户信息、照片、公司资料、公司类型、结算时间。',
  purchases: '一张采购单可包含多项备件。保存订单时不增加库存，确认实际到货后才入库；全部到货后订单锁定。',
  products: '对应 Excel：仓库 → 产品模版。字段顺序：备件编号、产品名称、技术描述、单位、当前库存、安全库存、照片、应用设备、备件类型、质保时间、产地。',
  customers: '对应 Excel：销售 → 客户录入模版。字段顺序：编号、名称、等级、联系人、电话、地址、账户信息、照片、公司资料、公司类型、结算时间、应付金额、实收金额。',
  sales: '一张销售单可包含多项备件。保存订单时不扣库存，确认实际发货后才出库；全部发货后订单锁定。',
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
    ['order_no', '采购单号'], ['supplier_name', '供应商'], ['order_date', '采购日期'], ['expected_date', '要求到货日期'],
    ['item_count', '备件项数'], ['total_quantity', '采购数量'], ['processed_quantity', '已到货'],
    ['amount', '订单金额'], ['status_text', '状态']
  ],
  sales: [
    ['order_no', '销售单号'], ['customer_name', '客户'], ['order_date', '销售日期'], ['delivery_date', '要求发货日期'],
    ['item_count', '备件项数'], ['total_quantity', '销售数量'], ['processed_quantity', '已发货'],
    ['amount', '订单金额'], ['status_text', '状态']
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
  if (!['suppliers', 'customers', 'products', 'purchases', 'sales'].includes(view)) {
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
      ${card('采购逾期未到货', c.overdue_purchases, c.overdue_purchases > 0)}
      ${card('销售逾期未发货', c.overdue_sales, c.overdue_sales > 0)}
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
  const quotationData = view === 'sales' ? await api('/api/quotations') : null;
  data.items.forEach(row => {
    const statusMap = { pending: '待处理', partial: view === 'purchases' ? '部分到货' : '部分发货', completed: '已完成', cancelled: '已作废' };
    row.status_text = `${statusMap[row.status] || row.status}${row.overdue ? '（已逾期）' : ''}`;
  });
  const content = $('#content');
  content.innerHTML = '';
  if (templateNotes[view]) {
    content.insertAdjacentHTML('beforeend', `<div class="panel"><strong>模板对应：</strong>${templateNotes[view]}</div>`);
  }
  const toolbar = mountToolbar(view);
  toolbar.querySelector('.newBtn').textContent = view === 'purchases' ? '新增采购单' : '新增销售单';
  toolbar.querySelector('.newBtn').onclick = () => openOrderForm(view);
  if (view === 'sales') {
    const quoteButton = document.createElement('button');
    quoteButton.className = 'primary';
    quoteButton.textContent = '新增报价单';
    quoteButton.onclick = () => openQuotationForm(null, quotationData.default_company_name);
    toolbar.querySelector('.newBtn').insertAdjacentElement('afterend', quoteButton);
  }
  toolbar.querySelector('.searchBtn').onclick = async () => {
    const result = await api(`/api/${view}?q=${encodeURIComponent(toolbar.querySelector('.search').value)}`);
    result.items.forEach(row => {
      const statusMap = { pending: '待处理', partial: view === 'purchases' ? '部分到货' : '部分发货', completed: '已完成', cancelled: '已作废' };
      row.status_text = `${statusMap[row.status] || row.status}${row.overdue ? '（已逾期）' : ''}`;
    });
    renderOrderTable(view, result.items);
  };
  const exportBtn = toolbar.querySelector('.exportBtn');
  if (exportBtn) exportBtn.onclick = () => location.href = `/api/export/${view}`;
  content.appendChild(toolbar);
  if (canEditBase()) {
    const isPurchase = view === 'purchases';
    const importPanel = document.createElement('div');
    importPanel.className = 'panel order-import';
    importPanel.innerHTML = `<strong>整单 Excel 导入</strong><p>Excel 中相同订单号的多行会合并成一张订单。导入后不会直接改变库存，仍需人工确认${isPurchase ? '到货' : '发货'}。</p>
      <div class="toolbar"><select id="importPartyId"><option value="">${isPurchase ? '选择供应商（Excel未填写时使用）' : '选择客户'}</option>${(isPurchase ? state.suppliers : state.customers).map(item => `<option value="${item.id}">${item.code} - ${item.name}</option>`).join('')}</select><input type="file" id="importFile" accept=".xlsx,.xlsm,.csv"><button id="importBtn">导入整单</button></div>`;
    content.appendChild(importPanel);
    importPanel.querySelector('#importBtn').onclick = () => importData(view);
  }
  content.insertAdjacentHTML('beforeend', '<div id="orderTableHolder"></div>');
  renderOrderTable(view, data.items);
  if (view === 'sales') renderQuotationPanel(quotationData);
}

function renderQuotationPanel(data) {
  $('#content').insertAdjacentHTML('beforeend', `
    <section class="quotation-section">
      <div class="section-head"><div><h2>报价单</h2><p>报价单不会扣减库存，可编辑、查询和打印。</p></div>
        <div class="toolbar quotation-search"><input id="quotationSearch" placeholder="报价单号、客户或发货单位"><button id="quotationSearchBtn">查询报价单</button></div>
      </div>
      <div id="quotationTableHolder"></div>
    </section>`);
  renderQuotationTable(data.items, data.default_company_name);
  $('#quotationSearchBtn').onclick = async () => {
    const result = await api(`/api/quotations?q=${encodeURIComponent($('#quotationSearch').value)}`);
    renderQuotationTable(result.items, result.default_company_name);
  };
}

function renderQuotationTable(rows, defaultCompanyName = '') {
  const cols = [
    ['quote_no','报价单号'],['quote_date','报价日期'],['customer_name','客户'],['shipping_unit','发货单位'],
    ['delivery_date','交货日期'],['item_count','备件项数'],['total_quantity','数量'],['amount','报价总额']
  ];
  $('#quotationTableHolder').innerHTML = tableHtml(cols, rows, { actions: row => `
    <button onclick='viewQuotation(${JSON.stringify(row)})'>查看</button>
    ${canEditBase() ? `<button onclick='openQuotationForm(${JSON.stringify(row)}, ${JSON.stringify(defaultCompanyName)})'>修改</button>` : ''}
    <button class="primary" onclick='printQuotation(${JSON.stringify(row)})'>打印报价单</button>
    ${canEditBase() ? `<button class="danger" onclick='deleteQuotation(${row.id})'>删除</button>` : ''}` });
}

function renderOrderTable(view, rows) {
  $('#orderTableHolder').innerHTML = tableHtml(columns[view], rows, {
    actions: (row) => `
      <button onclick='viewOrder("${view}", ${JSON.stringify(row)})'>查看明细</button>
      ${row.status === 'pending' && canEditBase() ? `<button onclick='openOrderForm("${view}", ${JSON.stringify(row)})'>修改</button>` : ''}
      ${!['completed', 'cancelled'].includes(row.status) ? `<button class="primary" onclick='openProgressForm("${view}", ${JSON.stringify(row)})'>${view === 'purchases' ? '确认到货' : '确认发货'}</button>` : ''}
      <button onclick='printOrder("${view}", ${JSON.stringify(row)})'>打印</button>
    `
  });
  rows.forEach((row, index) => {
    if (row.overdue) $('#orderTableHolder tbody').rows[index]?.classList.add('overdue-row');
  });
}

function orderPartyOptions(view, selected) {
  const items = view === 'purchases' ? state.suppliers : state.customers;
  return items.map(item => `<option value="${item.id}" ${Number(selected) === Number(item.id) ? 'selected' : ''}>${item.code} - ${item.name}</option>`).join('');
}

async function openOrderForm(view, row = null) {
  await refreshLookups();
  const isPurchase = view === 'purchases';
  const today = new Date().toISOString().slice(0, 10);
  $('#modalTitle').textContent = row ? `修改${isPurchase ? '采购' : '销售'}整单` : `新增${isPurchase ? '采购' : '销售'}整单`;
  const form = $('#modalForm');
  form.innerHTML = `
    <label>订单号<input name="order_no" value="${row?.order_no || ''}" placeholder="留空自动生成"></label>
    <label>${isPurchase ? '供应商' : '客户'}<select name="${isPurchase ? 'supplier_id' : 'customer_id'}" required><option value="">请选择</option>${orderPartyOptions(view, row?.[isPurchase ? 'supplier_id' : 'customer_id'])}</select></label>
    <label>${isPurchase ? '采购' : '销售'}日期<input name="order_date" type="date" value="${row?.order_date || today}" required></label>
    <label>${isPurchase ? '要求到货日期' : '要求发货日期'}<input name="${isPurchase ? 'expected_date' : 'delivery_date'}" type="date" value="${row?.[isPurchase ? 'expected_date' : 'delivery_date'] || ''}" required></label>
    <label class="wide">备注<textarea name="remark">${row?.remark || ''}</textarea></label>
    <div class="wide order-lines-head"><h3>备件明细</h3><button type="button" id="addOrderLine" class="primary">增加备件</button></div>
    <div id="orderLines" class="wide order-lines"></div>
    <div class="wide order-total">订单合计：<strong id="orderTotal">0.00</strong></div>
    <div class="form-actions"><button type="button" id="cancelBtn">取消</button><button class="primary" type="submit">保存整单</button></div>`;
  $('#modal').classList.remove('hidden');
  $('#cancelBtn').onclick = closeModal;
  $('#addOrderLine').onclick = () => addOrderLine(view);
  (row?.items?.length ? row.items : [{}]).forEach(item => addOrderLine(view, item));
  form.onsubmit = event => saveOrder(event, view, row);
}

function addOrderLine(view, item = {}) {
  const holder = $('#orderLines');
  const line = document.createElement('div');
  line.className = 'order-line';
  const options = state.products.map(product => `<option value="${product.id}" ${Number(item.product_id) === Number(product.id) ? 'selected' : ''}>${product.code} - ${product.name}</option>`).join('');
  line.innerHTML = `
    <label>备件编号<select class="line-product" required><option value="">请选择备件编号</option>${options}</select></label>
    <label>产品名称<input class="line-name" value="${item.product_name || ''}" readonly></label>
    <label>单位<input class="line-unit" value="${item.unit || ''}" readonly></label>
    <label>数量<input class="line-quantity" type="number" min="0.0001" step="any" value="${item.quantity || ''}" required></label>
    <label>单价<input class="line-price" type="number" min="0" step="any" value="${item.unit_price ?? ''}" required></label>
    <label>金额<input class="line-amount" value="${item.amount ? money(item.amount) : ''}" readonly></label>
    <label>明细备注<input class="line-remark" value="${item.remark || ''}"></label>
    <button type="button" class="danger line-remove" title="删除这条备件">删除</button>`;
  holder.appendChild(line);
  const productSelect = line.querySelector('.line-product');
  const updateProduct = () => {
    const product = state.products.find(p => Number(p.id) === Number(productSelect.value));
    line.querySelector('.line-name').value = product?.name || '';
    line.querySelector('.line-unit').value = product?.unit || '';
    if (!line.querySelector('.line-price').value && product) {
      line.querySelector('.line-price').value = view === 'purchases' ? product.purchase_price || 0 : product.sale_price || 0;
    }
    updateOrderTotal();
  };
  productSelect.onchange = updateProduct;
  line.querySelector('.line-quantity').oninput = updateOrderTotal;
  line.querySelector('.line-price').oninput = updateOrderTotal;
  line.querySelector('.line-remove').onclick = () => { line.remove(); updateOrderTotal(); };
  if (item.product_id) updateProduct();
  updateOrderTotal();
}

function updateOrderTotal() {
  let total = 0;
  document.querySelectorAll('#orderLines .order-line').forEach(line => {
    const amount = Number(line.querySelector('.line-quantity').value || 0) * Number(line.querySelector('.line-price').value || 0);
    line.querySelector('.line-amount').value = money(amount);
    total += amount;
  });
  if ($('#orderTotal')) $('#orderTotal').textContent = money(total);
}

async function saveOrder(event, view, row) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  data.items = Array.from(form.querySelectorAll('.order-line')).map(line => ({
    product_id: line.querySelector('.line-product').value,
    quantity: line.querySelector('.line-quantity').value,
    unit_price: line.querySelector('.line-price').value,
    remark: line.querySelector('.line-remark').value,
  }));
  try {
    const result = await api(row ? `/api/${view}/${row.id}` : `/api/${view}`, {
      method: row ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    closeModal();
    showMessage(`整单保存成功，单号：${result.order_no}`, true);
    await loadView();
  } catch (error) { showMessage(error.message); }
}

async function openQuotationForm(row = null, defaultCompanyName = '') {
  await refreshLookups();
  const today = new Date().toISOString().slice(0, 10);
  const validDate = new Date();
  validDate.setDate(validDate.getDate() + 30);
  $('#modalTitle').textContent = row ? `修改报价单 ${row.quote_no}` : '新增报价单';
  const form = $('#modalForm');
  form.innerHTML = `
    <label>报价单号<input name="quote_no" value="${row?.quote_no || ''}" placeholder="留空自动生成"></label>
    <label>我方公司名称<input name="own_company_name" value="${row?.own_company_name || defaultCompanyName || ''}" required></label>
    <label>客户<select name="customer_id" required><option value="">请选择</option>${orderPartyOptions('sales', row?.customer_id)}</select></label>
    <label>发货单位<input name="shipping_unit" value="${row?.shipping_unit || ''}" required></label>
    <label>报价日期<input name="quote_date" type="date" value="${row?.quote_date || today}" required></label>
    <label>报价有效期至<input name="validity_date" type="date" value="${row?.validity_date || validDate.toISOString().slice(0, 10)}"></label>
    <label>收货联系人<input name="shipping_contact" value="${row?.shipping_contact || ''}"></label>
    <label>联系电话<input name="shipping_phone" value="${row?.shipping_phone || ''}"></label>
    <label class="wide">发货/收货地址<input name="shipping_address" value="${row?.shipping_address || ''}"></label>
    <label>预计交货日期<input name="delivery_date" type="date" value="${row?.delivery_date || ''}"></label>
    <label>发货方式<input name="delivery_method" value="${row?.delivery_method || ''}" placeholder="例如：快递、物流、自提"></label>
    <label class="wide">报价及发货备注<textarea name="remark">${row?.remark || ''}</textarea></label>
    <div class="wide order-lines-head"><h3>报价明细</h3><button type="button" id="addOrderLine" class="primary">增加备件</button></div>
    <div id="orderLines" class="wide order-lines"></div>
    <div class="wide order-total">报价合计：<strong id="orderTotal">0.00</strong></div>
    <div class="form-actions"><button type="button" id="cancelBtn">取消</button><button class="primary" type="submit">保存报价单</button></div>`;
  $('#modal').classList.remove('hidden');
  $('#cancelBtn').onclick = closeModal;
  $('#addOrderLine').onclick = () => addOrderLine('sales');
  (row?.items?.length ? row.items : [{}]).forEach(item => addOrderLine('sales', item));
  const customerSelect = form.elements.customer_id;
  customerSelect.onchange = () => {
    const customer = state.customers.find(item => Number(item.id) === Number(customerSelect.value));
    if (!customer) return;
    if (!form.elements.shipping_unit.value) form.elements.shipping_unit.value = customer.name || '';
    if (!form.elements.shipping_contact.value) form.elements.shipping_contact.value = customer.contact || '';
    if (!form.elements.shipping_phone.value) form.elements.shipping_phone.value = customer.phone || '';
    if (!form.elements.shipping_address.value) form.elements.shipping_address.value = customer.address || '';
  };
  form.onsubmit = event => saveQuotation(event, row);
}

async function saveQuotation(event, row) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  data.items = Array.from(form.querySelectorAll('.order-line')).map(line => ({
    product_id: line.querySelector('.line-product').value,
    quantity: line.querySelector('.line-quantity').value,
    unit_price: line.querySelector('.line-price').value,
    remark: line.querySelector('.line-remark').value,
  }));
  try {
    const result = await api(row ? `/api/quotations/${row.id}` : '/api/quotations', {
      method: row ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    closeModal();
    showMessage(`报价单保存成功：${result.quote_no}`, true);
    await loadView();
  } catch (error) { showMessage(error.message); }
}

function quotationItemsTable(row) {
  return `<div class="table-wrap"><table class="detail-table"><thead><tr><th>序号</th><th>备件编号</th><th>产品名称</th><th>技术描述</th><th>单位</th><th>数量</th><th>单价</th><th>金额</th><th>备注</th></tr></thead><tbody>${row.items.map((item, index) => `<tr><td>${index + 1}</td><td>${item.product_code}</td><td>${item.product_name}</td><td>${item.description || ''}</td><td>${item.unit || ''}</td><td>${item.quantity}</td><td>${money(item.unit_price)}</td><td>${money(item.amount)}</td><td>${item.remark || ''}</td></tr>`).join('')}</tbody></table></div>`;
}

function viewQuotation(row) {
  $('#modalTitle').textContent = `报价单 ${row.quote_no}`;
  $('#modalForm').innerHTML = `
    <div class="wide order-summary"><strong>${row.own_company_name}</strong><span>客户：${row.customer_name}</span><span>报价日期：${row.quote_date}</span><span>有效期至：${row.validity_date || '-'}</span></div>
    <div class="wide shipping-summary"><strong>发货信息</strong><span>发货单位：${row.shipping_unit}</span><span>联系人：${row.shipping_contact || '-'}</span><span>电话：${row.shipping_phone || '-'}</span><span>地址：${row.shipping_address || '-'}</span><span>交货日期：${row.delivery_date || '-'}</span><span>方式：${row.delivery_method || '-'}</span></div>
    <div class="wide">${quotationItemsTable(row)}</div>
    <div class="wide order-total">报价合计：<strong>${money(row.amount)}</strong></div>
    <div class="form-actions"><button type="button" id="cancelBtn">关闭</button><button type="button" class="primary" id="printQuoteBtn">打印报价单</button></div>`;
  $('#modal').classList.remove('hidden');
  $('#cancelBtn').onclick = closeModal;
  $('#printQuoteBtn').onclick = () => printQuotation(row);
}

function printQuotation(row) {
  const itemRows = row.items.map((item, index) => `<tr><td>${index + 1}</td><td>${item.product_code}</td><td>${item.product_name}</td><td>${item.description || ''}</td><td>${item.unit || ''}</td><td>${item.quantity}</td><td>${money(item.unit_price)}</td><td>${money(item.amount)}</td><td>${item.remark || ''}</td></tr>`).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>报价单 ${row.quote_no}</title><style>
    @page{size:A4;margin:16mm}body{font-family:Arial,"Microsoft YaHei",sans-serif;color:#111;font-size:13px;margin:0}h1{text-align:center;font-size:26px;margin:4px 0}.company{text-align:center;font-size:18px;font-weight:700;margin-bottom:18px}.meta,.shipping{display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin:12px 0;padding:10px;border:1px solid #777}.shipping h2{grid-column:1/-1;font-size:15px;margin:0 0 4px}.wide{grid-column:1/-1}table{width:100%;border-collapse:collapse;margin-top:12px}th,td{border:1px solid #555;padding:7px;text-align:left}th{background:#f0f0f0}.number{text-align:right}.total{text-align:right;font-size:17px;font-weight:700;margin:14px 0}.remark{min-height:48px;border:1px solid #777;padding:9px}.footer{display:flex;justify-content:space-between;margin-top:34px}@media print{button{display:none}}
  </style></head><body><h1>报 价 单</h1><div class="company">${row.own_company_name}</div>
  <div class="meta"><span>报价单号：${row.quote_no}</span><span>报价日期：${row.quote_date}</span><span>客户名称：${row.customer_name}</span><span>报价有效期至：${row.validity_date || '-'}</span></div>
  <div class="shipping"><h2>基础发货信息</h2><span>发货单位：${row.shipping_unit}</span><span>收货联系人：${row.shipping_contact || '-'}</span><span>联系电话：${row.shipping_phone || '-'}</span><span>预计交货日期：${row.delivery_date || '-'}</span><span class="wide">发货/收货地址：${row.shipping_address || '-'}</span><span>发货方式：${row.delivery_method || '-'}</span></div>
  <table><thead><tr><th>序号</th><th>备件编号</th><th>产品名称</th><th>技术描述</th><th>单位</th><th>数量</th><th>单价</th><th>金额</th><th>备注</th></tr></thead><tbody>${itemRows}</tbody></table>
  <div class="total">报价总金额：￥${money(row.amount)}</div><div class="remark"><strong>报价及发货备注：</strong>${row.remark || '无'}</div>
  <div class="footer"><span>报价人：${row.created_by || ''}</span><span>客户确认：________________</span></div><script>window.print()</script></body></html>`;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}

async function deleteQuotation(id) {
  if (!confirm('确认删除这张报价单吗？')) return;
  try {
    await api(`/api/quotations/${id}`, { method: 'DELETE' });
    showMessage('报价单已删除', true);
    await loadView();
  } catch (error) { showMessage(error.message); }
}

function orderDetailTable(row, view, progress = false) {
  const actionLabel = view === 'purchases' ? '本次到货' : '本次发货';
  const processedLabel = view === 'purchases' ? '已到货' : '已发货';
  return `<div class="table-wrap"><table class="detail-table"><thead><tr><th>备件编号</th><th>产品名称</th><th>单位</th><th>订购数量</th><th>${processedLabel}</th><th>未完成</th><th>单价</th><th>金额</th>${progress ? `<th>${actionLabel}</th>` : ''}</tr></thead><tbody>${row.items.map(item => `<tr><td>${item.product_code}</td><td>${item.product_name}</td><td>${item.unit || ''}</td><td>${item.quantity}</td><td>${item.processed_quantity}</td><td>${item.remaining_quantity}</td><td>${money(item.unit_price)}</td><td>${money(item.amount)}</td>${progress ? `<td><input class="progress-qty" data-item-id="${item.id}" type="number" min="0" max="${item.remaining_quantity}" step="any" value="0" ${Number(item.remaining_quantity) <= 0 ? 'disabled' : ''}></td>` : ''}</tr>`).join('')}</tbody></table></div>`;
}

function viewOrder(view, row) {
  $('#modalTitle').textContent = `${view === 'purchases' ? '采购' : '销售'}单 ${row.order_no}`;
  $('#modalForm').innerHTML = `<div class="wide order-summary"><strong>${view === 'purchases' ? row.supplier_name : row.customer_name}</strong><span>订单日期：${row.order_date}</span><span>${view === 'purchases' ? '到货要求' : '发货要求'}：${row[view === 'purchases' ? 'expected_date' : 'delivery_date'] || '-'}</span><span>状态：${row.status_text}</span></div><div class="wide">${orderDetailTable(row, view)}</div><div class="form-actions"><button type="button" id="cancelBtn">关闭</button></div>`;
  $('#modal').classList.remove('hidden');
  $('#cancelBtn').onclick = closeModal;
}

function openProgressForm(view, row) {
  const isPurchase = view === 'purchases';
  $('#modalTitle').textContent = `${isPurchase ? '确认到货入库' : '确认发货出库'}：${row.order_no}`;
  const form = $('#modalForm');
  form.innerHTML = `<div class="wide progress-note">只填写本次实际${isPurchase ? '到货' : '发货'}数量。系统会保留未完成数量，下次可以继续处理。</div><div class="wide">${orderDetailTable(row, view, true)}</div><label class="wide">本次备注<textarea name="remark"></textarea></label><div class="form-actions"><button type="button" id="fillRemainingBtn">全部填入未完成数量</button><button type="button" id="cancelBtn">取消</button><button class="primary" type="submit">确认${isPurchase ? '入库' : '出库'}</button></div>`;
  $('#modal').classList.remove('hidden');
  $('#cancelBtn').onclick = closeModal;
  $('#fillRemainingBtn').onclick = () => form.querySelectorAll('.progress-qty').forEach(input => { if (!input.disabled) input.value = input.max; });
  form.onsubmit = async event => {
    event.preventDefault();
    const items = Array.from(form.querySelectorAll('.progress-qty')).map(input => ({ item_id: input.dataset.itemId, quantity: input.value }));
    try {
      const result = await api(`/api/${view}/${row.id}/${isPurchase ? 'receive' : 'ship'}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items, remark: form.elements.remark.value }) });
      closeModal();
      showMessage(`${isPurchase ? '到货入库' : '发货出库'}成功：${result.order_no}`, true);
      await loadView();
    } catch (error) { showMessage(error.message); }
  };
}

async function renderStock() {
  await refreshLookups();
  const [data, purchases, sales] = await Promise.all([api('/api/stock'), api('/api/purchases'), api('/api/sales')]);
  const pendingPurchases = purchases.items.filter(row => !['completed', 'cancelled'].includes(row.status));
  const pendingSales = sales.items.filter(row => !['completed', 'cancelled'].includes(row.status));
  pendingPurchases.forEach(row => row.status_text = `${row.status === 'partial' ? '部分到货' : '待到货'}${row.overdue ? '（已逾期）' : ''}`);
  pendingSales.forEach(row => row.status_text = `${row.status === 'partial' ? '部分发货' : '待发货'}${row.overdue ? '（已逾期）' : ''}`);
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
    <div class="panel"><h2>待到货采购单</h2><p>打开整单，填写本次实际到货数量；第一次确认后单据内容立即锁定。</p><div id="stockPurchaseOrders"></div></div>
    <div class="panel"><h2>待发货销售单</h2><p>发货时检查实时库存；第一次确认后单据内容立即锁定。</p><div id="stockSalesOrders"></div></div>
    <h2>实时库存</h2>
    ${tableHtml(columns.products, data.items)}
    <div class="panel"><h2>最近库存流水</h2>${tableHtml([['movement_time','时间'],['movement_type','类型'],['product_code','编号'],['product_name','产品'],['quantity','数量'],['operator','操作人'],['source_no','来源单号'],['remark','备注']], data.movements)}</div>
  `;
  $('#stockPurchaseOrders').innerHTML = stockOrderTable('purchases', pendingPurchases);
  $('#stockSalesOrders').innerHTML = stockOrderTable('sales', pendingSales);
  $('#stockSearchBtn').onclick = async () => {
    const result = await api(`/api/stock?q=${encodeURIComponent($('#stockSearch').value)}`);
    $('#content').querySelector('.table-wrap').outerHTML = tableHtml(columns.products, result.items);
  };
  $('#stockImportBtn').onclick = () => $('#stockImportPanel').classList.toggle('hidden');
  $('#stockImportPanel').querySelector('#importBtn').onclick = () => importData('products');
  $('#manualStockBtn').onclick = () => openForm('stockManual');
  applyRole();
}

function stockOrderTable(view, rows) {
  const isPurchase = view === 'purchases';
  const cols = isPurchase
    ? [['order_no','采购单号'],['supplier_name','供应商'],['expected_date','要求到货日期'],['total_quantity','总数量'],['processed_quantity','已到货'],['status_text','状态']]
    : [['order_no','销售单号'],['customer_name','客户'],['delivery_date','要求发货日期'],['total_quantity','总数量'],['processed_quantity','已发货'],['status_text','状态']];
  return tableHtml(cols, rows, { actions: row => `<button onclick='viewOrder("${view}", ${JSON.stringify(row)})'>查看明细</button><button class="primary" onclick='openProgressForm("${view}", ${JSON.stringify(row)})'>${isPurchase ? '确认到货' : '确认发货'}</button>` });
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
  const partySelect = $('#importPartyId');
  if (partySelect && partySelect.value) form.append(view === 'purchases' ? 'supplier_id' : 'customer_id', partySelect.value);
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
  const party = view === 'purchases' ? row.supplier_name : row.customer_name;
  const dateLabel = view === 'purchases' ? '要求到货日期' : '要求发货日期';
  const requiredDate = row[view === 'purchases' ? 'expected_date' : 'delivery_date'] || '';
  const html = `
    <html><head><title>${title}${row.order_no}</title><style>body{font-family:Arial,"Microsoft YaHei";padding:30px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:8px;text-align:left}</style></head>
    <body><h1>${title} ${row.order_no}</h1><p>${view === 'purchases' ? '供应商' : '客户'}：${party}　订单日期：${row.order_date}　${dateLabel}：${requiredDate}</p>
    <table><thead><tr><th>备件编号</th><th>产品名称</th><th>技术描述</th><th>单位</th><th>数量</th><th>${view === 'purchases' ? '已到货' : '已发货'}</th><th>单价</th><th>金额</th></tr></thead><tbody>
    ${row.items.map(item => `<tr><td>${item.product_code}</td><td>${item.product_name}</td><td>${item.description || ''}</td><td>${item.unit || ''}</td><td>${item.quantity}</td><td>${item.processed_quantity}</td><td>${money(item.unit_price)}</td><td>${money(item.amount)}</td></tr>`).join('')}
    </tbody></table><p>订单金额：${money(row.amount)}　状态：${row.status_text}</p><script>window.print()</script></body></html>`;
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
