import prisma from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar se todos os campos necessários estão presentes
    const requiredFields = ["cliente_id", "total", "status"];
    const missingFields = requiredFields.filter((field) => !(field in body));

    if (missingFields.length > 0) {
      return new NextResponse(
        `Campos obrigatórios ausentes: ${missingFields.join(", ")}`,
        { status: 400 }
      );
    }

    body.dataPedido = new Date();

    const carrinhoId = body.carrinhoId;
    const t = body.total;

    delete body.carrinhoId;
 

    const produtos = body.produtos;
    delete body.produtos;

    const novoPedido = await prisma.pedido.create({
      data: {
        ...body,
        itens: {
          createMany: {
            data: produtos.map(
              (produto: {
                quantidade: number;
                produto: { id: string };
                endereco: { id: string };
              }) => ({
                quantidade: produto.quantidade,
                produto_id: String(produto?.produto?.id),
                endereco_id: String(produto?.endereco?.id),
              })
            ),
          },
        },
      },
      include: {
        itens: true,
        cliente: true,
      },
    });

    const delCar = await prisma.produtoCarrinho.deleteMany({
      where: {
        carrinho_id: String(carrinhoId),
      },
    });

    return NextResponse.json(novoPedido);
  } catch (error: any) {
    console.error(error, "Erro de registro");
    return new NextResponse("Erro interno ao processar a solicitação", {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        itens: {
          include: {
           produto: true,
           endereco_entrega: true, 
          },
        },
        cliente: true,
      },
    });

    const pedidosFormatados = pedidos.map((pedido: any) => ({
      id: pedido.id,
      dataPedido: pedido.dataPedido,
      total: pedido.total,
      status: pedido.status,
      confirmado: pedido.confirmado,
      cliente: pedido.cliente,
      itens: pedido.itens.map((item: any) => ({
        quantidade: item.quantidade,
        produto: item.produto,
        endereco: item.endereco,
      })),
    }));

    return NextResponse.json(pedidosFormatados);
  } catch (error: any) {
    console.error(error, "Erro ao recuperar pedidos");
    return new NextResponse("Erro interno ao processar a solicitação", {
      status: 500,
    });
  }
}
export async function PUT(request: Request) {
  try {
    const data = await request.json();

    const { id, ...tipoPedido } = data;

    if (!id) {
      return new NextResponse("ID não fornecido", { status: 400 });
    }

    // Verifique se a inspeção com o ID especificado existe
    const tipoPedidoExistente = await prisma.pedido.findUnique({
      where: {
        id: id,
      },
    });

    if (!tipoPedidoExistente) {
      return new NextResponse("Tipo de usuário não encontrado", {
        status: 404,
      });
    }

    // Atualize a inspeção com os novos dados
    const updateProdutoPedido = await prisma.pedido.update({
      where: {
        id: id,
      },
      data: {
        ...tipoPedido,
      },
    });

    return new NextResponse("Tipo de usuário atualizado com sucesso", {
      status: 200,
    });
  } catch (error: any) {
    console.log(error, "Erro de atualização");
    return new NextResponse("Suposto Erro interno" + error, { status: 500 });
  }
}
