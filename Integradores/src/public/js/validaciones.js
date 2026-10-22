

(function () {
  "use strict";

  var RE = {
    personName: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{3,50}$/,
    productName: /^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ'.,+&/ -]{3,60}$/,
    price: /^\d{1,7}([.,]\d{1,2})?$/,
    stock: /^\d{1,5}$/,
    age: /^\d{1,2}$/,
    email: /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9-]{2,63}(\.[A-Za-z0-9-]{2,63})*\.[A-Za-z]{2,10}$/,
    phone: /^[0-9+()\s-]{7,20}$/,
    shortText: /^[\s\S]{10,120}$/,
    longText: /^[\s\S]{20,600}$/,
    comments: /^[\s\S]{10,500}$/,
    imageFile: /\.(jpe?g|png|gif|webp|svg)$/i
  };

  function priceGreaterThanZero(value) {
    var normalized = parseFloat(value.replace(",", "."));
    if (isNaN(normalized) || normalized <= 0) {
      return "El precio debe ser mayor a cero.";
    }
    if (normalized > 9999999) {
      return "El precio no puede superar los 9.999.999.";
    }
    return null;
  }

  function ageInRange(value) {
    var age = parseInt(value, 10);
    if (isNaN(age) || age < 0 || age > 99) {
      return "La edad debe ser un número entero entre 0 y 99.";
    }
    return null;
  }

  function ageToNotLowerThanFrom(value, form) {
    var rangeError = ageInRange(value);
    if (rangeError) {
      return rangeError;
    }
    var fromField = form.elements.namedItem("ageFrom");
    if (!fromField || fromField.value.trim() === "") {
      return null;
    }
    var from = parseInt(fromField.value, 10);
    var to = parseInt(value, 10);
    if (!isNaN(from) && to < from) {
      return 'La "edad hasta" (' + to + ') no puede ser menor que la "edad desde" (' + from + ").";
    }
    return null;
  }

  var FORM_RULES = {
    "product-form": {
      name: {
        label: "Nombre del producto",
        required: true,
        regex: RE.productName,
        message: "Ingresá entre 3 y 60 caracteres. Se permiten letras, números, espacios y los signos . , ' - + & /"
      },
      price: {
        label: "Precio",
        required: true,
        regex: RE.price,
        message: "Ingresá un precio válido: hasta 7 dígitos y como máximo 2 decimales. Ejemplo: 12500.90",
        custom: priceGreaterThanZero
      },
      stock: {
        label: "Stock",
        required: true,
        regex: RE.stock,
        message: "El stock debe ser un número entero sin signo, de 0 a 99999 unidades."
      },
      brand: {
        label: "Marca",
        required: true,
        requiredMessage: "Seleccioná una marca de la lista.",
        regex: /^.+$/,
        message: "Seleccioná una marca de la lista."
      },
      category: {
        label: "Categoría",
        required: true,
        requiredMessage: "Seleccioná una categoría de la lista.",
        regex: /^.+$/,
        message: "Seleccioná una categoría de la lista."
      },
      shortDesc: {
        label: "Descripción corta",
        required: true,
        regex: RE.shortText,
        message: "La descripción corta debe tener entre 10 y 120 caracteres."
      },
      longDesc: {
        label: "Descripción larga",
        required: true,
        regex: RE.longText,
        message: "La descripción larga debe tener entre 20 y 600 caracteres."
      },
      ageFrom: {
        label: "Edad desde",
        required: true,
        regex: RE.age,
        message: 'Ingresá un número entero entre 0 y 99 en "edad desde".',
        custom: ageInRange
      },
      ageTo: {
        label: "Edad hasta",
        required: true,
        regex: RE.age,
        message: 'Ingresá un número entero entre 0 y 99 en "edad hasta".',
        custom: ageToNotLowerThanFrom
      },
      photo: {
        label: "Foto",
        required: true,
        requiredMessage: "Seleccioná una imagen del producto.",
        regex: RE.imageFile,
        message: "El archivo debe ser una imagen con extensión .jpg, .jpeg, .png, .gif, .webp o .svg"
      }
      /* freeShip is an optional checkbox: it needs no validation rule. */
    },

    "contact-form": {
      name: {
        label: "Nombre y apellido",
        required: true,
        regex: RE.personName,
        message: "Ingresá entre 3 y 50 caracteres. Solo letras, espacios, apóstrofo y guion."
      },
      email: {
        label: "E-mail",
        required: true,
        regex: RE.email,
        message: "Ingresá un e-mail válido con el formato nombre@dominio.com"
      },
      phone: {
        label: "Teléfono",
        required: false,
        regex: RE.phone,
        message: "El teléfono debe tener entre 7 y 20 caracteres: números, espacios y los signos + - ( )"
      },
      subject: {
        label: "Asunto",
        required: true,
        requiredMessage: "Seleccioná un asunto de la lista.",
        regex: /^.+$/,
        message: "Seleccioná un asunto de la lista."
      },
      comments: {
        label: "Comentarios",
        required: true,
        regex: RE.comments,
        message: "Los comentarios deben tener entre 10 y 500 caracteres."
      }
    }
  };

  function readValue(field) {
    if (field.type === "file") {
      return field.files && field.files.length > 0 ? field.files[0].name : "";
    }
    return String(field.value).trim();
  }

  function validateField(field, rule, form) {
    var value = readValue(field);

    if (value === "") {
      if (rule.required) {
        return rule.requiredMessage || "El campo " + rule.label + " es obligatorio.";
      }
      return null; // empty + optional = valid
    }

    if (rule.regex && !rule.regex.test(value)) {
      return rule.message;
    }

    if (typeof rule.custom === "function") {
      return rule.custom(value, form);
    }

    return null;
  }

  /** Paints (or clears) the error of a single field. */
  function paintField(form, fieldName, errorText) {
    var field = form.elements.namedItem(fieldName);
    var slot = document.getElementById("error-" + fieldName);
    if (!field) {
      return;
    }
    if (errorText) {
      field.setAttribute("aria-invalid", "true");
      if (slot) {
        slot.textContent = errorText;
      }
    } else {
      field.removeAttribute("aria-invalid");
      if (slot) {
        slot.textContent = "";
      }
    }
  }

  function paintSummary(form, errors) {
    var summary = document.getElementById(form.id + "-summary");
    if (!summary) {
      return;
    }
    var names = Object.keys(errors);
    if (names.length === 0) {
      summary.hidden = true;
      summary.innerHTML = "";
      return;
    }
    var rules = FORM_RULES[form.id];
    var items = names
      .map(function (name) {
        return "<li>" + rules[name].label + ": " + errors[name] + "</li>";
      })
      .join("");
    summary.innerHTML =
      "<strong>No pudimos enviar el formulario. Revisá " +
      names.length +
      (names.length === 1 ? " campo:" : " campos:") +
      "</strong><ul>" +
      items +
      "</ul>";
    summary.hidden = false;
  }

  function validateForm(form) {
    var rules = FORM_RULES[form.id];
    var errors = {};

    Object.keys(rules).forEach(function (fieldName) {
      var field = form.elements.namedItem(fieldName);
      if (!field) {
        return;
      }
      var error = validateField(field, rules[fieldName], form);
      if (error) {
        errors[fieldName] = error;
      }
      paintField(form, fieldName, error);
    });

    return errors;
  }

  function resetErrors(form) {
    var rules = FORM_RULES[form.id];
    Object.keys(rules).forEach(function (fieldName) {
      paintField(form, fieldName, null);
    });
    paintSummary(form, {});
  }

  function showSuccess(form, message) {
    var box = document.getElementById(form.id + "-success");
    if (!box) {
      return;
    }
    box.textContent = message;
    box.hidden = false;
    box.focus();
    window.setTimeout(function () {
      box.hidden = true;
    }, 8000);
  }

  function setupForm(form) {
    var rules = FORM_RULES[form.id];
    var submitted = false;

    form.setAttribute("novalidate", "novalidate");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); 
      submitted = true;

      var errors = validateForm(form);
      paintSummary(form, errors);

      var names = Object.keys(errors);
      if (names.length > 0) {
        var first = form.elements.namedItem(names[0]);
        if (first && typeof first.focus === "function") {
          first.focus();
        }
        return;
      }

      showSuccess(form, form.getAttribute("data-success") || "¡Listo! Los datos se validaron correctamente.");
      form.reset();
      resetErrors(form);
      submitted = false;
    });

    form.addEventListener("reset", function () {
      submitted = false;
      window.setTimeout(function () {
        resetErrors(form);
      }, 0);
    });

    Object.keys(rules).forEach(function (fieldName) {
      var field = form.elements.namedItem(fieldName);
      if (!field) {
        return;
      }
      var revalidate = function () {
        if (!submitted) {
          return;
        }
        var error = validateField(field, rules[fieldName], form);
        paintField(form, fieldName, error);
        paintSummary(form, validateForm(form));
      };
      field.addEventListener("blur", revalidate);
      field.addEventListener("input", revalidate);
      field.addEventListener("change", revalidate);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    Object.keys(FORM_RULES).forEach(function (formId) {
      var form = document.getElementById(formId);
      if (form) {
        setupForm(form);
      }
    });
  });
})();
