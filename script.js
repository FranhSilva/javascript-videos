const containerVideos = document.querySelector(".videos__container");

const api = fetch("http://localhost:3000/videos")
.then(res => res.json())
.then((videosRecebidos) =>
    videosRecebidos.forEach((videoEspecifico) => {
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
)

//Tratamento de erros utilizando o .catch:

.catch((error)=>{
    containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`;
})
