

(function () {
  "use strict";

  var MOBILE_BREAKPOINT = 768;

  // Servidor Express: mismo origen si la página sale del puerto 3000;
  // con file:// o Live Server se apunta a localhost:3000 (el backend tiene CORS).
  var API_BASE = window.location.port === "3000" ? "" : "http://localhost:3000";
  window.MundoPilar = { apiBase: API_BASE };

  var CATEGORY_LABELS = {
    munecos: "Muñecos y peluches",
    construccion: "Construcción",
    vehiculos: "Vehículos",
    "juegos-mesa": "Juegos de mesa",
    ciencia: "Ciencia y tecnología",
    creatividad: "Arte y creatividad",
    "aire-libre": "Aire libre"
  };

  /** Escapa texto antes de insertarlo en HTML. */
  function escapeHtml(value) {
    return String(value === undefined || value === null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatMoney(amount) {
    return Number(amount).toLocaleString("es-AR", { maximumFractionDigits: 2 });
  }

  /** Texto secundario del precio, igual que en las cards estáticas. */
  function priceNote(product) {
    if (product.oldPrice) {
      return "Precio anterior $" + formatMoney(product.oldPrice);
    }
    if (product.price < 10000) {
      return "Precio final por unidad";
    }
    var installments = product.price < 24000 ? 3 : 6;
    return installments + " cuotas sin interés de $" + formatMoney(Math.round(product.price / installments));
  }

  function stockHtml(stock) {
    if (stock <= 0) {
      return '<p class="product-card__stock product-card__stock--low">Sin stock</p>';
    }
    if (stock <= 5) {
      var text = stock === 1 ? "Última unidad" : "Últimas " + stock + " unidades";
      return '<p class="product-card__stock product-card__stock--low">' + text + "</p>";
    }
    return '<p class="product-card__stock">Stock: ' + stock + " unidades</p>";
  }

  function photoUrl(photo) {
    return (API_BASE ? API_BASE + "/" : "") + String(photo).replace(/^\/+/, "");
  }

  /** Misma estructura que las cards estáticas de index.html. */
  function buildCardHtml(product, index) {
    var n = index + 1;
    var badges = "";
    if (product.freeShipping) {
      badges += '<span class="badge badge--shipping">Envío sin cargo</span>';
    }
    if (product.badge) {
      var kind = product.badge.charAt(0) === "-" ? "sale" : "new";
      badges += '<span class="badge badge--' + kind + '">' + escapeHtml(product.badge) + "</span>";
    }

    var details = String(product.longDescription || "")
      .split(/\r?\n/)
      .filter(function (line) {
        return line.trim() !== "";
      })
      .map(function (line) {
        return "<li>" + escapeHtml(line.trim()) + "</li>";
      })
      .join("");

    var searchName = (product.name + " " + product.brand)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");

    return (
      '<article class="product-card" data-category="' + escapeHtml(product.category) +
      '" data-price="' + escapeHtml(product.price) +
      '" data-name="' + escapeHtml(searchName) + '">' +
      '<figure class="product-card__media">' +
      '<img src="' + escapeHtml(photoUrl(product.photo)) + '" alt="' + escapeHtml(product.name) + '" width="400" height="300">' +
      '<span class="product-card__badges">' + badges + "</span>" +
      "</figure>" +
      '<div class="product-card__body">' +
      '<p class="product-card__category">' + escapeHtml(CATEGORY_LABELS[product.category] || product.category) + "</p>" +
      '<h3 class="product-card__title">' + escapeHtml(product.name) + "</h3>" +
      '<p class="product-card__price">$' + formatMoney(product.price) + " <small>" + escapeHtml(priceNote(product)) + "</small></p>" +
      '<p class="product-card__text">' + escapeHtml(product.shortDescription) + "</p>" +
      '<dl class="product-card__meta">' +
      "<div><dt>Marca</dt><dd>" + escapeHtml(product.brand) + "</dd></div>" +
      "<div><dt>Edad</dt><dd>" + escapeHtml(product.ageFrom) + " a " + escapeHtml(product.ageTo) + " años</dd></div>" +
      "</dl>" +
      stockHtml(product.stock) +
      '<div class="product-card__actions">' +
      '<a class="btn btn--primary btn--sm js-add-to-cart" href="index.html#carrito-info">Comprar</a>' +
      '<button class="btn btn--ghost btn--sm js-toggle-details" type="button" aria-expanded="false" aria-controls="details-' + n + '">' +
      '<span class="js-toggle-label">Ver detalle</span></button>' +
      "</div>" +
      '<p class="feedback feedback--success js-card-feedback" role="status"></p>' +
      '<div class="product-card__details" id="details-' + n + '" hidden><ul>' + details + "</ul></div>" +
      "</div>" +
      "</article>"
    );
  }

  /**
   * Pide los productos al backend y reemplaza las cards estáticas.
   * Si el servidor no responde, quedan las cards del HTML (fallback).
   * @returns {Promise<void>} siempre se resuelve
   */
  function loadCatalog() {
    var grid = document.getElementById("product-grid");
    if (!grid || typeof window.fetch !== "function") {
      return Promise.resolve();
    }

    return window
      .fetch(API_BASE + "/api/products")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP " + response.status);
        }
        return response.json();
      })
      .then(function (products) {
        if (!Array.isArray(products)) {
          throw new Error("Respuesta inesperada");
        }
        grid.innerHTML = products.map(buildCardHtml).join("");
      })
      .catch(function () {
        // Sin servidor: se mantienen las cards estáticas.
      });
  }


  function setupNavigation() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) {
      return;
    }

    var isDesktop = function () {
      return window.innerWidth >= MOBILE_BREAKPOINT;
    };

    var setExpanded = function (expanded) {
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      nav.hidden = !expanded;
      var icon = toggle.querySelector(".fa-solid");
      if (icon) {
        icon.className = expanded ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      }
      var text = toggle.querySelector(".nav-toggle__text");
      if (text) {
        text.textContent = expanded ? "Cerrar" : "Menú";
      }
    };

    var syncWithViewport = function () {
      if (isDesktop()) {
        nav.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
      } else if (toggle.getAttribute("aria-expanded") !== "true") {
        setExpanded(false);
      }
    };

    toggle.addEventListener("click", function () {
      setExpanded(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Escape closes the menu and returns focus to the button.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !isDesktop() && toggle.getAttribute("aria-expanded") === "true") {
        setExpanded(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", syncWithViewport);

    if (isDesktop()) {
      syncWithViewport();
    } else {
      setExpanded(false);
    }
  }


  /**
   * Runs the in-page search on the catalogue grid and writes the feedback message.
   * Only used on pages that actually render #product-grid.
   * @param {string} term already trimmed search term
   * @param {HTMLElement} feedback status region
   */
  function runCatalogSearch(term, feedback) {
    var found = filterCards({ search: term.toLowerCase() });
    feedback.className = "feedback feedback--info search-form__feedback";
    feedback.textContent =
      found === 0
        ? 'No encontramos juguetes para "' + term + '".'
        : found + (found === 1 ? " juguete encontrado" : " juguetes encontrados") + ' para "' + term + '".';
  }

  function setupSearch() {
    var form = document.getElementById("search-form");
    var input = document.getElementById("search-input");
    var feedback = document.getElementById("search-feedback");
    if (!form || !input || !feedback) {
      return;
    }

    form.addEventListener("submit", function (event) {
      // Always handled by JS: a native GET submit does not work under file://.
      event.preventDefault();
      var term = input.value.trim();

      if (term.length < 2) {
        feedback.className = "feedback feedback--error search-form__feedback";
        feedback.textContent = "Escribí al menos 2 caracteres para buscar.";
        return;
      }

      var grid = document.getElementById("product-grid");
      if (!grid) {
        // Pages without the catalogue send the query to the catalogue page (relative URL).
        window.location.href = "index.html?q=" + encodeURIComponent(term);
        return;
      }

      runCatalogSearch(term, feedback);
    });
  }

  /**
   * Reads ?q= from the URL and applies it to the catalogue.
   * Must run AFTER setupToolbar(), because setupToolbar calls filterCards({})
   * on init and that would wipe the incoming search.
   */
  function applySearchFromQuery() {
    var grid = document.getElementById("product-grid");
    var input = document.getElementById("search-input");
    var feedback = document.getElementById("search-feedback");
    if (!grid || !input || !feedback || typeof window.URLSearchParams !== "function") {
      return;
    }

    var raw = new window.URLSearchParams(window.location.search).get("q");
    var term = raw ? raw.trim() : "";
    if (term === "") {
      return;
    }

    input.value = term;
    runCatalogSearch(term, feedback);
  }

  function setupCart() {
    var counter = document.getElementById("cart-count");
    var buttons = document.querySelectorAll(".js-add-to-cart");
    if (!counter || buttons.length === 0) {
      return;
    }

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        counter.textContent = String(parseInt(counter.textContent, 10) + 1);

        var card = button.closest(".product-card");
        if (!card) {
          return;
        }
        var notice = card.querySelector(".js-card-feedback");
        if (notice) {
          notice.textContent = "Agregado al carrito.";
          window.setTimeout(function () {
            notice.textContent = "";
          }, 2500);
        }
      });
    });
  }

  function setupCardDetails() {
    var buttons = document.querySelectorAll(".js-toggle-details");

    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener("click", function () {
        var panel = document.getElementById(button.getAttribute("aria-controls"));
        if (!panel) {
          return;
        }
        var expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", expanded ? "false" : "true");
        panel.hidden = expanded;
        var label = button.querySelector(".js-toggle-label");
        if (label) {
          label.textContent = expanded ? "Ver detalle" : "Ocultar detalle";
        }
      });
    });
  }

 

  /**
   * @param {{category?: string, search?: string}} criteria
   * @returns {number} amount of visible cards
   */
  function filterCards(criteria) {
    var grid = document.getElementById("product-grid");
    if (!grid) {
      return 0;
    }

    var options = criteria || {};
    var categorySelect = document.getElementById("filter-category");
    var category = options.category !== undefined ? options.category : categorySelect ? categorySelect.value : "";
    var search = options.search !== undefined ? options.search : "";

    var cards = grid.querySelectorAll(".product-card");
    var visible = 0;

    Array.prototype.forEach.call(cards, function (card) {
      var matchesCategory = category === "" || card.getAttribute("data-category") === category;
      var haystack = (card.getAttribute("data-name") || "").toLowerCase();
      var matchesSearch = search === "" || haystack.indexOf(search) !== -1;
      var show = matchesCategory && matchesSearch;
      card.hidden = !show;
      if (show) {
        visible += 1;
      }
    });

    var counter = document.getElementById("result-count");
    if (counter) {
      counter.textContent = visible + (visible === 1 ? " producto" : " productos");
    }

    var empty = document.getElementById("grid-empty");
    if (empty) {
      empty.hidden = visible !== 0;
    }

    return visible;
  }

  function sortCards(mode) {
    var grid = document.getElementById("product-grid");
    if (!grid) {
      return;
    }

    var cards = Array.prototype.slice.call(grid.querySelectorAll(".product-card"));

    cards.sort(function (a, b) {
      var priceA = parseFloat(a.getAttribute("data-price"));
      var priceB = parseFloat(b.getAttribute("data-price"));
      var nameA = (a.getAttribute("data-name") || "").toLowerCase();
      var nameB = (b.getAttribute("data-name") || "").toLowerCase();

      if (mode === "price-asc") {
        return priceA - priceB;
      }
      if (mode === "price-desc") {
        return priceB - priceA;
      }
      if (mode === "name-desc") {
        return nameA < nameB ? 1 : nameA > nameB ? -1 : 0;
      }
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    cards.forEach(function (card) {
      grid.appendChild(card);
    });
  }

  function setupToolbar() {
    var categorySelect = document.getElementById("filter-category");
    var sortSelect = document.getElementById("sort-products");

    if (categorySelect) {
      categorySelect.addEventListener("change", function () {
        filterCards({ category: categorySelect.value });
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        sortCards(sortSelect.value);
      });
    }

    if (categorySelect || sortSelect) {
      filterCards({});
    }
  }

  function setupYear() {
    var slot = document.getElementById("current-year");
    if (slot) {
      slot.textContent = String(new Date().getFullYear());
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupNavigation();
    setupSearch();
    setupYear();
    // Las cards pueden venir del servidor: los listeners se enganchan después de renderizarlas.
    loadCatalog().then(function () {
      setupCart();
      setupCardDetails();
      setupToolbar();
      applySearchFromQuery();
    });
  });
})();
