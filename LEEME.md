# Portfolio hola belén — cómo publicarlo

## Qué hay en la carpeta
- `index.html` — toda la web (HTML + CSS + un poco de JS). Se abre con doble clic para verla en local.
- `img/` — imágenes ya optimizadas (JPG, máx. 2000 px).

## Editar
- **Textos:** busca la frase en `index.html` y cámbiala.
- **Añadir un proyecto a la home:** copia un bloque `<a class="proj ...">…</a>` y cambia imagen, nombre y frase. Alterna `right` y `left`.
- **Fondo de color tras un póster vertical:** usa `<figure class="panel" style="background:#FFFFFF">`.
- **Colores y tipografías:** están arriba, en `:root` (papel, tinta, calco).

## Publicar gratis en GitHub Pages (10 min)
1. Crea una cuenta en github.com.
2. New repository → nombre `holabelen` → Public → Create.
3. "uploading an existing file" → arrastra `index.html` y la carpeta `img` → Commit.
4. Settings → Pages → Source: "Deploy from a branch" → Branch `main` / `(root)` → Save.
5. En 1-2 minutos estará en `https://TU-USUARIO.github.io/holabelen/`.

## Dominio propio (opcional, ~8 €/año)
1. Compra `holabelen.es` (por ejemplo en DonDominio).
2. En el DNS del dominio crea 4 registros A hacia 185.199.108.153, 185.199.109.153, 185.199.110.153 y 185.199.111.153, y un CNAME `www` → `TU-USUARIO.github.io`.
3. En GitHub: Settings → Pages → Custom domain → `holabelen.es` → Save → marca "Enforce HTTPS".

## Estructura actual
- `index.html` — versión en castellano. Proyectos: `#dima-smola`, `#metropoli`, `#mayte`, `#stussy`, `#senaletica`, `#cometas`.
- `en/index.html` — versión en inglés (usa las mismas imágenes con `../img/`). Si cambias un texto en castellano, cámbialo también aquí.
- `img/` — WebP, máx. 2400 px, sacadas de `PORTFOLIO_originales`.
- Las imágenes antiguas que ya no se usan están fuera de la web, en `../_sin_usar/`.

## Pendiente
- Sustituir el logo hecho con texto por el SVG de "hola belén" (no estaba en los originales).
- (Hecho: marcas `[REVISAR]` / `[REVIEW]` resueltas.)
