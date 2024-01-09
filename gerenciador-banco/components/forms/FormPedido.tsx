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
import TiposPedido from "@/app/types/Tpedidos";
import PedidoSchema from "@/validators/FormPedidos";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";

type Input = z.infer<typeof PedidoSchema>;

const value: any = []

export default function FormPedido({
  id,
  dataPedido,
  total,
  status,
  confirmado,
  cliente_id,
  crud,
  onclikCancela,
}: TiposPedido) {
  const defaultValues = {
    id: crud === "UPD" ? id : "",
    dataPedido: crud === "UPD" ? dataPedido : "",
    total: crud === "UPD" ? total : "",
    status: crud === "UPD" ? status : "",
    confirmado: crud === "UPD" ? confirmado : false,
    cliente_id: cliente_id,
  };

  const form = useForm<Input>({
    resolver: zodResolver(PedidoSchema),
    defaultValues,
  });

  useEffect(() => {
    form.setValue("id", crud === "UPD" ? id : "");
    form.setValue("dataPedido", crud === "UPD" ? dataPedido : "");
    form.setValue("total", crud === "UPD" ? total : "");
    form.setValue("status", crud === "UPD" ? status : "");
    form.setValue("confirmado", crud === "UPD" ? confirmado : false);
    form.setValue("cliente_id", crud === "UPD" ? cliente_id : "");
  }, [form, crud, id, dataPedido, total, status, confirmado, cliente_id]);

  function onSubmit(data: Input) {


    let x = {};

    x = data;

    //@ts-ignore
    if (x.confirmado == "true") {
      //@ts-ignore
      x.confirmado = true;
    } else {
      //@ts-ignore
      x.confirmado = false;
    }

    if (crud === "UPD") {
      fetch("/api/pedido", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(x),
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
      fetch("/api/pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(x),
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

  const [SN, setSN] = useState([
    { text: "SIM", value: "true" },
    { text: "NÃO", value: "false" },
  ]);


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
              {crud === "CRT" ? "Form Criar Pedido" : "Form Atualizar Pedido"}
              <div className="flex flex-col w-full ">
                <FormField
                  control={form.control}
                  name="dataPedido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">
                        Data do Pedido
                      </FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Total</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Status</FormLabel>
                      <FormControl>
                        <Input placeholder="Status do Pedido" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px]">Confirmado</FormLabel>
                      <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={JSON.stringify(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[90px]">
                            <SelectValue placeholder="Não" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SN.map((op, index) => (
                            <SelectItem key={index} value={op.value}>
                              {op.text}
                            </SelectItem>
                          ))}
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
                  name="cliente_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Cliente</FormLabel>
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
                                ? cliente.find(
                                    (empresa: any) => empresa.id === field.value
                                  )?.nome
                                : "Selecione cliente"}
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
                              {cliente.map((CL: any) => (
                                <CommandItem
                                  value={CL.nome}
                                  key={CL.id}
                                  onSelect={() => {
                                    form.setValue("cliente_id", CL.id);
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
