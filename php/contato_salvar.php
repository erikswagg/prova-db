<?php
// Recebe o formulário de contato e grava no banco.
header("Content-Type: application/json; charset=utf-8");
require "conexao.php";

$nome = trim($_POST["nome"] ?? "");
$email = trim($_POST["email"] ?? "");
$mensagem = trim($_POST["mensagem"] ?? "");

if ($nome === "" || !filter_var($email, FILTER_VALIDATE_EMAIL) || $mensagem === "") {
    http_response_code(400);
    echo json_encode(["sucesso" => false, "mensagem" => "Preencha todos os campos corretamente."]);
    exit;
}

$sql = "INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)";
$stmt = $conexao->prepare($sql);
$stmt->execute([$nome, $email, $mensagem]);

echo json_encode(["sucesso" => true, "mensagem" => "Mensagem enviada com sucesso!"]);
