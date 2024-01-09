"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ClienteSchema } from "@/validators/FormCliente";
import TiposCliente from "@/app/types/Tcategorias";

type Input = z.infer<typeof ClienteSchema>;

export default function FormCliente({
  id,
  nome,
  email,
  telefone,
  senha,
  data_Nasc,
  genero,
  imagem,
  crud,
  onclikCancela,
}: TiposCliente) {
  const defaultValues = {
    id: crud === "UPD" ? id : "",
    nome: crud === "UPD" ? nome : "",
    email: crud === "UPD" ? email : "",
    telefone: crud === "UPD" ? telefone : "",
    senha: crud === "UPD" ? senha : "",
    data_Nasc: crud === "UPD" ? data_Nasc : "",
    genero: crud === "UPD" ? genero : "",
    imagem: crud === "UPD" ? imagem : "",
  };

  const form = useForm<Input>({
    resolver: zodResolver(ClienteSchema),
    defaultValues,
  });

  useEffect(() => {
    form.setValue("id", crud === "UPD" ? id : "");
    form.setValue("nome", crud === "UPD" ? nome : "");
    form.setValue("email", crud === "UPD" ? email : "");
    form.setValue("telefone", crud === "UPD" ? telefone : "");
    form.setValue("senha", crud === "UPD" ? senha : "");
    form.setValue("data_Nasc", crud === "UPD" ? data_Nasc : "");
    form.setValue("genero", crud === "UPD" ? genero : "");
    form.setValue("imagem", crud === "UPD" ? imagem : "");
  }, [form, crud, id, nome, email, telefone, senha, data_Nasc, genero, imagem]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function onSubmit(data: Input) {
    const formData = new FormData();

    // Adicione os outros campos ao formData conforme necessário
    formData.append("nome", data.nome || "");
    formData.append("email", data.email || "");
    formData.append("senha", data.senha || "");
    formData.append("telefone", data.telefone || "");
    formData.append("data_Nasc", data.data_Nasc || "");
    formData.append("genero", data.genero || "");

    // Adicione a imagem apenas se houver uma imagem selecionada
    if (selectedImage) {
      formData.append("imagem", selectedImage);
    }

    const requestOptions = {
      method: crud === "UPD" ? "PUT" : "POST",
      body: formData,
    };

    try {
      const response = await fetch("/api/cliente", requestOptions);

      if (!response.ok) {
        throw new Error("Erro na solicitação POST");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };


  return (
    <Card className="rounded-xl w-[330px] h-fit p-2 relative dark:bg-slate-900">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <Form {...form}>
            <div className="flex flex-col justify-between items-center w-full space-y-6">
              {crud === "CRT" ? "Form Criar Cliente" : "Form Atualizar Cliente"}
              <div className="flex flex-col w-full ">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do Cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Telefone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="123-456-7890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imagem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">
                        Imagem (JPG, JPEG, PNG)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => {
                            const file: any = e.target.files?.[0];
                            setSelectedImage(file);
                            field.onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="data_Nasc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">
                        Data de Nascimento
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="YYYY-MM-DD"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Gênero</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Masculino, Feminino, Outro"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Form>
        </CardContent>

        <CardFooter className="py-3 space-x-6 flex flex-row pt-6">
          {crud === "UPD" ? (
            <Button
              className="w-1/2"
              variant={"ghost"}
              type="reset"
              onClick={() => onclikCancela("sds")}
            >
              {" "}
              Cancelar
            </Button>
          ) : (
            <Button
              className="w-1/2"
              variant={"ghost"}
              type="reset"
              onClick={() => {
                form.reset(defaultValues);
              }}
            >
              {" "}
              Limpar
            </Button>
          )}
          <Button className="w-1/2" variant={"outline"} type="submit">
            Salvar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
