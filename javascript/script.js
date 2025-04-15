const values = ["14", "24", "36"];
let current = "14";

const domElements = {
    navMobile: document.querySelector(".headerMobile__nav"),
    mobileLinks: document.querySelectorAll(".headerMobile__nav-links-link"),
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

const productRenderer = {
    renderProducts: async function () {
        const { productList } = domElements;
        const { getJsonValues } = dataFetcher.initializeDataFetcher();

        if (!productList) return;

        const products = await getJsonValues();
        const fragment = document.createDocumentFragment();

        const isMobile = window.matchMedia("(max-width: 699px)").matches;
        const bannerIndex = isMobile ? 3 : 4;

        products.forEach((product, index) => {
            const productElement = document.createElement("div");
            productElement.classList.add("product", "fade-in");

            productElement.innerHTML = `
              <img
                class="main__products-list-img"
                src="${product.image}"
                alt="product-${product.id}"
                loading="lazy"
                data-id="${product.id}"
                data-src="${product.image}"
              >
              <p class="main__products-list-id">ID: ${product.id}</p>
          `;

            fragment.appendChild(productElement);

            if (index === bannerIndex) {
                const bannerElement = document.createElement("div");
                bannerElement.classList.add("product", "banner", "fade-in");
                bannerElement.innerHTML = `
              <div class="main__products-list-banner">
                <img src="../img/baner.jfif" alt="banner" class="main__products-list-banner-img">
                <div class="main__products-list-banner-text">
                  <div class="main__products-list-banner-text-top">
                    <p>Forma’sint.</p>
                    <h2>You’ll look and feel like the <br> champion.</h2>
                  </div>
                  <a href="#products" class="main__products-list-banner-text-button">Check this out <img src="../img/ICONS=chevron_right.png" alt="banner" class="main__products-list-banner-text-button-arrow"></a>
                    
                  </div>
              </div>
            `;
                fragment.appendChild(bannerElement);
            }
        });

        productList.appendChild(fragment);
    },
};

const utilityMethods = {
    initializeUtilities() {
        const { selectList, navMobile, navOverlay, hamburger } = domElements;

        const renderList = () => {
            selectList.innerHTML = "";
            const sorted = [current, ...values.filter((v) => v !== current)];

            sorted.forEach((val, index) => {
                const li = document.createElement("li");
                li.textContent = val;
                li.dataset.value = val;

                if (index === 0) li.classList.add("first");

                li.addEventListener("click", async () => {
                    if (index !== 0) {
                        current = val;
                        current = current;
                        renderList();
                        selectList.classList.remove("open");
                        domElements.productList.innerHTML = "";
                        await productRenderer.renderProducts();
                        productObservers.initializeObservers();
                    } else {
                        selectList.classList.toggle("open");
                    }
                });

                selectList.appendChild(li);
            });
        };
    }
}

const dataFetcher = {
    initializeDataFetcher: function () {
        const getJsonValues = async () => {
            try {
                const response = await fetch("https://brandstestowy.smallhost.pl/api/random");

                if (!response.ok) throw new Error(`Error: ${response.status}`);

                const data = await response.json();

                const allProducts = data.data;
                const targetCount = parseInt(current);

                let nextId = 1;

                const repeated = Array.from({ length: Math.ceil(targetCount / allProducts.length) }, () => allProducts).flat();
                const sliced = repeated.slice(0, targetCount);

                const result = sliced.map((product) => ({
                    ...product,
                    id: nextId++,
                }));

                return result;
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

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        products.forEach((product) => observer.observe(product));
    },
};

const userInteractionHandlers = {
    initializeUserInteractionEvents() {

        const { hamburger, mobileLinks, navMobile, navOverlay, popup, popupImg, popupId } = domElements

        document.addEventListener("click", (e) => {
            const img = e.target.closest(".main__products-list-img");

            if (img) {
                const src = img.dataset.src;
                const id = img.dataset.id;

                popupImg.src = src;
                popupId.textContent = `ID: ${id}`;

                popup.classList.remove("hidden");
            }

            if (e.target.id === "popup-close") document.getElementById("product-popup").classList.add("hidden");

            if (e.target === popup || e.target.classList.contains("popup")) popup.classList.add("hidden");

            const clickedInsideNav = navMobile.contains(e.target);
            const clickedHamburger = hamburger.contains(e.target);

            if (!clickedInsideNav && !clickedHamburger) {
                navMobile.classList.remove("headerMobile__nav--active");
                hamburger.classList.remove("is-active");
                navOverlay?.classList.remove("nav-overlay--active");
            }
        });

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("is-active");
            navMobile.classList.toggle("headerMobile__nav--active");
            navOverlay.classList.toggle("nav-overlay--active");
        });

        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMobile.classList.remove("headerMobile__nav--active");
                hamburger.classList.remove("is-active");
                navOverlay.classList.remove("nav-overlay--active");
            });
        });
    }
};

const swiperObj = {
    initializeSwiper() {
        const { nextArrow, prevArrow } = domElements;

        const swiper = new Swiper(".swiper", {
            slidesPerView: 1.2,
            slidesPerGroup: 1,
            spaceBetween: 16,
            grabCursor: true,
            loop: false,
            freeMode: {
                enabled: true,
                sticky: true,
            },
            navigation: {
                nextEl: nextArrow,
                prevEl: prevArrow
            },
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },
            breakpoints: {
                1100: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
                867: {
                    slidesPerView: 3.2,
                },
                550: {
                    slidesPerView: 2.2,
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
        }

        swiper.on("slideChange", updateArrowVisibility);
        updateArrowVisibility();
    }
}


const main = async () => {
    await productRenderer.renderProducts();
    utilityMethods.initializeUtilities();
    productObservers.initializeObservers();
    userInteractionHandlers.initializeUserInteractionEvents();
    swiperObj.initializeSwiper();
};

document.addEventListener("DOMContentLoaded", main);