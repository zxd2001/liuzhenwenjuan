// 移动端导航菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // 点击汉堡菜单按钮切换导航显示
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 点击导航链接后关闭移动端菜单
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // 在移动端关闭菜单
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // 监听窗口大小变化，在PC端时确保导航显示
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    });
});

// 商品搜索功能
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('请输入搜索关键词');
        return;
    }
    
    // 获取所有商品卡片
    const productCards = document.querySelectorAll('.product-card');
    let foundCount = 0;
    
    productCards.forEach(function(card) {
        const productName = card.querySelector('.product-name');
        const productDesc = card.querySelector('.product-desc');
        
        if (productName && productDesc) {
            const name = productName.textContent.toLowerCase();
            const desc = productDesc.textContent.toLowerCase();
            
            // 检查商品名称或描述是否包含搜索词
            if (name.includes(searchTerm) || desc.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.border = '2px solid #1292F8';
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        }
    });
    
    // 如果没找到商品
    if (foundCount === 0) {
        alert('未找到相关商品，请尝试其他关键词');
        resetSearch();
    } else {
        // 显示重置按钮提示
        if (confirm(`找到 ${foundCount} 件相关商品，点击确定查看全部商品`)) {
            resetSearch();
        }
    }
}

// 重置搜索结果
function resetSearch() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(function(card) {
        card.style.display = 'block';
        card.style.border = '';
    });
    document.getElementById('searchInput').value = '';
}

// 支持回车键搜索
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

