<?php
// Conexão com o banco de dados MySQL.
$host = "localhost";
$banco = "raiz_barbearia";
$usuario = "root";
$senha = "";

try {
    $conexao = new PDO(
        "mysql:host=$host;dbname=$banco;charset=utf8mb4",
        $usuario,
        $senha
    );
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $erro) {
    http_response_code(500);
    exit("Erro ao conectar com o banco de dados.");
}
