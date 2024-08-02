import { app } from "./server";

const server = async () => {
    const porta: number = 3001
    
    try {
        await app.listen({ port: porta })
        console.log(`server rodando na porta: ${porta}`)
    } catch (error) {
        console.log(error)
    }
}

server();