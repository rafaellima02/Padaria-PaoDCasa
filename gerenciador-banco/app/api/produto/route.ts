import  mime  from 'mime-types';
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { createReadStream, createWriteStream, } from 'fs';
import { extname, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { v4 as uuidv4 } from 'uuid';
import { PassThrough } from "stream";


export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const body: Record<string, string | Blob> = {};
    for (const [key, value] of formData.entries()) {
      body[key] = value;
    }

    delete body.id;

    if (!body.nome || !body.descricao || !body.preco || !body.disponibilidade || !body.categoria_id || !body.imagem) {
      return new NextResponse('Faltando informações', { status: 400 });
    }

    const imagens: { url: string }[] = [];
    const imagensFormData = formData.getAll('imagem');
    
    for (const imagem of imagensFormData) {
      const imagemBuffer = await (imagem as Blob).arrayBuffer();
      
      const idUnico = uuidv4();
     const extensao = typeof imagem === 'object' && 'type' in imagem
     ? mime.extension(imagem.type) || extname(imagem.name) || 'png'
     : 'png'; 

     const nomeArquivo = `imagem_${idUnico}.${extensao}`;

      const caminhoAbsoluto = resolve('public/uploads', nomeArquivo);
    
      const leituraStream = new PassThrough();
      leituraStream.end(Buffer.from(imagemBuffer));
      
      const gravacaoStream = createWriteStream(caminhoAbsoluto);

      await pipeline(leituraStream, gravacaoStream);
    
      const urlImagem = `/uploads/${nomeArquivo}`;
    
      imagens.push({ url: urlImagem });
    }
    
    const urlImagem = imagens.length > 0 ? imagens[0].url : null; 

    const produto = await prisma.produto.create({
      data: {
        nome: body.nome as string, 
        descricao: body.descricao as string, 
        preco: body.preco as string, 
        disponibilidade: JSON.parse(body.disponibilidade as string),
        categoria_id: body.categoria_id as string,
        url: String(urlImagem), 
        imagem: {
          create: imagens,
        },
      },
      include: {
        imagem: true,
      },
    });

    return NextResponse.json(produto);
  } catch (error: any) {
    console.error(error, 'Erro de registro');
    return new NextResponse('Suposto Erro interno', { status: 500 });
  }
}

export async function GET() {
    const produto = await prisma.produto.findMany({
      include: {
        imagem: true,
        categoria: true
      }
    });
    return NextResponse.json(produto);
}

export async function PUT(request: Request) {
    try {
      const data = await request.json();
  
  
      const { id, ...tipoProduto } = data;
  
      if (!id) {
        return new NextResponse("ID não fornecido", { status: 400 });
      }
  
      const tipoProdutoExistente = await prisma.produto.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!tipoProdutoExistente) {
        return new NextResponse("Tipo de usuário não encontrado", { status: 404 });
      }
  
      const updateProdutoPedido = await prisma.produto.update({
        where: {
          id: id,
        },
        data: {
          ...tipoProduto,
        },
      });
  
      return new NextResponse("Tipo de usuário atualizado com sucesso", { status: 200 });
    } catch (error: any) {
      console.log(error, "Erro de atualização");
      return new NextResponse("Suposto Erro interno" + error, { status: 500 });
    }
  }