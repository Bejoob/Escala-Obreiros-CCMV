const obreiros = [
    "Victor", "Larissa", "Afonso", "Camila", "Ana Paula", "Bruna",
    "Francisco", "Lucia", "Gabriel", "Jaiane", "Jake", "Jessie",
    "Tete", "Katia", "Kauê", "Lucinha", "Bene", "Márcia", "Nely",
    "Mari", "Raquel", "Ruan", "Zélia", "Zé", "Ryan"
];

const duplasQuarta = [
    ["Ana Paula", "Mari"],
    ["Zé", "Zélia"],
    ["Katia", "Kauê"],
    ["Lucinha", "Bene"],
    ["Victor", "Larissa"],
    ["Francisco", "Lucia"]
];

const duplasFixes = [
    ["Bene", "Lucinha"],
    ["Zé", "Zélia"],
    ["Victor", "Larissa"],
    ["Francisco", "Lucia"],
    ["Tete", "Jessie"]
    ["Ruan", "Raquel"]
];

const duplasRecepcaoFixa = [
    ["Camila", "Afonso"],
    ["Victor", "Larissa"],
    ["Gabriel", "Katia"],
    ["Kauê", "Márcia"]
];

const duplasNaoRecepcao = [
    ["Francisco", "Lucia"],
    ["Lucinha", "Bene"],
    ["Zé", "Zélia"],
    ["Tete", "Jessie"]
    ["Ruan", "Raquel"]
];

// Lista de todos os membros que fazem parte de duplas fixas
const membrosDuplas = duplasFixes.flat();
let ultimaEscalaDomingo = [];
let penultimaEscalaDomingo = [];
let ultimaEscalaQuarta = []; // Armazena a última escala de quarta

function gerarEscalaPeriodo() {
    const escalas = [
        { data: "23/03/2025", tipo: "domingo", recepcao: ["Zé", "Zélia"], organizacaoLugares: ["Ana", "Samuel Jr"], organizacaoGeral: "Bruna" },
        { data: "26/03/2025", tipo: "quarta", obreiros: ["Lucinha", "Benê"] },
        { data: "30/03/2025", tipo: "domingo", recepcao: ["Bruna", "Gabriel"], organizacaoLugares: ["Tetê", "Jessier"], organizacaoGeral: "Mari" },
        { data: "03/04/2025", tipo: "quarta", obreiros: ["Jaiane", "Anderson"] },
        { data: "06/04/2025", tipo: "domingo", recepcao: ["Diáconos"], organizacaoLugares: ["Diáconos"], organizacaoGeral: "Diáconos" },
        { data: "09/04/2025", tipo: "quarta", obreiros: ["Ana", "Fran"] },
        { data: "13/04/2025", tipo: "domingo", recepcao: ["Camila", "Afonso"], organizacaoLugares: ["Raque", "Ruan"], organizacaoGeral: "Márcia" },
        { data: "16/04/2025", tipo: "quarta", obreiros: ["Lucia", "S Francisco"] },
        { data: "20/04/2025", tipo: "domingo", recepcao: ["Larissa", "Victor"], organizacaoLugares: ["Kauê", "Samuel Jr"], organizacaoGeral: "Fran" },
        { data: "23/04/2025", tipo: "quarta", obreiros: ["Mari", "Anderson"] },
        { data: "27/04/2025", tipo: "domingo", recepcao: ["Zélia", "Zé"], organizacaoLugares: ["Ruan", "Raquel"], organizacaoGeral: "Jessier" },
        { data: "30/04/2025", tipo: "quarta", obreiros: ["Ana", "Fran"] },
        { data: "04/05/2025", tipo: "domingo", recepcao: ["Diáconos"], organizacaoLugares: ["Diáconos"], organizacaoGeral: "Diáconos" },
    ];

    let todasEscalas = document.getElementById('todas-escalas');
    todasEscalas.innerHTML = ""; // Limpar conteúdo anterior
    let mesAtual = "";

    escalas.forEach(escala => {
        const mes = escala.data.split('/')[1];
        const mesNome = obterNomeMes(mes);
        const sinalizacao = verificarStatusData(escala.data); // Verifica a sinalização

        if (mesAtual !== mesNome) {
            mesAtual = mesNome;
            todasEscalas.innerHTML += `<div class="mes-separador">${mesNome}</div>`;
        }

        // Adiciona a escala
        if (escala.tipo === "quarta") {
            todasEscalas.innerHTML += `
                <div class="escala-item quarta">
                    <h3>Quarta-feira - ${escala.data}</h3>
                    <p>Obreiros: ${escala.obreiros.join(' e ')}</p>
                    <div class="sinalizacao ${sinalizacao.status}">
                        <div class="card-sinalizacao">
                            Status: ${sinalizacao.mensagem}
                        </div>
                    </div>
                </div>`;
        } else if (escala.tipo === "domingo") {
            todasEscalas.innerHTML += `
                <div class="escala-item domingo">
                    <h3>Domingo - ${escala.data}</h3>
                    <p><strong>Recepção da entrada:</strong> ${escala.recepcao.join(' e ')}</p>
                    <p><strong>Organização dos lugares:</strong> ${escala.organizacaoLugares.join(' e ') || 'N/A'}</p>
                    <p><strong>Organização geral:</strong> ${escala.organizacaoGeral || 'N/A'}</p>
                    <div class="sinalizacao ${sinalizacao.status}">
                        <div class="card-sinalizacao">
                            Status: ${sinalizacao.mensagem}
                        </div>
                    </div>
                </div>`;
        }
        todasEscalas.innerHTML += "<hr>";
    });

    localStorage.setItem('escalaAtual', todasEscalas.innerHTML);
}

function verificarStatusData(data) {
    const hoje = new Date();
    const dataEvento = new Date(data.split('/').reverse().join('-'));
    const diff = dataEvento - hoje;
    const diffDias = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (dataEvento < hoje) {
        return {
            status: 'sinalizacao-vermelha',
            mensagem: 'Data já passou'
        };
    } else if (diffDias <= 7) {
        return {
            status: 'sinalizacao-amarela',
            mensagem: `Faltam ${diffDias} dias`
        };
    } else {
        return {
            status: 'sinalizacao-verde',
            mensagem: `Faltam ${diffDias} dias`
        };
    }
}

function criarStatusHTML(statusData) {
    return `
        <div class="status-container">
            <div class="status-badge ${statusData.status}">
                ${statusData.texto}
                <span class="status-timer">${statusData.timer}</span>
            </div>
        </div>
    `;
}

function verificarPrimeiroDomingoMes(data) {
    const [dia, mes, ano] = data.split('/');
    return dia <= 7 && new Date(ano, mes - 1, dia).getDay() === 0;
}

function criarCardEscala(tipo, data, obreiros) {
    const statusData = verificarStatusData(data);
    const ehPrimeiroDomingo = verificarPrimeiroDomingoMes(data);
    
    if (tipo === 'domingo' && ehPrimeiroDomingo) {
        return `
            <div class="escala-card primeiro-domingo">
                ${criarStatusHTML(statusData)}
                <div class="santa-ceia-header">
                    <h3>Domingo - ${data}</h3>
                    <div class="santa-ceia-tag">Santa Ceia</div>
                </div>
                <div class="santa-ceia-content">
                    <div class="santa-ceia-imagem">
                        <img src="imagens/santa-ceia.jpg" alt="Santa Ceia" />
                    </div>
                    <div class="santa-ceia-message">
                        <p class="titulo-mes">Primeiro Domingo do Mês</p>
                        <p class="descricao">Todos os Diáconos trabalham juntos no serviço do Senhor.</p>
                    </div>
                </div>
            </div>
        `;
    } else if (tipo === 'domingo') {
        return `
            <div class="escala-card">
                ${criarStatusHTML(statusData)}
                <h3>
                    <span class="tipo-culto">Domingo</span>
                    <span class="data-culto">- ${data}</span>
                </h3>
                <p><span class="funcao">Recepção da entrada:</span> ${obreiros[0]} e ${obreiros[1]}</p>
                <p><span class="funcao">Organização dos lugares:</span> ${obreiros[2]} e ${obreiros[3]}</p>
                <p><span class="funcao">Organização geral:</span> ${obreiros[4]}</p>
            </div>
        `;
    } else {
        return `
            <div class="escala-card quarta">
                ${criarStatusHTML(statusData)}
                <h3>
                    <span class="tipo-culto">Quarta-feira</span>
                    <span class="data-culto">- ${data}</span>
                </h3>
                <p><span class="funcao">Obreiros:</span> ${obreiros[0]} e ${obreiros[1]}</p>
            </div>
        `;
    }
}

function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function gerarEscalaDomingo(obreirosQuarta) {
    // Primeiro tenta usar uma dupla de recepção fixa
    let duplasRecepcaoDisponiveis = duplasRecepcaoFixa.filter(dupla => 
        !dupla.some(membro => 
            ultimaEscalaDomingo.includes(membro) || 
            penultimaEscalaDomingo.includes(membro) ||
            obreirosQuarta.includes(membro) ||
            ultimaEscalaQuarta.includes(membro)
        )
    );

    // Escolhe a dupla para recepção
    let duplaRecepcao;
    if (duplasRecepcaoDisponiveis.length > 0) {
        duplaRecepcao = duplasRecepcaoDisponiveis[Math.floor(Math.random() * duplasRecepcaoDisponiveis.length)];
    } else {
        console.warn("Nenhuma dupla de recepção fixa disponível, usando plano alternativo");
        return gerarEscalaEmergencial(obreirosQuarta);
    }

    // Filtra duplas disponíveis para organização dos lugares
    let duplasOrganizacaoDisponiveis = duplasNaoRecepcao.filter(dupla => 
        !dupla.some(membro => 
            ultimaEscalaDomingo.includes(membro) || 
            penultimaEscalaDomingo.includes(membro) ||
            obreirosQuarta.includes(membro) ||
            ultimaEscalaQuarta.includes(membro)
        )
    );

    let duplaOrganizacao = null;
    if (duplasOrganizacaoDisponiveis.length > 0) {
        duplaOrganizacao = duplasOrganizacaoDisponiveis[Math.floor(Math.random() * duplasOrganizacaoDisponiveis.length)];
    }

    // Filtra obreiros disponíveis para organização geral
    let obreirosDisponiveis = obreiros.filter(obreiro => 
        !obreirosQuarta.includes(obreiro) && 
        !duplaRecepcao.includes(obreiro) &&
        !membrosDuplas.includes(obreiro) &&
        !ultimaEscalaDomingo.includes(obreiro) &&
        !penultimaEscalaDomingo.includes(obreiro) &&
        !ultimaEscalaQuarta.includes(obreiro) &&
        (duplaOrganizacao ? !duplaOrganizacao.includes(obreiro) : true)
    );

    obreirosDisponiveis = embaralharArray([...obreirosDisponiveis]);

    if (duplaOrganizacao) {
        return [...duplaRecepcao, ...duplaOrganizacao, obreirosDisponiveis[0]];
    } else {
        return [
            ...duplaRecepcao,
            obreirosDisponiveis[0],
            obreirosDisponiveis[1],
            obreirosDisponiveis[2]
        ];
    }
}

function gerarEscalaEmergencial(obreirosQuarta) {
    // Tenta encontrar pelo menos uma dupla de recepção disponível
    let duplasRecepcaoDisponiveis = duplasRecepcaoFixa.filter(dupla => 
        !dupla.some(membro => obreirosQuarta.includes(membro))
    );

    if (duplasRecepcaoDisponiveis.length > 0) {
        const duplaRecepcao = duplasRecepcaoDisponiveis[Math.floor(Math.random() * duplasRecepcaoDisponiveis.length)];
        
        // Filtra obreiros para as demais posições
        let obreirosDisponiveis = obreiros.filter(obreiro => 
            !obreirosQuarta.includes(obreiro) &&
            !duplaRecepcao.includes(obreiro)
        );

        obreirosDisponiveis = embaralharArray([...obreirosDisponiveis]);
        
        return [
            ...duplaRecepcao,
            obreirosDisponiveis[0],
            obreirosDisponiveis[1],
            obreirosDisponiveis[2]
        ];
    } else {
        // Se não houver nenhuma dupla de recepção disponível
        let obreirosDisponiveis = obreiros.filter(obreiro => 
            !obreirosQuarta.includes(obreiro)
        );
        
        obreirosDisponiveis = embaralharArray([...obreirosDisponiveis]);
        return obreirosDisponiveis.slice(0, 5);
    }
}

function gerarEscalaQuarta() {
    // Filtra duplas que não foram usadas no último domingo
    const duplasDisponiveis = duplasQuarta.filter(dupla => 
        !dupla.some(membro => ultimaEscalaDomingo.includes(membro))
    );

    const duplaAleatoria = duplasDisponiveis[Math.floor(Math.random() * duplasDisponiveis.length)];
    ultimaEscalaQuarta = [...duplaAleatoria]; // Atualiza a última escala de quarta
    return duplaAleatoria;
}

function obterNomeMes(mes) {
    const meses = {
        "01": "JANEIRO",
        "02": "FEVEREIRO",
        "03": "MARÇO",
        "04": "ABRIL",
        "05": "MAIO",
        "06": "JUNHO",
        "07": "JULHO",
        "08": "AGOSTO",
        "09": "SETEMBRO",
        "10": "OUTUBRO",
        "11": "NOVEMBRO",
        "12": "DEZEMBRO"
    };
    return meses[mes] || mes;
}

// Gerar escala quando a página carregar
window.onload = gerarEscalaPeriodo;