CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES
('Ana Silva', 'ana.silva@email.com'),
('Bruno Souza', 'bruno.souza@email.com'),
('Carla Oliveira', 'carla.oliveira@email.com'),
('Daniel Santos', 'daniel.santos@email.com'),
('Eduarda Lima', 'eduarda.lima@email.com'),
('Felipe Costa', 'felipe.costa@email.com'),
('Gabriela Almeida', 'gabriela.almeida@email.com'),
('Henrique Martins', 'henrique.martins@email.com'),
('Isabela Rocha', 'isabela.rocha@email.com'),
('João Pereira', 'joao.pereira@email.com');