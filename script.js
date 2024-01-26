const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos(){
    try{ //vai "tentar" executar o código abaixo:
        const api = await fetch("http://localhost:3000/videos");
        const videosRecebidos = await api.json();

            videosRecebidos.forEach((videoEspecifico) => {
                if(videoEspecifico.categoria == ""){
                    throw new Error("Vídeo não tem categoria");//aqui podemos fazer um tratamento de erro específico antes da execução do código.
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
    } catch(error){ //se ele encontrar algum erro irá executar o que está abaixo:
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`
    } finally {
        alert("Essa mensagem sempre irá aparecer");
    }
}

buscarEMostrarVideos();
