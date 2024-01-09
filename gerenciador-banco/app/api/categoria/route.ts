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
  
      if (!body.nome || !body.imagem) {
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

        const categoria = await prisma.categoria.create({
            data: {
              nome: body.nome as string,
              imagem: {
                create: imagens,
              },
            },
            include: {
              imagem: true,
            },
          });
        return NextResponse.json(categoria);
    } catch (error: any) {
        console.log(error, "Erro de registro");
        return new NextResponse("Suposto Erro interno", { status: 500 });
    }
}

export async function GET() {
    const categoria = await prisma.categoria.findMany({
      include: {
        imagem: true
      }
    });
    return NextResponse.json(categoria);
}

export async function PUT(request: Request) {
    try {
      const data = await request.json();
  
  
      const { id, ...tipoCategoria } = data;
  
      if (!id) {
        return new NextResponse("ID não fornecido", { status: 400 });
      }
  
      // Verifique se a inspeção com o ID especificado existe
      const tipoCategoriaExistente = await prisma.categoria.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!tipoCategoriaExistente) {
        return new NextResponse("Tipo de usuário não encontrado", { status: 404 });
      }
  
      // Atualize a inspeção com os novos dados
      const updateCategoria = await prisma.categoria.update({
        where: {
          id: id,
        },
        data: {
          ...tipoCategoria,
        },
      });
  
      return new NextResponse("Categoria atualizada com sucesso", { status: 200 });
    } catch (error: any) {
      console.log(error, "Erro de atualização");
      return new NextResponse("Suposto Erro interno" + error, { status: 500 });
    }
  }