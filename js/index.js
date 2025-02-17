// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    
    // Menu toggle functionality
    initializeMenu();
    
    // Search functionality
    initializeSearch();
    
    // Load products
    fetchProducts();
});

// Menu initialization
function initializeMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const slideMenu = document.querySelector('.slide-menu');
    const overlay = document.querySelector('.overlay');
    const closeMenu = document.querySelector('.close-menu');

    menuToggle?.addEventListener('click', function() {
        this.classList.toggle('active');
        slideMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay?.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        slideMenu.classList.remove('active');
        this.classList.remove('active');
    });

    closeMenu?.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        slideMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
}

// Search initialization
function initializeSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.querySelector('.search-input');

    searchToggle?.addEventListener('click', () => {
        searchContainer.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });

    closeSearch?.addEventListener('click', () => {
        searchContainer.classList.remove('active');
        searchInput.value = '';
    });
}

// Products functionality
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        console.log('Products received:', products);

        if (products.length === 0) {
            document.getElementById('productsContainer').innerHTML = 
                '<p>لا توجد منتجات متاحة حالياً</p>';
            return;
        }

        displayProducts(products);
        displayFeaturedProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('productsContainer').innerHTML = 
            '<p class="error-message">عذراً، حدث خطأ في تحميل المنتجات</p>';
    }
}

function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    if (!container) {
        console.error('Products container not found!');
        return;
    }
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <div class="product-image" style="background-image: url('${product.image || '/images/placeholder.jpg'}')"></div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description || ''}</p>
                    <p class="product-price">${product.price} ريال</p>
                    <button class="add-to-cart" onclick="addToCart('${product._id}')">
                        أضف إلى السلة
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

function displayFeaturedProducts(products) {
    const container = document.querySelector('.products-row');
    if (!container) return;

    const featuredProducts = products.slice(0, 4);
    container.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${product.image || '/images/placeholder.jpg'}')"></div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price} ريال</p>
                <button class="add-to-cart" onclick="addToCart('${product._id}')">
                    أضف إلى السلة
                </button>
            </div>
        </div>
    `).join('');
}

// Slider navigation
function scrollProducts(direction) {
    const container = document.querySelector('.products-row');
    if (!container) return;
    
    const scrollAmount = 200;
    if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
    } else {
        container.scrollLeft += scrollAmount;
    }
}

// Cart functionality
function addToCart(productId) {
    console.log('Adding product to cart:', productId);
    alert('تمت إضافة المنتج إلى السلة');
    // TODO: Implement actual cart functionality
}

// Initialize everything when the page loads
window.addEventListener('load', function() {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    prevButton?.addEventListener('click', () => scrollProducts('right'));
    nextButton?.addEventListener('click', () => scrollProducts('left'));
});