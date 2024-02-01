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
    }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", fitrarPesquisa); //irá capturar o que foi digitado na barra de pesquisa.

function fitrarPesquisa(){ //a const videos criada abaixo verifica se o que foi digitado corresponde a algum dos vídeos disponíveis.
    const videos = document.querySelectorAll(".videos__item");

    if(barraDePesquisa.value != ""){
        for (let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();//textContent captura o conteudo de texto do titulo... toLowerCase coloca o titulo dos vídeos em minúsculo para que a comparação seja possível
            let valorFiltro = barraDePesquisa.value.toLowerCase();//o texto digitado na barra de pesquisa é transformado em minúsculo para ser possível a comparação
        
            if(!titulo.includes(valorFiltro)){
                video.style.display = "none";//se o titulo do video não é igual ao que foi pesquisado ele será ocultado na tela, ou seja, todos os outros videos irão sumir da tela, exceto aquele que foi pesquisado.
            }else{
                video.style.display = "block";//se o video e a descrição na pesquisa forem iguais, vamos exibir o vídeo.
            }
        }
    }else{
        video.style.display = "block"; //se a barra de pesquisa estiver vazia, todos os videos devem estar visíveis na página.
    }
}