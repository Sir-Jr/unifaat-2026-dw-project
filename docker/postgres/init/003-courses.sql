CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    professor TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO courses (name, professor) VALUES
('Infraestrutura', 'Alexandre'),
('Banco de Dados', 'Gustavo'),
('Desenvolvimento Web', 'Luan');