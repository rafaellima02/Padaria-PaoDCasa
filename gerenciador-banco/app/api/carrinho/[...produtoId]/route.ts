import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

// Defina a função handler para a rota
export async function DELETE(
  request: NextRequest,
  { params }: { params: { produtoId: string } }
) {
  const produtoId  = params.produtoId[1];
  const clienteId = params.produtoId[0]

  if (!clienteId || !produtoId) {
    return NextResponse.json({ error: "clienteId ou produtoId não fornecido" });
  }

  try {
    const carrinho = await prisma.carrinho.findMany({
      where: {
        cliente_id: String(clienteId)
      }
    });

    if (!carrinho || carrinho.length === 0) {
      return NextResponse.json({ error: "Carrinho não encontrado para o cliente" });
    }

    const carrinhoId = carrinho[0].id;

    const produtoCarrinho = await prisma.produtoCarrinho.findMany({
      where: {
        produto_id: String(produtoId),
        carrinho_id: String(carrinhoId),
      }
    });

    if (!produtoCarrinho || produtoCarrinho.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado no carrinho" });
    }

    const produtoCarrinhoId = produtoCarrinho[0].id;

    const delProdutoCar = await prisma.produtoCarrinho.delete({
      where: {
        id: produtoCarrinhoId,
      }
    });

    return NextResponse.json({ message: "Produto removido do carrinho com sucesso" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao remover o produto do carrinho" });
  }
}