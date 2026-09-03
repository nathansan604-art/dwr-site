// ==========================================
// ANO AUTOMÁTICO
// ==========================================

const ano = document.getElementById("ano");

if (ano) {
    ano.textContent = new Date().getFullYear();
}


// ==========================================
// CABEÇALHO
// ==========================================

const cabecalho = document.querySelector(".cabecalho");

window.addEventListener("scroll", () => {

    if (!cabecalho) {
        return;
    }

    if (window.scrollY > 40) {

        cabecalho.style.boxShadow =
            "0 8px 25px rgba(0, 0, 0, 0.22)";

    } else {

        cabecalho.style.boxShadow = "none";

    }

});


// ==========================================
// ROLAGEM SUAVE
// ==========================================

const linksInternos =
    document.querySelectorAll('a[href^="#"]');

linksInternos.forEach(link => {

    link.addEventListener("click", function(event) {

        const id = this.getAttribute("href");

        if (!id || id === "#") {
            return;
        }

        const destino =
            document.querySelector(id);

        if (destino) {

            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ==========================================
// SERVIÇOS - TROCA DE IMAGEM
// ==========================================

const linhasServico =
    document.querySelectorAll(".servico-linha");

const imagemServico =
    document.getElementById("imagem-servico");

const areaImagem =
    document.querySelector(".servicos-imagem");


linhasServico.forEach(linha => {

    linha.addEventListener("mouseenter", () => {

        const novaImagem =
            linha.dataset.imagem;

        linhasServico.forEach(item => {
            item.classList.remove("ativo");
        });

        linha.classList.add("ativo");


        if (
            imagemServico &&
            novaImagem &&
            imagemServico.getAttribute("src") !== novaImagem
        ) {

            if (areaImagem) {
                areaImagem.classList.add("trocando");
            }


            setTimeout(() => {

                imagemServico.src = novaImagem;

                if (areaImagem) {

                    areaImagem.classList.remove(
                        "trocando"
                    );

                }

            }, 180);

        }

    });

});


// ==========================================
// CARROSSEL
// ==========================================

const carrossel =
    document.getElementById("carrossel");

const botaoAnterior =
    document.getElementById("carrossel-anterior");

const botaoProximo =
    document.getElementById("carrossel-proximo");

const paginaAtual =
    document.getElementById("pagina-atual");

const totalPaginas =
    document.getElementById("total-paginas");

const slides =
    document.querySelectorAll(".slide");


if (
    carrossel &&
    slides.length > 0
) {

    if (totalPaginas) {

        totalPaginas.textContent =
            String(slides.length)
                .padStart(2, "0");

    }


    function tamanhoSlide() {

        const estilos =
            window.getComputedStyle(carrossel);

        const gap =
            parseFloat(estilos.gap) || 0;

        return slides[0].offsetWidth + gap;

    }


    function atualizarContador() {

        if (!paginaAtual) {
            return;
        }

        const tamanho =
            tamanhoSlide();

        if (!tamanho) {
            return;
        }

        const indice =
            Math.round(
                carrossel.scrollLeft /
                tamanho
            );

        const atual =
            Math.min(
                indice + 1,
                slides.length
            );

        paginaAtual.textContent =
            String(atual)
                .padStart(2, "0");

    }


    function proximoSlide() {

        const tamanho =
            tamanhoSlide();

        const chegouNoFim =
            carrossel.scrollLeft +
            carrossel.clientWidth >=
            carrossel.scrollWidth - 10;


        if (chegouNoFim) {

            carrossel.scrollTo({
                left: 0,
                behavior: "smooth"
            });

        } else {

            carrossel.scrollBy({
                left: tamanho,
                behavior: "smooth"
            });

        }

    }


    function slideAnterior() {

        const tamanho =
            tamanhoSlide();


        if (carrossel.scrollLeft <= 5) {

            carrossel.scrollTo({
                left: carrossel.scrollWidth,
                behavior: "smooth"
            });

        } else {

            carrossel.scrollBy({
                left: -tamanho,
                behavior: "smooth"
            });

        }

    }


    if (botaoProximo) {

        botaoProximo.addEventListener(
            "click",
            proximoSlide
        );

    }


    if (botaoAnterior) {

        botaoAnterior.addEventListener(
            "click",
            slideAnterior
        );

    }


    carrossel.addEventListener(
        "scroll",
        atualizarContador
    );


    // ======================================
    // AUTOPLAY
    // ======================================

    let autoplay =
        setInterval(
            proximoSlide,
            4000
        );


    function pararAutoplay() {

        clearInterval(autoplay);

    }


    function iniciarAutoplay() {

        clearInterval(autoplay);

        autoplay =
            setInterval(
                proximoSlide,
                4000
            );

    }


    carrossel.addEventListener(
        "mouseenter",
        pararAutoplay
    );


    carrossel.addEventListener(
        "mouseleave",
        iniciarAutoplay
    );


    // ======================================
    // ARRASTAR COM O MOUSE
    // ======================================

    let arrastando = false;

    let inicioX = 0;

    let scrollInicial = 0;


    carrossel.addEventListener(
        "mousedown",
        (event) => {

            arrastando = true;

            carrossel.classList.add(
                "arrastando"
            );

            inicioX =
                event.pageX -
                carrossel.offsetLeft;

            scrollInicial =
                carrossel.scrollLeft;

            pararAutoplay();

        }
    );


    window.addEventListener(
        "mouseup",
        () => {

            if (!arrastando) {
                return;
            }

            arrastando = false;

            carrossel.classList.remove(
                "arrastando"
            );

            iniciarAutoplay();

        }
    );


    carrossel.addEventListener(
        "mousemove",
        (event) => {

            if (!arrastando) {
                return;
            }

            event.preventDefault();

            const x =
                event.pageX -
                carrossel.offsetLeft;

            const movimento =
                (x - inicioX) * 1.3;

            carrossel.scrollLeft =
                scrollInicial -
                movimento;

        }
    );


    // Atualiza contador inicialmente
    atualizarContador();

}