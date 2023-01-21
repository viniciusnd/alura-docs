import { documentosColecao } from "./dbConnect.js"

function obterDocumentos(){
    const documentos = documentosColecao.find().toArray()
    return documentos
}

function adicionarDocumento(nome){
    const resultado = documentosColecao.insertOne({
        nome,
        texto: ""
    })

    return resultado
}

function encontrarDocumento(nome){
    const documento = documentosColecao.findOne({
        nome
    })

    return documento
}

function atualizaDocumento(nome, texto){
    const atualizacao = documentosColecao.updateOne({
        nome
    },{
        $set: {
            texto
        }
    })
    
    return atualizacao
}
/* O primeiro parametro (nome) do updateOne define a consulta que queremos realizar na coleção, assim podemos
encontrar o objeto que desejamos, e depois $set apontamos o parametro que desejamos alterar, e passamos o valor
para ser alterado */

function excluirDocumento(nome) {
    const resultado = documentosColecao.deleteOne({
        nome,
    })
    return resultado
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento}
