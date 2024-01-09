import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

// Defina a função handler para a rota
export async function GET(
  request: NextRequest,
  { params }: { params: { nome: string } }
) {
  const nome = params.nome;

  if (!nome) {
    return NextResponse.json({ error: "nome não fornecido" });
  }

  try {
    // Faça a busca no banco de dados com base no nome
    const produtos = await prisma.produto.findMany({
      where: {
        nome: {
          contains: String(nome),
          mode: "insensitive",
        },
      },
      include: {
        imagem: true,
      },
    });

    return NextResponse.json(produtos);
  } catch (error) {
    console.error("Erro na busca de produtos:", error);
    return NextResponse.json({ error: "Erro interno na busca de produtos" });
  }
}