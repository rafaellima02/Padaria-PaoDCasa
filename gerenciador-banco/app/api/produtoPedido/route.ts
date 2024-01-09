import prisma from "@/lib/prismadb"

import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        delete body.id;

        if (!body) {
            return new NextResponse("Faltando informações", { status: 400 });
        }

        const produtoPedido = await prisma.produtoPedido.create({
            data: body
        });
        return NextResponse.json(produtoPedido);
    } catch (error: any) {
        console.log(error, "Erro de registro");
        return new NextResponse("Suposto Erro interno", { status: 500 });
    }
}

export async function GET() {
    const produtoPedido = await prisma.produtoPedido.findMany();
    return NextResponse.json(produtoPedido);
}

export async function PUT(request: Request) {
    try {
      const data = await request.json();
  
  
      const { id, ...tipoProdutoPedido } = data;
  
      if (!id) {
        return new NextResponse("ID não fornecido", { status: 400 });
      }
  
      // Verifique se a inspeção com o ID especificado existe
      const tipoProdutoPedidoExistente = await prisma.produtoPedido.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!tipoProdutoPedidoExistente) {
        return new NextResponse("Tipo de usuário não encontrado", { status: 404 });
      }
  
      // Atualize a inspeção com os novos dados
      const updateProdutoPedido = await prisma.produtoPedido.update({
        where: {
          id: id,
        },
        data: {
          ...tipoProdutoPedido,
        },
      });
  
      return new NextResponse("Tipo de usuário atualizado com sucesso", { status: 200 });
    } catch (error: any) {
      console.log(error, "Erro de atualização");
      return new NextResponse("Suposto Erro interno" + error, { status: 500 });
    }
  }