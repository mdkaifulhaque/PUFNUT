// admin.js

const STORAGE_KEY = "PUFNUT_PRODUCTS_V2";
let allProducts = [];

// Dialogs
const addDialog = document.getElementById('add-product-dialog');
const editDialog = document.getElementById('edit-product-dialog');
const deleteDialog = document.getElementById('delete-product-dialog');

// Forms
const addForm = document.getElementById('add-product-form');
const editForm = document.getElementById('edit-product-form');

// Buttons
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

// Load products from localStorage
function loadProducts() {
  const saved = localStorage.getItem(STORAGE_KEY);
  allProducts = saved ? JSON.parse(saved) : [];
}

// Save products to localStorage
function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allProducts));
}

// Render table
function renderTable() {
  const tbody = document.querySelector('.admin-table tbody');
  tbody.innerHTML = '';
  allProducts.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td><img src="${p.img}" alt="${p.name}" width="50"></td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>Rs. ${p.price}</td>
      <td>
        <button class="btn-edit" data-id="${p.id}">Edit</button>
        <button class="btn-delete" data-id="${p.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Add product
function addProduct(event) {
  event.preventDefault();
  const form = event.target;
  const newProduct = {
    id: `PROD${Date.now()}`,
    name: form.elements.name.value,
    category: form.elements.category.value,
    price: parseFloat(form.elements.price.value),
    mrp: parseFloat(form.elements.mrp.value),
    img: form.elements.img.value,
  };
  allProducts.push(newProduct);
  saveProducts();
  renderTable();
  addDialog.close();
  form.reset();
}

// Edit product
function editProduct(event) {
  event.preventDefault();
  const form = event.target;
  const id = form.elements.id.value;
  const index = allProducts.findIndex(p => p.id === id);
  if (index > -1) {
    allProducts[index] = {
      id: id,
      name: form.elements.name.value,
      category: form.elements.category.value,
      price: parseFloat(form.elements.price.value),
      mrp: parseFloat(form.elements.mrp.value),
      img: form.elements.img.value,
    };
    saveProducts();
    renderTable();
    editDialog.close();
  }
}

// Delete product
function deleteProduct(id) {
  allProducts = allProducts.filter(p => p.id !== id);
  saveProducts();
  renderTable();
  deleteDialog.close();
}

// Event Listeners
if (addForm) {
    addForm.addEventListener('submit', addProduct);
}
editForm.addEventListener('submit', editProduct);

// Event listener for the left-side static form
const leftSideSaveBtn = document.getElementById('saveBtn');
if (leftSideSaveBtn) {
    leftSideSaveBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const nameInput = document.getElementById('pName');
        const priceInput = document.getElementById('pPrice');
        const mrpInput = document.getElementById('pMRP');
        const imgInput = document.getElementById('pImg');
        const categoryInput = document.getElementById('pCategory');

        const newProduct = {
            id: `PROD${Date.now()}`,
            name: nameInput.value,
            category: categoryInput.value,
            price: parseFloat(priceInput.value),
            mrp: parseFloat(mrpInput.value),
            img: imgInput.value,
        };

        if (!newProduct.name || !newProduct.price || !newProduct.mrp || !newProduct.img) {
            alert('Please fill out all fields in the form.');
            return;
        }

        allProducts.push(newProduct);
        saveProducts();
        renderTable();

        // Reset the form fields
        nameInput.value = '';
        priceInput.value = '';
        mrpInput.value = '';
        imgInput.value = '';
        categoryInput.value = 'snacks';
    });
}

document.querySelector('.admin-table tbody').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-edit')) {
    const id = e.target.dataset.id;
    const product = allProducts.find(p => p.id === id);
    if (product) {
      editForm.id.value = product.id;
      editForm.name.value = product.name;
      editForm.category.value = product.category;
      editForm.price.value = product.price;
      editForm.mrp.value = product.mrp;
      editForm.img.value = product.img;
      editDialog.showModal();
    }
  }
  if (e.target.classList.contains('btn-delete')) {
    const id = e.target.dataset.id;
    confirmDeleteBtn.onclick = () => deleteProduct(id);
    deleteDialog.showModal();
  }
});

// Close dialogs
[addDialog, editDialog, deleteDialog].forEach(dialog => {
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
});

// Handle cancel buttons
document.querySelectorAll('.cancel-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('dialog').close();
  });
});

// Initial load
loadProducts();
renderTable();

