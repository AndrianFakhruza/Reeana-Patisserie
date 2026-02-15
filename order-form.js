// ========== PRICING DATA ==========
// Parse harga dari opsi menu
function parsePrice(optionText) {
    // Extract angka dari text seperti "1 loyang : 80k" atau "Cup : 35k"
    const match = optionText.match(/(\d+)k/i);
    return match ? parseInt(match[1]) * 1000 : 0;
}

// ========== ADD ORDER ITEM ==========
let itemCounter = 1;

function addOrderItem() {
    const container = document.getElementById('orderItemsContainer');
    const template = document.getElementById('orderItemTemplate');
    const clone = template.content.cloneNode(true);
    
    // Set item number
    clone.querySelector('.item-number').textContent = itemCounter++;
    
    // Populate menu options
    const menuSelect = clone.querySelector('.menu-select');
    menuItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        menuSelect.appendChild(option);
    });
    
    container.appendChild(clone);
}

// ========== REMOVE ORDER ITEM ==========
function removeOrderItem(button) {
    const orderItem = button.closest('.order-item');
    orderItem.remove();
    calculateTotal();
}

// ========== UPDATE OPTIONS ==========
function updateOptions(selectElement) {
    const menuId = parseInt(selectElement.value);
    const orderItem = selectElement.closest('.order-item');
    const optionSelect = orderItem.querySelector('.option-select');
    
    // Clear previous options
    optionSelect.innerHTML = '<option value="">-- Pilih Varian --</option>';
    
    if (menuId) {
        const menu = menuItems.find(item => item.id === menuId);
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

// ========== SEND TO WHATSAPP ==========
function sendToWhatsApp() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerNotes = document.getElementById('customerNotes').value.trim();
    
    // Validation
    if (!customerName || !customerPhone) {
        alert('⚠️ Nama dan nomor WhatsApp wajib diisi!');
        return;
    }
    
    const orderItems = document.querySelectorAll('.order-item');
    if (orderItems.length === 0) {
        alert('⚠️ Silakan tambahkan minimal 1 item pesanan!');
        return;
    }
    
    // Validate all items
    let hasError = false;
    orderItems.forEach((item, index) => {
        const menuSelect = item.querySelector('.menu-select');
        const optionSelect = item.querySelector('.option-select');
        
        if (!menuSelect.value || !optionSelect.value) {
            alert(`⚠️ Item #${index + 1}: Harap pilih menu dan varian!`);
            hasError = true;
            return;
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
    
    // Encode and send to WhatsApp
    const waNumber = '6283135153353';
    const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(waURL, '_blank');
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    // Add first order item by default
    addOrderItem();
});