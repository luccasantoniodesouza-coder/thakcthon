
const form = document.querySelector("form");

form.addEventListener("submit", evento => {
    evento.preventDefault();

    const formData = new FormData(form);
    const dados = Object.fromEntries(formData);

    fetch("http://localhost:3000/relatos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    console.log(dados);
});
