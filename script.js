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
                    </div>
                </li>
                `;
            })
    } catch(error){
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

buscarEMostrarVideos();

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