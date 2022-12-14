**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regra de negócio

# Cadastro de carro

**RF**
 - Deve ser possível cadastrar um carro

**RN**
 - Não deve ser possível cadastrar um carro com uma placa já existente.
 - O carro deve ser cadastrado por padrão com disponibilidade.
 - O usuário responsável pelo cadastro deve ser um usuário administrador.

 # Listagem de carros

 **RF**
 - Deve ser possível listar todos os carros disponíveis.
 - Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
 - Deve ser possível listar todos os carros disponíveis pelo nome da marca.
 - Deve ser possível listar todos os carros disponíveis pelo nome do carro.

 **RN**
 - O usuário não precisa estar logado no sistema.

 # Cadastro de Especificação no carro

  **RF**
  - Deve ser possível cadastrar uma especificação para um carro.
  - Deve ser possível listar todas as especificações
  - Dever ser possível listar todos os carros.
  
  **RN**
  - Não deve ser possível cadastrar uma especificaçõa para um carro ja cadastrado.
  - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
  - O usuário responsável pelo cadastro deve ser um usuário administrador.

  # Cadastro de imagem do carro

  **RF**
  - Deve ser possível cadastrar a imagem do carro.
  - Deve ser possível listar todos os carros.

  **RNF**
  - Utilizar o multer para upload do carro
  
  **RN**
  - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
  - O usuário responsável pelo cadastro deve ser um usuário administrador.

  # Aluguel de carro

  **RF**
  - Deve se possível cadastrar um aluguel

  **RN**
  -  O aluguel deve ter duração mínima de 24 horas.
  -  Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuários.
  -  Não deve ser possível cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro.
  - O usuário deve estar logado na aplicação.
  - Ao realizar um aluguel, o status do carro devera ser alterado para indisponível

  # Devolução do carro

  **RF**
  - Deve ser possível realizar a devolução de um carro

  **RN**
  - Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária compleata.
  - Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
  - Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel;
  - Ao realizar a devolução, deverá ser calculado o total do aluguel;
  - Caso o horário da devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
  - Caso haja multa, deverá ser somado ao total do aluguel;
  - O usuário deve estar logado

  # Listagem de alugueis para usuario

  **RF**
  - Deve ser possível realizar a busca de todos os alugueis para o usuário

  **RN**
  - O usuário deve estar logado na aplicação

  # Recuperar Senha

  **RF**
  - Deve ser possível o usuário recuperar a senha informando o email;
  - O usuário deve receber um email com o passoa a passo para a recuperação da senha;
  - O usuário deve conseguir inserir uma nova senha

  **RN**
  - O usuário precisa informar uma nova senha;
  - O link enviado para a arecuperação deve expirar em 3 horas