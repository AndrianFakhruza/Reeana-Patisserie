// ========== PRICING DATA ==========
function parsePrice(optionText) {
    const match = optionText.match(/(\d+)k/i);
    return match ? parseInt(match[1]) * 1000 : 0;
}

// ========== ADD ORDER ITEM ==========
let itemCounter = 0;

function addOrderItem() {
    const container = document.getElementById('orderItemsContainer');
    const template = document.getElementById('orderItemTemplate');
    const clone = template.content.cloneNode(true);

    // Set item number
    itemCounter++;
    clone.querySelectorAll('.item-number').forEach(el => el.textContent = itemCounter);

    // Store counter value on the element for reference
    const orderItem = clone.querySelector('.order-item');
    orderItem.dataset.itemId = itemCounter;

    // Populate menu options
    const menuSelect = clone.querySelector('.menu-select');
    allMenuItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        menuSelect.appendChild(option);
    });

    container.appendChild(clone);
    renumberItems();
}

// ========== REMOVE ORDER ITEM ==========
function removeOrderItem(button) {
    const orderItem = button.closest('.order-item');
    orderItem.remove();
    renumberItems();
    calculateTotal();
}

// ========== RENUMBER ITEMS (FIX POIN 5) ==========
function renumberItems() {
    const items = document.querySelectorAll('.order-item');
    items.forEach((item, index) => {
        const num = index + 1;
        item.querySelectorAll('.item-number').forEach(el => el.textContent = num);
    });
}

// ========== UPDATE OPTIONS ==========
function updateOptions(selectElement) {
    const menuId = selectElement.value;
    const orderItem = selectElement.closest('.order-item');
    const optionSelect = orderItem.querySelector('.option-select');

    optionSelect.innerHTML = '<option value="">-- Pilih Varian --</option>';

    if (menuId) {
        const menu = allMenuItems.find(item => item.id == menuId);
        if (menu) {
            menu.options.forEach((option, index) => {
                const opt = document.createElement('option');
                opt.value = index;
                opt.textContent = option;
                opt.dataset.price = parsePrice(option);
                optionSelect.appendChild(opt);
            });
        }
    }

    calculateTotal();
}

// ========== CALCULATE TOTAL ==========
function calculateTotal() {
    let total = 0;

    document.querySelectorAll('.order-item').forEach(item => {
        const optionSelect = item.querySelector('.option-select');
        const quantityInput = item.querySelector('.quantity-input');
        const subtotalDiv = item.querySelector('.item-subtotal');

        if (optionSelect.value !== '') {
            const selectedOption = optionSelect.options[optionSelect.selectedIndex];
            const price = parseInt(selectedOption.dataset.price) || 0;
            const quantity = parseInt(quantityInput.value) || 1;
            const subtotal = price * quantity;

            subtotalDiv.textContent = formatRupiah(subtotal);
            total += subtotal;
        } else {
            subtotalDiv.textContent = 'Rp 0';
        }
    });

    document.getElementById('totalPrice').textContent = formatRupiah(total);
}

// ========== FORMAT RUPIAH ==========
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// ========== VALIDASI NOMOR HP (FIX POIN 4) ==========
function validatePhoneNumber(phone) {
    // Format valid: 08xx, +628xx, 628xx, minimal 10 digit maksimal 13 digit
    const cleaned = phone.replace(/[\s\-().]/g, '');
    const pattern = /^(\+62|62|0)8[1-9][0-9]{7,10}$/;
    return pattern.test(cleaned);
}

// ========== SEND TO WHATSAPP ==========
function sendToWhatsApp() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerNotes = document.getElementById('customerNotes').value.trim();

    // Validasi nama
    if (!customerName) {
        showAlert('⚠️ Nama lengkap wajib diisi!');
        document.getElementById('customerName').focus();
        return;
    }

    // Validasi nomor HP (Poin 4)
    if (!customerPhone) {
        showAlert('⚠️ Nomor WhatsApp wajib diisi!');
        document.getElementById('customerPhone').focus();
        return;
    }

    if (!validatePhoneNumber(customerPhone)) {
        showAlert('⚠️ Format nomor WhatsApp tidak valid!\nContoh yang benar: 08131234567 atau +6281234567');
        document.getElementById('customerPhone').focus();
        return;
    }

    const orderItems = document.querySelectorAll('.order-item');
    if (orderItems.length === 0) {
        showAlert('⚠️ Silakan tambahkan minimal 1 item pesanan!');
        return;
    }

    // Validate all items
    let hasError = false;
    orderItems.forEach((item, index) => {
        if (hasError) return;
        const menuSelect = item.querySelector('.menu-select');
        const optionSelect = item.querySelector('.option-select');

        if (!menuSelect.value || !optionSelect.value) {
            showAlert(`⚠️ Item #${index + 1}: Harap pilih menu dan varian!`);
            hasError = true;
        }
    });

    if (hasError) return;

    // Build WhatsApp message
    let message = `*PESANAN BARU - ULVORIA PATISSERIE*\n\n`;
    message += `Nama: ${customerName}\n`;
    message += `No. WA: ${customerPhone}\n\n`;
    message += `*DETAIL PESANAN:*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;

    let totalPrice = 0;

    orderItems.forEach((item, index) => {
        const menuSelect = item.querySelector('.menu-select');
        const optionSelect = item.querySelector('.option-select');
        const quantityInput = item.querySelector('.quantity-input');

        const menuName = menuSelect.options[menuSelect.selectedIndex].text;
        const optionText = optionSelect.options[optionSelect.selectedIndex].text;
        const quantity = parseInt(quantityInput.value);
        const price = parseInt(optionSelect.options[optionSelect.selectedIndex].dataset.price);
        const subtotal = price * quantity;

        message += `\n${index + 1}. *${menuName}*\n`;
        message += `   - Varian: ${optionText}\n`;
        message += `   - Jumlah: ${quantity}x\n`;
        message += `   - Subtotal: ${formatRupiah(subtotal)}\n`;

        totalPrice += subtotal;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*TOTAL: ${formatRupiah(totalPrice)}*\n`;
    message += `\nCatatan/Request:\n`;
    message += customerNotes ? customerNotes : '_(Tidak ada catatan)_';
    message += `\n\n━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Waktu Pesan: ${new Date().toLocaleString('id-ID')}\n`;
    message += `\n_Mohon konfirmasi ketersediaan stok dan ongkir ya! Terima kasih_`;

    const waNumber = '6283135153353';
    const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    window.open(waURL, '_blank');
}

// ========== CUSTOM ALERT ==========
function showAlert(message) {
    // Buat modal alert sederhana agar tidak bergantung pada browser alert()
    const existing = document.getElementById('customAlert');
    if (existing) existing.remove();

    const alertEl = document.createElement('div');
    alertEl.id = 'customAlert';
    alertEl.style.cssText = `
        position:fixed; top:0; left:0; width:100%; height:100%;
        background:rgba(69,0,40,0.75); display:flex; align-items:center;
        justify-content:center; z-index:9999; padding:1rem;
    `;
    alertEl.innerHTML = `
        <div style="background:white; border-radius:1rem; padding:2rem; max-width:360px; width:100%; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,0.3);">
            <div style="font-size:2rem; margin-bottom:0.75rem;">⚠️</div>
            <p style="color:#450028; font-family:'Poppins',sans-serif; font-size:0.95rem; line-height:1.6; white-space:pre-line; margin-bottom:1.5rem;">${message}</p>
            <button onclick="document.getElementById('customAlert').remove()"
                style="background:#450028; color:white; border:none; padding:0.6rem 2rem; border-radius:2rem; font-family:'Poppins',sans-serif; font-weight:600; cursor:pointer; font-size:0.9rem;">
                OK
            </button>
        </div>
    `;
    document.body.appendChild(alertEl);
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    addOrderItem();
});

// ========== REAL-TIME VALIDASI NOMOR HP (FIX POIN 4) ==========
function validatePhoneInput(input) {
    const errorEl = document.getElementById('phoneError');
    const successEl = document.getElementById('phoneSuccess');
    const val = input.value.trim();

    if (val.length === 0) {
        errorEl.classList.add('hidden');
        successEl.classList.add('hidden');
        input.classList.remove('border-red-400', 'border-green-400');
        input.classList.add('border-primary/20');
        return;
    }

    if (validatePhoneNumber(val)) {
        errorEl.classList.add('hidden');
        successEl.classList.remove('hidden');
        input.classList.remove('border-red-400', 'border-primary/20');
        input.classList.add('border-green-400');
    } else {
        successEl.classList.add('hidden');
        errorEl.classList.remove('hidden');
        input.classList.remove('border-green-400', 'border-primary/20');
        input.classList.add('border-red-400');
    }
}