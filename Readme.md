# 📊 Gestor de Precificação Inteligente - Têxtil

Uma ferramenta web moderna, intuitiva e totalmente responsiva desenvolvida para auxiliar microempreendedores e confeccionistas do setor têxtil a precificarem seus produtos corretamente nos principais marketplaces do mercado, além de monitorar a concorrência através de engenharia reversa.

O sistema realiza os cálculos considerando a carga tributária do **Simples Nacional**, taxas de **comissão de afiliados** e as regras dinâmicas de tarifas das plataformas.

---

## 🚀 Funcionalidades Principais

O painel é dividido em duas soluções práticas:

### 1. Formar Preço de Venda (Custo ➡️ Venda)
Você insere o preço de custo do produto (matéria-prima/produção) e a margem de lucro desejada. O sistema calcula automaticamente o preço ideal de venda que você deve anunciar, cobrindo:
*   Impostos sobre o faturamento.
*   Taxas fixas e porcentagens da plataforma escolhida.
*   Comissões extras se você utilizar o programa de afiliados.
*   Sua margem de lucro real no bolso (seja em valor fixo ou porcentagem).

### 2. Engenharia Reversa de Preço (Venda ➡️ Custo Máximo)
Ideal para analisar concorrentes. Você insere o preço cheio que o concorrente está cobrando em um anúncio. O sistema faz o caminho de volta, deduz as taxas da plataforma, o imposto estimado do Simples Nacional e o lucro que você gostaria de obter, revelando o **Custo Máximo Permitido** que você pode ter para fabricar ou comprar aquela mercadoria e se manter competitivo.

---

## 🎯 Regras de Negócio Implementadas

O motor de cálculo do painel já vem pré-configurado com as seguintes regras logísticas e comerciais atualizadas:

*   **Shopee:** Cálculo dinâmico baseado nas faixas de preço oficiais:
    *   *Até R$ 79,99:* 20% de comissão + R$ 4,00 fixos por item.
    *   *R$ 80,00 a R$ 99,99:* 14% de comissão + R$ 16,00 fixos por item.
    *   *R$ 100,00 a R$ 199,99:* 14% de comissão + R$ 20,00 fixos por item.
    *   *Acima de R$ 200,00:* 14% de comissão + R$ 26,00 fixos por item.
*   **TikTok Shop:** 6% de comissão da plataforma + R$ 2,00 fixos para produtos abaixo de R$ 79,00 (isenção da taxa fixa para produtos de valor igual ou superior).
*   **Mercado Livre & Amazon:** Campos flexíveis para inserção manual da taxa de acordo com a categoria do produto têxtil (com dicas de referência integradas na tela).
*   **Simples Nacional:** Dedução baseada no faturamento bruto, ideal para o Anexo II (Indústria).
*   **Programa de Afiliados:** Campo dedicado para embutir custos de marketing de influenciadores/afiliados sobre o valor final da venda.

---

## 📱 Responsividade e Design

*   **Visual Profissional:** Layout limpo e moderno em tons claros (*Dashboard Style*).
*   **Mobile-First & Touch Friendly:** Botões e campos otimizados para cliques rápidos usando o celular ou tablet.
*   **Layout Adaptável:** O sistema empilha as informações verticalmente em smartphones e se expande para duas colunas lado a lado em telas de computador.

---

## 🛠️ Tecnologias Utilizadas

Este é um projeto estático e leve que não necessita de instalação de dependências ou servidores pesados:

*   **HTML5** - Estruturação semântica.
*   **CSS3** - Estilização moderna, variáveis nativas e *Media Queries* para responsividade.
*   **JavaScript (Vanilla)** - Lógica de precificação, manipulação do DOM e iterações matemáticas para aproximação de faixas de preço.

---

## 💻 Como Executar o Projeto Localmente

1. Faça o clone deste repositório ou baixe o arquivo `index.html`.
2. Dê um duplo clique no arquivo `index.html`.
3. O sistema abrirá instantaneamente no seu navegador de preferência, sem necessidade de internet ou servidores locais.