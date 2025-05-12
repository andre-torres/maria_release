// Configuração: Substitua "andre-torres" e "nome-do-repo" pelo dono e nome do seu repositório no GitHub.
const owner = "andre-torres";
const repo = "maria_release";

async function fetchReleases() {
    const url = `https://api.github.com/repos/${owner}/${repo}/releases`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro ao buscar releases: ${response.statusText}`);
        }
        const releases = await response.json();
        displayReleases(releases);
    } catch (error) {
        document.getElementById("releases").innerHTML = `<p>${error.message}</p>`;
    }
}

function displayReleases(releases) {
    const container = document.getElementById("releases");
    container.innerHTML = ""; // Limpar conteúdo anterior
    releases.forEach(release => {
        const div = document.createElement("div");
        div.classList.add("release");
        div.innerHTML = `
            <h2>${release.name || "Sem nome"}</h2>
            <p><strong>Tag:</strong> ${release.tag_name}</p>
            <p>${release.body || "Sem descrição"}</p>
            <p><a href="${release.html_url}" target="_blank">Ver no GitHub</a></p>
        `;
        container.appendChild(div);
    });
}

// Inicializa a busca de releases
fetchReleases();
