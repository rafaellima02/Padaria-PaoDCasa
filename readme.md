## Pao D'Casa - Aplicativo de Compras de Padaria
### O projeto Pao D'Casa é um aplicativo desenvolvido como parte do meu projeto final no curso de Análise e Desenvolvimento de Sistemas, em colaboração com a equipe de dev's do projeto. O PaoD'Casa tem como objetivo facilitar a compra de produtos de padaria, permitindo que os clientes adquiram itens sem a necessidade de sair de casa.
###  Para a criação do aplicativo, empregamos o React Native no desenvolvimento do front-end. Quanto ao back-end, optamos por utilizar Next.js e Prisma, enquanto o banco de dados foi implementado utilizando MongoDB.

### A organização do nosso projeto segue a metodologia ágil Scrum. A divisão de papéis é a seguinte: Heloisa (Professora) atua como Product Owner (P.O), Mateus Alexandre como Scrum Master, Pedro Leal como Tech Leader, e os desenvolvedores incluem Daniel Henrique e Rafael Lima. As responsabilidades de qualidade (QA) são conduzidas por Erick Marques e Vladimir.

## Instruções de Instalação

#### Antes de iniciar a inicialização do projeto, certifique-se de ter o Node.js instalado em sua máquina e o VS Code no ambiente de desenvolvimento, além do Expo Go instalado em seu celular para a utilização do aplicativo.

#### Com todas as instalações concluídas, podemos iniciar o projeto.

#### 1. Abra o projeto no VS Code.

#### 2. No VS Code, clique com o botão direito do mouse nas pastas 'paodcasa-main' e 'gerenciador-banco', respectivamente. Em seguida, escolha 'Open in Integrated Terminal'.

#### 3. Com o terminal aberto, vá para o próximo passo. Utilize o comando 'npm install' para instalar as dependências do Node.

#### 4. No terminal do gerenciador de banco, além do comando 'npm install', utilize também o comando 'npx prisma generate' para atualizar a versão do Prisma.

#### 5. Após a instalação dessas dependências, acesse o arquivo index.js localizado em 'paodcasa-main > src > pages > home > index.js'.

#### 6. Desça até a linha 53 e copie apenas o endereço IP que está dentro dos parênteses do fetch.

#### 7. Em seguida, clique na lupa no canto esquerdo do seu VS Code. Insira o IP copiado no código pelo endereço correspondente ao primeiro slot.

#### 8. Insira o seu IP no segundo slot e clique no botão à direita desse slot.

#### 9. Volte ao terminal do gerenciador do banco e use o comando 'npm run dev'.

#### 10. No terminal do projeto 'paodcasa', use o comando 'npx expo start'. Aguarde o QR code carregar, abra o aplicativo Expo Go no seu celular e escaneie o QR code para carregar o projeto.

#### Pronto! Após seguir todos os passos, você está pronto para acessar o aplicativo.
