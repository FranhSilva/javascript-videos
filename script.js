const api = fetch("http://localhost:3000/videos") //buscar
.then(res => console.log(res.json())); //exibe, no console, a resposta do que ele buscou na API