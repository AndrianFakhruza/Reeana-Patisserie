// ========== DATA MENU ==========
const menuItems = [
    {
        id: 1,
        name: 'ChocoBan Granola',
        description: 'Banana bread dengan granola',
        fullDescription: 'Banana bread moist dan rich dengan toping granola yang melimpah.',
        price: '12k/80k',
        image: 'assets/ChocBanGranola.jpeg',
        options: [
            '1 loyang ukuran 22x10x7 : 80k',
            'Cup Muffin : 12k'
        ]
    },
    {
        id: 2,
        name: 'Fudgy Brownies',
        description: 'Tekstur fudgy sempurna',
        fullDescription: 'Brownies dengan tekstur fudgy yang lembut di dalam dan crackly top diluar.',
        price: '20k/25k',
        image: 'assets/FudgyBrownies.png',
        options: [
            'PaperCup(Ori) : 20k',
            'PaperCup(Almond) : 25k'
        ]
    },
    {
        id: 3,
        name: 'Burnt Cheese Cake Brownie',
        description: 'Brownies meets cheesecake',
        fullDescription: 'Perpaduan antara brownies coklat yang fudgy dan cheseecake yang creamy.',
        price: '20k/55k',
        image: 'assets/BurntCheeseCake.png',
        options: [
            '1-2 person : 55k',
            'Mini/Slice : 20k'
        ]
    },
    {
        id: 4,
        name: 'Classic Tiramisu',
        description: 'Creamy mascarpone, Espresso, dan Cocoa',
        fullDescription: 'Tiramisu klasik autentik dengan mascarpone lembut dan kaya rasa.',
        price: '35k',
        image: 'assets/TiramisuCake.jpeg',
        options: [
            '1 Cup : 35k'
        ]
    },
    {
        id: 5,
        name: 'Banana Pudding',
        description: 'Banana pudding creamy dengan topping saus caramel',
        fullDescription: 'Banana slices segar dan pudding vanilla yang lembut.',
        price: '20k',
        image: 'assets/BananaPudding.jpeg',
        options: [
            '1 PaperCup : 20k'
        ]
    },
    {
        id: 6,
        name: 'Choco Crunchy',
        description: 'Bolu kukus cokelat lembut dengan topping crunchy',
        fullDescription: 'Bolu kukus cokelat lembut dengan topping cokelat crunchy yang renyah dan lezat.',
        price: '12k',
        image: 'assets/ChocoCrunchy.png',
        options: [
            '1 Cup : 12k'
        ]
    },
    {
        id: 7,
        name: 'Asinan Kiamboy',
        description: 'Camilan buah segar dengan asam kiamboy',
        fullDescription: 'Camilan buah segar dengan rasa asam-manis dan sentuhan kiamboy yang khas.',
        price: '25k',
        image: 'assets/AsinanKiamboy.png',
        options: [
            '1 cup : 25k'
        ]
    },
    {
        id: 8,
        name: 'Spaghetti',
        description: 'Pasta dengan topping daging melimpah.',
        fullDescription: 'Pasta dengan saus gurih dan topping daging melimpah.',
        price: '15k',
        image: 'assets/Spaghetti.png',
        options: [
            '1 Box : 15k'
        ]
    },
    {
        id: 9,
        name: 'Pizza',
        description: 'Roti lembut dengan topping daging',
        fullDescription: 'Roti lembut dengan topping daging pilihan yang berkualitas.',
        price: '10k/55k',
        image: 'assets/Pizza.png',
        options: [
            'Personal : 10k',
            '1 Loyang sedang : 55k'
        ]
    }
];

// ========== DATA MENU RAMADHAN ==========
const ramadhanItems = [
    {
        id: 'r1',
        name: 'Nastar Golden Wijsman',
        description: 'Nastar lembut berisi selai nanas homemade dengan butter Wijsman premium',
        price: '55/65k',
        image: 'assets/Nastar.jpeg',
        options: ['Toples Kecil : 55k', 'Toples Besar : 65k'],
        bestSeller: true
    },
    {
        id: 'r2',
        name: 'Lidah Kucing',
        description: 'Kue kering tipis renyah dengan cita rasa vanilla butter yang ringan dan elegan',
        price: '55/65k',
        image: 'assets/Lidah_Kucing.jpg',
        options: ['Toples Kecil : 55k', 'Toples Besar : 65k'],
        bestSeller: false
    },
    {
        id: 'r3',
        name: 'Triple Choco Delight',
        description: 'Kue cokelat berlapis tiga — dark, milk, dan white chocolate dalam setiap gigitan',
        price: '85/100k',
        image: 'assets/choco_delight.jpeg',
        options: ['Toples Kecil : 85k', 'Toples Besar : 100k'],
        bestSeller: false
    },
    {
        id: 'r4',
        name: 'Kastengel Signature',
        description: 'Kastengel gurih dengan keju edam pilihan yang meleleh di mulut',
        price: '85/100k',
        image: 'assets/kastengel.jpg',
        options: ['Toples Kecil : 85k', 'Toples Besar : 100k'],
        bestSeller: false
    },
    {
        id: 'r5',
        name: 'Putri Salju',
        description: 'Kue salju lembut berbalut gula halus yang langsung meleleh begitu masuk mulut',
        price: '85/100k',
        image: 'assets/Kue_Salju.jpeg',
        options: ['Toples Kecil : 85k', 'Toples Besar : 100k'],
        bestSeller: true
    }
];

// ========== SEMUA ITEM UNTUK FORM PEMESANAN ==========
// Gabungkan menuItems + ramadhanItems agar muncul di dropdown order form
const allMenuItems = [
    ...menuItems,
    ...ramadhanItems.map(item => ({
        ...item,
        id: item.id  // tetap pakai id string seperti 'r1', 'r2', dst
    }))
];

// ========== INTERSECTION OBSERVER ==========
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

function observeReveal(container) {
    container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========== RENDER MENU UTAMA ==========
function renderMenu() {
    const menuContainer = document.getElementById('menuContainer');
    if (!menuContainer) return;

    menuItems.forEach(item => {
        const menuCard = document.createElement('div');
        menuCard.className = 'menu-card reveal';
        menuCard.onclick = () => openModal(item);

        menuCard.innerHTML = `
            <div class="menu-card-image">
                <img src="${item.image}" class="w-full h-full object-cover img-zoom" alt="${item.name}">
                <div class="menu-card-overlay">
                    <span class="bg-white text-primary px-6 py-2 rounded-full font-bold shadow-lg text-sm md:text-base">
                        Lihat Detail
                    </span>
                </div>
            </div>
            <div class="menu-card-content">
                <h3 class="menu-card-title">${item.name}</h3>
                <p class="menu-card-desc">${item.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">${item.price}</span>
                    <button class="menu-card-btn">Detail Produk</button>
                </div>
            </div>
        `;

        menuContainer.appendChild(menuCard);
    });

    observeReveal(menuContainer);
}

// ========== RENDER RAMADHAN SECTION ==========
function renderRamadhan() {
    const ramadhanContainer = document.getElementById('ramadhanMenuContainer');
    if (!ramadhanContainer) return;

    ramadhanItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'group bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-emerald-200/50 reveal';

        // Badge hanya muncul untuk item bestSeller: true
        const badgeHTML = item.bestSeller
            ? `<div class="absolute top-4 right-4 bg-[#D8B26F] text-[#450028] px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
                   <i class="fas fa-star"></i>
                   <span>Best Seller</span>
               </div>`
            : '';

        card.innerHTML = `
            <div class="relative overflow-hidden h-64 md:h-72">
                <img src="${item.image}" class="w-full h-full object-cover img-zoom" alt="${item.name}">
                ${badgeHTML}
                <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-emerald-600/30 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
                    <div class="text-white">
                        <p class="text-sm font-semibold">Klik untuk pesan →</p>
                    </div>
                </div>
            </div>
            <div class="p-5 md:p-6">
                <h3 class="font-serif text-2xl mb-2 text-emerald-900">${item.name}</h3>
                <p class="text-sm text-emerald-700/80 mb-4 italic">${item.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-lg font-bold text-emerald-800">${item.price}</span>
                    <a href="order.html" class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-full text-xs font-semibold hover:shadow-lg transition">
                        Pesan
                    </a>
                </div>
            </div>
        `;

        ramadhanContainer.appendChild(card);
    });

    observeReveal(ramadhanContainer);
}

// ========== MODAL FUNCTIONS ==========
function openModal(item) {
    document.getElementById('modalTitle').innerText = item.name;
    document.getElementById('modalDesc').innerText = item.fullDescription;
    document.getElementById('modalImg').src = item.image;

    const optionsHTML = item.options.map(opt => `• ${opt}`).join('<br>');
    document.getElementById('modalOptions').innerHTML = optionsHTML;

    document.getElementById('waLink').href = 'order.html';

    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');

    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';

    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 300);
}

// ========== TOGGLE FUNCTIONS ==========
function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('active');
}

function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');

    document.querySelectorAll('.faq-button').forEach(otherButton => {
        if (otherButton !== button) {
            otherButton.nextElementSibling.style.maxHeight = '0px';
            otherButton.querySelector('.faq-icon').classList.remove('active');
        }
    });

    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        icon.classList.remove('active');
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.classList.add('active');
    }
}

// ========== SCROLL EFFECTS ==========
window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    const backTop = document.getElementById('backTop');

    if (nav) {
        if (window.scrollY > 100) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }

    if (backTop) {
        if (window.scrollY > 500) backTop.classList.add('visible');
        else backTop.classList.remove('visible');
    }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.classList.contains('active')) toggleMenu();
        }
    });
});

// ========== MODAL CLOSE ==========
const modalEl = document.getElementById('modal');
if (modalEl) {
    modalEl.addEventListener('click', (e) => {
        if (e.target.id === 'modal') closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderRamadhan();
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});