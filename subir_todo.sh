#!/bin/bash

echo "🚀 Subiendo todo el proyecto a GitHub..."

# Agregar todos los archivos
git add .

# Hacer commit con fecha actual
git commit -m "Actualización completa: $(date)"

# Subir a GitHub
git push origin main

echo "✅ Proyecto subido exitosamente!"
echo "📦 Repositorio: https://github.com/Hernank10/condicionales_flask"
