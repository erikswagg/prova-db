async function enviarContato(dados, feedbackEl, botao) {
  const textoOriginal = botao ? botao.innerHTML : "";
  if (botao) {
    botao.disabled = true;
    botao.innerHTML = "Enviando...";
  }
  if (feedbackEl) {
    feedbackEl.className = "alert mt-3 d-none";
    feedbackEl.textContent = "";
  }

  try {
    const resposta = await fetch("php/contato_salvar.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(dados).toString()
    });

    const resultado = await resposta.json();
    if (feedbackEl) {
      feedbackEl.className = "alert mt-3 " + (resultado.sucesso ? "alert-success" : "alert-danger");
      feedbackEl.textContent = resultado.mensagem || "Não foi possível enviar.";
      feedbackEl.classList.remove("d-none");
    }
    return !!resultado.sucesso;
  } catch (erro) {
    if (feedbackEl) {
      feedbackEl.className = "alert alert-danger mt-3";
      feedbackEl.textContent = "Erro de conexão. Verifique se o PHP e o banco estão ativos.";
      feedbackEl.classList.remove("d-none");
    }
    return false;
  } finally {
    if (botao) {
      botao.disabled = false;
      botao.innerHTML = textoOriginal;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formContato = document.getElementById("formContato");
  if (formContato) {
    formContato.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      const botao = formContato.querySelector('[type="submit"]');
      const feedback = document.getElementById("formContatoFeedback");
      const dados = {
        nome: formContato.nome.value.trim(),
        email: formContato.email.value.trim(),
        mensagem: formContato.mensagem.value.trim()
      };
      const ok = await enviarContato(dados, feedback, botao);
      if (ok) formContato.reset();
    });
  }

  const formOrcamento = document.getElementById("formOrcamento");
  if (formOrcamento) {
    formOrcamento.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      const botao = document.getElementById("btnEnviarOrcamento");
      const feedback = document.getElementById("formOrcamentoFeedback");
      const servico = formOrcamento.dataset.servico || "Serviço";
      const mensagem = [
        "Solicitação de orçamento — " + servico,
        "Telefone: " + (formOrcamento.telefone.value.trim() || "-"),
        "Endereço: " + (formOrcamento.endereco.value.trim() || "-"),
        "Cidade/UF: " + (formOrcamento.cidade.value.trim() || "-") + "/" + (formOrcamento.uf.value.trim() || "-"),
        "Data desejada: " + (formOrcamento.data.value || "-"),
        "Observações: " + (formOrcamento.observacoes.value.trim() || "-")
      ].join("\n");

      const dados = {
        nome: formOrcamento.nome.value.trim(),
        email: formOrcamento.email.value.trim(),
        mensagem: mensagem
      };

      const ok = await enviarContato(dados, feedback, botao);
      if (ok) {
        formOrcamento.reset();
        const modalEl = document.getElementById("orcamentoModal");
        if (modalEl && window.bootstrap) {
          const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          setTimeout(() => modal.hide(), 1200);
        }
      }
    });
  }
});
