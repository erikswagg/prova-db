<?php
// Busca os depoimentos aprovados para exibir no site.
header("Content-Type: application/json; charset=utf-8");
require "conexao.php";

$sql = "SELECT nome, avaliacao, depoimento, DATE_FORMAT(data_criacao, '%d/%m/%Y') AS data
        FROM depoimentos WHERE aprovado = 1 ORDER BY data_criacao DESC";
$stmt = $conexao->query($sql);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
