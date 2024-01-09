import prisma from "@/lib/prismadb"

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        delete body.id;

        const senha = body.senha;

        const hashSenha = await bcrypt.hash(senha, 12);

        body.senha = hashSenha;


        if (!body) {
            return new NextResponse("Faltando informações", { status: 400 });
        }

        const cliente = await prisma.cliente.create({
            data: body
        });
        return NextResponse.json(cliente);
    } catch (error: any) {
        console.log(error, "Erro de registro");
        return new NextResponse("Suposto Erro interno", { status: 500 });
    }
}

export async function GET() {
    const cliente = await prisma.cliente.findMany();
    return NextResponse.json(cliente);
}

export async function PUT(request: Request) {
    try {
      const data = await request.json();
  
  
      const { id, ...tipoCliente } = data;
  
      if (!id) {
        return new NextResponse("ID não fornecido", { status: 400 });
      }
  
      // Verifique se a inspeção com o ID especificado existe
      const tipoClienteExistente = await prisma.cliente.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!tipoClienteExistente) {
        return new NextResponse("Tipo de usuário não encontrado", { status: 404 });
      }
  
      // Atualize a inspeção com os novos dados
      const updateCliente = await prisma.cliente.update({
        where: {
          id: id,
        },
        data: {
          ...tipoCliente,
        },
      });
  
      return new NextResponse("Tipo de usuário atualizado com sucesso", { status: 200 });
    } catch (error: any) {
      console.log(error, "Erro de atualização");
      return new NextResponse("Suposto Erro interno" + error, { status: 500 });
    }
  }