const containerVideos = document.querySelector(".videos__container"); //aqui vamos capturar a lista de videos no HTML

const api = fetch("http://localhost:3000/videos")
.then(res => res.json()) //recebe a resposta JSON
.then((videosRecebidos) => //executa a resposta que foi recebida
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

//tag iframe = permite incorporar videos na pagina
//allowfullscreen = permite exibir os videos em tela cheia
