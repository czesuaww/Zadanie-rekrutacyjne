

const domElements = {
    navMobile: document.querySelector(".headerMobile__nav"),
    mobileLinks: document.querySelectorAll(".headerMobile__nav-links-link"),
    mobileMenuText: document.querySelector(".headerMobile__rightMenu"),
    mobileCloseBtn: document.querySelector(".headerMobile__nav-icon-close"),
    navOverlay: document.querySelector(".nav-overlay"),
    hamburger: document.querySelector(".hamburger"),
    customSelect: document.querySelector(".main__products-container-customSelect"),
    selectList: document.querySelector(".main__products-container-customSelect-list"),
    productList: document.getElementById("product-list"),
    nextArrow: document.querySelector(".swiper-navigation__next-btn"),
    prevArrow: document.querySelector(".swiper-navigation__prev-btn"),
    popup: document.getElementById("product-popup"),
    popupImg: document.getElementById("popup-image"),
    popupId: document.getElementById("popup-id"),
};

const values = ["14", "24", "36"];
let current = "14";
let pageNumber = 1;
let bannerRendered = false;
let isProductLoaded = false;
const productRenderer = {

    async renderProducts() {

        if (isProductLoaded) return;
        isProductLoaded = true;

        const { productList } = domElements;
        const { getJsonValues } = dataFetcher.initializeDataFetcher();
        const pageSize = parseInt(current);
        const newProducts = await getJsonValues(pageSize, pageNumber);
        const fragment = document.createDocumentFragment();
        const isMobile = window.matchMedia("(max-width: 699px)").matches;
        const bannerIndex = isMobile ? 3 : 4;

        pageNumber++;

        newProducts.forEach((product, index) => {
            const productElement = document.createElement("div");
            productElement.classList.add("product", "fade-in");

            productElement.innerHTML = `
                <img class="main__products-list-img"
                     src="${product.image}"
                     alt="product-${product.id}"
                     loading="lazy"
                     data-id="${product.id}">
                <p class="main__products-list-id">ID: ${product.id}</p>
            `;

            fragment.appendChild(productElement);

            if (!bannerRendered && index === bannerIndex) {
                const banner = document.createElement("div");
                banner.classList.add("product", "banner", "fade-in");
                banner.innerHTML = `
                    <div class="main__products-list-banner">
                        <img src="./img/baner.jfif" alt="banner" class="main__products-list-banner-img">
                        <div class="main__products-list-banner-text">
                            <div class="main__products-list-banner-text-top">
                                <p>Forma’sint.</p>
                                <h2>You’ll look and feel like the <br> champion.</h2>
                            </div>
                            <a href="#products" class="main__products-list-banner-text-button">Check this out <img src="./img/ICONS=chevron_right.png" alt="banner" class="main__products-list-banner-text-button-arrow"></a>
                        </div>
                    </div>`;
                fragment.appendChild(banner);
                bannerRendered = true;
            }
        });

        productList.appendChild(fragment);
        productObservers.initializeObservers();

        isProductLoaded = false;
    }
};

const utilityMethods = {
    initializeUtilities() {
        const { selectList } = domElements;

        const renderList = () => {
            selectList.innerHTML = "";
            const sorted = [current, ...values.filter((v) => v !== current)];

            sorted.forEach((selectedValue, index) => {
                const li = document.createElement("li");
                li.textContent = selectedValue;
                li.dataset.value = selectedValue;

                if (index === 0) li.classList.add("first");

                li.addEventListener("click", async () => {
                    if (index !== 0) {
                        current = selectedValue;
                        pageNumber = 1;
                        renderList();
                        selectList.classList.remove("open");
                        domElements.productList.innerHTML = "";
                        await productRenderer.renderProducts();
                    } else {
                        selectList.classList.toggle("open");
                    }
                });

                selectList.appendChild(li);
            });
        };
        renderList();
    }
};

const dataFetcher = {
    initializeDataFetcher: function () {
        const getJsonValues = async (pageSize = 14, pageNumber = 1) => {
            try {
                const url = `https://brandstestowy.smallhost.pl/api/random?pageSize=${pageSize}&pageNumber=${pageNumber}`;
                console.log(url);
                const response = await fetch(url);

                if (!response.ok) throw new Error(`Error: ${response.status}`);
                const data = await response.json();

                return data.data;
            } catch (error) {
                console.error("Error occurred:", error.message);
            }
        };

        return { getJsonValues };
    }
};

const productObservers = {

    initializeObservers() {
        const products = document.querySelectorAll(".product");

        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("visible");
            });

        }, { threshold: 0.2 });

        products.forEach((product) => fadeInObserver.observe(product));


        const lastProduct = products[products.length - 1];

        if (!lastProduct) return;

        const loadMoreObserver = new IntersectionObserver(async ([entry]) => {
            if (entry.isIntersecting) await productRenderer.renderProducts();
        }, { threshold: 1 });

        loadMoreObserver.observe(lastProduct);
    }
};

const userInteractionHandlers = {
    initializeUserInteractionEvents() {
        const { hamburger, mobileLinks, navMobile, mobileMenuText, mobileCloseBtn, navOverlay, popup, popupImg, popupId } = domElements;

        const openMobileNav = () => {
            hamburger.classList.toggle("is-active");
            navMobile.classList.toggle("headerMobile__nav--active");
            navOverlay.classList.toggle("nav-overlay--active");
        }

        const closeMobileNav = () => {
            navMobile.classList.remove("headerMobile__nav--active");
            hamburger.classList.remove("is-active");
            navOverlay.classList.remove("nav-overlay--active");
        }

        document.addEventListener("click", (e) => {
            const img = e.target.closest(".main__products-list-img");

            if (img) {
                const src = img.src;
                const id = img.dataset.id;

                popupImg.src = src;
                popupId.textContent = `ID: ${id}`;

                popup.classList.remove("hidden");
            }

            if (e.target.id === "popup-close") popup.classList.add("hidden");
            if (e.target === popup || e.target.classList.contains("popup")) popup.classList.add("hidden");

            const clickedInsideNav = navMobile.contains(e.target);
            const clickedHamburger = hamburger.contains(e.target);

            if (!clickedInsideNav && !clickedHamburger) closeMobileNav();
        });


        hamburger.addEventListener("click", () => openMobileNav());

        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("headerMobile__rightMenu")) openMobileNav();
        });

        navMobile.addEventListener("click", (e) => {
            if (e.target.matches(".headerMobile__nav-links-link") || e.target.matches(".headerMobile__nav-icon-close")) closeMobileNav();
        });

    }
};

const swiperObj = {
    initializeSwiper() {
        const { nextArrow, prevArrow } = domElements;

        const swiper = new Swiper(".swiper", {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 16,
            grabCursor: true,
            loop: false,
            navigation: {
                nextEl: nextArrow,
                prevEl: prevArrow
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                type: "bullets",
                renderBullet: function (index, className) {
                    return `<span class="${className} swiper-pagination-line"></span>`;
                }
            },
            breakpoints: {
                1100: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    spaceBetween: 24,
                },
                867: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                },
                550: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                },
            },
        });

        const updateArrowVisibility = () => {
            if (swiper.isBeginning) {
                prevArrow.style.opacity = "0";
                prevArrow.style.pointerEvents = "none";
            } else {
                prevArrow.style.opacity = "1";
                prevArrow.style.pointerEvents = "auto";
            }

            if (swiper.isEnd) {
                nextArrow.style.opacity = "0";
                nextArrow.style.pointerEvents = "none";
            } else {
                nextArrow.style.opacity = "1";
                nextArrow.style.pointerEvents = "auto";
            }
        };

        swiper.on("slideChange", updateArrowVisibility);
        updateArrowVisibility();
    }
};
const main = async () => {
    await productRenderer.renderProducts();
    utilityMethods.initializeUtilities();
    productObservers.initializeObservers();
    userInteractionHandlers.initializeUserInteractionEvents();
    swiperObj.initializeSwiper();
};

document.addEventListener("DOMContentLoaded", main);
