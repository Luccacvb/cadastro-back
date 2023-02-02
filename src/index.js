const express = require('express')

const cors = require('cors')

const server = express()

server.use(express.json())

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

server.use(cors())

function consultarEmail(email) {
    return prisma.cadastro.findUnique({
        where: {
            email,
        }
    })
}

function consultarCpf(cpf) {
    return prisma.cadastro.findUnique({
        where: {
            cpf,
        }
    })
}

server.get('/cadastro', async (req, res) => {
    const cadastro = await prisma.cadastro.findMany()
    return res.json(cadastro)
})

server.get('/cadastroEmail/:email', async (req, res) => {
    const cadastro = await consultarEmail(req.params.email)

    return cadastro
        ? res.json(cadastro)
        : res.status(500).json("Usuario não encontrado")

})

server.get('/cadastroCpf/:cpf', async (req, res) => {
    const cadastro = await consultarCpf(req.params.cpf)

    return cadastro
        ? res.json(cadastro)
        : res.status(500).json("Usuario não encontrado")

})

server.post('/cadastro', async (req, res) => {
    if (await consultarEmail(req.body.email)) {
        res.status(500).json("Esse email de usuario ja foi cadastrado")
    } else if (await consultarCpf(req.body.cpf)) {
        res.status(500).json("Esse CPF de usuario ja foi cadastrado")
    } else {
        const cadastro = await prisma.cadastro.create({
            data: req.body
        })
        return res.json(cadastro)
    }
})

server.delete('/cadastroEmail/:email', async (req, res) => {

    if (await consultarEmail(req.params.email)) {
        const cadastro = await prisma.cadastro.delete({
            where: {
                email: req.params.email
            }
        })
        return res.json(cadastro)
    } else {
        return res.status(500).json("Usuario não encontrado")
    }
})

server.delete('/cadastroCpf/:cpf', async (req, res) => {

    if (await consultarCpf(req.params.cpf)) {
        const cadastro = await prisma.cadastro.delete({
            where: {
                cpf: req.params.cpf
            }
        })
        return res.json(cadastro)
    } else {
        return res.status(500).json("Usuario não encontrado")
    }
})

server.put('/cadastro', async (req, res) => {
    if (await consultarCpf(req.body.cpf)) {
        if (await consultarEmail(req.body.email)) {
            return res.status(500).json("Esse email de usuario ja foi cadastrado")
        } else {
            const cadastro = await prisma.cadastro.update({
                data: req.body,
                where: {
                    cpf: req.body.cpf
                }
            })
            return res.json(cadastro)
        }

    } else {
        return res.status(500).json("Usuario não encontrado")
    }

})

server.listen(3001, () => {
    console.log('Server up!!')
})