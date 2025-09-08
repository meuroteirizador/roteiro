import { Link, Routes, Route } from "react-router-dom";

function Header() {
  async function printInfo() {
    const src = document.getElementsByClassName("frame")[0];
    if (!src) return;

    // Clona e "congela" estilos computados
    const clone = src.cloneNode(true);

    const inlineAll = (srcEl, cloneEl) => {
      const apply = (s, c) => {
        const cs = window.getComputedStyle(s);
        for (let i = 0; i < cs.length; i++) {
          const prop = cs[i];
          c.style.setProperty(
            prop,
            cs.getPropertyValue(prop),
            cs.getPropertyPriority(prop)
          );
        }
      };

      apply(srcEl, cloneEl);

      const wSrc = document.createTreeWalker(srcEl, NodeFilter.SHOW_ELEMENT);
      const wCln = document.createTreeWalker(cloneEl, NodeFilter.SHOW_ELEMENT);

      while (true) {
        const sNext = wSrc.nextNode();
        const cNext = wCln.nextNode();
        if (!sNext || !cNext) break;

        apply(sNext, cNext);

        if (sNext instanceof HTMLInputElement) {
          if (sNext.type === "checkbox" || sNext.type === "radio")
            cNext.checked = sNext.checked;
          else cNext.value = sNext.value;
        } else if (sNext instanceof HTMLTextAreaElement) {
          cNext.value = sNext.value;
          cNext.textContent = sNext.value;
        } else if (sNext instanceof HTMLSelectElement) {
          cNext.selectedIndex = sNext.selectedIndex;
        }
      }
    };
    inlineAll(src, clone);
    [
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
    ].forEach((p) => {
      clone.style.removeProperty(p);
    });

    const w = window.open("", "_blank");
    const baseHref = document.baseURI || location.href;

    w.document.open();
    w.document.write(`
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <base href="${baseHref}">
      <title>Impressão</title>
      <style>
        @page { size: A4 landscape; margin: 5mm; }
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          background: white;
        }
       body {
  display: block !important; /* fluxo normal */
}
    .print-title {
  display: block !important;   /* garante bloco, não inline */
  width: 100% !important;      /* ocupa toda a largura */
  position: relative !important;
  font-size: 18pt !important;
  font-weight: bold !important;
  text-align: center !important;
  margin: 8mm auto !important;
  clear: both !important;      /* força ficar abaixo/acima de floats */
  page-break-after: avoid !important;
}

.print-container {
  display: block !important;
  margin: 30mm 0 0 0 !important;
  box-sizing: border-box !important;
  clear: both !important;

  transform: scale(0.90);           /* reduz um pouco o tamanho total */
  transform-origin: top center;     /* centraliza a redução */
}
        .print-container > * {
          width: auto !important;
          max-width: 100% !important;
          box-sizing: border-box;
        }
        img, svg, canvas, video {
          max-width: 100% !important;
          height: auto !important;
        }
      </style>
    </head>
    <body>
      <h1 class="print-title">Coletas Valorize: ___/___/_____</h1>
      <div class="print-container"></div>
    </body>
  </html>
`);

    w.document.close();

    // Copia CSS do documento original (fontes/pseudo-elementos)
    document.querySelectorAll("link[rel='stylesheet'], style").forEach((n) => {
      w.document.head.appendChild(n.cloneNode(true));
    });

    // Injeta o clone dentro do container
    w.document.querySelector(".print-container").appendChild(clone);

    // Aguarda imagens/fontes
    const waitImages = Array.from(w.document.images).map((img) =>
      img.complete
        ? Promise.resolve()
        : img
            .decode?.()
            .catch(
              () => new Promise((res) => img.addEventListener("load", res))
            )
    );
    await Promise.all(waitImages);
    await (w.document.fonts ? w.document.fonts.ready : Promise.resolve());
    await new Promise((r) =>
      w.requestAnimationFrame(() => w.requestAnimationFrame(r))
    );

    w.focus();
    w.print();
    w.close();
  }

  return (
    <>
      <header>
        <div className="logo">
          <img
            onClick={() => printInfo()}
            src="./logisticsRounteImg_noBackground.png"
            alt="Logo logistics route"
          />
          <h1>
            Roteiro
            <br />
            Logístico
          </h1>
        </div>
        <div className="icons">
          <Link to="/roteiro/analyticSBI">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width="32"
              // height="32"
              fill="currentColor"
              className="bi bi-bar-chart-line-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1z" />
            </svg>
          </Link>
          {/* <Link to="roteiro/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="bi bi-arrow-clockwise"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </Link> */}
        </div>
      </header>
    </>
  );
}

export default Header;
