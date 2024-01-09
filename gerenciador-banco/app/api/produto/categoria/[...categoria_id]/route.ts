import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { categoria_id: string } }
) {
  const categoria_id = params.categoria_id;

  if (!categoria_id) {
    return NextResponse.json({ error: "nome não fornecido" });
  }

  try {
    const produtos = await prisma.produto.findMany({
      where: {
        categoria_id: {
          equals: String(categoria_id)
        },
      },
      include: {
        imagem: true
      }
    });

    return NextResponse.json(produtos);
  } catch (error) {
    console.error("Erro na busca de produtos por categoria:", error);
    return NextResponse.json({ error: "Erro interno na busca de produtos por categoria" });
  }
}