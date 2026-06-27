function mudarAba(idAba) {
        document.querySelectorAll('.tela').forEach(tela => tela.classList.remove('ativa'));
        document.querySelectorAll('.aba-btn').forEach(btn => btn.classList.remove('ativa'));
        
        document.getElementById(idAba).classList.add('ativa');
        event.currentTarget.classList.add('ativa');
    }

    function ajustarPlaceholderLucro(tela) {
        if (tela === 'venda') {
            const tipo = document.querySelector('input[name="tipo-lucro"]:checked').value;
            document.getElementById('label-lucro-venda').innerText = tipo === 'porcentagem' ? 'Margem de Lucro Desejada (%)' : 'Lucro Fixo Desejado (R$)';
        } else {
            const tipo = document.querySelector('input[name="tipo-lucro-rev"]:checked').value;
            document.getElementById('label-lucro-reversa').innerText = tipo === 'porcentagem' ? 'Lucro que deseja embutir (%)' : 'Lucro que deseja embutir (R$)';
        }
    }

    function gerenciarCamposDinamicos(tela) {
        const mkt = document.getElementById(tela === 'venda' ? 'mkt-venda' : 'mkt-reversa').value;
        const bloco = document.getElementById(tela === 'venda' ? 'bloco-taxa-manual-venda' : 'bloco-taxa-manual-reversa');
        const dica = document.getElementById(tela === 'venda' ? 'dica-mkt-venda' : 'dica-mkt-reversa');

        if (mkt === 'ml') {
            bloco.style.display = 'block';
            dica.innerText = "ML: Clássico (11% a 14%) ou Premium (16% a 19%) de acordo com a categoria.";
        } else if (mkt === 'amazon') {
            bloco.style.display = 'block';
            dica.innerText = "Amazon: Geralmente entre 12% e 13% para a categoria de produtos têxteis.";
        } else {
            bloco.style.display = 'none';
        }
    }

    function calcularPrecoVenda() {
        const custo = parseFloat(document.getElementById('custo-prod').value) || 0;
        const mkt = document.getElementById('mkt-venda').value;
        const simples = (parseFloat(document.getElementById('simples-venda').value) || 0) / 100;
        const comissaoAfiliado = (parseFloat(document.getElementById('afiliado-venda').value) || 0) / 100;
        const tipoLucro = document.querySelector('input[name="tipo-lucro"]:checked').value;
        const valorLucro = parseFloat(document.getElementById('lucro-venda').value) || 0;
        const taxaManual = (parseFloat(document.getElementById('taxa-manual-venda').value) || 0) / 100;

        let precoVenda = 0;
        let taxaMktFinal = 0;

        if (mkt === 'shopee' || mkt === 'tiktok') {
            for (let pv = custo; pv <= custo * 15; pv += 0.01) {
                let comissaoPorc = 0;
                let taxaFixa = 0;

                if (mkt === 'shopee') {
                    if (pv <= 79.99) { comissaoPorc = 0.20; taxaFixa = 4.00; }
                    else if (pv <= 99.99) { comissaoPorc = 0.14; taxaFixa = 16.00; }
                    else if (pv <= 199.99) { comissaoPorc = 0.14; taxaFixa = 20.00; }
                    else { comissaoPorc = 0.14; taxaFixa = 26.00; }
                } else if (mkt === 'tiktok') {
                    comissaoPorc = 0.06;
                    taxaFixa = pv < 79.00 ? 2.00 : 0;
                }

                let imposto = pv * simples;
                let mktCusto = (pv * comissaoPorc) + taxaFixa;
                let custoAfiliado = pv * comissaoAfiliado;
                let sobra = pv - mktCusto - imposto - custoAfiliado - custo;

                if (tipoLucro === 'porcentagem') {
                    let margemCalculada = (sobra / pv) * 100;
                    if (margemCalculada >= valorLucro) { precoVenda = pv; break; }
                } else {
                    if (sobra >= valorLucro) { precoVenda = pv; break; }
                }
            }
        } else {
            let porcMargem = tipoLucro === 'porcentagem' ? (valorLucro / 100) : 0;
            let lucroFixo = tipoLucro === 'fixo' ? valorLucro : 0;

            let divisor = 1 - taxaManual - simples - comissaoAfiliado - porcMargem;
            if (divisor <= 0) {
                alert("A soma de todas as taxas ultrapassou 100%. Reduza as margens.");
                return;
            }
            precoVenda = (custo + lucroFixo) / divisor;
        }

        if (mkt === 'shopee') {
            let comissaoPorc = precoVenda <= 79.99 ? 0.20 : 0.14;
            let taxaFixa = precoVenda <= 79.99 ? 4.00 : (precoVenda <= 99.99 ? 16.00 : (precoVenda <= 199.99 ? 20.00 : 26.00));
            taxaMktFinal = (precoVenda * comissaoPorc) + taxaFixa;
        } else if (mkt === 'tiktok') {
            taxaMktFinal = (precoVenda * 0.06) + (precoVenda < 79.00 ? 2.00 : 0);
        } else {
            taxaMktFinal = precoVenda * taxaManual;
        }

        let impostoFinal = precoVenda * simples;
        let afiliadoFinal = precoVenda * comissaoAfiliado;
        let lucroReal = precoVenda - taxaMktFinal - impostoFinal - afiliadoFinal - custo;

        document.getElementById('res-preco-venda').innerText = `R$ ${precoVenda.toFixed(2)}`;
        document.getElementById('res-mkt-venda').innerText = `R$ ${taxaMktFinal.toFixed(2)}`;
        document.getElementById('res-imposto-venda').innerText = `R$ ${impostoFinal.toFixed(2)}`;
        document.getElementById('res-afiliado-venda').innerText = `R$ ${afiliadoFinal.toFixed(2)}`;
        document.getElementById('res-custo-venda').innerText = `R$ ${custo.toFixed(2)}`;
        document.getElementById('res-lucro-real').innerText = `R$ ${lucroReal.toFixed(2)}`;
    }

    function calcularEngenhariaReversa() {
        const precoVenda = parseFloat(document.getElementById('preco-venda-cheio').value) || 0;
        const mkt = document.getElementById('mkt-reversa').value;
        const simples = (parseFloat(document.getElementById('simples-reversa').value) || 0) / 100;
        const comissaoAfiliado = (parseFloat(document.getElementById('afiliado-reversa').value) || 0) / 100;
        const tipoLucro = document.querySelector('input[name="tipo-lucro-rev"]:checked').value;
        const valorLucro = parseFloat(document.getElementById('lucro-reversa').value) || 0;
        const taxaManual = (parseFloat(document.getElementById('taxa-manual-reversa').value) || 0) / 100;

        let taxaMkt = 0;

        if (mkt === 'shopee') {
            if (precoVenda <= 79.99) { taxaMkt = (precoVenda * 0.20) + 4.00; }
            else if (precoVenda <= 99.99) { taxaMkt = (precoVenda * 0.14) + 16.00; }
            else if (precoVenda <= 199.99) { taxaMkt = (precoVenda * 0.14) + 20.00; }
            else { taxaMkt = (precoVenda * 0.14) + 26.00; }
        } else if (mkt === 'tiktok') {
            taxaMkt = (precoVenda * 0.06) + (precoVenda < 79.00 ? 2.00 : 0);
        } else {
            taxaMkt = precoVenda * taxaManual;
        }

        let imposto = precoVenda * simples;
        let afiliadoFinal = precoVenda * comissaoAfiliado;
        let lucroDeduzido = tipoLucro === 'porcentagem' ? precoVenda * (valorLucro / 100) : valorLucro;
        
        let custoMaximo = precoVenda - taxaMkt - imposto - afiliadoFinal - lucroDeduzido;

        if(custoMaximo < 0) custoMaximo = 0;

        document.getElementById('res-preco-venda-rev').innerText = `R$ ${precoVenda.toFixed(2)}`;
        document.getElementById('res-mkt-rev').innerText = `R$ ${taxaMkt.toFixed(2)}`;
        document.getElementById('res-imposto-rev').innerText = `R$ ${imposto.toFixed(2)}`;
        document.getElementById('res-afiliado-rev').innerText = `R$ ${afiliadoFinal.toFixed(2)}`;
        document.getElementById('res-lucro-rev').innerText = `R$ ${lucroDeduzido.toFixed(2)}`;
        document.getElementById('res-custo-maximo').innerText = `R$ ${custoMaximo.toFixed(2)}`;
    }

    gerenciarCamposDinamicos('venda');
    gerenciarCamposDinamicos('reversa');
    calcularPrecoVenda();