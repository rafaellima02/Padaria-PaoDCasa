import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { createReadStream, createWriteStream } from 'fs';
import { extname, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { v4 as uuidv4 } from 'uuid';
import { PassThrough } from "stream";
import  mime  from 'mime-types';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const body: Record<string, string | Blob> = {};
    for (const [key, value] of formData.entries()) {
      body[key] = value;
    }

    delete body.id;

    if (!body.nome || !body.email || !body.telefone || !body.senha || !body.data_Nasc || !body.genero || !body.imagem) {
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

    const cliente = await prisma.cliente.create({
      data: {
        nome: body.nome as string,
        email: body.email as string,
        telefone: body.telefone as string,
        senha: body.senha as string,
        data_Nasc: body.data_Nasc as string,
        genero: body.genero as string,
        imagem: {
          create: imagens,
        },
      },
      include: {
        imagem: true,
      },
    });

    return NextResponse.json(cliente);
  } catch (error: any) {
    console.error(error, 'Erro de registro');
    return new NextResponse('Suposto Erro interno', { status: 500 });
  }
}

export async function GET() {
  const cliente = await prisma.cliente.findMany();
  return NextResponse.json(cliente);
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...tipoCliente } = data;

    if (!id) {
      return new NextResponse("ID não fornecido", { status: 400 });
    }

    const tipoClienteExistente = await prisma.cliente.findUnique({
      where: {
        id: id,
      },
    });

    if (!tipoClienteExistente) {
      return new NextResponse("Cliente não encontrado", { status: 404 });
    }

    const updateCliente = await prisma.cliente.update({
      where: {
        id: id,
      },
      data: {
        ...tipoCliente,
      },
    });

    return new NextResponse("Cliente atualizado com sucesso", { status: 200 });
  } catch (error: any) {
    console.log(error, "Erro de atualização");
    return new NextResponse("Suposto Erro interno" + error, { status: 500 });
  }
}