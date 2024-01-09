import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { clienteId: string } }
) {
  const clienteId = params.clienteId;

  if (!clienteId) {
    return NextResponse.json({ error: "clienteId não fornecido" });
  }

  try {
    const pedidosCliente = await prisma.pedido.findMany({
      where: {
        cliente: {
          id: String(clienteId),
        },
        finalizado: true,
      },
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

    const pedidosFormatados = pedidosCliente.map((pedido: any) => ({
      id: pedido.id,
      dataPedido: pedido.dataPedido,
      total: pedido.total,
      status: pedido.status,
      confirmado: pedido.confirmado,
      finalizado: pedido.finalizado,
      cliente: pedido.cliente,
      itens: pedido.itens.map((item: any) => ({
        quantidade: item.quantidade,
        produto: item.produto,
        endereco: item.endereco,
      })),
    }));

    return NextResponse.json(pedidosFormatados);
  } catch (error: any) {
    console.error(error);
    return new NextResponse("Erro ao recuperar pedidos do cliente", { status: 500 });
  }
}