// import { emitirAdicionarDocumento } from "../public/socket-front-index.js"
import { adicionarDocumento, atualizaDocumento, encontrarDocumento, excluirDocumento, obterDocumentos } from "./documentosDb.js"
import io from "./servidor.js"


io.on("connection", (socket) => {
    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos()

        devolverDocumentos(documentos)
    })
    // console.log("Um cliente se conectou! ID:", socket.id)

    socket.on("adicionar_documento", async (nome) => {
        const docJaExiste = (await encontrarDocumento(nome)) !== null

        if (docJaExiste) {
            socket.emit("documento_existente", nome)
        } else {
            const resultado = await adicionarDocumento(nome)

            if (resultado.acknowledged) {
                io.emit("adicionar_documento_interface", nome)
            }

        }
        
    })

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento)

        const documento = await encontrarDocumento(nomeDocumento)

        console.log(documento)

        if(documento){
            // socket.emit("texto_documento", documento.texto)

            devolverTexto(documento.texto)
        }  
    })

    socket.on("texto_editor", async ({texto, nomeDocumento}) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto)

        console.log(atualizacao)

        if(atualizacao.modifiedCount){
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto)
        }
        
    })

    socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome)

        if(resultado.deletedCount){
            io.emit("documento_excluido_com_sucesso", nome)
        }
    })
})


