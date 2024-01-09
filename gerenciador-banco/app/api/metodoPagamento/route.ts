import prisma from "@/lib/prismadb"

import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        delete body.id;

        if (!body) {
            return new NextResponse("Faltando informações", { status: 400 });
        }

        const metodoPagamento = await prisma.metodoPagamento.create({
            data: body
        });
        return NextResponse.json(metodoPagamento);
    } catch (error: any) {
        console.log(error, "Erro de registro");
        return new NextResponse("Suposto Erro interno", { status: 500 });
    }
}

export async function GET() {
    const metodoPagamento = await prisma.metodoPagamento.findMany();
    return NextResponse.json(metodoPagamento);
}

export async function PUT(request: Request) {
    try {
      const data = await request.json();
  
  
      const { id, ...tipoMetodoPagamento } = data;
  
      if (!id) {
        return new NextResponse("ID não fornecido", { status: 400 });
      }
  
      // Verifique se a inspeção com o ID especificado existe
      const tipoMetodoPagamentoExistente = await prisma.metodoPagamento.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!tipoMetodoPagamentoExistente) {
        return new NextResponse("Tipo de usuário não encontrado", { status: 404 });
      }
  
      // Atualize a inspeção com os novos dados
      const updateMetodoPagamento = await prisma.metodoPagamento.update({
        where: {
          id: id,
        },
        data: {
          ...tipoMetodoPagamento,
        },
      });
  
      return new NextResponse("Tipo de usuário atualizado com sucesso", { status: 200 });
    } catch (error: any) {
      console.log(error, "Erro de atualização");
      return new NextResponse("Suposto Erro interno" + error, { status: 500 });
    }
  }