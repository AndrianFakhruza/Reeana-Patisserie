// ========== DATA MENU ==========
// Tambah, edit, atau hapus menu di sini
const menuItems = [
    {
        id: 1,
        name: 'ChocoBan Granola',
        description: 'Banana bread dengan granola',
        fullDescription: 'Banana bread moist dan rich dengan toping granola yang melimpah.',
        price: '80k',
        image: 'assets/ChocBanGranola.jpeg',
        options: [
            '1 loyang ukuran 22x10x7 : 80k'
        ]
    },
    {
        id: 2,
        name: 'Fudgy Brownies',
        description: 'Tekstur fudgy sempurna',
        fullDescription: 'Brownies dengan tekstur fudgy yang lembut di dalam dan crackly top diluar.',
        price: '95k - 110k',
        image: 'assets/FudgyBrownies.jpeg',
        options: [
            '1 loyang ukuran 20x20 ori : 95k',
            '1 loyang ukuran 20x20 Almond : 110k',
            'Paper cup : 30k (ori)',
            'Paper cup : 35k (almond)'
        ]
    },
    {
        id: 3,
        name: 'Burnt Cheese Brownie',
        description: 'Brownies meets cheesecake',
        fullDescription: 'Perpaduan antara brownies coklat yang fudgy dan cheseecake yang creamy.',
        price: 'Mulai 25k',
        image: 'assets/BurntCheeseCake.jpeg',
        options: [
            '1 loyang : 180k',
            'Slice : 25k'
        ]
    },
    {
        id: 4,
        name: 'Classic Tiramisu',
        description: 'Mascarpone & espresso',
        fullDescription: 'Tiramisu klasik dengan lapisan mascarpone yang creamy dan halus, dipadukan dengan aroma espresso yang khas dan sentuhan cocoa.',
        price: '35k',
        image: 'assets/TiramisuCake.jpeg',
        options: [
            'Cup : 35k'
        ]
    },
    {
        id: 5,
        name: 'Banana Pudding',
        description: 'Banana & vanilla blend',
        fullDescription: 'Perpaduan banana slices segar, pudding vanilla yang halus, dan lapisan biskuit yang lembut disiram dengan saus caramel.',
        price: '25k',
        image: 'assets/BananaPudding.jpeg',
        options: [
            'Papercup : 25k'
        ]
    }
];

// ========== RENDER MENU ==========
function renderMenu() {
    const menuContainer = document.getElementById('menuContainer');
    
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
}

// ========== MODAL FUNCTIONS ==========
function openModal(item) {
    document.getElementById('modalTitle').innerText = item.name;
    document.getElementById('modalDesc').innerText = item.fullDescription;
    document.getElementById('modalImg').src = item.image;
    
    // Render options
    const optionsHTML = item.options.map(opt => `• ${opt}`).join('<br>');
    document.getElementById('modalOptions').innerHTML = optionsHTML;
    
    // Update link to order page
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
    
    // Close all other FAQs
    document.querySelectorAll('.faq-button').forEach(otherButton => {
        if (otherButton !== button) {
            otherButton.nextElementSibling.style.maxHeight = '0px';
            otherButton.querySelector('.faq-icon').classList.remove('active');
        }
    });
    
    // Toggle current FAQ
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
    
    // Navbar shadow
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backTop.classList.add('visible');
    } else {
        backTop.classList.remove('visible');
    }
});

// ========== INTERSECTION OBSERVER ==========
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
    });
});

// ========== MODAL CLOSE ON CLICK OUTSIDE ==========
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

// ========== MODAL CLOSE ON ESC KEY ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});