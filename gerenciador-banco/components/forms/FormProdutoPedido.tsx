import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ProdutoPedidoSchema } from "@/validators/FormProdutoPedido";
import TiposProdutoPedido from "@/app/types/TprodutoPedido";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";


type Input = z.infer<typeof ProdutoPedidoSchema>;

const value:any = []

export default function FormProdutoPedido({
  id,
  quantidade,
  pedido_id,
  produto_id,
  endereco_id,
  metodoPagamento_id,
  crud,
  onclikCancela,
}: TiposProdutoPedido) {
  const defaultValues = {
    id: crud === "UPD" ? id : "",
    quantidade: crud === "UPD" ? quantidade : "",
    pedido_id: crud === "UPD" ? pedido_id : "",
    produto_id: crud === "UPD" ? produto_id : "",
    endereco_id: crud === "UPD" ? endereco_id : "",
    metodoPagamento_id: crud === "UPD" ? metodoPagamento_id : "",
  };

  const form = useForm<Input>({
    resolver: zodResolver(ProdutoPedidoSchema),
    defaultValues,
  });

  useEffect(() => {
    form.setValue("id", crud === "UPD" ? id : "");
    form.setValue("quantidade", crud === "UPD" ? quantidade : "");
    form.setValue("pedido_id", crud === "UPD" ? pedido_id : "");
    form.setValue("produto_id", crud === "UPD" ? produto_id : "");
    form.setValue("endereco_id", crud === "UPD" ? endereco_id : "");
    form.setValue("metodoPagamento_id", crud === "UPD" ? metodoPagamento_id : "");
  }, [form, crud, id, quantidade, pedido_id, produto_id, endereco_id, metodoPagamento_id]);

  function onSubmit(data: Input) {
    if (crud === "UPD") {
      fetch("/api/metodoPagamento", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na solicitação POST");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }

    if (crud === "CRT") {
      fetch("/api/metodoPagamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw Error("Erro na solicitação POST");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  }



  const [popoverOpen, setPopoverOpen] = useState(false);
  
  const [cliente, setCliente] = useState(value);
  
  function getCliente() {
    fetch("/api/cliente")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na solicitação GET");
        }
        return response.json();
      })
      .then((data) => {
        setCliente(data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  useEffect(() => {
    getCliente();
  }, []);

  

  return (
    <Card className="rounded-xl w-[330px] h-fit p-2 relative dark:bg-slate-900">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <Form {...form}>
            <div className="flex flex-col justify-between items-center w-full space-y-6">
              {crud === "CRT"
                ? "Form Criar ProdutoPedido"
                : "Form Atualizar ProdutoPedido"}
              <div className="flex flex-col w-full ">
                <FormField
                  control={form.control}
                  name="quantidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Quantidade</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pedido_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Pedido ID</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="produto_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Produto ID</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
