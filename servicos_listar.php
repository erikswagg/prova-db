<?php
// Retorna os serviços cadastrados no banco em formato JSON.
header("Content-Type: application/json; charset=utf-8");
require "conexao.php";

$sql = "SELECT nome, descricao, preco FROM servicos WHERE ativo = 1 ORDER BY id";
$stmt = $conexao->query($sql);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
