<?php
// Recebe um novo depoimento. Ele fica aguardando aprovação.
header("Content-Type: application/json; charset=utf-8");
require "conexao.php";

$nome = trim($_POST["nome"] ?? "");
$avaliacao = (int)($_POST["avaliacao"] ?? 0);
$depoimento = trim($_POST["depoimento"] ?? "");

if ($nome === "" || $avaliacao < 1 || $avaliacao > 5 || $depoimento === "") {
    http_response_code(400);
    echo json_encode(["sucesso" => false, "mensagem" => "Preencha os campos e escolha uma nota de 1 a 5."]);
    exit;
}

$sql = "INSERT INTO depoimentos (nome, avaliacao, depoimento) VALUES (?, ?, ?)";
$stmt = $conexao->prepare($sql);
$stmt->execute([$nome, $avaliacao, $depoimento]);

echo json_encode(["sucesso" => true, "mensagem" => "Depoimento enviado! Ele será exibido após aprovação."]);
