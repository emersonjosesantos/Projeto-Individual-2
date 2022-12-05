var database = require("../database/config");

function buscarUltimasMedidas(fkVoto, limite_linhas) {
    
    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        temperatura, 
                        umidade, 
                        momento,
                        CONVERT(varchar, momento, 108) as momento_grafico
                    from medida
                    where fk_aquario = ${idAquario}
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select votos.voto, count(usuario.id) qtd_pessoas from usuario join votos on usuario.fkVoto = votos.id group by votos.voto;`;

    } /* else  if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select votos.voto, count(usuario.id) from usuario join votos on usuario.fkVoto = votos.id group by votos.voto;` */
     else { 

        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fkTorre,fkComponente) {
    
    instrucaoSql = ''
    
        instrucaoSql = `select top 1 Leitura,DataHora as 'momento_grafico' from Leitura where fkTorre = ${fkTorre} and fkComponente = ${fkComponente} ORDER BY idLeitura DESC`;
        
    

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDataHora(fkTorre) {
    
    instrucaoSql = ''
    
    instrucaoSql = `select top 7 DataHora from Leitura where fkTorre = ${fkTorre} and fkComponente = 1 ORDER BY idLeitura DESC`;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorcentagemCPU(fkTorre) {
    
    instrucaoSql = ''
    
    instrucaoSql = `select top 7 Leitura as 'PorcentagemUsoCPU' from Leitura where fkTorre = ${fkTorre} and fkComponente = 2 ORDER BY idLeitura DESC`;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarPorcentagemRAM(fkTorre) {
    
    instrucaoSql = ''
    
    instrucaoSql = `select top 7 Leitura as 'PorcentagemUsoRam' from Leitura where fkTorre = ${fkTorre} and fkComponente = 5 ORDER BY idLeitura DESC`;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorcentagemDisco(fkTorre) {
    
    instrucaoSql = ''
    
    instrucaoSql = `select top 7 Leitura as 'PorcentagemUsoDisco' from Leitura where fkTorre = ${fkTorre} and fkComponente = 9 ORDER BY idLeitura DESC`;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorcentagemPercaPacotes(fkTorre) {
    
    instrucaoSql = ''
    
    instrucaoSql = `select top 7 Leitura as 'PorcentagemPercaPacotes' from Leitura where fkTorre = ${fkTorre} and fkComponente = 12 ORDER BY idLeitura DESC`;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRegistro(fkTorre, nmrComponentes) {
    
    instrucaoSql = ''
    
    instrucaoSql = `select top ${nmrComponentes} * from Leitura where fkTorre = ${fkTorre} ORDER BY idLeitura DESC`;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




function buscarHorarioPico() {
    
    instrucaoSql = ''
    
    instrucaoSql = `SELECT fkTorre, COUNT(idAlerta) AS Quantidade,nomeEmp,FORMAT(DATEADD (HOUR, -3 , DataHora), 'HH:00') AS DataHora FROM AlertaRenato WHERE fkTorre = 167 GROUP BY fkTorre, nomeEmp,FORMAT(DATEADD (HOUR, -3 , DataHora), 'HH:00')`;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHorarioCHC() {
    
    instrucaoSql = ''
    
    instrucaoSql = `SELECT TOP 4 t.* FROM (SELECT DISTINCT(componente)  as Componente, SUM(qntCHC) AS Quantidade2 FROM Chamado_Comp GROUP BY componente) t
    `;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarPorcentagemCPU,
    buscarPorcentagemRAM,
    buscarPorcentagemDisco,
    buscarPorcentagemPercaPacotes,
    buscarDataHora,
    buscarRegistro,
    buscarHorarioPico,
    buscarHorarioCHC
    
}
