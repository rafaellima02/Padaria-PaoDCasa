import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

// Defina a função handler para a rota
export async function GET(
  request: NextRequest,
  { params }: { params: { categoria_id: string } }
) {
  const categoria_id = params.categoria_id;

  if (!categoria_id) {
    return NextResponse.json({ error: "nome não fornecido" });
  }

  try {
    const categoria = await prisma.categoria.findUnique({
      where: {
        id: String(categoria_id), 
      },
    });

    return NextResponse.json(categoria);
  } catch (error) {
    console.error("Erro na busca de produtos:", error);
    return NextResponse.json({ error: "Erro interno na busca de produtos" });
  }
}