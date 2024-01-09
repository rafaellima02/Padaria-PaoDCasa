import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, senha } = await request.json();

  if (!email || !senha) {
    return new NextResponse("Falta informação", { status: 400 });
  }

  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        email,
      },
    });

    if (!cliente) {
      return new NextResponse("Credenciais inválidas", { status: 401 });
    }

    const senhaCorreta = await bcrypt.compare(senha, cliente.senha);

    if (!senhaCorreta) {
      return new NextResponse("Credenciais inválidas", { status: 401 });
    } 

    // Crie um token JWT sem data de expiração
    const token = jwt.sign(
      { clienteId: cliente.id, clienteNome: cliente.nome, clienteFoto: cliente.url }, 
      'VADA2331D1DDASD213DAS' ,
    );

    // Retorne o token na resposta
    return new NextResponse(JSON.stringify({ token }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error('Erro durante a autenticação:', error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}