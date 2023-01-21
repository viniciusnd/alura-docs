// import "./socket-front-index.js"
import { emitirAdicionarDocumento } from "./socket-front-index.js"

const listaDocumentos = document.getElementById("lista-documentos")
const form = document.getElementById("form-adiciona-documento")
const inputDocumento = document.getElementById("input-documento")

form.addEventListener("submit", (evento) => {
    evento.preventDefault() // impede o comportamento padrão
    // console.log(inputDocumento.value) // console do navegador
    emitirAdicionarDocumento(inputDocumento.value)
    inputDocumento.value = ""

})

function inserirLinkDocumento(nomeDoDocumento) {
    listaDocumentos.innerHTML += `
        <a 
            href="documento.html?nome=${nomeDoDocumento}" 
            class="list-group-item list-group-item-action"
            id="documento-${nomeDoDocumento}"
        >
            ${nomeDoDocumento}
        </a>
    `
}

// inserirLinkDocumento("JavaScript")

function removerLinkDocumento(nomeDocumento){
    const documento = document.getElementById(`documento-${nomeDocumento}`)
    listaDocumentos.removeChild(documento)
}

export { inserirLinkDocumento, removerLinkDocumento }