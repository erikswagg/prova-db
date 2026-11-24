CREATE DATABASE IF NOT EXISTS raiz_barbearia
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE raiz_barbearia;

CREATE TABLE contatos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  mensagem TEXT NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE depoimentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  avaliacao TINYINT NOT NULL,
  depoimento TEXT NOT NULL,
  aprovado TINYINT(1) NOT NULL DEFAULT 0,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  descricao TEXT NOT NULL,
  preco DECIMAL(8,2) NOT NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1
);

INSERT INTO servicos (nome, descricao, preco) VALUES
('Corte Degradê', 'Transição suave entre laterais raspadas e o volume do topo, com lavagem e finalização.', 60.00),
('Barba Desenhada', 'Modelagem completa da barba com navalha, alinhamento de contorno e finalização com óleo.', 45.00),
('Barba na Toalha Quente', 'Ritual completo de barboterapia tradicional: toalha quente, espuma, navalha e massagem facial.', 70.00);

-- Exemplo de depoimentos iniciais; aprove aprovação alterando aprovado para 1.
INSERT INTO depoimentos (nome, avaliacao, depoimento, aprovado) VALUES
('Rodrigo Almeida', 5, 'Corto o cabelo na Raiz desde que abriu. O atendimento é excelente.', 1),
('Fernanda Lima', 5, 'Ambiente agradável e profissionais muito cuidadosos.', 1);
