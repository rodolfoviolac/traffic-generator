# traffic-generator


The main goal of this project is to generate as many traffic as possible on local network.

`
Server Start: node server/server.js --port=3001
`

`
node client/client.js --ip=192.168.0.106 --port=3001
`

`
for run with administrative chmod u+x server
`

Objetivo
========

Criar um programa em TCP que permita analisar equidade do tráfego na rede. O programa deve enviar dados na máxima velocidade possível pela rede (no laboratório é de 1G bit/s). Um parâmetro de entrada deve ser a porta a ser utilizada, e as conexões podem ser feitas de forma par a par (cliente-servidor). A rede deve ser monitorada por alguma ferramenta específica (No Linux o System Monitor, por exemplo. No Windows o Netmeter EVO, por exemplo). O programa deve, obrigatoriamente, gerar um log com a média de tráfego por segundo (em bit/s).

Parte 1: Apresentar gráfico com conexão entre duas máquinas (uma janela de terminal no servidor e uma no cliente).

Parte 2: Expandir a conexão para mais um cliente (duas janelas de terminal no servidor e duas no cliente. Cada cliente x servidor numa porta diferente).

Parte 3: Expandir a conexão para mais um cliente (três janelas de terminal no servidor e três no cliente. Cada cliente x servidor numa porta diferente).

O programa deve ser apresentado ao professor de forma individual em algum momento durante a disciplina até o deadline (intervalo de aulas ou a combinar). O algoritmo deve ser explicado verbalmente, mostrando o código-fonte e o resultado. A linguagem do programa é da escolha do aluno.

Procedimento
============

Primeiramente iniciamos uma conexão cliente-servidor na porta 4000, 4001 e 4002 esperando cada conexão se estabilizar para iniciar uma nova. Após os três programas estiverem executando paramos de executar o servidor com a porta 4002 e em seguida o servidor de porta 4000.

Resultados
==========

![Banda x Tempo.](./graphic.png) Podemos observar que cada vez que adicionamos um servidor novo, a banda é dividida igualmente, podendo haver algumas ocilações.
