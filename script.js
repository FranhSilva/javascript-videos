const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos(){
    try{
        const api = await fetch("http://localhost:3000/videos");
        const videosRecebidos = await api.json();

            videosRecebidos.forEach((videoEspecifico) => {
                if(videoEspecifico.categoria == ""){
                    throw new Error("Vídeo não tem categoria");
                }
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${videoEspecifico.url}" title="${videoEspecifico.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${videoEspecifico.imagem}" alt="Logo do Canal">
                        <h3 class="titulo-video">${videoEspecifico.titulo}</h3>
                        <p class="titulo-canal">${videoEspecifico.descricao}</p>
                        <p class="categoria" hidden>${videoEspecifico.categoria}</p>
                    </div>
                </li>
                `;// hidden que colocamos em categoria serve para ocultar esse conteúdo na tela do usuário, porém o conteúdo está disponível para utilizarmos posteriormente no filtro de categorias.
            })
    } catch(error){
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

buscarEMostrarVideos();

//BOTÃO DE PESQUISA

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
    const videos = document.querySelectorAll('.videos__item');
    const valorFiltro = barraDePesquisa.value.toLowerCase();
      
    videos.forEach((video) => {
        const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
      
        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
    });
}

//FILTRO DE CATEGORIAS

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");//getAttribute vai acessar qualquer atributo que definimos anteriormente no html, nesse caso, vamos acessar o atributo "name";
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != "tudo"){
            video.style.display = "none";
        }else {
            video.style.display = "block";
        }
    }
}