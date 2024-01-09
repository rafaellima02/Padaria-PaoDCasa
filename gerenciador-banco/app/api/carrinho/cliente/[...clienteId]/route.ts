import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

// Defina a função handler para a rota
export async function POST(
  request: NextRequest,
  { params }: { params: { clienteId: string } }
) {
  const clienteId = params.clienteId;

  try {
    const body = await request.json();
    const {produtoId, quantidade, preco} = body

    if (!body) {
        return new NextResponse("Faltando informações", { status: 400 });
    }

    body.cliente_id = clienteId


  const produto = await prisma.produto.findUnique({
    where: {
      id: produtoId,
    },
  });

  if (!produto) {
    return new NextResponse('Produto não encontrado', { status: 104  } );
  }


  const carrinho = await prisma.carrinho.findFirst({
    where: {
      cliente_id: String(clienteId),
    },
  });
  
  if (!carrinho) {
    // Se o cliente não tiver um carrinho, você pode criar um aqui
    const novoCarrinho = await prisma.carrinho.create({
      data: {
        cliente_id: String(clienteId),
      },
    });
  
    
    const carrinhoId = novoCarrinho.id;

    const produtoCarrinho = await prisma.produtoCarrinho.create({
        data: {
          quantidade,
          produto: {
            connect: {
              id: produtoId,
            },
          },
          preco: String(preco),
          carrinho: {
            connect: {
              id: carrinhoId
            },
          },
        },
      });

        return NextResponse.json(produtoCarrinho);
  } else {
    const carrinhoId = carrinho.id;

    const produtoCarrinho = await prisma.produtoCarrinho.create({
        data: {
          quantidade,
          produto: {
            connect: {
              id: produtoId,
            },
          },
          preco: String(preco),
          carrinho: {
            connect: {
              id: carrinhoId
            },
          },
        },
      });

        return NextResponse.json(produtoCarrinho);
  }

   
} catch (error: any) {
    console.log(error, "Erro de registro");
    return new NextResponse("Suposto Erro interno", { status: 500 });
}
}

export async function GET(
  request: NextRequest,
  { params }: { params: { clienteId: string } }
) {
try {
  const clienteId  = params.clienteId;

  
  const carrinhoProdutos = await prisma.produtoCarrinho.findMany({
    where: {
      carrinho: {
        cliente_id: String(clienteId),
      },
    },
    include: {
      produto: true,
    },
  });

  return NextResponse.json(carrinhoProdutos);
} catch (error: any) {
  console.error(error);
  return new NextResponse("Erro ao recuperar produtos no carrinho", { status: 500 });
}
}

export async function PUT(request: Request) {
try {
  const data = await request.json();


  const { id, ...tipoCarrinho } = data;

  if (!id) {
    return new NextResponse("ID não fornecido", { status: 400 });
  }

  // Verifique se a inspeção com o ID especificado existe
  const tipoCarrinhoExistente = await prisma.carrinho.findUnique({
    where: {
      id: id,
    },
  });

  if (!tipoCarrinhoExistente) {
    return new NextResponse("Tipo de usuário não encontrado", { status: 404 });
  }

  // Atualize a inspeção com os novos dados
  const updateCarrinho = await prisma.carrinho.update({
    where: {
      id: id,
    },
    data: {
      ...tipoCarrinho,
    },
  });

  return new NextResponse("Tipo de usuário atualizado com sucesso", { status: 200 });
} catch (error: any) {
  console.log(error, "Erro de atualização");
  return new NextResponse("Suposto Erro interno" + error, { status: 500 });
}
}
