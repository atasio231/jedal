document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.slide-menu').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
    // Add this line:
    document.querySelector('.header-overlay').classList.toggle('active');
});

document.querySelector('.overlay').addEventListener('click', function() {
    document.querySelector('.menu-toggle').classList.remove('active');
    document.querySelector('.slide-menu').classList.remove('active');
    this.classList.remove('active');
    // Add this line:
    document.querySelector('.header-overlay').classList.remove('active');
});
document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.querySelector('.search-input');

    // Open search
    searchToggle.addEventListener('click', () => {
        searchContainer.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });

    // Close search
    closeSearch.addEventListener('click', () => {
        searchContainer.classList.remove('active');
        searchInput.value = '';
    });

    // Close search on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
            searchContainer.classList.remove('active');
            searchInput.value = '';
        }
    });
});

// Menu toggle functionality
document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.slide-menu').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
});

document.querySelector('.overlay').addEventListener('click', function() {
    document.querySelector('.menu-toggle').classList.remove('active');
    document.querySelector('.slide-menu').classList.remove('active');
    this.classList.remove('active');
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
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

    // Load products on page load
    loadFeaturedProducts();
    loadMoreProducts();
});

// Products functionality
let currentPage = 0;
const productsPerPage = 8;
let loading = false;

function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${product.image}');"></div>
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">${product.price} ريال</p>
            <button class="add-to-cart">إضافة للسلة</button>
        </div>
    `;
}

function loadMoreProducts() {
    if (loading) return;
    
    const products = JSON.parse(localStorage.getItem('storeProducts') || '[]');
    const startIndex = currentPage * productsPerPage;
    
    if (startIndex >= products.length) {
        document.getElementById('loadingIndicator').style.display = 'none';
        return;
    }

    loading = true;
    document.getElementById('loadingIndicator').style.display = 'block';

    setTimeout(() => {
        const productsToAdd = Math.min(productsPerPage, products.length - startIndex);
        const currentProducts = products.slice(startIndex, startIndex + productsToAdd);
        
        const productsHTML = currentProducts.map(product => createProductCard(product)).join('');
        document.getElementById('productsGrid').insertAdjacentHTML('beforeend', productsHTML);
        
        currentPage++;
        loading = false;
        document.getElementById('loadingIndicator').style.display = 'none';
    }, 300);
}

function loadFeaturedProducts() {
    const products = JSON.parse(localStorage.getItem('storeProducts') || '[]');
    
    if (products.length > 0) {
        const featuredProducts = products.slice(0, 4);
        const sliderHTML = featuredProducts.map(product => createProductCard(product)).join('');
        const sliderContainer = document.querySelector('.products-row');
        if (sliderContainer) {
            sliderContainer.innerHTML = sliderHTML;
        }
    }
}

// Scroll event for infinite loading
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 500) {
        loadMoreProducts();
    }
});

// Slider navigation
function scrollProducts(direction) {
    const container = document.querySelector('.products-row');
    const scrollAmount = 200;
    if (direction === 'left') {
        container.scrollLeft += scrollAmount;
    } else {
        container.scrollLeft -= scrollAmount;
    }
}
