import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ProdutoSchema } from "@/validators/FormProduto";
import TiposProduto from "@/app/types/Tproduto";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";

type Input = z.infer<typeof ProdutoSchema>;

const value: any = [];

export default function FormProduto({
  id,
  nome,
  descricao,
  preco,
  imagem,
  disponibilidade,
  categoria_id,
  crud,
  onclikCancela,
}: TiposProduto) {
  const defaultValues = {
    id: crud === "UPD" ? id : "",
    nome: crud === "UPD" ? nome : "",
    descricao: crud === "UPD" ? descricao : "",
    preco: crud === "UPD" ? preco : "",
    imagem: crud === "UPD" ? imagem?.url : "",
    disponibilidade: crud === "UPD" ? disponibilidade : true,
    categoria_id: crud === "UPD" ? categoria_id.nome : "",
  };

  const form = useForm<Input>({
    resolver: zodResolver(ProdutoSchema),
    defaultValues,
  });

  useEffect(() => {
    form.setValue("id", crud === "UPD" ? id : "");
    form.setValue("nome", crud === "UPD" ? nome : "");
    form.setValue("descricao", crud === "UPD" ? descricao : "");
    form.setValue("preco", crud === "UPD" ? preco : "");
    form.setValue("imagem", crud === "UPD" ? imagem?.url : "");
    form.setValue("disponibilidade", crud === "UPD" ? disponibilidade : true);
    form.setValue("categoria_id", crud === "UPD" ? categoria_id.nome : "");
  }, [
    form,
    crud,
    id,
    nome,
    descricao,
    preco,
    imagem,
    disponibilidade,
    categoria_id,
  ]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  function onSubmit(data: Input) {
    const formData = new FormData();

    // Adicione os outros campos ao formData conforme necessário
    formData.append("nome", data.nome || "");
    formData.append("descricao", data.descricao || "");
    formData.append("preco", data.preco || "");
    formData.append("disponibilidade", data.disponibilidade.toString());
    formData.append("categoria_id", data.categoria_id || "");

    // Adicione a imagem apenas se houver uma imagem selecionada
    if (selectedImage) {
      formData.append("imagem", selectedImage, selectedImage.name);
    }

    const requestOptions = {
      method: crud === "UPD" ? "PUT" : "POST",
      body: formData,
    };

    fetch("/api/produto", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação POST");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  const [popoverOpen, setPopoverOpen] = useState(false);

  const [categoria, setCategoria] = useState(value);

  function getCategoria() {
    fetch("/api/categoria")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação GET");
        }
        return response.json();
      })
      .then((data) => {
        setCategoria(data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  useEffect(() => {
    getCategoria();
  }, []);

  return (
    <Card className="rounded-xl w-[330px] h-fit p-2 relative dark:bg-slate-900">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <Form {...form}>
            <div className="flex flex-col justify-between items-center w-full space-y-6">
              {crud === "CRT" ? "Form Criar Produto" : "Form Atualizar Produto"}
              <div className="flex flex-col w-full ">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do Produto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Descrição do Produto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Preço</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                            const file:any = e.target.files?.[0];
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
                  name="disponibilidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] ">
                        Disponibilidade
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value ? "true" : "false"}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Não" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Sim</SelectItem>
                            <SelectItem value="false">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="py-3 flex flex-col space-y-3 w-full">
                <FormField
                  control={form.control}
                  name="categoria_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Categorias</FormLabel>
                      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? categoria.find(
                                    (empresa: any) => empresa.id === field.value
                                  )?.nome ||
                                  categoria.nome ||
                                  "Selecione categoria"
                                : "Selecione categoria"}

                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command className="pointer-events-auto">
                            <CommandInput
                              className="pointer-events-auto z-[999999999]"
                              placeholder="Pesquise..."
                            />
                            <CommandEmpty>Nada encontrado.</CommandEmpty>
                            <CommandGroup>
                              {categoria.map((CL: any) => (
                                <CommandItem
                                  value={CL.nome}
                                  key={CL.id}
                                  onSelect={() => {
                                    form.setValue("categoria_id", CL.id);
                                    setPopoverOpen(false);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      CL.nome === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {CL.nome}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
