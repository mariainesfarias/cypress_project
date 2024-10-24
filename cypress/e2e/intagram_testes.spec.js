// Testes sobre o fluxo das principais funcionalidades do aplicativo: Intagram

describe('Testes de Cadastro', () => {
    it('Cadastrar um novo usuário com um e-mail válido', () => {
      cy.visit('/signup');
      cy.get('input[name="email"]').type('usuario@exemplo.com');
      cy.get('input[name="password"]').type('senhaSegura123');
      cy.get('button[type="submit"]').click();
      cy.contains('Cadastro realizado com sucesso').should('be.visible');
    });
  
    it('Tentar cadastrar um novo usuário com um e-mail já existente', () => {
      cy.visit('/signup');
      cy.get('input[name="email"]').type('usuario@exemplo.com');
      cy.get('input[name="password"]').type('senhaSegura123');
      cy.get('button[type="submit"]').click();
      cy.contains('E-mail já cadastrado').should('be.visible');
    });
  
    it('Verificar se o e-mail de confirmação é enviado', () => {
      cy.visit('/signup');
      cy.get('input[name="email"]').type('novo_usuario@exemplo.com');
      cy.get('input[name="password"]').type('senhaSegura123');
      cy.get('button[type="submit"]').click();
      cy.contains('Verifique seu e-mail para confirmar a conta').should('be.visible');
    });
  });
  
  describe('Teste de Login', () => {
    it('Fazer login com credenciais corretas', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('usuario@exemplo.com');
      cy.get('input[name="password"]').type('senhaSegura123');
      cy.get('button[type="submit"]').click();
      cy.contains('Bem-vindo').should('be.visible');
    });
  
    it('Tentar fazer login com um e-mail não registrado', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('nao_registrado@exemplo.com');
      cy.get('input[name="password"]').type('senhaErrada123');
      cy.get('button[type="submit"]').click();
      cy.contains('E-mail não encontrado').should('be.visible');
    });
  
    it('Tentar fazer login com uma senha incorreta', () => {
      cy.visit('/login');
      cy.get('input[name="email"]').type('usuario@exemplo.com');
      cy.get('input[name="password"]').type('senhaIncorreta');
      cy.get('button[type="submit"]').click();
      cy.contains('Senha incorreta').should('be.visible');
    });
  });
  
  describe('Teste de Postagem de Fotos', () => {
    it('Postar uma foto válida e verificar se aparece no feed', () => {
      cy.visit('/feed');
      cy.get('input[type="file"]').attachFile('imagem_valida.jpg');
      cy.get('button[type="submit"]').click();
      cy.contains('Imagem postada com sucesso').should('be.visible');
      cy.get('.feed').should('contain', 'imagem_valida.jpg');
    });
  
    it('Tentar postar uma foto sem legenda', () => {
      cy.visit('/feed');
      cy.get('input[type="file"]').attachFile('imagem_valida.jpg');
      cy.get('button[type="submit"]').click();
      cy.contains('Por favor, adicione uma legenda').should('be.visible');
    });
  
    it('Tentar postar um arquivo que não é uma imagem', () => {
      cy.visit('/feed');
      cy.get('input[type="file"]').attachFile('documento.pdf');
      cy.get('button[type="submit"]').click();
      cy.contains('Formato de arquivo não suportado').should('be.visible');
    });
  });
  
  describe('Teste de Seguir Amigos', () => {
    it('Buscar e seguir um usuário existente', () => {
      cy.visit('/search');
      cy.get('input[name="search"]').type('usuario_existente');
      cy.get('button').contains('Seguir').click();
      cy.contains('Agora você está seguindo usuario_existente').should('be.visible');
    });
  
    it('Tentar seguir um usuário que já está seguindo', () => {
      cy.visit('/search');
      cy.get('input[name="search"]').type('usuario_existente');
      cy.get('button').contains('Seguir').click();
      cy.contains('Você já está seguindo este usuário').should('be.visible');
    });
  
    it('Verificar se a lista de seguidores é atualizada', () => {
      cy.visit('/profile');
      cy.get('.followers-list').should('contain', 'usuario_existente');
    });
  });
  
  describe('Teste de Interação', () => {
    it('Curtir uma postagem e verificar se o contador de curtidas aumenta', () => {
      cy.visit('/feed');
      cy.get('.post').first().find('.like-button').click();
      cy.get('.post').first().find('.like-count').should('contain', '1');
    });
  
    it('Comentar em uma postagem e verificar se o comentário aparece', () => {
      cy.visit('/feed');
      cy.get('.post').first().find('input[name="comment"]').type('Ótima postagem!');
      cy.get('.post').first().find('.comment-button').click();
      cy.get('.post').first().find('.comments').should('contain', 'Ótima postagem!');
    });
  });
  