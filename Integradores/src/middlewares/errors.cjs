// 404 en JSON para rutas /api desconocidas.
function notFoundApi(req, res) {
  res.status(404).json({ error: "Ruta no encontrada" });
}

// Manejador central de errores: siempre responde { error }.
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "ValidationError") {
    const details = {};
    for (const [field, issue] of Object.entries(err.errors)) {
      details[field] = issue.message;
    }
    return res.status(400).json({ error: Object.values(details).join(" "), details });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: `Valor inválido para "${err.path}"` });
  }

  if (err.name === "MulterError") {
    const message =
      err.code === "LIMIT_FILE_SIZE" ? "La imagen supera el máximo de 2 MB" : "Error al subir el archivo";
    return res.status(400).json({ error: message });
  }

  // Errores 4xx con status propio (por ejemplo JSON mal formado o archivo no permitido).
  if (err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ error: err.expose === false ? "Solicitud inválida" : err.message });
  }

  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
}

module.exports = { notFoundApi, errorHandler };
