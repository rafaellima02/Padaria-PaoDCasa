"use client";

import { Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useEffect, useState } from "react";
import FormCategoria from "@/components/forms/FormCategoria";
import FormCliente from "@/components/forms/FormCliente";
import FormEndereco from "@/components/forms/FormEndereco";

import FormProduto from "@/components/forms/FormProduto";
import FormPedido from "@/components/forms/FormPedido";
import FormProdutoPedido from "@/components/forms/FormProdutoPedido";

const value: any = [];

export default function Admin() {
  const [categorias, setCategorias] = useState(value);
  const [clientes, setClientes] = useState(value);
  const [enderecos, setEnderecos] = useState(value);
  const [metodoPagamento, setMetodoPagamento] = useState(value);
  const [produtos, setProdutos] = useState(value);
  const [pedidos, setPedidos] = useState(value);
  const [produtoPedidos, setProdutoPedidos] = useState(value);

  const [categoriaEdicao, setCategoriaEdicao] = useState(value);
  const [clienteEdicao, setClienteEdicao] = useState(value);
  const [enderecoEdicao, setEnderecoEdicao] = useState(value);
  const [metodoPagamentoEdicao, setMetodoPagamentoEdicao] = useState(value);
  const [produtoEdicao, setProdutoEdicao] = useState(value);
  const [pedidoEdicao, setPedidoEdicao] = useState(value);
  const [produtoPedidoEdicao, setProdutoPedidoEdicao] = useState(value);

  const [editarForm, setEditarForm] = useState("");

  function EditarCategoria(categoria: any) {
    setEditarForm("categoria");
    setCategoriaEdicao(categoria);
  }
  
  function EditarCliente(cliente: any) {
    setEditarForm("cliente");
    setClienteEdicao(cliente);
  }
  
  function EditarEndereco(endereco: any) {
    setEditarForm("endereco");
    setEnderecoEdicao(endereco);
  }
  
  function EditarMetodoPagamento(metodoPagamento: any) {
    setEditarForm("metodoPagamento");
    setMetodoPagamentoEdicao(metodoPagamento);
  }
  
  function EditarProduto(produto: any) {
    setEditarForm("produto");
    setProdutoEdicao(produto);
  }
  
  function EditarPedido(pedido: any) {
    setEditarForm("pedido");
    setPedidoEdicao(pedido);
  }
  
  function EditarProdutoPedido(produtoPedido: any) {
    setEditarForm("produtoPedido");
    setProdutoPedidoEdicao(produtoPedido);
  }

  function getTudo() {
    Promise.all([
      fetch("/api/categoria/", { method: "GET" }),
      fetch("/api/cliente/", { method: "GET" }),
      fetch("/api/endereco/", { method: "GET" }),
      fetch("/api/metodoPagamento/", { method: "GET" }),
      fetch("/api/produto/", { method: "GET" }),
      fetch("/api/pedido/", { method: "GET" }),
      fetch("/api/produtoPedido/", { method: "GET" }),
    ])
      .then(
        ([
          resCategorias,
          resClientes,
          resEnderecos,
          resMetodoPagamento,
          resProdutos,
          resPedidos,
          resProdutoPedidos,
        ]) =>
          Promise.all([
            resCategorias.json(),
            resClientes.json(),
            resEnderecos.json(),
            resMetodoPagamento.json(),
            resProdutos.json(),
            resPedidos.json(),
            resProdutoPedidos.json(),
          ])
      )
      .then(
        ([
          dataCategorias,
          dataClientes,
          dataEnderecos,
          dataMetodoPagamento,
          dataProdutos,
          dataPedidos,
          dataProdutoPedidos,
        ]) => {
          setCategorias(dataCategorias);
          setClientes(dataClientes);
          setEnderecos(dataEnderecos);
          setMetodoPagamento(dataMetodoPagamento);
          setProdutos(dataProdutos);
          setPedidos(dataPedidos);
          setProdutoPedidos(dataProdutoPedidos);
        }
      );
  }

  function eventClikForm(a: any) {
    console.log("clique bt situa Form", a);
    setEditarForm("");
    //SetSituacaoCriada(new Date())
    
  }

  useEffect(() => {
    getTudo();
  }, []);

  return (
    <div className="w-full m-2">
      <Tabs
        defaultValue="categorias"
        orientation="horizontal"
        className="w-full"
      >
        <TabsList className="w-full bg-slate-800 h-14 space-x-9">
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="enderecos">Endereços</TabsTrigger>
          <TabsTrigger value="metodoPagamento">Método de Pagamento</TabsTrigger>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          <TabsTrigger value="produtoPedidos">Produtos Pedidos</TabsTrigger>
        </TabsList>

        {/* CATEGORIAS */}
        <TabsContent value="categorias">
          <div className="flex flex-row w-full">
            <div className="flex flex-col space-y-4 border-r-2 border-slate-800 p-3 h-[calc(100vh-100px)] w-[360px]">
              <div className="flex flex-row space-x-64">
                <FormCategoria
                  id={categoriaEdicao?.id}
                  nome={categoriaEdicao?.nome}
                  crud={editarForm == "categoria" ? "UPD" : "CRT"}
                  onclikCancela={(a : any) => eventClikForm(a)}
                />
              </div>
            </div>

            <div className="w-full p-3">
            <Table className="w-full rounded-lg dark:bg-slate-900">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categorias &&
                    categorias.map((s: any, index : any) => (
                      <TableRow key={index}>
                        <TableCell>{s.id}</TableCell>
                        <TableCell>{s.nome}</TableCell>
                        <TableCell className="flex flex-row space-x-3">
                          <Pencil1Icon
                            className=" w-10 h-6 cursor-pointer"
                            onClick={() => EditarCategoria(s)}
                          ></Pencil1Icon>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Cross2Icon className=" w-10 h-6 hover:text-red-600 cursor-pointer "></Cross2Icon>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirma a exclusão?
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancele</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    EditarCategoria(s);
                                  }}
                                >
                                  Sim
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

            </div>
          </div>
        </TabsContent>

        {/* CLIENTES */}
        <TabsContent value="clientes">
          <div className="flex flex-row w-full">
            <div className="flex flex-col space-y-4 border-r-2 border-slate-800 p-3 h-[calc(100vh-100px)] w-[360px]">
              <div className="flex flex-row space-x-64">
                <FormCliente
                  id={clienteEdicao?.id}
                  nome={clienteEdicao?.nome}
                  email={clienteEdicao?.email}
                  telefone={clienteEdicao?.telefone}
                  data_Nasc={clienteEdicao?.data_Nasc}
                  genero={clienteEdicao?.genero}
                  imagem={clienteEdicao?.imagem}
                  senha={clienteEdicao?.senha}
                  crud={editarForm == "cliente" ? "UPD" : "CRT"}
                  onclikCancela={(a : any) => eventClikForm(a)}
                />
              </div>
            </div>

            <div className="w-full p-3">
            <Table className="w-full rounded-lg dark:bg-slate-900">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Nascimento</TableHead>
                    <TableHead>Telefone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientes &&
                    clientes.map((s: any, index : any) => (
                      <TableRow key={index}>
                        <TableCell>{s.id}</TableCell>
                        <TableCell>{s.nome}</TableCell>
                        <TableCell>{s.email}</TableCell>
                        <TableCell>{s.data_Nasc}</TableCell>
                        <TableCell>{s.telefone}</TableCell>
                        <TableCell className="flex flex-row space-x-3">
                          <Pencil1Icon
                            className=" w-10 h-6 cursor-pointer"
                            onClick={() => EditarCliente(s)}
                          ></Pencil1Icon>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Cross2Icon className=" w-10 h-6 hover:text-red-600 cursor-pointer "></Cross2Icon>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirma a exclusão?
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancele</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    EditarCliente(s);
                                  }}
                                >
                                  Sim
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

            </div>
          </div>
        </TabsContent>

        {/* ENDEREÇOS */}
        <TabsContent value="enderecos">
          <div className="flex flex-row w-full">
            <div className="flex flex-col space-y-4 border-r-2 border-slate-800 p-3 h-[calc(100vh-100px)] w-[360px]">
              <div className="flex flex-row space-x-64">
                <FormEndereco
                  id={enderecoEdicao?.id}
                  rua={enderecoEdicao?.rua}
                  cidade={enderecoEdicao?.cidade}
                  estado={enderecoEdicao?.estado}
                  cep={enderecoEdicao?.cep}
                  cliente_id={
                    enderecoEdicao.cliente_id && {
                      nome: enderecoEdicao.cliente_id.nome,
                    }
                  }

                  crud={editarForm == "endereco" ? "UPD" : "CRT"}
                  onclikCancela={(a : any) => eventClikForm(a)}
                />
              </div>
            </div>

            <div className="w-full p-3">
            <Table className="w-full rounded-lg dark:bg-slate-900">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Rua</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>CEP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enderecos &&
                    enderecos.map((s: any, index : any) => (
                      <TableRow key={index}>
                        <TableCell>{s.id}</TableCell>
                        <TableCell>{s.rua}</TableCell>
                        <TableCell>{s.cidade}</TableCell>
                        <TableCell>{s.estado}</TableCell>
                        <TableCell>{s.cep}</TableCell>
                        <TableCell className="flex flex-row space-x-3">
                          <Pencil1Icon
                            className=" w-10 h-6 cursor-pointer"
                            onClick={() => EditarEndereco(s)}
                          ></Pencil1Icon>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Cross2Icon className=" w-10 h-6 hover:text-red-600 cursor-pointer "></Cross2Icon>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirma a exclusão?
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancele</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    EditarEndereco(s);
                                  }}
                                >
                                  Sim
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

            </div>
          </div>
        </TabsContent>

        {/* PRODUTOS */}
        <TabsContent value="produtos">
          <div className="flex flex-row w-full">
            <div className="flex flex-col space-y-4 border-r-2 border-slate-800 p-3 h-[calc(100vh-100px)] w-[360px]">
              <div className="flex flex-row space-x-64">
                <FormProduto
                  id={produtoEdicao?.id}
                  nome={produtoEdicao?.nome}
                  descricao={produtoEdicao?.descricao}
                  preco={produtoEdicao?.preco}
                  categoria_id={
                    produtoEdicao.categoria && {
                      nome: produtoEdicao.categoria.nome,
                    }
                  }
                  disponibilidade={produtoEdicao?.disponibilidade}
                  imagem={produtoEdicao?.imagem}
                  crud={editarForm == "produto" ? "UPD" : "CRT"}
                  onclikCancela={(a : any) => eventClikForm(a)}
                />
              </div>
            </div>

            <div className="w-full p-3">
            <Table className="w-full rounded-lg dark:bg-slate-900">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Disponivel</TableHead>
                    <TableHead>Categoria</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtos &&
                    produtos.map((s: any, index : any) => (
                      <TableRow key={index}>
                        <TableCell>{s.id}</TableCell>
                        <TableCell>{s.nome}</TableCell>
                        <TableCell>{s.preco}</TableCell>
                        <TableCell>{s.disponibilidade == true ? "Disponivel" : "Indisponivel"}</TableCell>
                        <TableCell>{s.categoria.nome}</TableCell>
                        <TableCell className="flex flex-row space-x-3">
                          <Pencil1Icon
                            className=" w-10 h-6 cursor-pointer"
                            onClick={() => EditarProduto(s)}
                          ></Pencil1Icon>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Cross2Icon className=" w-10 h-6 hover:text-red-600 cursor-pointer "></Cross2Icon>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirma a exclusão?
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancele</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    EditarProduto(s);
                                  }}
                                >
                                  Sim
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* PEDIDOS */}
        <TabsContent value="pedidos">
          <div className="flex flex-row w-full">
            <div className="flex flex-col space-y-4 border-r-2 border-slate-800 p-3 h-[calc(100vh-100px)] w-[360px]">
              <div className="flex flex-row space-x-64">
                <FormPedido
                  id={pedidoEdicao?.id}
                  dataPedido={pedidoEdicao?.dataPedido}
                  confirmado={pedidoEdicao?.confirmado}
                  cliente_id={
                    pedidoEdicao.cliente_id && {
                      nome: pedidoEdicao.cliente_id.nome,
                    }
                  }
                  status={pedidoEdicao?.status}
                  total={pedidoEdicao?.total}
                  
                  crud={editarForm == "pedido" ? "UPD" : "CRT"}
                  onclikCancela={(a : any) => eventClikForm(a)}
                />
              </div>
            </div>

            <div className="w-full p-3">
            <Table className="w-full rounded-lg dark:bg-slate-900">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confirmado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedidos &&
                    pedidos.map((s: any, index : any) => (
                      <TableRow key={index}>
                        <TableCell>{s.id}</TableCell>
                        <TableCell>{s.dataPedido}</TableCell>
                        <TableCell>{s.total}</TableCell>
                        <TableCell>{s.status}</TableCell>
                        <TableCell>{s.confirmado  == true ? "Disponivel" : "Indisponivel"}</TableCell>
                        <TableCell className="flex flex-row space-x-3">
                          <Pencil1Icon
                            className=" w-10 h-6 cursor-pointer"
                            onClick={() => EditarPedido(s)}
                          ></Pencil1Icon>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Cross2Icon className=" w-10 h-6 hover:text-red-600 cursor-pointer "></Cross2Icon>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirma a exclusão?
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancele</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    EditarPedido(s);
                                  }}
                                >
                                  Sim
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

            </div>
          </div>
        </TabsContent>

        {/* PRODUTO PEDIDOS */}
        <TabsContent value="produtoPedidos">
          <div className="flex flex-row w-full">
            <div className="w-full p-3">
            <Table className="w-full rounded-lg dark:bg-slate-900">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Produto </TableHead>
                    <TableHead>Pedido </TableHead>
                    <TableHead>Forma pagamento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produtoPedidos &&
                    produtoPedidos.map((s: any, index : any) => (
                      <TableRow key={index}>
                        <TableCell>{s.id}</TableCell>
                        <TableCell>{s.quantidade}</TableCell>
                        <TableCell>{s.produto_id}</TableCell>
                        <TableCell>{s.pedido_id}</TableCell>
                        <TableCell>{s.metodoPagamento_id}</TableCell>
                        <TableCell className="flex flex-row space-x-3">
                          <Pencil1Icon
                            className=" w-10 h-6 cursor-pointer"
                            onClick={() => EditarProdutoPedido(s)}
                          ></Pencil1Icon>
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Cross2Icon className=" w-10 h-6 hover:text-red-600 cursor-pointer "></Cross2Icon>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirma a exclusão?
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancele</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    EditarProdutoPedido(s);
                                  }}
                                >
                                  Sim
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
