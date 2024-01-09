PaodCasa - Aplicativo de Compras de Padaria
O projeto PaodCasa é um aplicativo desenvolvido como parte do meu projeto final no curso de Análise e Desenvolvimento de Sistemas, em colaboração com dois amigos. O PaodCasa tem como objetivo facilitar a compra de produtos de padaria, permitindo que os clientes adquiram itens sem a necessidade de sair de casa.
Para a criação do aplicativo, empregamos o React Native no desenvolvimento do front-end. Quanto ao back-end, optamos por utilizar Next.js e Prisma, enquanto o banco de dados foi implementado utilizando MongoDB.
Instruções de Instalação
Para utilizar o aplicativo, é necessário ter o VS Code instalado em sua máquina, além de ter o Expo Go instalado em seu celular.
Antes de iniciar a inicialização do projeto, é necessário ter o Node.js instalado em sua máquina.
Com todas as instalações concluídas, podemos iniciar o projeto.
1. Abra o projeto no VS Code.
2. No VS Code, clique com o botão direito nas pastas 'paodcasa-main' e 'gerenciador-banco', respectivamente. Em seguida, escolha 'Open in Integrated Terminal'.
3. Com o terminal aberto, vá para o próximo passo. Utilize o comando 'npm install' para instalar as dependências do Node.
4. No terminal do gerenciador de banco, além do comando 'npm install', utilize também o comando 'npx prisma generate' para atualizar a versão do Prisma.
5. Após a instalação dessas dependências, acesse o arquivo index.js localizado em 'paodcasa-main > src > pages > home > index.js'.
6. Desça até a linha 53 e copie apenas o endereço IP que está dentro dos parênteses do fetch.
7. Em seguida, clique na lupa no canto esquerdo do seu VS Code.
8. Substitua o IP copiado no código pelo primeiro slot. Em seguida, insira o seu IP no segundo slot e clique no botão à direita desse slot.
9. Em seguida, volte ao terminal do gerenciador do banco e use o comando 'npm run dev'.
10. No terminal do projeto 'paodcasa', use o comando 'npx expo start'. Aguarde o QR code carregar, abra o aplicativo Expo Go no seu celular e escaneie o QR code para carregar o projeto.
Pronto! Após seguir todos os passos, você está pronto para acessar o aplicativo.
