import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prismadb"

// Defina a função handler para a rota
export async function GET(
  request: NextRequest,
  { params }: { params: { clienteId: string } }
) {
  const clienteId = params.clienteId;

  try {
   
    if(!clienteId){
      return new NextResponse('Não encontrado cliente id', {status: 105})
    }


    const cliente = await prisma.cliente.findUnique({
      where: {
        id: String(clienteId)
      } 

    })

    if(!cliente){
      return new NextResponse('Não encontrado cliente id', {status: 105})
    }
    

   return NextResponse.json(cliente);
  } catch (error) {
    console.error("Erro na busca de produtos:", error);
    return NextResponse.json({ error: "Erro interno na busca de produtos" });
  }
}