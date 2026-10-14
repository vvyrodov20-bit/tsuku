(function(root){
  'use strict';
  // Human-written localized copy. Official game/bonus names remain unchanged.
  // Schema: intro; 4 steps; 4 mechanics; 3 bonuses; theme title/body; FAQ title; 4 Q/A pairs.
  const locales={};
  function add(locale,copy){
    const lines=copy.trim().split('\n').map(value=>value.trim());
    if(lines.length!==23||lines.some(value=>!value))throw new Error('Incomplete Ice Fishing copy: '+locale);
    locales[locale]={intro:lines[0],steps:lines.slice(1,5),mechanics:lines.slice(5,9),bonuses:lines.slice(9,12),themeTitle:lines[12],theme:lines[13],faqTitle:lines[14],faq:Array.from({length:4},(_,i)=>[lines[15+i*2],lines[16+i*2]])};
  }
  add('en',`
Ice Fishing Live is Evolution’s live game show set on a frozen Arctic lake. A host presents each round while a virtual wheel selects the result. Place a bet on a leaf or a fish bonus, then follow the spin: the matching selection can pay directly or send you into a fishing round. The format combines quick decisions, random multipliers and a snowy studio brought to life with digital effects.
Choose a chip value and place your stake on one or more available selections before betting closes. Check the total stake when covering several options.
Once betting closes, random multipliers may be added to the wheel. Watch the spin and wait for the pointer to identify the winning segment.
If the result matches a selection you backed, that bet pays according to the game’s paytable and any applicable boost. Other bets lose.
A matching fish segment opens its bonus round. The host reels in a fish to reveal a prize multiplier; an assigned wheel boost increases the fish value.
The virtual wheel has 53 segments: 46 regular Leaf segments and 7 fish bonus segments. Leaf 1 and Leaf 2 are separate betting selections; a fish bonus requires a bet on its corresponding type.
Leaf boosts can be 3×, 4×, 5×, 7× or 10×. Bonus boosts can be 2×, 3×, 4×, 5×, 6×, 7×, 8× or 10×. A boost is randomly assigned before the spin and is not guaranteed every round.
All Bonuses covers Lil’ Blues, Big Oranges and Huge Reds. Check the stake shown for each selection: covering more outcomes increases the total amount at risk and does not guarantee a win.
RTP depends on the selected bet; check the current game help for the exact percentage and limits. It describes a long-term theoretical return, not a session result. Bonus prizes vary widely, and a large multiplier is never assured.
The blue fish bonus reveals a base multiplier from 3× to 100×. It has the lowest prize range of the three fishing rounds; an assigned wheel boost can increase the revealed value.
The orange fish bonus offers base multipliers from 4× to 200×. It sits between the blue and red prize ranges and uses the same catch-and-reveal format, with any wheel boost applied.
The red fish bonus offers base multipliers from 10× to 500×. A 10× wheel boost can lift the top result to 5,000×. This is a maximum potential result, not the starting reward or a promised payout.
An Arctic live-show atmosphere
Snow, an icy lake and a fishing cabin create the game’s setting. The live host guides each spin, while 3D scenery and augmented-reality effects turn the bonus reveal into a fishing scene. The illustrated backdrop here reflects the theme; it is not a live broadcast.
Frequently asked questions
Can I play on a phone?
The game supports desktop and mobile through participating casinos. A stable connection is needed for the live video and betting interface.
Where is the game available?
Access depends on the casino, your country and local rules. Look for Ice Fishing in the operator’s live-game catalogue and check availability for your account.
Are casino promotions included?
Deposit offers and game-specific promotions are set by the casino. Check eligibility, wagering terms and whether Ice Fishing bets count before using an offer.
Can everyone join a bonus round?
Everyone can watch, but only players who backed the matching bonus selection before betting closed are eligible for its prize. A new bet cannot be added after the outcome is known.
`);
  add('ru',`
Ice Fishing Live — игровое шоу Evolution на фоне замёрзшего арктического озера. Ведущий сопровождает каждый раунд, а результат определяет виртуальное колесо. Выберите ставку на лист или рыбный бонус и следите за вращением: совпадение может принести обычную выплату или открыть рыбалку. Быстрые раунды, случайные множители и зимняя студия с цифровыми эффектами создают атмосферу живого шоу.
Выберите номинал фишки и поставьте на один или несколько вариантов до окончания приёма ставок. При выборе нескольких полей проверьте общую сумму ставки.
После закрытия ставок на колесе могут появиться случайные множители. Дождитесь остановки: указатель определит выигравший сектор.
Если выпал выбранный вами вариант, эта ставка оплачивается по таблице выплат с учётом действующего усиления. Ставки на остальные варианты проигрывают.
Попадание на соответствующий рыбный сектор запускает бонус. Ведущий вытягивает рыбу и раскрывает её множитель; назначенное усиление колеса увеличивает значение улова.
На виртуальном колесе 53 сектора: 46 обычных Leaf и 7 рыбных бонусных. Leaf 1 и Leaf 2 — отдельные варианты ставок. Для участия в рыбном бонусе нужна ставка на соответствующий вид.
Усиления Leaf: 3×, 4×, 5×, 7× или 10×. Для бонусов доступны 2×, 3×, 4×, 5×, 6×, 7×, 8× или 10×. Усиление назначается случайно перед вращением и появляется не в каждом раунде.
All Bonuses охватывает Lil’ Blues, Big Oranges и Huge Reds. Проверяйте сумму на каждом поле: дополнительные варианты увеличивают общую ставку и не гарантируют выигрыш.
RTP зависит от выбранной ставки; точный процент и лимиты указаны в актуальной справке игры. Это теоретический возврат на длинной дистанции, а не результат отдельной сессии. Бонусные выплаты сильно различаются, крупный множитель не гарантирован.
Синяя рыба раскрывает базовый множитель от 3× до 100×. Это самый небольшой диапазон призов среди трёх рыбалок. Если на колесе назначено усиление, оно увеличивает показанное значение.
Оранжевая рыба даёт базовые множители от 4× до 200×. Диапазон находится между синим и красным бонусами. Ведущий вытягивает улов, раскрывает приз и применяет назначенное усиление.
Красная рыба даёт базовые множители от 10× до 500×. Усиление колеса 10× может поднять верхний результат до 5 000×. Это возможный максимум, а не начальный приз и не обещанная выплата.
Атмосфера арктического шоу
Снег, ледяное озеро и рыбацкий домик задают настроение игры. Ведущий сопровождает вращения, а трёхмерная графика и дополненная реальность превращают раскрытие бонуса в сцену рыбалки. Иллюстрация на странице передаёт тематику игры и не является прямой трансляцией.
Частые вопросы
Можно играть с телефона?
Игра доступна на компьютерах и мобильных устройствах через казино, которые её предлагают. Для видеотрансляции и ставок требуется стабильное соединение.
В каких странах доступна игра?
Доступ зависит от казино, вашей страны и местных правил. Найдите Ice Fishing в каталоге живых игр оператора и проверьте доступность для своего аккаунта.
Есть специальные акции казино?
Бонусы на депозит и игровые акции определяет казино. Перед участием проверьте условия, требования к отыгрышу и учитываются ли ставки в Ice Fishing.
Все могут участвовать в бонусном раунде?
Смотреть могут все, но приз получают только участники, поставившие на соответствующий бонус до закрытия ставок. Добавить ставку после появления результата нельзя.
`);
  add('es',`
Ice Fishing Live es un concurso en directo de Evolution ambientado en un lago ártico congelado. Un presentador guía cada ronda y una rueda virtual determina el resultado. Apuesta por una hoja o un bono de pesca: acertar puede dar un pago directo o abrir una ronda de pesca. Las decisiones rápidas, los multiplicadores aleatorios y los efectos digitales dan vida al estudio nevado.
Elige el valor de la ficha y apuesta por una o varias opciones antes del cierre. Comprueba la apuesta total si cubres varias casillas.
Al cerrarse las apuestas pueden aparecer multiplicadores aleatorios. Sigue el giro y espera a que el indicador señale el segmento ganador.
Si el resultado coincide con una opción elegida, esa apuesta paga según la tabla y el aumento aplicable. Las demás apuestas se pierden.
Un segmento de pez activa su bono. El presentador recoge un pez y revela su multiplicador; el aumento asignado en la rueda incrementa el valor.
La rueda virtual tiene 53 segmentos: 46 Leaf normales y 7 de bonos de pesca. Leaf 1 y Leaf 2 son apuestas distintas. Para recibir un bono debes apostar por su tipo de pez.
Los aumentos Leaf pueden ser 3×, 4×, 5×, 7× o 10×. Los de bonos pueden ser 2×, 3×, 4×, 5×, 6×, 7×, 8× o 10×. Se asignan al azar antes del giro y no aparecen necesariamente en cada ronda.
All Bonuses cubre Lil’ Blues, Big Oranges y Huge Reds. Revisa la cantidad de cada casilla: cubrir más resultados aumenta el importe total en riesgo y no garantiza ganar.
El RTP depende de la apuesta; consulta el porcentaje exacto y los límites en la ayuda del juego. Es un retorno teórico a largo plazo, no el resultado de una sesión. Los premios de los bonos varían mucho y ningún multiplicador alto está garantizado.
El pez azul revela un multiplicador base de 3× a 100×, el intervalo de premios más bajo de las tres rondas. Un aumento de la rueda puede incrementar el valor revelado.
El pez naranja ofrece multiplicadores base de 4× a 200×. Su intervalo queda entre el azul y el rojo; sigue la misma mecánica de captura y revelación, con el aumento correspondiente.
El pez rojo ofrece multiplicadores base de 10× a 500×. Un aumento de 10× puede elevar el máximo a 5.000×. Es un resultado máximo posible, no el premio inicial ni un pago prometido.
Un espectáculo en el Ártico
La nieve, el lago helado y una cabaña de pesca crean el ambiente. El presentador guía los giros mientras los escenarios 3D y la realidad aumentada animan los bonos. La ilustración de esta página refleja la temática; no es una transmisión en directo.
Preguntas frecuentes
¿Se puede jugar desde el móvil?
El juego funciona en ordenadores y móviles mediante casinos participantes. Hace falta una conexión estable para el vídeo en directo y las apuestas.
¿Dónde está disponible?
Depende del casino, de tu país y de las normas locales. Busca Ice Fishing en el catálogo de juegos en directo y comprueba el acceso de tu cuenta.
¿Hay promociones del casino?
El casino establece las ofertas de depósito y promociones del juego. Revisa los requisitos, las condiciones de apuesta y si Ice Fishing cuenta para la oferta.
¿Todos pueden participar en el bono?
Todos pueden verlo, pero solo obtienen el premio quienes apostaron por ese bono antes del cierre. No se puede añadir una apuesta después de conocer el resultado.
`);
  add('pt-BR',`
Ice Fishing Live é um game show ao vivo da Evolution ambientado em um lago congelado do Ártico. Um apresentador conduz cada rodada, enquanto uma roda virtual define o resultado. Aposte em uma folha ou em um bônus de pesca: acertar pode render um pagamento direto ou abrir uma rodada de pesca. Decisões rápidas, multiplicadores aleatórios e efeitos digitais dão vida ao cenário nevado.
Escolha o valor da ficha e aposte em uma ou mais opções antes do encerramento. Confira a aposta total ao cobrir vários campos.
Após o fechamento das apostas, multiplicadores aleatórios podem aparecer na roda. Acompanhe o giro e espere o indicador apontar o segmento vencedor.
Se o resultado corresponder à sua escolha, essa aposta paga conforme a tabela e o aumento aplicável. As outras apostas são perdidas.
Um segmento de peixe ativa seu bônus. O apresentador recolhe um peixe e revela o multiplicador; o aumento atribuído na roda eleva o valor da captura.
A roda virtual tem 53 segmentos: 46 Leaf comuns e 7 de bônus de pesca. Leaf 1 e Leaf 2 são opções separadas. Para participar de um bônus, é preciso apostar no tipo de peixe correspondente.
Os aumentos Leaf podem ser 3×, 4×, 5×, 7× ou 10×. Nos bônus: 2×, 3×, 4×, 5×, 6×, 7×, 8× ou 10×. São atribuídos aleatoriamente antes do giro e não aparecem obrigatoriamente em toda rodada.
All Bonuses cobre Lil’ Blues, Big Oranges e Huge Reds. Confira o valor de cada campo: cobrir mais resultados aumenta a aposta total em risco e não garante vitória.
O RTP varia conforme a aposta; consulte o percentual exato e os limites na ajuda do jogo. Ele representa um retorno teórico de longo prazo, não o resultado de uma sessão. Os prêmios dos bônus variam bastante e nenhum multiplicador alto é garantido.
O peixe azul revela um multiplicador base de 3× a 100×, a menor faixa de prêmios das três pescarias. Um aumento da roda pode elevar o valor revelado.
O peixe laranja oferece multiplicadores base de 4× a 200×. Sua faixa fica entre a azul e a vermelha e segue a mesma mecânica de captura e revelação, com o aumento aplicável.
O peixe vermelho oferece multiplicadores base de 10× a 500×. Um aumento de 10× pode levar o máximo a 5.000×. É um resultado máximo possível, não o prêmio inicial nem uma promessa de pagamento.
Atmosfera de um show no Ártico
Neve, um lago gelado e uma cabana de pesca compõem o cenário. O apresentador acompanha os giros, enquanto efeitos 3D e realidade aumentada dão vida aos bônus. A ilustração desta página representa o tema; não é uma transmissão ao vivo.
Perguntas frequentes
Posso jogar pelo celular?
O jogo funciona em computadores e celulares por meio dos casinos participantes. É necessária uma conexão estável para o vídeo ao vivo e as apostas.
Onde o jogo está disponível?
O acesso depende do casino, do país e das regras locais. Procure Ice Fishing no catálogo de jogos ao vivo e confira a disponibilidade para sua conta.
Há promoções do casino?
Ofertas de depósito e promoções específicas são definidas pelo casino. Confira os requisitos, as condições de apostas e se Ice Fishing conta para a oferta.
Todos podem participar de um bônus?
Todos podem assistir, mas só concorrem ao prêmio os jogadores que apostaram no bônus correspondente antes do fechamento. Não é possível apostar depois de conhecer o resultado.
`);
  add('pt',`
Ice Fishing Live é um concurso ao vivo da Evolution num lago gelado do Ártico. Um apresentador conduz cada ronda e uma roda virtual determina o resultado. Aposte numa folha ou num bónus de pesca: acertar pode dar um pagamento direto ou abrir uma ronda de pesca. Decisões rápidas, multiplicadores aleatórios e efeitos digitais dão vida ao cenário nevado.
Escolha o valor da ficha e aposte numa ou em várias opções antes do fecho. Verifique a aposta total quando cobrir vários campos.
Após o fecho das apostas, podem surgir multiplicadores aleatórios na roda. Acompanhe a rotação e espere que o indicador assinale o segmento vencedor.
Se o resultado corresponder à sua escolha, essa aposta paga segundo a tabela e o aumento aplicável. As restantes apostas perdem.
Um segmento de peixe ativa o respetivo bónus. O apresentador recolhe um peixe e revela o multiplicador; o aumento atribuído na roda eleva o valor da captura.
A roda virtual tem 53 segmentos: 46 Leaf normais e 7 de bónus de pesca. Leaf 1 e Leaf 2 são apostas distintas. Para participar num bónus, é necessário apostar no tipo correspondente.
Os aumentos Leaf podem ser 3×, 4×, 5×, 7× ou 10×. Nos bónus: 2×, 3×, 4×, 5×, 6×, 7×, 8× ou 10×. São atribuídos aleatoriamente antes da rotação e não surgem necessariamente em todas as rondas.
All Bonuses abrange Lil’ Blues, Big Oranges e Huge Reds. Verifique o valor de cada campo: cobrir mais resultados aumenta o montante total em risco e não garante uma vitória.
O RTP depende da aposta; consulte a percentagem exata e os limites na ajuda do jogo. Representa um retorno teórico a longo prazo, não o resultado de uma sessão. Os prémios dos bónus variam bastante e nenhum multiplicador elevado é garantido.
O peixe azul revela um multiplicador base de 3× a 100×, o intervalo de prémios mais baixo das três pescarias. Um aumento da roda pode elevar o valor revelado.
O peixe laranja oferece multiplicadores base de 4× a 200×. O intervalo situa-se entre o azul e o vermelho, com a mesma mecânica de captura e revelação e o aumento aplicável.
O peixe vermelho oferece multiplicadores base de 10× a 500×. Um aumento de 10× pode elevar o máximo a 5.000×. Trata-se de um máximo possível, não do prémio inicial nem de um pagamento prometido.
Um espetáculo no Ártico
Neve, um lago gelado e uma cabana de pesca compõem o cenário. O apresentador acompanha as rotações e os efeitos 3D e de realidade aumentada animam os bónus. A ilustração desta página representa o tema; não é uma transmissão ao vivo.
Perguntas frequentes
Posso jogar no telemóvel?
O jogo funciona em computadores e telemóveis através dos casinos participantes. É necessária uma ligação estável para o vídeo ao vivo e as apostas.
Onde está disponível?
O acesso depende do casino, do país e das regras locais. Procure Ice Fishing no catálogo de jogos ao vivo e confirme a disponibilidade para a sua conta.
Existem promoções do casino?
O casino define as ofertas de depósito e as promoções do jogo. Verifique os requisitos, as condições de apostas e se Ice Fishing conta para a oferta.
Todos podem participar num bónus?
Todos podem assistir, mas apenas quem apostou no bónus correspondente antes do fecho pode receber o prémio. Não é possível acrescentar uma aposta depois de conhecer o resultado.
`);
  add('fr',`
Ice Fishing Live est un jeu télévisé de casino en direct d’Evolution, dans un décor de lac arctique gelé. Un animateur accompagne chaque manche et une roue virtuelle détermine le résultat. Misez sur une feuille ou un bonus de pêche : une sélection gagnante peut payer directement ou ouvrir une partie de pêche. Décisions rapides, multiplicateurs aléatoires et effets numériques animent le studio enneigé.
Choisissez une valeur de jeton et misez sur une ou plusieurs sélections avant la fermeture. Vérifiez la mise totale si vous couvrez plusieurs cases.
Après la clôture des mises, des multiplicateurs aléatoires peuvent apparaître sur la roue. Attendez que l’indicateur désigne le segment gagnant.
Si le résultat correspond à votre sélection, cette mise est payée selon la table et le multiplicateur applicable. Les autres mises sont perdues.
Un segment de poisson déclenche son bonus. L’animateur remonte un poisson qui révèle un multiplicateur ; le bonus de la roue augmente la valeur de cette prise.
La roue virtuelle comporte 53 segments : 46 Leaf ordinaires et 7 bonus de pêche. Leaf 1 et Leaf 2 sont deux paris distincts. Un bonus nécessite une mise sur le type de poisson correspondant.
Les multiplicateurs Leaf sont de 3×, 4×, 5×, 7× ou 10×. Pour les bonus : 2×, 3×, 4×, 5×, 6×, 7×, 8× ou 10×. Ils sont attribués au hasard avant le tour et ne sont pas garantis à chaque manche.
All Bonuses couvre Lil’ Blues, Big Oranges et Huge Reds. Vérifiez chaque mise : couvrir davantage de résultats augmente le montant total risqué sans garantir un gain.
Le RTP dépend du pari choisi ; consultez l’aide du jeu pour le pourcentage exact et les limites. Il représente un retour théorique à long terme, pas le résultat d’une session. Les prix des bonus varient fortement et aucun gros multiplicateur n’est garanti.
Le poisson bleu révèle un multiplicateur de base de 3× à 100×, la plage de prix la plus basse des trois pêches. Un multiplicateur attribué sur la roue peut augmenter la valeur révélée.
Le poisson orange offre des multiplicateurs de base de 4× à 200×. Sa plage se situe entre le bleu et le rouge, avec le même principe de capture et de révélation, puis l’application du multiplicateur de la roue.
Le poisson rouge offre des multiplicateurs de base de 10× à 500×. Un bonus de roue de 10× peut porter le maximum à 5 000×. C’est un maximum possible, pas un prix de départ ni un gain promis.
L’ambiance d’un spectacle arctique
La neige, le lac gelé et une cabane de pêche composent le décor. L’animateur guide les tours, tandis que les effets 3D et la réalité augmentée donnent vie aux bonus. L’illustration de cette page évoque le thème ; ce n’est pas une diffusion en direct.
Questions fréquentes
Peut-on jouer sur téléphone ?
Le jeu fonctionne sur ordinateur et mobile chez les casinos participants. Une connexion stable est nécessaire pour la vidéo en direct et les mises.
Où le jeu est-il disponible ?
L’accès dépend du casino, de votre pays et des règles locales. Cherchez Ice Fishing dans le catalogue de jeux en direct et vérifiez sa disponibilité pour votre compte.
Y a-t-il des promotions de casino ?
Le casino définit les offres de dépôt et les promotions du jeu. Vérifiez l’éligibilité, les conditions de mise et la contribution d’Ice Fishing avant de participer.
Tout le monde peut-il participer au bonus ?
Tout le monde peut regarder, mais seuls les joueurs ayant misé sur le bon bonus avant la clôture peuvent gagner son prix. Impossible d’ajouter une mise après le résultat.
`);
  add('de',`
Ice Fishing Live ist Evolutions Live-Gameshow vor der Kulisse eines zugefrorenen arktischen Sees. Ein Moderator begleitet jede Runde, während ein virtuelles Rad das Ergebnis bestimmt. Setze auf ein Blatt oder einen Fischbonus: Ein Treffer kann direkt auszahlen oder eine Angelrunde starten. Schnelle Entscheidungen, zufällige Multiplikatoren und digitale Effekte bringen Leben ins verschneite Studio.
Wähle einen Jetonwert und setze vor Annahmeschluss auf eine oder mehrere Optionen. Prüfe bei mehreren Feldern den Gesamteinsatz.
Nach Annahmeschluss können zufällige Multiplikatoren auf dem Rad erscheinen. Verfolge die Drehung und warte, bis der Zeiger das Gewinnsegment anzeigt.
Trifft das Ergebnis deine Auswahl, zahlt dieser Einsatz gemäß Gewinntabelle und gültiger Verstärkung. Die übrigen Einsätze gehen verloren.
Ein passendes Fischsegment startet seine Bonusrunde. Der Moderator zieht einen Fisch heraus und enthüllt dessen Multiplikator; die Radverstärkung erhöht den Wert des Fangs.
Das virtuelle Rad hat 53 Segmente: 46 reguläre Leaf- und 7 Fischbonussegmente. Leaf 1 und Leaf 2 sind getrennte Wettoptionen. Für einen Fischbonus ist ein Einsatz auf den entsprechenden Typ nötig.
Leaf-Verstärkungen können 3×, 4×, 5×, 7× oder 10× betragen. Bei Boni sind 2×, 3×, 4×, 5×, 6×, 7×, 8× oder 10× möglich. Sie werden vor der Drehung zufällig zugeteilt und erscheinen nicht zwingend jede Runde.
All Bonuses deckt Lil’ Blues, Big Oranges und Huge Reds ab. Prüfe den Einsatz je Feld: Mehr abgedeckte Ergebnisse erhöhen den Gesamteinsatz und garantieren keinen Gewinn.
Der RTP hängt von der Wettoption ab; genaue Werte und Limits stehen in der aktuellen Spielhilfe. Er beschreibt eine theoretische langfristige Rückzahlung, kein Sitzungsergebnis. Bonuspreise schwanken stark und hohe Multiplikatoren sind nie garantiert.
Der blaue Fisch enthüllt einen Basismultiplikator von 3× bis 100×, die niedrigste Preisspanne der drei Angelrunden. Eine Radverstärkung kann den enthüllten Wert erhöhen.
Der orange Fisch bietet Basismultiplikatoren von 4× bis 200×. Sein Bereich liegt zwischen Blau und Rot. Nach dem Einholen wird der Preis enthüllt und eine vorhandene Radverstärkung angewendet.
Der rote Fisch bietet Basismultiplikatoren von 10× bis 500×. Eine Radverstärkung von 10× kann den Höchstwert auf 5.000× erhöhen. Das ist ein mögliches Maximum, kein Startpreis und kein Gewinnversprechen.
Eine arktische Showkulisse
Schnee, ein vereister See und eine Fischerhütte prägen das Spiel. Der Moderator begleitet die Drehungen, während 3D-Kulissen und Augmented Reality die Boni inszenieren. Die Illustration auf dieser Seite zeigt das Thema und ist keine Liveübertragung.
Häufige Fragen
Kann ich auf dem Smartphone spielen?
Das Spiel unterstützt Computer und Mobilgeräte bei teilnehmenden Casinos. Für Livevideo und Wetten ist eine stabile Verbindung nötig.
Wo ist das Spiel verfügbar?
Das hängt vom Casino, deinem Land und den örtlichen Regeln ab. Suche Ice Fishing im Livekatalog und prüfe die Verfügbarkeit für dein Konto.
Gibt es Casinoaktionen?
Einzahlungsangebote und spielbezogene Aktionen legt das Casino fest. Prüfe Teilnahmebedingungen, Umsatzanforderungen und ob Ice-Fishing-Einsätze angerechnet werden.
Kann jeder an einer Bonusrunde teilnehmen?
Alle dürfen zuschauen, aber nur wer vor Annahmeschluss auf den passenden Bonus gesetzt hat, kann dessen Preis erhalten. Nach Bekanntgabe des Ergebnisses sind keine neuen Einsätze möglich.
`);
  add('it',`
Ice Fishing Live è il game show dal vivo di Evolution ambientato su un lago artico ghiacciato. Un presentatore accompagna ogni round e una ruota virtuale determina il risultato. Punta su una foglia o su un bonus di pesca: la scelta vincente può pagare subito o aprire una sessione di pesca. Decisioni rapide, moltiplicatori casuali ed effetti digitali animano lo studio innevato.
Scegli il valore della fiche e punta su una o più opzioni prima della chiusura. Controlla la puntata totale se copri più caselle.
Dopo la chiusura delle puntate possono comparire moltiplicatori casuali sulla ruota. Segui il giro e attendi che l’indicatore mostri il segmento vincente.
Se il risultato corrisponde alla tua scelta, la puntata paga secondo la tabella e l’aumento applicabile. Le altre puntate sono perse.
Il segmento del pesce attiva il suo bonus. Il presentatore recupera un pesce e rivela il moltiplicatore; l’aumento assegnato sulla ruota incrementa il valore della cattura.
La ruota virtuale ha 53 segmenti: 46 Leaf normali e 7 bonus di pesca. Leaf 1 e Leaf 2 sono puntate distinte. Per partecipare al bonus serve una puntata sul tipo di pesce corrispondente.
Gli aumenti Leaf possono essere 3×, 4×, 5×, 7× o 10×. Per i bonus: 2×, 3×, 4×, 5×, 6×, 7×, 8× o 10×. Vengono assegnati casualmente prima del giro e non sono garantiti in ogni round.
All Bonuses copre Lil’ Blues, Big Oranges e Huge Reds. Verifica l’importo su ogni casella: coprire più risultati aumenta il totale a rischio e non garantisce una vincita.
L’RTP dipende dalla puntata; percentuali esatte e limiti sono nella guida del gioco. Indica un ritorno teorico sul lungo periodo, non il risultato di una sessione. I premi dei bonus variano molto e un moltiplicatore elevato non è garantito.
Il pesce blu rivela un moltiplicatore base da 3× a 100×, l’intervallo più basso delle tre pescate. Un aumento sulla ruota può incrementare il valore rivelato.
Il pesce arancione offre moltiplicatori base da 4× a 200×. Si colloca tra il blu e il rosso, con lo stesso meccanismo di cattura e rivelazione e l’applicazione dell’aumento della ruota.
Il pesce rosso offre moltiplicatori base da 10× a 500×. Un aumento di 10× può portare il massimo a 5.000×. È il massimo potenziale, non il premio iniziale né una vincita promessa.
L’atmosfera di uno show artico
Neve, un lago ghiacciato e una capanna da pesca compongono lo scenario. Il presentatore guida i giri, mentre effetti 3D e realtà aumentata animano i bonus. L’illustrazione qui riprende il tema e non è una trasmissione dal vivo.
Domande frequenti
Posso giocare dal telefono?
Il gioco funziona su computer e dispositivi mobili nei casinò partecipanti. Serve una connessione stabile per il video dal vivo e le puntate.
Dove è disponibile?
L’accesso dipende dal casinò, dal paese e dalle regole locali. Cerca Ice Fishing nel catalogo dal vivo e verifica la disponibilità per il tuo account.
Ci sono promozioni del casinò?
Il casinò stabilisce offerte di deposito e promozioni del gioco. Controlla requisiti, condizioni di puntata e se Ice Fishing contribuisce all’offerta.
Tutti possono partecipare al bonus?
Tutti possono guardare, ma solo chi ha puntato sul bonus corrispondente prima della chiusura può ottenere il premio. Non si possono aggiungere puntate dopo il risultato.
`);
  add('nl',`
Ice Fishing Live is Evolutions livegameshow op een bevroren Arctisch meer. Een presentator begeleidt elke ronde terwijl een virtueel rad de uitslag bepaalt. Zet in op een blad of een visbonus: een juiste keuze kan direct uitbetalen of een visronde openen. Snelle keuzes, willekeurige vermenigvuldigers en digitale effecten brengen de besneeuwde studio tot leven.
Kies een fichewaarde en zet vóór sluiting in op een of meer opties. Controleer je totale inzet als je meerdere vakken kiest.
Na sluiting kunnen willekeurige vermenigvuldigers op het rad verschijnen. Volg de draai en wacht tot de aanwijzer het winnende segment aangeeft.
Komt de uitslag overeen met je keuze, dan betaalt die inzet volgens de uitbetalingstabel en eventuele versterking. De overige inzetten gaan verloren.
Een passend vissegment start de bonusronde. De presentator haalt een vis binnen en onthult de vermenigvuldiger; een toegewezen radversterking verhoogt de waarde van de vangst.
Het virtuele rad heeft 53 segmenten: 46 gewone Leaf-segmenten en 7 visbonussen. Leaf 1 en Leaf 2 zijn aparte inzetopties. Voor een visbonus moet je op het bijbehorende type inzetten.
Leaf-versterkingen zijn 3×, 4×, 5×, 7× of 10×. Voor bonussen zijn 2×, 3×, 4×, 5×, 6×, 7×, 8× of 10× mogelijk. Ze worden willekeurig vóór de draai toegewezen en verschijnen niet noodzakelijk elke ronde.
All Bonuses dekt Lil’ Blues, Big Oranges en Huge Reds. Controleer de inzet per vak: meer uitkomsten afdekken verhoogt het totale risicobedrag en garandeert geen winst.
De RTP hangt af van de inzetoptie; raadpleeg de spelhulp voor het exacte percentage en de limieten. Het is een theoretisch langetermijnrendement, geen sessieresultaat. Bonusprijzen lopen sterk uiteen en een hoge vermenigvuldiger is nooit gegarandeerd.
De blauwe vis onthult een basisvermenigvuldiger van 3× tot 100×, het laagste prijzenbereik van de drie visrondes. Een radversterking kan de onthulde waarde verhogen.
De oranje vis biedt basisvermenigvuldigers van 4× tot 200×. Dit bereik ligt tussen blauw en rood. De vis wordt binnengehaald, de prijs onthuld en een eventuele radversterking toegepast.
De rode vis biedt basisvermenigvuldigers van 10× tot 500×. Met een radversterking van 10× kan het maximum 5.000× worden. Dit is een mogelijk maximum, geen beginprijs of beloofde uitbetaling.
De sfeer van een Arctische liveshow
Sneeuw, een ijsmeer en een vissershut vormen het decor. De presentator begeleidt de draaien, terwijl 3D-effecten en augmented reality de bonusvangst tot leven brengen. De illustratie op deze pagina toont het thema en is geen live-uitzending.
Veelgestelde vragen
Kan ik op mijn telefoon spelen?
Het spel werkt op computers en mobiele apparaten bij deelnemende casino’s. Een stabiele verbinding is nodig voor livevideo en inzetten.
Waar is het spel beschikbaar?
Dat hangt af van het casino, je land en lokale regels. Zoek Ice Fishing in de livecatalogus en controleer de toegang voor je account.
Zijn er casinoacties?
Het casino bepaalt stortingsaanbiedingen en spelacties. Controleer deelnamevoorwaarden, inzetvereisten en of Ice Fishing meetelt voordat je een aanbod gebruikt.
Mag iedereen meedoen aan een bonus?
Iedereen kan kijken, maar alleen spelers die vóór sluiting op de juiste bonus hebben ingezet, maken aanspraak op de prijs. Na de uitslag kun je geen inzet toevoegen.
`);
  add('fi',`
Ice Fishing Live on Evolutionin livepeliohjelma jäätyneellä arktisella järvellä. Juontaja ohjaa kierroksia, ja virtuaalinen onnenpyörä ratkaisee tuloksen. Panosta lehtivaihtoehtoon tai kalabonukseen: osuma voi maksaa suoran voiton tai avata kalastuskierroksen. Nopeat valinnat, satunnaiset kertoimet ja digitaaliset tehosteet elävöittävät lumista studiota.
Valitse pelimerkin arvo ja panosta yhteen tai useampaan vaihtoehtoon ennen panostusajan päättymistä. Tarkista kokonaispanos, jos valitset useita ruutuja.
Panostusajan päätyttyä pyörälle voidaan arpoa kertoimia. Seuraa pyörähdystä ja odota, kunnes osoitin näyttää voittavan sektorin.
Jos tulos vastaa valintaasi, kyseinen panos maksetaan voittotaulukon ja mahdollisen lisäkertoimen mukaisesti. Muut panokset häviävät.
Oikea kalasektori käynnistää bonuskierroksen. Juontaja nostaa kalan, joka paljastaa voittokertoimen. Pyörälle arvottu lisäkerroin kasvattaa saaliin arvoa.
Virtuaalipyörässä on 53 sektoria: 46 tavallista Leaf-sektoria ja 7 kalabonussektoria. Leaf 1 ja Leaf 2 ovat eri panostusvaihtoehtoja. Kalabonukseen tarvitaan panos vastaavaan kalalajiin.
Leaf-lisäkertoimet voivat olla 3×, 4×, 5×, 7× tai 10×. Bonuksissa vaihtoehdot ovat 2×, 3×, 4×, 5×, 6×, 7×, 8× tai 10×. Ne arvotaan ennen pyörähdystä, eikä niitä tule välttämättä joka kierroksella.
All Bonuses kattaa Lil’ Blues-, Big Oranges- ja Huge Reds -bonukset. Tarkista jokaisen ruudun panos: useampi valinta kasvattaa kokonaisriskiä eikä takaa voittoa.
RTP riippuu panostusvaihtoehdosta. Tarkka prosentti ja rajat löytyvät pelin ajantasaisesta ohjeesta. RTP on pitkän aikavälin teoreettinen palautus, ei yhden pelihetken tulos. Bonusvoitot vaihtelevat, eikä suurta kerrointa taata.
Sininen kala paljastaa peruskertoimen 3×–100×, joka on kolmen kalastusbonuksen pienin palkintoväli. Pyörän lisäkerroin voi kasvattaa paljastettua arvoa.
Oranssi kala tarjoaa peruskertoimia 4×–200×. Palkintoväli sijoittuu sinisen ja punaisen väliin. Kala nostetaan, palkinto paljastetaan ja mahdollinen pyörän lisäkerroin lisätään.
Punainen kala tarjoaa peruskertoimia 10×–500×. Pyörän 10×-lisäkerroin voi nostaa enimmäistuloksen 5 000×:ään. Tämä on mahdollinen enimmäisarvo, ei lähtöpalkinto tai luvattu voitto.
Arktisen liveohjelman tunnelma
Lumi, jäätynyt järvi ja kalastusmaja muodostavat maiseman. Juontaja ohjaa pyörähdyksiä, ja 3D-grafiikka sekä lisätty todellisuus elävöittävät bonuskalastusta. Sivun kuvitus kuvaa teemaa eikä ole suora lähetys.
Usein kysytyt kysymykset
Voiko peliä pelata puhelimella?
Peli toimii tietokoneella ja mobiililaitteilla sitä tarjoavissa kasinoissa. Livevideo ja panostaminen vaativat vakaan yhteyden.
Missä peli on saatavilla?
Saatavuus riippuu kasinosta, maastasi ja paikallisista säännöistä. Etsi Ice Fishing livepelien valikoimasta ja tarkista tilisi käyttöoikeus.
Onko peliin kasinotarjouksia?
Kasino määrittää talletustarjoukset ja pelikohtaiset kampanjat. Tarkista osallistumisehdot, kierrätysvaatimukset ja Ice Fishingin osuus ennen tarjouksen käyttöä.
Pääsevätkö kaikki bonuskierrokselle?
Kaikki voivat seurata, mutta palkintoon ovat oikeutettuja vain oikeaan bonukseen ajoissa panostaneet. Tuloksen selvittyä ei voi lisätä panosta.
`);
  add('sv',`
Ice Fishing Live är Evolutions livespelshow på en frusen arktisk sjö. En programledare följer varje runda medan ett virtuellt hjul avgör resultatet. Satsa på ett löv eller en fiskbonus: rätt val kan ge direkt utbetalning eller öppna en fiskerunda. Snabba val, slumpmässiga multiplikatorer och digitala effekter ger liv åt den snöiga studion.
Välj ett markerbelopp och satsa på ett eller flera alternativ innan insatserna stänger. Kontrollera totalinsatsen om du väljer flera fält.
När insatserna stängt kan slumpmässiga multiplikatorer läggas på hjulet. Följ snurret och vänta tills visaren pekar ut det vinnande segmentet.
Om resultatet matchar ditt val betalas den insatsen enligt vinsttabellen och eventuell förstärkning. Övriga insatser förloras.
Ett matchande fisksegment startar bonusrundan. Programledaren drar upp en fisk som visar en prismultiplikator; en tilldelad hjulförstärkning ökar fångstens värde.
Det virtuella hjulet har 53 segment: 46 vanliga Leaf-segment och 7 fiskbonussegment. Leaf 1 och Leaf 2 är separata insatsalternativ. En fiskbonus kräver en insats på motsvarande typ.
Leaf-förstärkningar kan vara 3×, 4×, 5×, 7× eller 10×. För bonusar finns 2×, 3×, 4×, 5×, 6×, 7×, 8× eller 10×. De tilldelas slumpmässigt före snurret och är inte garanterade varje runda.
All Bonuses täcker Lil’ Blues, Big Oranges och Huge Reds. Kontrollera beloppet på varje fält: fler täckta utfall höjer den totala insatsen utan att garantera vinst.
RTP beror på insatsalternativet. Exakt procent och gränser finns i spelets aktuella hjälp. Det är en teoretisk återbetalning på lång sikt, inte resultatet för en spelsession. Bonuspriser varierar kraftigt och höga multiplikatorer garanteras aldrig.
Den blå fisken visar en grundmultiplikator från 3× till 100×, det lägsta prisintervallet av de tre fiskerundorna. En hjulförstärkning kan höja det avslöjade värdet.
Den orange fisken erbjuder grundmultiplikatorer från 4× till 200×. Intervallet ligger mellan blått och rött. Fisken dras upp, priset avslöjas och en eventuell hjulförstärkning tillämpas.
Den röda fisken erbjuder grundmultiplikatorer från 10× till 500×. En hjulförstärkning på 10× kan höja maxresultatet till 5 000×. Det är ett möjligt maximum, inte startpriset eller ett utlovat belopp.
Känslan av en arktisk liveshow
Snö, en isig sjö och en fiskestuga bildar miljön. Programledaren guidar snurren medan 3D-grafik och förstärkt verklighet levandegör bonusfisket. Illustrationen här visar temat och är ingen direktsändning.
Vanliga frågor
Kan jag spela på mobilen?
Spelet fungerar på dator och mobil via deltagande casinon. Livevideo och insatser kräver en stabil uppkoppling.
Var finns spelet?
Tillgången beror på casinot, ditt land och lokala regler. Sök efter Ice Fishing bland livespelen och kontrollera vad som gäller för ditt konto.
Finns det casinoerbjudanden?
Casinot bestämmer insättningserbjudanden och spelkampanjer. Kontrollera behörighet, omsättningskrav och om Ice Fishing räknas innan du använder erbjudandet.
Kan alla delta i bonusrundan?
Alla kan titta, men bara spelare som satsat på rätt bonus innan stängning kan få priset. Det går inte att lägga till en insats när resultatet är känt.
`);
  add('pl',`
Ice Fishing Live to teleturniej na żywo Evolution, rozgrywany na tle zamarzniętego arktycznego jeziora. Prowadzący towarzyszy każdej rundzie, a wynik wyznacza wirtualne koło. Postaw na liść lub bonus z rybą: trafienie może dać bezpośrednią wypłatę albo otworzyć rundę wędkowania. Szybkie decyzje, losowe mnożniki i efekty cyfrowe ożywiają śnieżne studio.
Wybierz wartość żetonu i obstaw jedną lub kilka opcji przed zamknięciem zakładów. Przy wielu polach sprawdź łączną stawkę.
Po zamknięciu zakładów na kole mogą pojawić się losowe mnożniki. Obserwuj obrót i poczekaj, aż wskaźnik pokaże zwycięski segment.
Jeśli wynik odpowiada obstawionej opcji, zakład wypłaca zgodnie z tabelą i dostępnym wzmocnieniem. Pozostałe zakłady przegrywają.
Odpowiedni segment ryby uruchamia bonus. Prowadzący wyciąga rybę i odkrywa mnożnik nagrody; wzmocnienie przyznane na kole zwiększa wartość połowu.
Wirtualne koło ma 53 segmenty: 46 zwykłych Leaf i 7 bonusów z rybami. Leaf 1 i Leaf 2 to oddzielne zakłady. Udział w bonusie wymaga stawki na odpowiedni typ ryby.
Wzmocnienia Leaf to 3×, 4×, 5×, 7× lub 10×. Dla bonusów: 2×, 3×, 4×, 5×, 6×, 7×, 8× lub 10×. Są przydzielane losowo przed obrotem i nie muszą pojawić się w każdej rundzie.
All Bonuses obejmuje Lil’ Blues, Big Oranges i Huge Reds. Sprawdź stawkę na każdym polu: obstawianie większej liczby wyników zwiększa łączną kwotę ryzyka i nie gwarantuje wygranej.
RTP zależy od zakładu; dokładny procent i limity sprawdzisz w aktualnej pomocy gry. To teoretyczny zwrot w długim okresie, nie wynik pojedynczej sesji. Nagrody bonusowe znacznie się różnią, a wysoki mnożnik nie jest gwarantowany.
Niebieska ryba odkrywa mnożnik bazowy od 3× do 100×, najniższy zakres nagród spośród trzech połowów. Wzmocnienie koła może zwiększyć odkrytą wartość.
Pomarańczowa ryba oferuje mnożniki bazowe od 4× do 200×. Zakres mieści się między niebieskim a czerwonym. Po wyciągnięciu ryby odkrywany jest wynik i stosowane ewentualne wzmocnienie.
Czerwona ryba oferuje mnożniki bazowe od 10× do 500×. Wzmocnienie koła 10× może podnieść maksimum do 5 000×. To możliwy najwyższy wynik, a nie nagroda początkowa ani obiecana wypłata.
Atmosfera arktycznego teleturnieju
Śnieg, lodowe jezioro i chatka rybacka tworzą scenerię. Prowadzący objaśnia obroty, a grafika 3D i rozszerzona rzeczywistość ożywiają bonusowe połowy. Ilustracja na stronie oddaje temat gry i nie jest transmisją na żywo.
Częste pytania
Czy można grać na telefonie?
Gra działa na komputerach i urządzeniach mobilnych w uczestniczących kasynach. Do obrazu na żywo i zakładów potrzebne jest stabilne połączenie.
Gdzie gra jest dostępna?
Dostęp zależy od kasyna, kraju i lokalnych zasad. Znajdź Ice Fishing w katalogu gier na żywo i sprawdź dostępność dla swojego konta.
Czy są promocje kasyna?
Kasyno ustala oferty depozytowe i promocje gry. Sprawdź warunki, wymagania obrotu oraz to, czy zakłady Ice Fishing wliczają się do oferty.
Czy każdy może wziąć udział w bonusie?
Każdy może oglądać, ale nagroda przysługuje tylko graczom, którzy obstawili właściwy bonus przed zamknięciem zakładów. Po poznaniu wyniku nie można dodać stawki.
`);
  add('cs',`
Ice Fishing Live je živá herní show od Evolution na zamrzlém arktickém jezeře. Moderátor provází každým kolem a výsledek určuje virtuální kolo. Vsaďte na list nebo rybí bonus: správná volba může vyplatit přímou výhru či otevřít rybářské kolo. Rychlá rozhodnutí, náhodné násobitele a digitální efekty oživují zasněžené studio.
Vyberte hodnotu žetonu a vsaďte na jednu či více možností před uzavřením sázek. Při více polích zkontrolujte celkovou částku.
Po uzavření sázek se na kole mohou objevit náhodné násobitele. Sledujte otočení a počkejte, až ukazatel označí vítězný segment.
Pokud výsledek odpovídá vaší volbě, sázka vyplácí podle výplatní tabulky a příslušného posílení. Ostatní sázky prohrávají.
Odpovídající rybí segment spustí bonus. Moderátor vytáhne rybu a odhalí její násobitel; posílení přidělené na kole zvýší hodnotu úlovku.
Virtuální kolo má 53 segmentů: 46 běžných Leaf a 7 rybích bonusů. Leaf 1 a Leaf 2 jsou samostatné sázky. Účast v rybím bonusu vyžaduje sázku na příslušný druh.
Posílení Leaf mohou být 3×, 4×, 5×, 7× nebo 10×. U bonusů: 2×, 3×, 4×, 5×, 6×, 7×, 8× nebo 10×. Přidělují se náhodně před otočením a nejsou zaručena v každém kole.
All Bonuses pokrývá Lil’ Blues, Big Oranges a Huge Reds. Ověřte částku na každém poli: více možností zvyšuje celkovou riskovanou sázku a nezaručuje výhru.
RTP závisí na zvolené sázce; přesné procento a limity najdete v aktuální nápovědě. Jde o teoretickou dlouhodobou návratnost, ne výsledek jedné relace. Bonusové ceny se výrazně liší a vysoký násobitel není zaručen.
Modrá ryba odhaluje základní násobitel 3× až 100×, nejnižší rozsah cen ze tří rybářských kol. Přidělené posílení kola může odhalenou hodnotu zvýšit.
Oranžová ryba nabízí základní násobitele 4× až 200×. Rozsah leží mezi modrou a červenou. Po vytažení ryby se odhalí cena a použije případné posílení kola.
Červená ryba nabízí základní násobitele 10× až 500×. Posílení kola 10× může zvýšit maximum na 5 000×. Je to možný nejvyšší výsledek, nikoli počáteční cena nebo slíbená výplata.
Atmosféra arktické živé show
Sníh, ledové jezero a rybářská chata tvoří kulisu. Moderátor provází otočeními, zatímco 3D grafika a rozšířená realita oživují bonusový rybolov. Ilustrace zde zachycuje téma a není živým přenosem.
Časté dotazy
Lze hrát na telefonu?
Hra funguje na počítačích i mobilech u zapojených kasin. Živé video a sázení vyžadují stabilní připojení.
Kde je hra dostupná?
Záleží na kasinu, zemi a místních pravidlech. Vyhledejte Ice Fishing v katalogu živých her a ověřte dostupnost pro svůj účet.
Existují kasinové akce?
Vkladové nabídky i herní akce určuje kasino. Ověřte podmínky účasti, požadavky na protočení a započítávání sázek Ice Fishing.
Může se bonusu účastnit každý?
Sledovat mohou všichni, ale cenu mohou získat jen hráči, kteří před uzavřením vsadili na odpovídající bonus. Po zveřejnění výsledku nelze přidat sázku.
`);
  add('hu',`
Az Ice Fishing Live az Evolution élő játékshow-ja egy befagyott sarkvidéki tó díszletei között. A műsorvezető minden kört végigkísér, az eredményt pedig egy virtuális kerék adja. Fogadj levélre vagy halas bónuszra: a találat közvetlen kifizetést vagy horgászkört nyithat. Gyors döntések, véletlen szorzók és digitális effektek keltik életre a havas stúdiót.
Válassz zsetonértéket, és fogadj egy vagy több lehetőségre a fogadások lezárása előtt. Több mező esetén ellenőrizd a teljes tétet.
A fogadások lezárása után véletlen szorzók kerülhetnek a kerékre. Kövesd a forgást, és várd meg, melyik szegmenst jelöli a mutató.
Ha az eredmény egyezik a választásoddal, az adott tét a nyereménytábla és az érvényes erősítés szerint fizet. A többi tét elveszik.
A megfelelő halas szegmens elindítja a bónuszt. A műsorvezető kihúz egy halat, amely megmutatja a szorzót; a keréken kiosztott erősítés növeli a fogás értékét.
A virtuális keréken 53 szegmens van: 46 normál Leaf és 7 halas bónusz. A Leaf 1 és Leaf 2 külön fogadási lehetőség. A halas bónuszhoz az adott típusra kell fogadni.
A Leaf-erősítések 3×, 4×, 5×, 7× vagy 10× értékűek lehetnek. A bónuszoknál 2×, 3×, 4×, 5×, 6×, 7×, 8× vagy 10× lehetséges. Véletlenszerűen, a forgás előtt kerülnek kiosztásra, nem minden körben.
Az All Bonuses a Lil’ Blues, Big Oranges és Huge Reds bónuszokat fedi le. Nézd meg az egyes mezők tétjét: több kimenetel lefedése növeli a teljes kockáztatott összeget, és nem garantál nyereményt.
Az RTP a választott fogadástól függ; a pontos százalék és limitek a játék súgójában találhatók. Hosszú távú elméleti visszafizetést jelent, nem egy játékmenet eredményét. A bónusznyeremények eltérők, nagy szorzó nem garantált.
A kék hal 3×–100× közötti alapszorzót mutat, ez a három horgászkör legalacsonyabb nyereménytartománya. A kerék erősítése növelheti a feltárt értéket.
A narancssárga hal 4×–200× közötti alapszorzót kínál. Tartománya a kék és a piros között van. A hal kihúzása után kiderül a nyeremény, majd érvényesül az esetleges erősítés.
A piros hal 10×–500× közötti alapszorzót kínál. A kerék 10× erősítése 5 000×-re emelheti a maximumot. Ez lehetséges csúcseredmény, nem kezdőnyeremény vagy ígért kifizetés.
Sarkvidéki élő show hangulata
Hó, jeges tó és horgászkunyhó alkotja a díszletet. A műsorvezető kíséri a forgásokat, a 3D grafika és a kiterjesztett valóság pedig életre kelti a bónuszokat. Az oldal illusztrációja a témát mutatja, nem élő közvetítés.
Gyakori kérdések
Játszhatok telefonon?
A játék számítógépen és mobilon is működik a részt vevő kaszinóknál. Az élő videóhoz és a fogadáshoz stabil kapcsolat szükséges.
Hol érhető el a játék?
A kaszinótól, az országodtól és a helyi szabályoktól függ. Keresd az Ice Fishing játékot az élő kínálatban, és ellenőrizd a fiókod hozzáférését.
Vannak kaszinós promóciók?
A befizetési ajánlatokat és játékspecifikus akciókat a kaszinó határozza meg. Ellenőrizd a jogosultságot, megforgatási feltételeket és az Ice Fishing beszámítását.
Mindenki részt vehet a bónuszban?
Nézni mindenki tudja, de nyereményre csak az jogosult, aki zárás előtt a megfelelő bónuszra fogadott. Az eredmény ismeretében már nem lehet tétet hozzáadni.
`);
  add('ro',`
Ice Fishing Live este un show de joc live de la Evolution, pe fundalul unui lac arctic înghețat. Un prezentator însoțește fiecare rundă, iar o roată virtuală stabilește rezultatul. Pariază pe o frunză sau un bonus de pescuit: alegerea corectă poate plăti direct sau deschide o rundă de pescuit. Deciziile rapide, multiplicatorii aleatorii și efectele digitale animă studioul înzăpezit.
Alege valoarea jetonului și pariază pe una sau mai multe opțiuni înainte de închidere. Verifică miza totală dacă acoperi mai multe câmpuri.
După închiderea pariurilor pot apărea multiplicatori aleatorii pe roată. Urmărește rotirea și așteaptă ca indicatorul să arate segmentul câștigător.
Dacă rezultatul corespunde alegerii tale, pariul plătește conform tabelului și amplificării aplicabile. Celelalte pariuri pierd.
Segmentul de pește potrivit declanșează bonusul. Prezentatorul scoate un pește și dezvăluie multiplicatorul; amplificarea atribuită pe roată crește valoarea capturii.
Roata virtuală are 53 de segmente: 46 Leaf obișnuite și 7 bonusuri de pescuit. Leaf 1 și Leaf 2 sunt pariuri distincte. Un bonus necesită o miză pe tipul de pește corespunzător.
Amplificările Leaf pot fi 3×, 4×, 5×, 7× sau 10×. La bonusuri: 2×, 3×, 4×, 5×, 6×, 7×, 8× sau 10×. Sunt atribuite aleatoriu înainte de rotire și nu apar obligatoriu în fiecare rundă.
All Bonuses acoperă Lil’ Blues, Big Oranges și Huge Reds. Verifică miza fiecărui câmp: mai multe rezultate acoperite cresc suma totală riscată fără a garanta un câștig.
RTP depinde de pariu; procentul exact și limitele se află în ajutorul actual al jocului. Reprezintă o returnare teoretică pe termen lung, nu rezultatul unei sesiuni. Premiile bonus variază mult, iar un multiplicator mare nu este garantat.
Peștele albastru dezvăluie un multiplicator de bază între 3× și 100×, cel mai mic interval al celor trei runde. O amplificare de pe roată poate crește valoarea dezvăluită.
Peștele portocaliu oferă multiplicatori de bază între 4× și 200×. Intervalul este între cel albastru și cel roșu. Captura dezvăluie premiul, apoi se aplică eventuala amplificare a roții.
Peștele roșu oferă multiplicatori de bază între 10× și 500×. O amplificare de 10× poate ridica maximul la 5.000×. Este un maxim posibil, nu premiul inițial sau o plată promisă.
Atmosfera unui show arctic
Zăpada, lacul înghețat și o cabană de pescuit formează decorul. Prezentatorul ghidează rotirile, iar grafica 3D și realitatea augmentată animă bonusurile. Ilustrația paginii redă tema, nu este o transmisie live.
Întrebări frecvente
Pot juca pe telefon?
Jocul funcționează pe computer și mobil prin cazinourile participante. Pentru video live și pariuri este necesară o conexiune stabilă.
Unde este disponibil?
Accesul depinde de cazinou, țară și regulile locale. Caută Ice Fishing în catalogul live și verifică disponibilitatea pentru contul tău.
Există promoții ale cazinoului?
Cazinoul stabilește ofertele de depunere și promoțiile jocului. Verifică eligibilitatea, condițiile de rulaj și dacă pariurile Ice Fishing contribuie la ofertă.
Poate participa oricine la bonus?
Toți pot urmări, dar doar cei care au pariat pe bonusul corect înainte de închidere pot primi premiul. Nu se poate adăuga o miză după aflarea rezultatului.
`);
  add('bg',`
Ice Fishing Live е игра на живо от Evolution с декор на замръзнало арктическо езеро. Водещ съпровожда всеки рунд, а виртуално колело определя резултата. Заложете на листо или рибен бонус: попадението може да донесе директна печалба или да отвори риболовен рунд. Бързи решения, случайни множители и цифрови ефекти оживяват снежното студио.
Изберете стойност на жетона и заложете на една или повече възможности преди края на приемането. Проверете общия залог при няколко полета.
След затваряне на залозите върху колелото могат да се появят случайни множители. Следете завъртането и изчакайте показалецът да посочи печелившия сектор.
Ако резултатът съвпада с избора ви, залогът се изплаща според таблицата и приложимото усилване. Останалите залози се губят.
Съответният рибен сектор стартира бонуса. Водещият изважда риба и разкрива множителя; усилването от колелото увеличава стойността на улова.
Виртуалното колело има 53 сектора: 46 обикновени Leaf и 7 рибни бонусни. Leaf 1 и Leaf 2 са отделни залози. За рибен бонус е нужен залог на съответния вид.
Усилванията Leaf са 3×, 4×, 5×, 7× или 10×. За бонусите: 2×, 3×, 4×, 5×, 6×, 7×, 8× или 10×. Разпределят се случайно преди завъртането и не са гарантирани във всеки рунд.
All Bonuses обхваща Lil’ Blues, Big Oranges и Huge Reds. Проверявайте сумата на всяко поле: повече покрити резултати увеличават общия риск и не гарантират печалба.
RTP зависи от залога; точният процент и лимитите са в актуалната помощ на играта. Това е теоретична възвръщаемост в дългосрочен план, а не резултат от една сесия. Бонусните награди варират и голям множител не е гарантиран.
Синята риба разкрива базов множител от 3× до 100× — най-ниския диапазон от трите риболова. Усилване от колелото може да увеличи разкритата стойност.
Оранжевата риба предлага базови множители от 4× до 200×. Диапазонът е между синия и червения бонус. След улова се разкрива наградата и се прилага наличното усилване.
Червената риба предлага базови множители от 10× до 500×. Усилване 10× може да повиши максимума до 5 000×. Това е възможен максимум, не начална награда или обещано изплащане.
Атмосфера на арктическо шоу
Сняг, ледено езеро и рибарска хижа оформят декора. Водещият направлява завъртанията, а 3D графиката и добавената реалност оживяват бонусите. Илюстрацията тук пресъздава темата и не е предаване на живо.
Често задавани въпроси
Може ли да се играе от телефон?
Играта работи на компютри и мобилни устройства чрез участващите казина. За видеото на живо и залозите е нужна стабилна връзка.
Къде е достъпна?
Достъпът зависи от казиното, държавата и местните правила. Потърсете Ice Fishing в каталога на живо и проверете достъпността за своя акаунт.
Има ли казино промоции?
Казиното определя депозитните оферти и игровите промоции. Проверете условията, изискванията за превъртане и дали залозите Ice Fishing се отчитат.
Всеки ли може да участва в бонуса?
Всички могат да гледат, но награда получават само заложилите на съответния бонус преди затварянето. След обявяване на резултата не може да се добавя залог.
`);
  add('el',`
Το Ice Fishing Live είναι ζωντανό τηλεπαιχνίδι της Evolution με σκηνικό μια παγωμένη αρκτική λίμνη. Ο παρουσιαστής συνοδεύει κάθε γύρο και ένας εικονικός τροχός καθορίζει το αποτέλεσμα. Ποντάρετε σε φύλλο ή μπόνους ψαρέματος: η σωστή επιλογή μπορεί να πληρώσει άμεσα ή να ανοίξει γύρο ψαρέματος. Γρήγορες επιλογές, τυχαίοι πολλαπλασιαστές και ψηφιακά εφέ ζωντανεύουν το χιονισμένο στούντιο.
Επιλέξτε αξία μάρκας και ποντάρετε σε μία ή περισσότερες επιλογές πριν κλείσουν τα στοιχήματα. Ελέγξτε το συνολικό ποντάρισμα όταν καλύπτετε πολλά πεδία.
Μετά το κλείσιμο μπορεί να εμφανιστούν τυχαίοι πολλαπλασιαστές στον τροχό. Παρακολουθήστε την περιστροφή μέχρι ο δείκτης να δείξει το νικητήριο τμήμα.
Αν το αποτέλεσμα ταιριάζει με την επιλογή σας, το στοίχημα πληρώνει σύμφωνα με τον πίνακα και την ισχύουσα ενίσχυση. Τα υπόλοιπα στοιχήματα χάνονται.
Το αντίστοιχο τμήμα ψαριού ενεργοποιεί το μπόνους. Ο παρουσιαστής τραβά ένα ψάρι και αποκαλύπτει τον πολλαπλασιαστή του· η ενίσχυση του τροχού αυξάνει την αξία του.
Ο εικονικός τροχός έχει 53 τμήματα: 46 κανονικά Leaf και 7 μπόνους ψαρέματος. Τα Leaf 1 και Leaf 2 είναι ξεχωριστές επιλογές. Για το μπόνους απαιτείται ποντάρισμα στον αντίστοιχο τύπο ψαριού.
Οι ενισχύσεις Leaf είναι 3×, 4×, 5×, 7× ή 10×. Στα μπόνους: 2×, 3×, 4×, 5×, 6×, 7×, 8× ή 10×. Δίνονται τυχαία πριν την περιστροφή και δεν είναι εγγυημένες σε κάθε γύρο.
Το All Bonuses καλύπτει Lil’ Blues, Big Oranges και Huge Reds. Ελέγξτε το ποσό κάθε πεδίου: περισσότερες επιλογές αυξάνουν το συνολικό ποσό σε κίνδυνο χωρίς εγγύηση νίκης.
Το RTP εξαρτάται από το στοίχημα· δείτε το ακριβές ποσοστό και τα όρια στη βοήθεια του παιχνιδιού. Είναι θεωρητική μακροχρόνια επιστροφή, όχι αποτέλεσμα μιας συνεδρίας. Τα μπόνους ποικίλλουν και κανένας μεγάλος πολλαπλασιαστής δεν είναι βέβαιος.
Το μπλε ψάρι αποκαλύπτει βασικό πολλαπλασιαστή από 3× έως 100×, το χαμηλότερο εύρος των τριών γύρων. Μια ενίσχυση του τροχού μπορεί να αυξήσει την τιμή.
Το πορτοκαλί ψάρι προσφέρει βασικούς πολλαπλασιαστές από 4× έως 200×. Το εύρος βρίσκεται μεταξύ μπλε και κόκκινου. Μετά την αλίευση αποκαλύπτεται το έπαθλο και εφαρμόζεται τυχόν ενίσχυση.
Το κόκκινο ψάρι προσφέρει βασικούς πολλαπλασιαστές από 10× έως 500×. Ενίσχυση 10× μπορεί να ανεβάσει το μέγιστο σε 5.000×. Είναι πιθανό ανώτατο αποτέλεσμα, όχι αρχικό έπαθλο ή υπόσχεση πληρωμής.
Ατμόσφαιρα αρκτικού ζωντανού σόου
Χιόνι, παγωμένη λίμνη και καλύβα ψαρέματος συνθέτουν το σκηνικό. Ο παρουσιαστής καθοδηγεί τις περιστροφές και τα τρισδιάστατα εφέ με επαυξημένη πραγματικότητα ζωντανεύουν τα μπόνους. Η εικόνα εδώ αποδίδει το θέμα και δεν είναι ζωντανή μετάδοση.
Συχνές ερωτήσεις
Μπορώ να παίξω από κινητό;
Το παιχνίδι λειτουργεί σε υπολογιστές και κινητά μέσω συνεργαζόμενων καζίνο. Για βίντεο και στοιχήματα χρειάζεται σταθερή σύνδεση.
Πού είναι διαθέσιμο;
Η πρόσβαση εξαρτάται από το καζίνο, τη χώρα και τους τοπικούς κανόνες. Αναζητήστε Ice Fishing στον ζωντανό κατάλογο και ελέγξτε τη διαθεσιμότητα του λογαριασμού σας.
Υπάρχουν προσφορές καζίνο;
Το καζίνο ορίζει προσφορές κατάθεσης και προωθητικές ενέργειες. Ελέγξτε δικαίωμα συμμετοχής, απαιτήσεις τζίρου και αν τα στοιχήματα Ice Fishing προσμετρώνται.
Μπορούν όλοι να συμμετέχουν στο μπόνους;
Όλοι μπορούν να παρακολουθούν, αλλά έπαθλο δικαιούνται μόνο όσοι πόνταραν στο σωστό μπόνους πριν το κλείσιμο. Δεν προστίθεται στοίχημα αφού γίνει γνωστό το αποτέλεσμα.
`);
  add('lt',`
Ice Fishing Live – tiesioginė Evolution žaidimų laida užšalusio Arkties ežero aplinkoje. Vedėjas lydi kiekvieną raundą, o rezultatą parenka virtualus ratas. Statykite už lapą arba žuvies premiją: sutapimas gali išmokėti laimėjimą arba pradėti žvejybos raundą. Greiti sprendimai, atsitiktiniai daugikliai ir skaitmeniniai efektai atgaivina apsnigtą studiją.
Pasirinkite žetono vertę ir iki statymų pabaigos statykite už vieną ar kelias parinktis. Pasirinkę kelis laukelius patikrinkite bendrą statymą.
Užsidarius statymams ant rato gali atsirasti atsitiktinių daugiklių. Stebėkite sukimą ir palaukite, kol rodyklė nurodys laimintį segmentą.
Jei rezultatas atitinka jūsų pasirinkimą, statymas išmokamas pagal lentelę ir taikomą sustiprinimą. Kiti statymai pralaimi.
Atitinkamas žuvies segmentas pradeda premijos raundą. Vedėjas ištraukia žuvį ir atskleidžia daugiklį; rato sustiprinimas padidina laimikio vertę.
Virtualus ratas turi 53 segmentus: 46 įprastus Leaf ir 7 žvejybos premijų. Leaf 1 ir Leaf 2 yra atskiri statymai. Norint gauti žuvies premiją, reikia statyti už atitinkamą rūšį.
Leaf sustiprinimai gali būti 3×, 4×, 5×, 7× arba 10×. Premijoms: 2×, 3×, 4×, 5×, 6×, 7×, 8× arba 10×. Jie atsitiktinai priskiriami prieš sukimą ir nėra garantuoti kiekvieną raundą.
All Bonuses apima Lil’ Blues, Big Oranges ir Huge Reds. Patikrinkite kiekvieno laukelio sumą: daugiau pasirinktų rezultatų didina bendrą rizikuojamą statymą ir negarantuoja laimėjimo.
RTP priklauso nuo statymo; tikslų procentą ir ribas rasite aktualioje žaidimo pagalboje. Tai teorinė ilgalaikė grąža, o ne vienos sesijos rezultatas. Premijų dydžiai labai skiriasi, didelis daugiklis nėra garantuotas.
Mėlyna žuvis atskleidžia 3×–100× bazinį daugiklį – mažiausią iš trijų žvejybos raundų prizų intervalų. Rato sustiprinimas gali padidinti atskleistą vertę.
Oranžinė žuvis siūlo 4×–200× bazinius daugiklius. Intervalas yra tarp mėlynos ir raudonos premijų. Ištraukus žuvį atskleidžiamas prizas ir pritaikomas galimas rato sustiprinimas.
Raudona žuvis siūlo 10×–500× bazinius daugiklius. Rato sustiprinimas 10× gali padidinti maksimumą iki 5 000×. Tai galimas didžiausias rezultatas, ne pradinis prizas ar pažadėta išmoka.
Arkties tiesioginės laidos nuotaika
Sniegas, ledinis ežeras ir žvejo trobelė sudaro aplinką. Vedėjas pristato sukimus, o 3D grafika ir papildytoji realybė atgaivina premijų žvejybą. Ši iliustracija perteikia temą, ji nėra tiesioginė transliacija.
Dažniausi klausimai
Ar galima žaisti telefonu?
Žaidimas veikia kompiuteriuose ir mobiliuosiuose įrenginiuose dalyvaujančiuose kazino. Tiesioginiam vaizdui ir statymams reikia stabilaus ryšio.
Kur žaidimas prieinamas?
Tai priklauso nuo kazino, šalies ir vietinių taisyklių. Ieškokite Ice Fishing tiesioginių žaidimų kataloge ir patikrinkite savo paskyros prieigą.
Ar yra kazino akcijų?
Įmokų pasiūlymus ir žaidimo akcijas nustato kazino. Patikrinkite dalyvavimo bei prasukimo sąlygas ir ar Ice Fishing statymai įskaitomi.
Ar visi gali dalyvauti premijoje?
Stebėti gali visi, bet prizą gali gauti tik iki statymų pabaigos už atitinkamą premiją statę žaidėjai. Sužinojus rezultatą statymo pridėti negalima.
`);
  add('lv',`
Ice Fishing Live ir Evolution tiešraides spēļu šovs uz aizsaluša Arktikas ezera fona. Vadītājs pavada katru raundu, bet rezultātu nosaka virtuāls rats. Liec likmi uz lapu vai zivju bonusu: pareizā izvēle var dot tiešu izmaksu vai atvērt makšķerēšanas raundu. Ātri lēmumi, nejauši reizinātāji un digitāli efekti atdzīvina sniegoto studiju.
Izvēlies žetona vērtību un pirms likmju slēgšanas liec uz vienu vai vairākām iespējām. Vairāku lauku gadījumā pārbaudi kopējo likmi.
Pēc likmju slēgšanas uz rata var parādīties nejauši reizinātāji. Seko griezienam un gaidi, līdz rādītājs norāda uzvarējušo segmentu.
Ja rezultāts atbilst izvēlei, šī likme maksā pēc izmaksu tabulas un piemērojamā pastiprinājuma. Pārējās likmes zaudē.
Atbilstošais zivs segments sāk bonusu. Vadītājs izvelk zivi un atklāj tās reizinātāju; rata pastiprinājums palielina loma vērtību.
Virtuālajam ratam ir 53 segmenti: 46 parastie Leaf un 7 zivju bonusi. Leaf 1 un Leaf 2 ir atsevišķas likmes. Zivju bonusam vajadzīga likme uz attiecīgo veidu.
Leaf pastiprinājumi var būt 3×, 4×, 5×, 7× vai 10×. Bonusiem: 2×, 3×, 4×, 5×, 6×, 7×, 8× vai 10×. Tie tiek piešķirti nejauši pirms grieziena un nav garantēti katrā raundā.
All Bonuses aptver Lil’ Blues, Big Oranges un Huge Reds. Pārbaudi katra lauka summu: vairāk izvēļu palielina kopējo riskēto likmi un negarantē laimestu.
RTP ir atkarīgs no likmes; precīzs procents un ierobežojumi atrodami spēles palīdzībā. Tā ir teorētiska ilgtermiņa atdeve, nevis vienas sesijas rezultāts. Bonusu balvas ievērojami atšķiras, un liels reizinātājs nav garantēts.
Zilā zivs atklāj bāzes reizinātāju no 3× līdz 100× — zemāko balvu diapazonu no trim makšķerēšanas raundiem. Rata pastiprinājums var paaugstināt atklāto vērtību.
Oranžā zivs piedāvā bāzes reizinātājus no 4× līdz 200×. Diapazons ir starp zilo un sarkano bonusu. Pēc zivs izvilkšanas atklāj balvu un piemēro iespējamo pastiprinājumu.
Sarkanā zivs piedāvā bāzes reizinātājus no 10× līdz 500×. Rata pastiprinājums 10× var pacelt maksimumu līdz 5 000×. Tas ir iespējamais maksimums, nevis sākuma balva vai solīta izmaksa.
Arktikas tiešraides šova noskaņa
Sniegs, ledains ezers un makšķernieku namiņš veido ainavu. Vadītājs pavada griezienus, savukārt 3D grafika un papildinātā realitāte atdzīvina bonusus. Šīs lapas ilustrācija atspoguļo tēmu un nav tiešraide.
Bieži uzdotie jautājumi
Vai var spēlēt tālrunī?
Spēle darbojas datoros un mobilajās ierīcēs iesaistītajos kazino. Tiešraides video un likmēm vajadzīgs stabils savienojums.
Kur spēle pieejama?
Piekļuve atkarīga no kazino, valsts un vietējiem noteikumiem. Meklē Ice Fishing tiešraides katalogā un pārbaudi pieejamību savam kontam.
Vai ir kazino akcijas?
Kazino nosaka iemaksu piedāvājumus un spēles akcijas. Pārbaudi dalības un apgrozījuma nosacījumus, kā arī Ice Fishing likmju ieskaitīšanu.
Vai bonusā var piedalīties visi?
Skatīties var visi, bet balvu var saņemt tikai spēlētāji, kuri uz attiecīgo bonusu uzlikuši likmi pirms slēgšanas. Pēc rezultāta uzzināšanas likmi pievienot nevar.
`);
  add('uk',`
Ice Fishing Live — ігрове шоу Evolution на тлі замерзлого арктичного озера. Ведучий супроводжує кожен раунд, а результат визначає віртуальне колесо. Оберіть ставку на листок або рибний бонус: збіг може принести звичайну виплату чи відкрити риболовлю. Швидкі рішення, випадкові множники та цифрові ефекти оживляють зимову студію.
Оберіть номінал фішки та поставте на один чи кілька варіантів до завершення приймання ставок. Якщо обрано кілька полів, перевірте загальну суму.
Після закриття ставок на колесі можуть з’явитися випадкові множники. Дочекайтеся зупинки: покажчик визначить виграшний сектор.
Якщо випав ваш варіант, ця ставка оплачується за таблицею виплат з урахуванням чинного посилення. Решта ставок програє.
Відповідний рибний сектор запускає бонус. Ведучий витягує рибу та розкриває її множник; призначене посилення колеса збільшує вартість улову.
Віртуальне колесо має 53 сектори: 46 звичайних Leaf і 7 рибних бонусних. Leaf 1 та Leaf 2 — окремі ставки. Для участі в рибному бонусі потрібна ставка на відповідний вид.
Посилення Leaf: 3×, 4×, 5×, 7× або 10×. Для бонусів: 2×, 3×, 4×, 5×, 6×, 7×, 8× або 10×. Їх призначають випадково перед обертанням, і вони не гарантовані в кожному раунді.
All Bonuses охоплює Lil’ Blues, Big Oranges і Huge Reds. Перевіряйте суму на кожному полі: більше варіантів збільшує загальний ризик і не гарантує виграшу.
RTP залежить від ставки; точний відсоток і ліміти зазначені в актуальній довідці гри. Це теоретичне повернення на довгій дистанції, а не результат однієї сесії. Бонусні призи різняться, великий множник не гарантований.
Синя риба розкриває базовий множник від 3× до 100× — найнижчий діапазон призів серед трьох риболовель. Посилення колеса може збільшити розкрите значення.
Помаранчева риба дає базові множники від 4× до 200×. Діапазон розташований між синім і червоним бонусами. Після улову розкривають приз і застосовують наявне посилення.
Червона риба дає базові множники від 10× до 500×. Посилення колеса 10× може підняти максимум до 5 000×. Це можливий максимум, а не початковий приз чи обіцяна виплата.
Атмосфера арктичного шоу
Сніг, крижане озеро та рибальський будиночок створюють декорації. Ведучий супроводжує обертання, а 3D-графіка й доповнена реальність оживляють бонусну риболовлю. Ілюстрація на сторінці передає тематику й не є прямою трансляцією.
Поширені запитання
Чи можна грати з телефона?
Гра працює на комп’ютерах і мобільних пристроях через казино, що її пропонують. Для відео й ставок потрібне стабільне з’єднання.
У яких країнах доступна гра?
Доступ залежить від казино, країни та місцевих правил. Знайдіть Ice Fishing у каталозі живих ігор і перевірте доступність для свого акаунта.
Чи є спеціальні акції казино?
Депозитні пропозиції та ігрові акції визначає казино. Перевірте умови участі, вимоги до відіграшу та чи враховуються ставки Ice Fishing.
Усі можуть брати участь у бонусі?
Дивитися можуть усі, але приз доступний лише тим, хто поставив на відповідний бонус до закриття ставок. Після появи результату додати ставку не можна.
`);
  add('tr',`
Ice Fishing Live, donmuş bir Arktik gölünde geçen Evolution canlı oyun şovudur. Sunucu her tura eşlik ederken sonucu sanal bir çark belirler. Yaprağa veya balık bonusuna bahis yapın: doğru seçim doğrudan ödeme sağlayabilir ya da balık tutma turunu açabilir. Hızlı kararlar, rastgele çarpanlar ve dijital efektler karlı stüdyoyu canlandırır.
Fiş değerini seçin ve bahisler kapanmadan bir veya birkaç seçeneğe bahis yapın. Birden fazla alan seçerseniz toplam tutarı kontrol edin.
Bahisler kapandıktan sonra çarka rastgele çarpanlar eklenebilir. Dönüşü izleyin ve göstergenin kazanan bölümü belirlemesini bekleyin.
Sonuç seçiminizle eşleşirse bahis, ödeme tablosuna ve geçerli artırıma göre ödenir. Diğer bahisler kaybedilir.
Eşleşen balık bölümü bonus turunu başlatır. Sunucu bir balık çeker ve ödül çarpanını gösterir; çarka atanmış artırım avın değerini yükseltir.
Sanal çarkta 53 bölüm bulunur: 46 normal Leaf ve 7 balık bonusu. Leaf 1 ve Leaf 2 ayrı bahis seçenekleridir. Balık bonusu için ilgili türe bahis yapmak gerekir.
Leaf artırımları 3×, 4×, 5×, 7× veya 10× olabilir. Bonuslarda 2×, 3×, 4×, 5×, 6×, 7×, 8× veya 10× mümkündür. Dönüş öncesi rastgele atanırlar ve her turda bulunmaları garanti değildir.
All Bonuses, Lil’ Blues, Big Oranges ve Huge Reds seçeneklerini kapsar. Her alanın tutarını kontrol edin: daha fazla sonucu kapsamak toplam riski artırır, kazanç garantilemez.
RTP seçilen bahse bağlıdır; kesin oran ve limitler için güncel oyun yardımını inceleyin. Tek bir oturumun sonucu değil, uzun vadeli teorik geri dönüş oranıdır. Bonus ödülleri değişkendir ve büyük bir çarpan garanti edilmez.
Mavi balık, 3× ile 100× arasında temel çarpan gösterir. Bu, üç balık turunun en düşük ödül aralığıdır. Çark artırımı açıklanan değeri yükseltebilir.
Turuncu balık, 4× ile 200× arasında temel çarpan sunar. Aralığı mavi ile kırmızı arasındadır. Balık çekilir, ödül açıklanır ve varsa çark artırımı uygulanır.
Kırmızı balık, 10× ile 500× arasında temel çarpan sunar. Çarkın 10× artırımı en yüksek sonucu 5.000× yapabilir. Bu olası maksimumdur; başlangıç ödülü veya ödeme vaadi değildir.
Arktik canlı şov atmosferi
Kar, buzlu göl ve balıkçı kulübesi dekoru oluşturur. Sunucu dönüşleri anlatırken 3D grafikler ve artırılmış gerçeklik bonus avını canlandırır. Bu sayfadaki çizim temayı yansıtır; canlı yayın değildir.
Sık sorulan sorular
Telefonda oynayabilir miyim?
Oyun, katılımcı casinolar üzerinden bilgisayar ve mobil cihazlarda çalışır. Canlı video ve bahisler için istikrarlı bağlantı gerekir.
Oyun nerede mevcut?
Erişim casinoya, ülkenize ve yerel kurallara bağlıdır. Canlı oyun kataloğunda Ice Fishing arayın ve hesabınız için uygunluğu kontrol edin.
Casino kampanyaları var mı?
Yatırım tekliflerini ve oyuna özel kampanyaları casino belirler. Katılım, çevrim şartları ve Ice Fishing bahislerinin sayılıp sayılmadığını kontrol edin.
Herkes bonus turuna katılabilir mi?
Herkes izleyebilir; ancak ödüle yalnızca bahisler kapanmadan ilgili bonusa bahis yapanlar hak kazanır. Sonuç belli olduktan sonra bahis eklenemez.
`);
  add('kk',`
Ice Fishing Live — Evolution ұсынған, мұз қатқан Арктика көлінде өтетін тікелей ойын шоуы. Жүргізуші әр раундты таныстырады, ал нәтижені виртуалды дөңгелек анықтайды. Жапыраққа немесе балық бонусына бәс тігіңіз: сәйкес нәтиже тікелей төлем беруі не балық аулау раундын ашуы мүмкін. Жылдам шешімдер, кездейсоқ көбейткіштер мен цифрлық әсерлер қарлы студияны жандандырады.
Фишканың құнын таңдап, бәс қабылдау аяқталғанша бір немесе бірнеше нұсқаға тігіңіз. Бірнеше алаң таңдасаңыз, жалпы соманы тексеріңіз.
Бәс қабылдау жабылған соң дөңгелекте кездейсоқ көбейткіштер пайда болуы мүмкін. Айналымды бақылап, көрсеткіш жеңген секторды көрсеткенін күтіңіз.
Нәтиже таңдауыңызға сәйкес келсе, сол бәс төлем кестесі мен қолданылатын күшейтуге сай төленеді. Басқа бәстер ұтылады.
Сәйкес балық секторы бонус раундын бастайды. Жүргізуші балықты тартып шығарып, көбейткішін ашады; дөңгелектегі күшейту оның мәнін арттырады.
Виртуалды дөңгелекте 53 сектор бар: 46 қалыпты Leaf және 7 балық бонусы. Leaf 1 мен Leaf 2 — бөлек бәс нұсқалары. Бонусқа қатысу үшін сәйкес балық түріне бәс қажет.
Leaf күшейткіштері: 3×, 4×, 5×, 7× немесе 10×. Бонустарда: 2×, 3×, 4×, 5×, 6×, 7×, 8× немесе 10×. Олар айналым алдында кездейсоқ тағайындалады және әр раундта бола бермейді.
All Bonuses Lil’ Blues, Big Oranges және Huge Reds түрлерін қамтиды. Әр алаңның сомасын тексеріңіз: көп нұсқа жалпы тәуекелді арттырады, бірақ ұтысқа кепілдік бермейді.
RTP таңдалған бәске байланысты; нақты пайыз бен шектеулер ойынның өзекті анықтамасында көрсетіледі. Бұл ұзақ мерзімді теориялық қайтарым, бір сессияның нәтижесі емес. Бонус жүлделері әртүрлі, үлкен көбейткішке кепілдік жоқ.
Көк балық 3×–100× аралығындағы негізгі көбейткішті ашады. Бұл үш балық аулау бонусының ең төменгі жүлде аралығы. Дөңгелектегі күшейту ашылған мәнді арттыра алады.
Қызғылт сары балық 4×–200× негізгі көбейткіштерін береді. Аралығы көк пен қызыл бонустың ортасында. Балық ұсталып, жүлде ашылған соң бар күшейту қолданылады.
Қызыл балық 10×–500× негізгі көбейткіштерін береді. Дөңгелектегі 10× күшейту ең жоғары нәтижені 5 000×-ке жеткізе алады. Бұл ықтимал максимум, бастапқы жүлде немесе уәде етілген төлем емес.
Арктикалық шоу атмосферасы
Қар, мұзды көл мен балықшы үйі ойын көрінісін жасайды. Жүргізуші айналымдарды жүргізіп, 3D графика мен кеңейтілген шындық бонустық балық аулауды жандандырады. Мұндағы иллюстрация тақырыпты көрсетеді, тікелей эфир емес.
Жиі қойылатын сұрақтар
Телефонмен ойнауға бола ма?
Ойын оны ұсынатын казинолар арқылы компьютер мен мобильді құрылғыларда жұмыс істейді. Бейне мен бәс үшін тұрақты байланыс керек.
Ойын қай елдерде қолжетімді?
Қолжетімділік казиноға, елге және жергілікті ережелерге байланысты. Ice Fishing ойынын тікелей ойындар каталогынан тауып, аккаунтыңыз үшін тексеріңіз.
Казино акциялары бар ма?
Депозит ұсыныстары мен ойын акцияларын казино белгілейді. Қатысу, айналым талаптарын және Ice Fishing бәстерінің есепке алынуын тексеріңіз.
Бонусқа бәрі қатыса ала ма?
Барлығы көре алады, бірақ жүлдеге бәс қабылдау жабылғанша тиісті бонусқа тіккендер ғана қатысады. Нәтиже белгілі болған соң бәс қосылмайды.
`);
  add('uz',`
Ice Fishing Live — Evolution kompaniyasining muzlagan Arktika ko‘lida kechadigan jonli o‘yin shousi. Boshlovchi har bir raundga hamrohlik qiladi, natijani esa virtual g‘ildirak belgilaydi. Barg yoki baliq bonusiga tiking: mos natija bevosita to‘lov berishi yoki baliq ovlash raundini ochishi mumkin. Tez qarorlar, tasodifiy ko‘paytirgichlar va raqamli effektlar qorli studiyani jonlantiradi.
Fishka qiymatini tanlang va tikishlar yopilishidan oldin bir yoki bir nechta variantga tiking. Bir necha maydon tanlasangiz, umumiy summani tekshiring.
Tikishlar yopilgach, g‘ildirakda tasodifiy ko‘paytirgichlar paydo bo‘lishi mumkin. Aylanishni kuzating va ko‘rsatkich g‘olib sektorni belgilashini kuting.
Natija tanlovingizga mos kelsa, shu tikish to‘lov jadvali va amaldagi kuchaytirishga ko‘ra to‘lanadi. Qolgan tikishlar yutqazadi.
Mos baliq sektori bonusni boshlaydi. Boshlovchi baliqni tortib olib, uning ko‘paytirgichini ochadi; g‘ildirakdagi kuchaytirish ov qiymatini oshiradi.
Virtual g‘ildirakda 53 sektor bor: 46 oddiy Leaf va 7 baliq bonusi. Leaf 1 va Leaf 2 alohida tikish variantlaridir. Bonusda qatnashish uchun mos baliq turiga tikish kerak.
Leaf kuchaytirishlari 3×, 4×, 5×, 7× yoki 10× bo‘ladi. Bonuslarda 2×, 3×, 4×, 5×, 6×, 7×, 8× yoki 10× mumkin. Ular aylanish oldidan tasodifiy belgilanadi va har raundda kafolatlanmaydi.
All Bonuses Lil’ Blues, Big Oranges va Huge Reds turlarini qamraydi. Har bir maydon summasini tekshiring: ko‘proq variant umumiy xavfdagi mablag‘ni oshiradi, yutuqni kafolatlamaydi.
RTP tanlangan tikishga bog‘liq; aniq foiz va limitlarni o‘yin yordamidan tekshiring. Bu uzoq muddatli nazariy qaytim, bir seans natijasi emas. Bonus sovrinlari turlicha, katta ko‘paytirgich kafolatlanmagan.
Ko‘k baliq 3×–100× asosiy ko‘paytirgichni ochadi. Bu uchta baliq ovlash raundining eng past sovrin oralig‘i. G‘ildirak kuchaytirishi ochilgan qiymatni oshirishi mumkin.
To‘q sariq baliq 4×–200× asosiy ko‘paytirgichlarni beradi. Oralig‘i ko‘k va qizil bonuslar o‘rtasida. Baliq tutilib, sovrin ochilgach, mavjud kuchaytirish qo‘llanadi.
Qizil baliq 10×–500× asosiy ko‘paytirgichlarni beradi. G‘ildirakdagi 10× kuchaytirish maksimumni 5 000× ga yetkazishi mumkin. Bu ehtimoliy maksimum, boshlang‘ich sovrin yoki va’da qilingan to‘lov emas.
Arktikadagi jonli shou muhiti
Qor, muzli ko‘l va baliqchi kulbasi manzarani yaratadi. Boshlovchi aylanishlarni boshqaradi, 3D grafika va kengaytirilgan reallik esa bonus ovini jonlantiradi. Bu sahifadagi tasvir mavzuni aks ettiradi, jonli efir emas.
Ko‘p beriladigan savollar
Telefonda o‘ynasa bo‘ladimi?
O‘yin hamkor kazinolarda kompyuter va mobil qurilmalarda ishlaydi. Jonli video va tikishlar uchun barqaror aloqa kerak.
O‘yin qayerda mavjud?
Kirish kazino, mamlakat va mahalliy qoidalarga bog‘liq. Jonli o‘yinlar katalogidan Ice Fishingni topib, hisobingiz uchun mavjudligini tekshiring.
Kazino aksiyalari bormi?
Depozit takliflari va o‘yin aksiyalarini kazino belgilaydi. Ishtirok, aylantirish shartlari va Ice Fishing tikishlari hisoblanishini tekshiring.
Bonusda hamma qatnasha oladimi?
Hamma tomosha qilishi mumkin, ammo sovrin faqat tikishlar yopilguncha mos bonusga tikkanlarga beriladi. Natija ma’lum bo‘lgach tikish qo‘shib bo‘lmaydi.
`);
  add('tg',`
Ice Fishing Live — намоиши бозии зиндаи Evolution дар манзараи кӯли яхбастаи Арктика аст. Баранда ҳар даврро ҳамроҳӣ мекунад ва чархи маҷозӣ натиҷаро муайян месозад. Ба барг ё бонуси моҳӣ шарт гузоред: мувофиқат метавонад пардохти мустақим диҳад ё даври моҳигириро кушояд. Қарорҳои зуд, зарбкунандаҳои тасодуфӣ ва эффектҳои рақамӣ студияи барфиро зинда мекунанд.
Арзиши фишкаро интихоб намуда, пеш аз бастани шартҳо ба як ё чанд интихоб шарт гузоред. Ҳангоми интихоби чанд майдон маблағи умумиро санҷед.
Пас аз бастани шартҳо дар чарх зарбкунандаҳои тасодуфӣ пайдо шуда метавонанд. Чархишро тамошо кунед ва муайян шудани бахши бурднокро интизор шавед.
Агар натиҷа ба интихоби шумо мувофиқ бошад, шарт аз рӯи ҷадвали пардохт ва тақвияти ҷорӣ пардохт мешавад. Шартҳои дигар бохта мешаванд.
Бахши мувофиқи моҳӣ бонусро оғоз мекунад. Баранда моҳиро берун кашида, зарбкунандаи онро мекушояд; тақвияти чарх арзиши сайдро зиёд мекунад.
Чархи маҷозӣ 53 бахш дорад: 46 Leaf-и одӣ ва 7 бонуси моҳӣ. Leaf 1 ва Leaf 2 интихобҳои ҷудогонаи шартанд. Барои бонус ба навъи мувофиқи моҳӣ шарт гузоштан лозим аст.
Тақвияти Leaf метавонад 3×, 4×, 5×, 7× ё 10× бошад. Барои бонусҳо: 2×, 3×, 4×, 5×, 6×, 7×, 8× ё 10×. Онҳо пеш аз чархиш тасодуфӣ таъин мешаванд ва дар ҳар давр кафолат надоранд.
All Bonuses навъҳои Lil’ Blues, Big Oranges ва Huge Reds-ро фаро мегирад. Маблағи ҳар майдонро санҷед: интихоби бештар маблағи умумии зери хатарро зиёд мекунад, вале бурдро кафолат намедиҳад.
RTP аз шарт вобаста аст; фоизи дақиқ ва ҳудудҳоро дар дастури ҷории бозӣ бинед. Ин бозгашти назариявии дарозмуддат аст, на натиҷаи як нишаст. Ҷоизаҳои бонусӣ фарқ мекунанд ва зарбкунандаи калон кафолат надорад.
Моҳии кабуд зарбкунандаи асосии аз 3× то 100×-ро мекушояд. Ин пасттарин доираи ҷоиза дар байни се моҳигирӣ аст. Тақвияти чарх метавонад арзиши кушодашударо зиёд кунад.
Моҳии норанҷӣ зарбкунандаҳои асосии аз 4× то 200× медиҳад. Доираи он байни кабуд ва сурх ҷойгир аст. Баъди сайд ҷоиза ошкор шуда, тақвияти мавҷуд татбиқ мегардад.
Моҳии сурх зарбкунандаҳои асосии аз 10× то 500× медиҳад. Тақвияти 10× метавонад ҳадди болоро ба 5 000× расонад. Ин ҳадди имконпазир аст, на ҷоизаи ибтидоӣ ё пардохти ваъдашуда.
Фазои намоиши арктикӣ
Барф, кӯли яхин ва кулбаи моҳигир манзараро месозанд. Баранда чархишҳоро шарҳ медиҳад, графикаи 3D ва воқеияти афзуда бонусҳоро зинда мекунанд. Тасвири ин саҳифа мавзӯъро нишон медиҳад ва пахши мустақим нест.
Саволҳои маъмул
Дар телефон бозӣ кардан мумкин аст?
Бозӣ дар компютер ва дастгоҳҳои мобилӣ тавассути казиноҳои иштироккунанда кор мекунад. Барои видео ва шартҳо пайвасти устувор лозим аст.
Бозӣ дар куҷо дастрас аст?
Дастрасӣ аз казино, кишвар ва қоидаҳои маҳаллӣ вобаста аст. Ice Fishing-ро дар феҳристи бозиҳои зинда ёфта, дастрасии ҳисоби худро санҷед.
Казино аксия дорад?
Пешниҳодҳои пасандоз ва аксияҳои бозиро казино муайян мекунад. Шартҳои иштирок, гардиши маблағ ва ҳисоб шудани шартҳои Ice Fishing-ро санҷед.
Ҳама дар бонус иштирок карда метавонанд?
Ҳама тамошо карда метавонанд, аммо ҷоизаро танҳо онҳое мегиранд, ки пеш аз бастан ба бонуси мувофиқ шарт гузоштаанд. Баъди маълум шудани натиҷа шарт илова намешавад.
`);
  add('mn',`
Ice Fishing Live нь хөлдсөн Арктикийн нуурын орчинтой Evolution-ийн шууд тоглоомын шоу юм. Хөтлөгч тойрог бүрийг тайлбарлаж, үр дүнг виртуал хүрд тодорхойлно. Навч эсвэл загасны бонус дээр бооцоо тавина: таарвал шууд төлбөр авах эсвэл загасчлах тойрог нээгдэж болно. Шуурхай сонголт, санамсаргүй үржүүлэгч, дижитал эффект цастай студийг амилуулдаг.
Чипийн дүнгээ сонгоод бооцоо хаагдахаас өмнө нэг эсвэл хэд хэдэн сонголтод тавь. Олон талбар сонговол нийт бооцоогоо шалгаарай.
Бооцоо хаагдсаны дараа хүрдэнд санамсаргүй үржүүлэгч нэмэгдэж болно. Эргэлтийг ажиглаж, заагч хожсон хэсгийг заахыг хүлээ.
Үр дүн таны сонголттой таарвал тухайн бооцоог төлбөрийн хүснэгт болон хүчинтэй өсгөлтөөр тооцно. Бусад бооцоо алдагдана.
Тохирох загасны хэсэг бонусыг эхлүүлнэ. Хөтлөгч загас татаж гаргаад үржүүлэгчийг ил болгоно; хүрдний өсгөлт барьсан загасны утгыг нэмэгдүүлнэ.
Виртуал хүрд 53 хэсэгтэй: 46 энгийн Leaf, 7 загасны бонус. Leaf 1 болон Leaf 2 нь тусдаа бооцооны сонголт. Бонуст оролцохын тулд тохирох загасны төрөлд бооцоо тавих хэрэгтэй.
Leaf өсгөлт нь 3×, 4×, 5×, 7× эсвэл 10× байж болно. Бонуст 2×, 3×, 4×, 5×, 6×, 7×, 8× эсвэл 10× байна. Эргэлтийн өмнө санамсаргүй оноодог тул тойрог бүрд заавал гарахгүй.
All Bonuses нь Lil’ Blues, Big Oranges, Huge Reds-ийг хамарна. Талбар бүрийн дүнг шалга: олон үр дүн хамрах нь эрсдэлд оруулах нийт бооцоог нэмэгдүүлж, хожлыг батлахгүй.
RTP нь сонгосон бооцооноос хамаарна. Нарийн хувь ба хязгаарыг тоглоомын одоогийн тусламжаас үз. Энэ нь урт хугацааны онолын өгөөж бөгөөд нэг удаагийн тоглолтын үр дүн биш. Том үржүүлэгч баталгаагүй.
Цэнхэр загас 3×–100× суурь үржүүлэгчийг нээнэ. Энэ нь гурван загасчлах бонусын хамгийн бага шагналын хүрээ. Хүрдний өсгөлт ил болсон утгыг нэмэгдүүлж болно.
Улбар шар загас 4×–200× суурь үржүүлэгч санал болгоно. Хүрээ нь цэнхэр ба улааны дунд оршино. Загасыг татаж, шагналыг нээсний дараа байгаа өсгөлтийг хэрэглэнэ.
Улаан загас 10×–500× суурь үржүүлэгч санал болгоно. Хүрдний 10× өсгөлт дээд үр дүнг 5 000× болгож болно. Энэ нь боломжит дээд хэмжээ болохоос эхлэх шагнал эсвэл амласан төлбөр биш.
Арктикийн шууд шоуны уур амьсгал
Цас, мөсөн нуур, загасчны байшин орчныг бүрдүүлнэ. Хөтлөгч эргэлтийг тайлбарлаж, 3D график болон нэмэгдүүлсэн бодит байдал бонусыг амилуулна. Энэ хуудсын зураг сэдвийг дүрсэлсэн бөгөөд шууд дамжуулалт биш.
Түгээмэл асуултууд
Утсаар тоглож болох уу?
Тоглоом оролцогч казиногоор дамжин компьютер болон гар утсанд ажиллана. Шууд видео, бооцоонд тогтвортой холболт шаардлагатай.
Тоглоом хаана боломжтой вэ?
Казино, улс болон орон нутгийн дүрмээс хамаарна. Шууд тоглоомын каталогоос Ice Fishing-ийг хайж, өөрийн бүртгэлд нээлттэй эсэхийг шалга.
Казиногийн урамшуулал бий юу?
Цэнэглэлтийн санал ба тоглоомын урамшууллыг казино тогтооно. Оролцох нөхцөл, эргэлтийн шаардлага, Ice Fishing-ийн бооцоо тооцогдох эсэхийг шалга.
Бонуст хүн бүр оролцож болох уу?
Хүн бүр үзэж болно. Харин бооцоо хаагдахаас өмнө тохирох бонуст бооцоо тавьсан тоглогч л шагнал авах эрхтэй. Үр дүн гарсны дараа бооцоо нэмэх боломжгүй.
`);
  add('ja',`
Ice Fishing Liveは、凍った北極の湖を舞台にしたEvolutionのライブゲームショーです。司会者が各ラウンドを進行し、バーチャルホイールが結果を決めます。葉または魚のボーナスにベットし、的中すると通常の配当を受け取るか、釣りラウンドへ進みます。テンポのよい選択、ランダム倍率、デジタル演出が雪景色のスタジオを彩ります。
チップの金額を選び、受付終了までに1つ以上の選択肢へベットします。複数の欄を選んだ場合は合計ベット額を確認してください。
受付が終了すると、ホイールにランダム倍率が付く場合があります。回転を見守り、ポインターが当選セグメントを示すまで待ちます。
結果がベットした選択肢と一致すると、そのベットが配当表と適用される倍率に従って支払われます。他のベットは失われます。
対応する魚のセグメントに止まるとボーナスが始まります。司会者が魚を釣り上げて倍率を公開し、ホイールの追加倍率があれば魚の値を引き上げます。
バーチャルホイールは53セグメントで、通常のLeafが46、魚のボーナスが7です。Leaf 1とLeaf 2は別のベットです。魚のボーナスに参加するには対応する種類へのベットが必要です。
Leafの追加倍率は3×、4×、5×、7×、10×。ボーナス用は2×、3×、4×、5×、6×、7×、8×、10×です。回転前にランダムで付与され、毎回付くわけではありません。
All BonusesはLil’ Blues、Big Oranges、Huge Redsをまとめて対象にします。各欄の金額を確認してください。選択肢を増やすとリスクにさらす合計額も増え、勝利が保証されるわけではありません。
RTPはベットの種類で異なります。正確な割合と上限は最新のゲームヘルプを確認してください。RTPは長期の理論上の還元率で、1回のプレイ結果ではありません。ボーナス賞金には幅があり、高倍率は保証されません。
青い魚の基本倍率は3×〜100×で、3種類の釣りボーナスの中で最も低い賞金範囲です。ホイールの追加倍率があれば、公開された値がさらに増えます。
オレンジ色の魚の基本倍率は4×〜200×です。青と赤の中間にあたります。魚を釣り上げて賞金を公開し、該当するホイールの追加倍率を適用します。
赤い魚の基本倍率は10×〜500×です。ホイールの10×追加倍率が付くと最高5,000×に達する可能性があります。これは最大の可能値で、最低賞金や支払いの約束ではありません。
北極のライブショーの雰囲気
雪、凍った湖、釣り小屋がゲームの舞台です。司会者が回転を案内し、3D映像やAR効果がボーナスの釣りを演出します。このページのイラストはテーマを表したもので、ライブ配信ではありません。
よくある質問
スマートフォンでも遊べますか？
対応するカジノを通じてPCやモバイル端末で利用できます。ライブ映像とベット操作には安定した通信環境が必要です。
どこで利用できますか？
カジノ、居住国、現地の規則によって異なります。ライブゲーム一覧でIce Fishingを探し、自分のアカウントで利用できるか確認してください。
カジノのキャンペーンはありますか？
入金特典やゲーム限定のキャンペーンはカジノが設定します。対象条件、賭け条件、Ice Fishingのベットが対象になるかを確認してください。
誰でもボーナスに参加できますか？
誰でも視聴できますが、賞金の対象は受付終了前に該当するボーナスへベットしたプレイヤーのみです。結果を知ってからベットを追加することはできません。
`);
  add('zh-TW',`
Ice Fishing Live 是 Evolution 推出的真人遊戲節目，以冰封的北極湖泊為背景。主持人帶領每一回合，由虛擬轉輪決定結果。你可以投注葉子或釣魚獎勵；命中選項時，可能直接獲得派彩，或進入釣魚回合。快速選擇、隨機倍率與數位特效，讓雪地攝影棚充滿節目氣氛。
選擇籌碼面額，在投注截止前押注一個或多個選項。若選擇多個投注區，請確認總投注額。
投注截止後，轉輪可能隨機加入倍率。觀看轉輪旋轉，等待指針指出中獎區塊。
若結果與投注選項一致，該筆投注依賠付表及適用的加成計算。其他選項的投注則會落空。
停在對應的魚類區塊便會啟動獎勵回合。主持人釣起魚並揭曉倍率；轉輪分配的加成會提高該條魚的數值。
虛擬轉輪共有 53 個區塊：46 個一般 Leaf 區塊與 7 個釣魚獎勵區塊。Leaf 1 和 Leaf 2 是獨立投注選項。要獲得魚類獎勵，必須投注對應種類。
Leaf 加成可為 3×、4×、5×、7× 或 10×。獎勵加成可為 2×、3×、4×、5×、6×、7×、8× 或 10×。加成在旋轉前隨機分配，並非每回合都會出現。
All Bonuses 涵蓋 Lil’ Blues、Big Oranges 和 Huge Reds。請檢查各選項的投注額：涵蓋更多結果會增加總風險金額，並不保證中獎。
RTP 依投注選項而異，確切百分比及限額請查看遊戲目前的說明。它代表長期理論回報率，不是單次遊玩的結果。獎勵金額差異很大，也不保證出現高倍率。
藍色魚會揭曉 3× 至 100× 的基礎倍率，是三種釣魚獎勵中最低的獎金範圍。若轉輪有指定加成，揭曉的數值還能提高。
橘色魚提供 4× 至 200× 的基礎倍率，範圍介於藍色與紅色之間。主持人釣起魚、揭曉獎勵後，再套用適用的轉輪加成。
紅色魚提供 10× 至 500× 的基礎倍率。轉輪的 10× 加成可使最高結果達到 5,000×。這是可能的上限，不是起始獎金或保證派彩。
北極真人節目的氛圍
白雪、冰湖與釣魚小屋構成遊戲場景。主持人引導轉輪流程，3D 畫面及擴增實境特效讓釣魚獎勵更生動。本頁插圖呈現遊戲主題，並非即時直播。
常見問題
可以用手機玩嗎？
提供此遊戲的娛樂城支援電腦與行動裝置。直播影像和投注介面需要穩定的網路連線。
哪些地區可以使用？
取決於娛樂城、所在國家及當地規則。請在真人遊戲目錄搜尋 Ice Fishing，確認帳號是否能使用。
有娛樂城優惠嗎？
存款優惠與遊戲專屬活動由娛樂城決定。參加前請確認資格、流水條件，以及 Ice Fishing 投注是否計入活動。
所有人都能參與獎勵回合嗎？
所有人都能觀看，但只有在截止前投注對應獎勵選項的玩家才有資格取得獎金。結果揭曉後不能補加投注。
`);
  add('zh-HK',`
Ice Fishing Live 是 Evolution 推出的真人遊戲節目，背景是結冰的北極湖泊。主持人帶領每個回合，結果由虛擬轉輪決定。你可以投注葉子或釣魚獎勵；命中選項時，可能直接獲得派彩，或進入釣魚回合。快速選擇、隨機倍數和數碼特效，令雪地攝影棚充滿節目氣氛。
選擇籌碼面額，在投注截止前下注一個或多個選項。若選擇多個投注區，請確認總投注額。
投注截止後，轉輪可能隨機加入倍數。觀看轉輪旋轉，等待指針指出中獎區塊。
若結果與投注選項一致，該注按照派彩表及適用加成計算。其他選項的投注則會落空。
停在對應的魚類區塊便會啟動獎勵回合。主持人釣起魚並揭曉倍數；轉輪分配的加成會提高該條魚的數值。
虛擬轉輪共有 53 個區塊：46 個一般 Leaf 區塊與 7 個釣魚獎勵區塊。Leaf 1 和 Leaf 2 是獨立投注選項。要取得魚類獎勵，必須投注對應種類。
Leaf 加成可為 3×、4×、5×、7× 或 10×。獎勵加成可為 2×、3×、4×、5×、6×、7×、8× 或 10×。加成在旋轉前隨機分配，並非每回合都會出現。
All Bonuses 涵蓋 Lil’ Blues、Big Oranges 和 Huge Reds。請檢查各選項的注碼：涵蓋更多結果會增加總風險金額，並不保證中獎。
RTP 因投注選項而異，確切百分比及限額請查看遊戲最新說明。它代表長期理論回報率，不是單次遊玩的結果。獎勵金額差異很大，也不保證出現高倍數。
藍色魚會揭曉 3× 至 100× 的基本倍數，是三種釣魚獎勵中最低的獎金範圍。如轉輪有指定加成，揭曉的數值還可提高。
橙色魚提供 4× 至 200× 的基本倍數，範圍介乎藍色與紅色之間。主持人釣起魚、揭曉獎勵後，再套用適用的轉輪加成。
紅色魚提供 10× 至 500× 的基本倍數。轉輪的 10× 加成可令最高結果達到 5,000×。這是可能的上限，並非起始獎金或保證派彩。
北極真人節目的氣氛
白雪、冰湖和釣魚小屋構成遊戲場景。主持人引導轉輪流程，3D 畫面及擴增實境特效令釣魚獎勵更生動。本頁插圖呈現遊戲主題，並非即時直播。
常見問題
可以用手機玩嗎？
提供此遊戲的娛樂場支援電腦及流動裝置。直播影像和投注介面需要穩定的網絡連線。
哪些地區可以使用？
視乎娛樂場、所在國家及當地規則。請在真人遊戲目錄搜尋 Ice Fishing，確認帳戶是否能使用。
有娛樂場優惠嗎？
存款優惠及遊戲專屬活動由娛樂場決定。參加前請確認資格、投注流水條件，以及 Ice Fishing 注碼是否計入活動。
所有人都能參與獎勵回合嗎？
所有人都可以觀看，但只有在截止前投注對應獎勵選項的玩家才有資格獲得獎金。結果揭曉後不能補加投注。
`);
  add('ar',`
Ice Fishing Live برنامج ألعاب مباشر من Evolution تدور أحداثه على بحيرة متجمدة في القطب الشمالي. يرافق المقدم كل جولة، وتحدد عجلة افتراضية النتيجة. راهن على ورقة أو مكافأة صيد: قد يمنحك التطابق دفعة مباشرة أو يفتح جولة صيد. تجمع اللعبة بين قرارات سريعة ومضاعفات عشوائية واستوديو ثلجي تنبض فيه المؤثرات الرقمية بالحياة.
اختر قيمة الرقاقة وراهن على خيار واحد أو أكثر قبل إغلاق الرهانات. تحقق من إجمالي المبلغ عند اختيار عدة خانات.
بعد إغلاق الرهانات قد تُضاف مضاعفات عشوائية إلى العجلة. تابع الدوران وانتظر حتى يحدد المؤشر القطاع الفائز.
إذا طابقت النتيجة خيارك، يُدفع الرهان وفق جدول الجوائز والتعزيز المطبق. أما الرهانات على الخيارات الأخرى فتخسر.
يُفعّل قطاع السمكة المطابق جولة المكافأة. يسحب المقدم سمكة ويكشف مضاعفها، ويزيد تعزيز العجلة المعين من قيمة الصيد.
تضم العجلة الافتراضية 53 قطاعًا: 46 قطاع Leaf عاديًا و7 قطاعات لمكافآت الصيد. Leaf 1 وLeaf 2 خياران منفصلان للرهان. تتطلب مكافأة السمكة رهانًا على نوعها المطابق.
تعزيزات Leaf هي 3× أو 4× أو 5× أو 7× أو 10×. وللمكافآت: 2× أو 3× أو 4× أو 5× أو 6× أو 7× أو 8× أو 10×. تُعيّن عشوائيًا قبل الدوران ولا يُضمن ظهورها في كل جولة.
يغطي All Bonuses خيارات Lil’ Blues وBig Oranges وHuge Reds. راجع مبلغ كل خانة: تغطية نتائج أكثر تزيد المبلغ الإجمالي المعرض للخسارة ولا تضمن الفوز.
تعتمد نسبة RTP على الرهان المختار؛ راجع مساعدة اللعبة لمعرفة النسبة الدقيقة والحدود الحالية. إنها عائد نظري طويل الأجل وليست نتيجة جلسة واحدة. تتفاوت جوائز المكافآت ولا يوجد ضمان لمضاعف كبير.
تكشف السمكة الزرقاء مضاعفًا أساسيًا من 3× إلى 100×، وهو أقل نطاق للجوائز بين جولات الصيد الثلاث. قد يرفع تعزيز العجلة القيمة المكشوفة.
تقدم السمكة البرتقالية مضاعفات أساسية من 4× إلى 200×. يقع نطاقها بين الأزرق والأحمر. تُسحب السمكة وتُكشف الجائزة ثم يُطبّق تعزيز العجلة إن وُجد.
تقدم السمكة الحمراء مضاعفات أساسية من 10× إلى 500×. يمكن لتعزيز العجلة 10× رفع أقصى نتيجة إلى 5,000×. هذا حد أقصى محتمل، وليس الجائزة الابتدائية أو دفعة مضمونة.
أجواء برنامج مباشر في القطب الشمالي
يشكل الثلج والبحيرة الجليدية وكوخ الصيد مشهد اللعبة. يشرح المقدم الدوران، وتُحيي الرسوم ثلاثية الأبعاد والواقع المعزز مشاهد المكافآت. الرسم في هذه الصفحة يعكس الفكرة وليس بثًا مباشرًا.
أسئلة شائعة
هل يمكن اللعب على الهاتف؟
تعمل اللعبة على الحاسوب والأجهزة المحمولة عبر الكازينوهات المشاركة. يلزم اتصال ثابت لمشاهدة الفيديو المباشر ووضع الرهانات.
أين تتوفر اللعبة؟
يعتمد الوصول على الكازينو وبلدك والقواعد المحلية. ابحث عن Ice Fishing في قائمة الألعاب المباشرة وتحقق من إتاحتها لحسابك.
هل توجد عروض من الكازينو؟
يحدد الكازينو عروض الإيداع والعروض الخاصة باللعبة. تحقق من الأهلية ومتطلبات المراهنة واحتساب رهانات Ice Fishing قبل استخدام العرض.
هل يمكن للجميع المشاركة في المكافأة؟
يمكن للجميع المشاهدة، لكن الجائزة متاحة فقط لمن راهن على المكافأة المطابقة قبل إغلاق الرهانات. لا يمكن إضافة رهان بعد معرفة النتيجة.
`);
  add('he',`
Ice Fishing Live הוא שעשועון משחקים חי של Evolution על רקע אגם ארקטי קפוא. מנחה מלווה כל סיבוב, וגלגל וירטואלי קובע את התוצאה. מהמרים על עלה או על בונוס דיג: התאמה עשויה לשלם ישירות או לפתוח סיבוב דיג. החלטות מהירות, מכפילים אקראיים ואפקטים דיגיטליים מחיים את האולפן המושלג.
בחרו ערך אסימון והימרו על אפשרות אחת או יותר לפני סגירת ההימורים. בדקו את הסכום הכולל אם בחרתם כמה משבצות.
לאחר סגירת ההימורים עשויים להתווסף לגלגל מכפילים אקראיים. עקבו אחר הסיבוב והמתינו עד שהמצביע יסמן את המקטע הזוכה.
אם התוצאה תואמת לבחירה שלכם, ההימור משלם לפי טבלת התשלומים וההגברה החלה עליו. שאר ההימורים מפסידים.
מקטע דג מתאים מפעיל סיבוב בונוס. המנחה מעלה דג וחושף את המכפיל שלו; הגברה שהוקצתה בגלגל מגדילה את ערך השלל.
בגלגל הווירטואלי 53 מקטעים: 46 מקטעי Leaf רגילים ו־7 בונוסי דיג. Leaf 1 ו־Leaf 2 הם הימורים נפרדים. השתתפות בבונוס דג מחייבת הימור על הסוג המתאים.
הגברות Leaf עשויות להיות 3×, 4×, 5×, 7× או 10×. בבונוסים: 2×, 3×, 4×, 5×, 6×, 7×, 8× או 10×. הן מוקצות באקראי לפני הסיבוב ואינן מובטחות בכל סיבוב.
All Bonuses מכסה את Lil’ Blues, Big Oranges ו־Huge Reds. בדקו את הסכום בכל משבצת: כיסוי יותר תוצאות מגדיל את הסכום הכולל בסיכון ואינו מבטיח זכייה.
ה־RTP תלוי בהימור שנבחר; האחוז המדויק והמגבלות מופיעים בעזרה העדכנית של המשחק. זהו החזר תאורטי לטווח ארוך ולא תוצאה של משחק בודד. פרסי הבונוס משתנים ומכפיל גבוה אינו מובטח.
הדג הכחול חושף מכפיל בסיס של 3× עד 100×, טווח הפרסים הנמוך מבין שלושת סיבובי הדיג. הגברת גלגל יכולה להגדיל את הערך שנחשף.
הדג הכתום מציע מכפילי בסיס של 4× עד 200×. הטווח נמצא בין הכחול לאדום. הדג נמשה, הפרס נחשף והגברת הגלגל מוחלת אם קיימת.
הדג האדום מציע מכפילי בסיס של 10× עד 500×. הגברת גלגל של 10× יכולה להעלות את המרב ל־5,000×. זהו מרב אפשרי, לא פרס התחלתי או תשלום מובטח.
אווירה של מופע ארקטי חי
שלג, אגם קפוא ובקתת דיג יוצרים את התפאורה. המנחה מסביר את הסיבובים, וגרפיקה תלת־ממדית ומציאות רבודה מחיות את הבונוסים. האיור בעמוד מציג את הנושא ואינו שידור חי.
שאלות נפוצות
אפשר לשחק בטלפון?
המשחק פועל במחשב ובמכשירים ניידים דרך בתי קזינו משתתפים. נדרש חיבור יציב לווידאו החי ולהימורים.
היכן המשחק זמין?
הגישה תלויה בקזינו, במדינה ובכללים המקומיים. חפשו Ice Fishing בקטלוג המשחקים החיים ובדקו זמינות לחשבון שלכם.
האם יש מבצעי קזינו?
הקזינו קובע הצעות הפקדה ומבצעים ייעודיים. בדקו זכאות, דרישות מחזור והאם הימורי Ice Fishing נספרים לפני שימוש בהצעה.
האם כולם יכולים להשתתף בבונוס?
כולם יכולים לצפות, אך רק מי שהימר על הבונוס המתאים לפני הסגירה זכאי לפרס. אי אפשר להוסיף הימור לאחר שהתוצאה ידועה.
`);
  add('ur',`
Ice Fishing Live، Evolution کا براہِ راست گیم شو ہے جس کا منظر آرکٹک کی جمی ہوئی جھیل ہے۔ میزبان ہر راؤنڈ کی رہنمائی کرتا ہے اور ورچوئل پہیہ نتیجہ طے کرتا ہے۔ پتے یا مچھلی کے بونس پر داؤ لگائیں: درست انتخاب براہِ راست ادائیگی یا ماہی گیری کا راؤنڈ کھول سکتا ہے۔ تیز فیصلے، بے ترتیب ملٹی پلائر اور ڈیجیٹل اثرات برفانی اسٹوڈیو کو زندہ بناتے ہیں۔
چِپ کی قیمت منتخب کریں اور داؤ بند ہونے سے پہلے ایک یا زیادہ اختیارات پر لگائیں۔ کئی خانوں کا انتخاب کرتے وقت کل رقم دیکھیں۔
داؤ بند ہونے کے بعد پہیے پر بے ترتیب ملٹی پلائر آ سکتے ہیں۔ گھماؤ دیکھیں اور اشارے کے جیتنے والا حصہ دکھانے کا انتظار کریں۔
اگر نتیجہ آپ کے انتخاب سے ملے تو وہ داؤ ادائیگی کی جدول اور لاگو اضافے کے مطابق ادا ہوتا ہے۔ دوسرے داؤ ہار جاتے ہیں۔
متعلقہ مچھلی کا حصہ بونس شروع کرتا ہے۔ میزبان مچھلی کھینچ کر اس کا ملٹی پلائر ظاہر کرتا ہے؛ پہیے پر مقرر اضافہ شکار کی قدر بڑھاتا ہے۔
ورچوئل پہیے پر 53 حصے ہیں: 46 عام Leaf اور 7 مچھلی بونس۔ Leaf 1 اور Leaf 2 الگ داؤ ہیں۔ مچھلی بونس کے لیے متعلقہ قسم پر داؤ ضروری ہے۔
Leaf اضافے 3×، 4×، 5×، 7× یا 10× ہو سکتے ہیں۔ بونس میں 2×، 3×، 4×، 5×، 6×، 7×، 8× یا 10× ممکن ہیں۔ یہ گھماؤ سے پہلے بے ترتیب ملتے ہیں اور ہر راؤنڈ میں یقینی نہیں۔
All Bonuses میں Lil’ Blues، Big Oranges اور Huge Reds شامل ہیں۔ ہر خانے کی رقم دیکھیں: زیادہ نتائج کا احاطہ کل خطرے والی رقم بڑھاتا ہے، جیت کی ضمانت نہیں دیتا۔
RTP منتخب داؤ کے مطابق بدلتا ہے؛ درست فیصد اور حدود کے لیے گیم کی موجودہ مدد دیکھیں۔ یہ طویل مدت کی نظریاتی واپسی ہے، ایک نشست کا نتیجہ نہیں۔ بونس انعامات مختلف ہوتے ہیں اور بڑا ملٹی پلائر یقینی نہیں۔
نیلی مچھلی 3× سے 100× تک بنیادی ملٹی پلائر ظاہر کرتی ہے، جو تینوں ماہی گیری راؤنڈز کی سب سے کم انعامی حد ہے۔ پہیے کا اضافہ ظاہر کردہ قدر بڑھا سکتا ہے۔
نارنجی مچھلی 4× سے 200× تک بنیادی ملٹی پلائر دیتی ہے۔ اس کی حد نیلے اور سرخ کے درمیان ہے۔ مچھلی پکڑنے کے بعد انعام ظاہر ہوتا ہے اور دستیاب اضافہ لگتا ہے۔
سرخ مچھلی 10× سے 500× تک بنیادی ملٹی پلائر دیتی ہے۔ پہیے کا 10× اضافہ زیادہ سے زیادہ نتیجہ 5,000× تک پہنچا سکتا ہے۔ یہ ممکنہ حد ہے، ابتدائی انعام یا وعدہ شدہ ادائیگی نہیں۔
آرکٹک کے براہِ راست شو کا ماحول
برف، جمی ہوئی جھیل اور ماہی گیر کی جھونپڑی منظر بناتے ہیں۔ میزبان گھماؤ کی رہنمائی کرتا ہے جبکہ 3D گرافکس اور آگمینٹڈ ریئلٹی بونس کو زندہ کرتے ہیں۔ اس صفحے کی تصویر موضوع کی عکاسی ہے، براہِ راست نشریات نہیں۔
عام سوالات
کیا فون پر کھیل سکتے ہیں؟
شریک کیسینو کے ذریعے گیم کمپیوٹر اور موبائل پر چلتی ہے۔ براہِ راست ویڈیو اور داؤ کے لیے مستحکم کنکشن ضروری ہے۔
گیم کہاں دستیاب ہے؟
رسائی کیسینو، ملک اور مقامی قواعد پر منحصر ہے۔ براہِ راست گیمز کی فہرست میں Ice Fishing تلاش کریں اور اپنے اکاؤنٹ کی دستیابی دیکھیں۔
کیا کیسینو کی خصوصی پیشکشیں ہیں؟
ڈپازٹ آفرز اور گیم کی پروموشنز کیسینو طے کرتا ہے۔ اہلیت، شرط پوری کرنے کے تقاضے اور Ice Fishing کے داؤ شمار ہونے کی تصدیق کریں۔
کیا سب بونس میں حصہ لے سکتے ہیں؟
سب دیکھ سکتے ہیں، مگر انعام کے اہل صرف وہ ہیں جنہوں نے بندش سے پہلے متعلقہ بونس پر داؤ لگایا ہو۔ نتیجہ معلوم ہونے کے بعد نیا داؤ شامل نہیں کیا جا سکتا۔
`);
  add('hi',`
Ice Fishing Live, Evolution का लाइव गेम शो है, जिसकी पृष्ठभूमि आर्कटिक की जमी हुई झील है। होस्ट हर राउंड का संचालन करता है और वर्चुअल व्हील परिणाम चुनता है। पत्ते या मछली बोनस पर दाँव लगाएँ: सही विकल्प पर सीधा भुगतान मिल सकता है या मछली पकड़ने का राउंड खुल सकता है। तेज फैसले, रैंडम मल्टीप्लायर और डिजिटल प्रभाव बर्फीले स्टूडियो को जीवंत बनाते हैं।
चिप का मूल्य चुनें और दाँव बंद होने से पहले एक या अधिक विकल्पों पर लगाएँ। कई खाने चुनने पर कुल दाँव की राशि जाँचें।
दाँव बंद होने के बाद व्हील पर रैंडम मल्टीप्लायर आ सकते हैं। स्पिन देखें और पॉइंटर के विजेता खंड दिखाने तक प्रतीक्षा करें।
परिणाम आपके विकल्प से मिले तो उस दाँव का भुगतान पे-टेबल और लागू बूस्ट के अनुसार होता है। बाकी विकल्पों के दाँव हार जाते हैं।
संबंधित मछली वाला खंड उसका बोनस शुरू करता है। होस्ट मछली खींचकर उसका मल्टीप्लायर दिखाता है; व्हील पर मिला बूस्ट उस मूल्य को बढ़ाता है।
वर्चुअल व्हील में 53 खंड हैं: 46 सामान्य Leaf और 7 मछली बोनस। Leaf 1 और Leaf 2 अलग दाँव हैं। मछली बोनस में भाग लेने के लिए संबंधित प्रकार पर दाँव जरूरी है।
Leaf बूस्ट 3×, 4×, 5×, 7× या 10× हो सकते हैं। बोनस के लिए 2×, 3×, 4×, 5×, 6×, 7×, 8× या 10× हैं। ये स्पिन से पहले रैंडम मिलते हैं और हर राउंड में निश्चित नहीं होते।
All Bonuses में Lil’ Blues, Big Oranges और Huge Reds शामिल हैं। हर खाने की राशि जाँचें: अधिक परिणामों को कवर करने से कुल जोखिम राशि बढ़ती है, जीत की गारंटी नहीं मिलती।
RTP चुने हुए दाँव पर निर्भर है; सटीक प्रतिशत और सीमाएँ गेम की मौजूदा सहायता में देखें। यह लंबे समय का सैद्धांतिक रिटर्न है, एक सेशन का परिणाम नहीं। बोनस पुरस्कार अलग-अलग होते हैं और बड़ा मल्टीप्लायर निश्चित नहीं है।
नीली मछली 3× से 100× का बेस मल्टीप्लायर दिखाती है, जो तीनों फिशिंग राउंड की सबसे कम पुरस्कार सीमा है। व्हील का बूस्ट दिखाए गए मूल्य को बढ़ा सकता है।
नारंगी मछली 4× से 200× का बेस मल्टीप्लायर देती है। इसका दायरा नीले और लाल बोनस के बीच है। मछली निकालकर पुरस्कार दिखाया जाता है और उपलब्ध बूस्ट लागू होता है।
लाल मछली 10× से 500× का बेस मल्टीप्लायर देती है। व्हील का 10× बूस्ट अधिकतम परिणाम को 5,000× तक ले जा सकता है। यह संभावित अधिकतम है, शुरुआती पुरस्कार या तय भुगतान नहीं।
आर्कटिक लाइव शो का माहौल
बर्फ, जमी हुई झील और मछुआरे की झोपड़ी खेल का दृश्य बनाते हैं। होस्ट स्पिन समझाता है, जबकि 3D ग्राफिक्स और ऑगमेंटेड रियलिटी बोनस को जीवंत करते हैं। यहाँ का चित्र गेम की थीम दर्शाता है, लाइव प्रसारण नहीं।
अक्सर पूछे जाने वाले सवाल
क्या फोन पर खेल सकते हैं?
सहभागी कैसीनो के जरिए गेम कंप्यूटर और मोबाइल पर चलता है। लाइव वीडियो और दाँव के लिए स्थिर इंटरनेट जरूरी है।
गेम कहाँ उपलब्ध है?
उपलब्धता कैसीनो, देश और स्थानीय नियमों पर निर्भर है। लाइव गेम सूची में Ice Fishing खोजें और अपने खाते के लिए उपलब्धता जाँचें।
क्या कैसीनो ऑफर मिलते हैं?
डिपॉजिट ऑफर और गेम प्रमोशन कैसीनो तय करता है। पात्रता, वेजरिंग शर्तें और Ice Fishing के दाँव गिने जाते हैं या नहीं, जाँचें।
क्या सभी बोनस में भाग ले सकते हैं?
सभी देख सकते हैं, लेकिन पुरस्कार के पात्र केवल वे हैं जिन्होंने दाँव बंद होने से पहले सही बोनस पर दाँव लगाया था। परिणाम आने के बाद नया दाँव नहीं लगाया जा सकता।
`);
  add('bn',`
Ice Fishing Live হলো Evolution-এর সরাসরি গেম শো, যার পটভূমি আর্কটিকের জমাট বাঁধা হ্রদ। উপস্থাপক প্রতিটি রাউন্ড পরিচালনা করেন এবং ভার্চুয়াল চাকা ফল নির্ধারণ করে। পাতা বা মাছের বোনাসে বাজি ধরুন: মিললে সরাসরি অর্থ পাওয়া বা মাছ ধরার রাউন্ড শুরু হওয়া সম্ভব। দ্রুত সিদ্ধান্ত, র‌্যান্ডম গুণক ও ডিজিটাল প্রভাব তুষারময় স্টুডিওকে জীবন্ত করে।
চিপের মূল্য বেছে নিয়ে বাজি বন্ধ হওয়ার আগে এক বা একাধিক বিকল্পে রাখুন। একাধিক ঘর বাছলে মোট বাজির অঙ্ক যাচাই করুন।
বাজি বন্ধ হলে চাকায় র‌্যান্ডম গুণক যোগ হতে পারে। ঘূর্ণন দেখুন এবং নির্দেশক বিজয়ী অংশ দেখানো পর্যন্ত অপেক্ষা করুন।
ফল আপনার নির্বাচনের সঙ্গে মিললে সেই বাজি পেআউট তালিকা ও প্রযোজ্য বুস্ট অনুযায়ী পরিশোধ হয়। অন্য বাজিগুলো হেরে যায়।
সংশ্লিষ্ট মাছের অংশ তার বোনাস শুরু করে। উপস্থাপক মাছ তুলে গুণক প্রকাশ করেন; চাকায় নির্ধারিত বুস্ট মাছের মূল্য বাড়ায়।
ভার্চুয়াল চাকায় 53টি অংশ: 46টি সাধারণ Leaf ও 7টি মাছের বোনাস। Leaf 1 এবং Leaf 2 আলাদা বাজি। মাছের বোনাসে অংশ নিতে সংশ্লিষ্ট ধরনের ওপর বাজি দরকার।
Leaf বুস্ট হতে পারে 3×, 4×, 5×, 7× বা 10×। বোনাসে 2×, 3×, 4×, 5×, 6×, 7×, 8× বা 10×। ঘূর্ণনের আগে এগুলো এলোমেলোভাবে নির্ধারিত হয়, প্রতি রাউন্ডে নিশ্চিত নয়।
All Bonuses-এ Lil’ Blues, Big Oranges ও Huge Reds অন্তর্ভুক্ত। প্রতিটি ঘরের অঙ্ক দেখুন: বেশি ফল কভার করলে মোট ঝুঁকির অর্থ বাড়ে, জয় নিশ্চিত হয় না।
RTP নির্বাচিত বাজির ওপর নির্ভর করে; সঠিক শতাংশ ও সীমা গেমের বর্তমান সহায়িকায় দেখুন। এটি দীর্ঘমেয়াদি তাত্ত্বিক ফেরত, একটি সেশনের ফল নয়। বোনাস পুরস্কার অনেক ভিন্ন হয় এবং বড় গুণক নিশ্চিত নয়।
নীল মাছ 3× থেকে 100× বেস গুণক প্রকাশ করে, যা তিনটি মাছ ধরার রাউন্ডের সর্বনিম্ন পুরস্কার সীমা। চাকায় থাকা বুস্ট প্রকাশিত মান বাড়াতে পারে।
কমলা মাছের বেস গুণক 4× থেকে 200×। এর সীমা নীল ও লালের মাঝামাঝি। মাছ তোলার পর পুরস্কার প্রকাশ হয় এবং প্রযোজ্য বুস্ট যোগ হয়।
লাল মাছের বেস গুণক 10× থেকে 500×। চাকায় 10× বুস্ট থাকলে সর্বোচ্চ ফল 5,000× হতে পারে। এটি সম্ভাব্য সর্বোচ্চ, শুরুর পুরস্কার বা প্রতিশ্রুত পেআউট নয়।
আর্কটিকের সরাসরি শোর পরিবেশ
তুষার, বরফের হ্রদ ও মাছ ধরার কুঁড়েঘর দৃশ্য তৈরি করে। উপস্থাপক ঘূর্ণন ব্যাখ্যা করেন, আর 3D গ্রাফিক্স ও অগমেন্টেড রিয়েলিটি বোনাসকে জীবন্ত করে। এখানে দেখানো চিত্র থিম বোঝায়, সরাসরি সম্প্রচার নয়।
সাধারণ প্রশ্ন
ফোনে খেলা যায়?
অংশগ্রহণকারী ক্যাসিনোর মাধ্যমে কম্পিউটার ও মোবাইলে খেলা যায়। সরাসরি ভিডিও ও বাজির জন্য স্থিতিশীল সংযোগ দরকার।
গেম কোথায় পাওয়া যায়?
প্রাপ্যতা ক্যাসিনো, দেশ ও স্থানীয় নিয়মের ওপর নির্ভর করে। লাইভ গেম তালিকায় Ice Fishing খুঁজে নিজের অ্যাকাউন্টে প্রাপ্যতা যাচাই করুন।
ক্যাসিনোর প্রচারমূলক অফার আছে?
ডিপোজিট অফার ও গেমের প্রচার ক্যাসিনো ঠিক করে। যোগ্যতা, বাজির শর্ত এবং Ice Fishing-এর বাজি গণনা হয় কি না যাচাই করুন।
সবাই কি বোনাসে অংশ নিতে পারে?
সবাই দেখতে পারে, তবে পুরস্কারের যোগ্য শুধু যারা বাজি বন্ধের আগে সঠিক বোনাসে বাজি রেখেছে। ফল জানার পর নতুন বাজি যোগ করা যায় না।
`);
  add('ne',`
Ice Fishing Live Evolution को प्रत्यक्ष गेम शो हो, जसको परिवेश आर्कटिकको जमेको ताल हो। प्रस्तोताले प्रत्येक राउन्ड चलाउँछन् र भर्चुअल चक्रले नतिजा छान्छ। पात वा माछाको बोनसमा बाजी लगाउनुहोस्: मिलेको विकल्पले सीधा भुक्तानी दिन वा माछा मार्ने राउन्ड खोल्न सक्छ। छिटो निर्णय, अनियमित गुणक र डिजिटल प्रभावले हिउँले ढाकिएको स्टुडियोलाई जीवन्त बनाउँछन्।
चिपको मूल्य छानी बाजी बन्द हुनुअघि एक वा धेरै विकल्पमा राख्नुहोस्। धेरै क्षेत्र छान्दा कुल बाजी रकम जाँच्नुहोस्।
बाजी बन्द भएपछि चक्रमा अनियमित गुणक थपिन सक्छन्। घुमाइ हेर्नुहोस् र सूचकले विजेता खण्ड देखाएसम्म पर्खनुहोस्।
नतिजा तपाईंको विकल्पसँग मिलेमा त्यो बाजी भुक्तानी तालिका र लागू वृद्धिअनुसार तिरिन्छ। अन्य बाजी हार्छन्।
सम्बन्धित माछाको खण्डले बोनस सुरु गर्छ। प्रस्तोताले माछा तानेर गुणक देखाउँछन्; चक्रमा तोकिएको वृद्धिले माछाको मूल्य बढाउँछ।
भर्चुअल चक्रमा 53 खण्ड छन्: 46 सामान्य Leaf र 7 माछा बोनस। Leaf 1 र Leaf 2 अलग बाजी हुन्। माछा बोनसमा सहभागी हुन सम्बन्धित प्रकारमा बाजी चाहिन्छ।
Leaf वृद्धि 3×, 4×, 5×, 7× वा 10× हुन सक्छ। बोनसमा 2×, 3×, 4×, 5×, 6×, 7×, 8× वा 10× हुन्छ। घुमाउनुअघि अनियमित रूपमा तोकिन्छ, प्रत्येक राउन्डमा सुनिश्चित हुँदैन।
All Bonuses ले Lil’ Blues, Big Oranges र Huge Reds समेट्छ। हरेक क्षेत्रको रकम जाँच्नुहोस्: धेरै नतिजा समेट्दा जोखिममा रहेको कुल रकम बढ्छ, जित सुनिश्चित हुँदैन।
RTP रोजिएको बाजीमा निर्भर हुन्छ; सही प्रतिशत र सीमा खेलको हालको सहायतामा हेर्नुहोस्। यो दीर्घकालीन सैद्धान्तिक फिर्ता हो, एक सत्रको नतिजा होइन। बोनस पुरस्कार फरक हुन्छन् र ठूलो गुणक निश्चित छैन।
नीलो माछाले 3× देखि 100× आधार गुणक देखाउँछ, जुन तीन माछा मार्ने राउन्डमध्ये सबैभन्दा कम पुरस्कार दायरा हो। चक्रको वृद्धिले देखाइएको मूल्य बढाउन सक्छ।
सुन्तला रङको माछाले 4× देखि 200× आधार गुणक दिन्छ। दायरा नीलो र रातोको बीचमा छ। माछा निकालेपछि पुरस्कार देखाइन्छ र उपलब्ध वृद्धि लागू गरिन्छ।
रातो माछाले 10× देखि 500× आधार गुणक दिन्छ। चक्रको 10× वृद्धिले उच्चतम नतिजा 5,000× बनाउन सक्छ। यो सम्भावित अधिकतम हो, प्रारम्भिक पुरस्कार वा वाचा गरिएको भुक्तानी होइन।
आर्कटिकको प्रत्यक्ष शोको माहोल
हिउँ, जमेको ताल र माछा मार्ने झुपडीले दृश्य बनाउँछन्। प्रस्तोताले घुमाइ बुझाउँछन्, 3D ग्राफिक्स र संवर्धित वास्तविकताले बोनसलाई जीवन्त बनाउँछन्। यस पृष्ठको चित्रले विषय देखाउँछ, प्रत्यक्ष प्रसारण होइन।
बारम्बार सोधिने प्रश्न
फोनमा खेल्न मिल्छ?
सहभागी क्यासिनोमार्फत कम्प्युटर र मोबाइलमा खेल्न मिल्छ। प्रत्यक्ष भिडियो र बाजीका लागि स्थिर जडान चाहिन्छ।
खेल कहाँ उपलब्ध छ?
पहुँच क्यासिनो, देश र स्थानीय नियममा निर्भर हुन्छ। प्रत्यक्ष खेलको सूचीमा Ice Fishing खोजेर आफ्नो खाताका लागि उपलब्धता जाँच्नुहोस्।
क्यासिनोका विशेष प्रस्ताव छन्?
जम्मा प्रस्ताव र खेल प्रवर्धन क्यासिनोले तय गर्छ। योग्यता, कारोबारका सर्त र Ice Fishing को बाजी गणना हुन्छ कि हुँदैन जाँच्नुहोस्।
बोनसमा सबै सहभागी हुन सक्छन्?
सबैले हेर्न सक्छन्, तर पुरस्कारको हक बाजी बन्द हुनुअघि सही बोनसमा बाजी लगाउनेलाई मात्र हुन्छ। नतिजा थाहा भएपछि नयाँ बाजी थप्न सकिँदैन।
`);
  add('si',`
Ice Fishing Live යනු ශීත වූ ආක්ටික් විලක් පසුබිම් කරගත් Evolution සජීවී ක්‍රීඩා වැඩසටහනකි. නිවේදකයා සෑම වටයක්ම මෙහෙයවන අතර අතථ්‍ය රෝදයක් ප්‍රතිඵලය තීරණය කරයි. පත්‍රයක් හෝ මත්ස්‍ය ප්‍රසාදයක් මත ඔට්ටු තබන්න: ගැළපීමකින් සෘජු ගෙවීමක් හෝ මසුන් ඇල්ලීමේ වටයක් ලැබිය හැක. වේගවත් තේරීම්, අහඹු ගුණක සහ ඩිජිටල් ප්‍රයෝග හිම පිරුණු මැදිරිය ජීවමාන කරයි.
චිප් අගය තෝරා ඔට්ටු වැසීමට පෙර එක් විකල්පයකට හෝ කිහිපයකට තබන්න. කොටු කිහිපයක් තෝරන විට මුළු ඔට්ටු මුදල පරීක්ෂා කරන්න.
ඔට්ටු වැසුණු පසු රෝදයට අහඹු ගුණක එක් විය හැක. භ්‍රමණය නරඹා දර්ශකය ජයග්‍රාහී කොටස පෙන්වන තෙක් රැඳී සිටින්න.
ප්‍රතිඵලය ඔබේ තේරීමට ගැළපේ නම්, එම ඔට්ටුව ගෙවීම් වගුව හා අදාළ වැඩි කිරීම අනුව ගෙවයි. අනෙක් ඔට්ටු පරාජය වේ.
අදාළ මත්ස්‍ය කොටස ප්‍රසාද වටය අරඹයි. නිවේදකයා මසෙකු ඇද ගුණකය හෙළි කරයි; රෝදයට නියමිත වැඩි කිරීම එම අගය ඉහළ නංවයි.
අතථ්‍ය රෝදයේ කොටස් 53කි: සාමාන්‍ය Leaf කොටස් 46ක් සහ මත්ස්‍ය ප්‍රසාද 7ක්. Leaf 1 සහ Leaf 2 වෙනම ඔට්ටු වේ. මත්ස්‍ය ප්‍රසාදයට අදාළ වර්ගය මත ඔට්ටුවක් අවශ්‍යය.
Leaf වැඩි කිරීම් 3×, 4×, 5×, 7× හෝ 10× විය හැක. ප්‍රසාද සඳහා 2×, 3×, 4×, 5×, 6×, 7×, 8× හෝ 10× වේ. භ්‍රමණයට පෙර අහඹුවෙන් නියම වන අතර සෑම වටයකම සහතික නොවේ.
All Bonuses මගින් Lil’ Blues, Big Oranges සහ Huge Reds ආවරණය කරයි. එක් එක් කොටුවේ මුදල බලන්න: වැඩි විකල්ප තෝරාගැනීමෙන් අවදානමේ ඇති මුළු මුදල වැඩි වන අතර ජය සහතික නොවේ.
RTP තෝරාගත් ඔට්ටුව අනුව වෙනස් වේ. නිවැරදි ප්‍රතිශතය සහ සීමා වත්මන් ක්‍රීඩා උපකාරයේ බලන්න. එය දිගුකාලීන න්‍යායික ප්‍රතිලාභයකි, එක් සැසියක ප්‍රතිඵලයක් නොවේ. විශාල ගුණකයක් සහතික නැත.
නිල් මත්ස්‍යයා 3× සිට 100× දක්වා මූලික ගුණකයක් හෙළි කරයි. එය මසුන් ඇල්ලීමේ වට තුනේ අඩුම ත්‍යාග පරාසයයි. රෝදයේ වැඩි කිරීම හෙළි කළ අගය ඉහළ නංවිය හැක.
තැඹිලි මත්ස්‍යයා 4× සිට 200× දක්වා මූලික ගුණක ලබා දෙයි. එහි පරාසය නිල් හා රතු අතර වේ. මසා ඇද ත්‍යාගය හෙළි කළ පසු අදාළ වැඩි කිරීම යොදයි.
රතු මත්ස්‍යයා 10× සිට 500× දක්වා මූලික ගුණක ලබා දෙයි. රෝදයේ 10× වැඩි කිරීමෙන් උපරිමය 5,000× විය හැක. මෙය හැකි උපරිමයක් මිස ආරම්භක ත්‍යාගයක් හෝ පොරොන්දු වූ ගෙවීමක් නොවේ.
ආක්ටික් සජීවී වැඩසටහනක වාතාවරණය
හිම, අයිස් විල හා ධීවර කුටිය දර්ශනය සකසයි. නිවේදකයා භ්‍රමණ මෙහෙයවන අතර 3D දර්ශන සහ වර්ධිත යථාර්ථය ප්‍රසාද ජීවමාන කරයි. මෙහි රූපය තේමාව නිරූපණය කරන අතර සජීවී විකාශයක් නොවේ.
නිතර අසන ප්‍රශ්න
දුරකථනයෙන් ක්‍රීඩා කළ හැකිද?
සහභාගී කැසිනෝ හරහා පරිගණක හා ජංගම උපාංගවල ක්‍රීඩාව ක්‍රියා කරයි. සජීවී වීඩියෝ හා ඔට්ටු සඳහා ස්ථාවර සම්බන්ධතාවක් අවශ්‍යය.
ක්‍රීඩාව ලබාගත හැක්කේ කොහේද?
ප්‍රවේශය කැසිනෝව, රට හා දේශීය නීති අනුව වෙනස් වේ. සජීවී ක්‍රීඩා ලැයිස්තුවේ Ice Fishing සොයා ඔබේ ගිණුමට ඇති හැකියාව බලන්න.
කැසිනෝ දීමනා තිබේද?
තැන්පතු දීමනා හා ක්‍රීඩා ප්‍රවර්ධන කැසිනෝව තීරණය කරයි. සුදුසුකම්, ඔට්ටු කොන්දේසි සහ Ice Fishing ඔට්ටු ගණන් ගන්නේදැයි පරීක්ෂා කරන්න.
ප්‍රසාදයට හැමෝටම සහභාගී විය හැකිද?
හැමෝටම නැරඹිය හැකි නමුත් ත්‍යාගයට හිමිකම් ඇත්තේ ඔට්ටු වැසීමට පෙර අදාළ ප්‍රසාදය මත ඔට්ටු තැබූ අයට පමණි. ප්‍රතිඵලය දැනගත් පසු ඔට්ටුවක් එක් කළ නොහැක.
`);
  add('id',`
Ice Fishing Live adalah acara permainan langsung Evolution dengan latar danau Arktik yang membeku. Pembawa acara memandu setiap putaran, sementara roda virtual menentukan hasilnya. Pasang taruhan pada daun atau bonus ikan: pilihan yang cocok dapat membayar langsung atau membuka putaran memancing. Keputusan cepat, pengali acak, dan efek digital menghidupkan studio bersalju.
Pilih nilai cip dan bertaruh pada satu atau beberapa pilihan sebelum penutupan. Periksa total taruhan jika memilih beberapa kotak.
Setelah taruhan ditutup, pengali acak dapat ditambahkan ke roda. Ikuti putaran dan tunggu penunjuk menetapkan segmen pemenang.
Jika hasil cocok dengan pilihan Anda, taruhan tersebut dibayar sesuai tabel pembayaran dan peningkatan yang berlaku. Taruhan lainnya kalah.
Segmen ikan yang cocok memicu bonusnya. Pembawa acara menarik ikan dan mengungkap pengali; peningkatan yang diberikan pada roda menambah nilai tangkapan.
Roda virtual memiliki 53 segmen: 46 Leaf biasa dan 7 bonus ikan. Leaf 1 dan Leaf 2 merupakan pilihan taruhan terpisah. Bonus ikan memerlukan taruhan pada jenis yang sesuai.
Peningkatan Leaf bisa berupa 3×, 4×, 5×, 7× atau 10×. Untuk bonus: 2×, 3×, 4×, 5×, 6×, 7×, 8× atau 10×. Nilainya ditetapkan acak sebelum putaran dan tidak dijamin muncul setiap ronde.
All Bonuses mencakup Lil’ Blues, Big Oranges dan Huge Reds. Periksa nilai tiap kotak: mencakup lebih banyak hasil meningkatkan jumlah yang berisiko dan tidak menjamin kemenangan.
RTP bergantung pada taruhan; persentase tepat dan batasnya tersedia dalam bantuan permainan terbaru. Ini adalah pengembalian teoretis jangka panjang, bukan hasil satu sesi. Hadiah bonus bervariasi dan pengali besar tidak dijamin.
Ikan biru mengungkap pengali dasar 3×–100×, rentang hadiah terendah di antara tiga putaran memancing. Peningkatan roda dapat menaikkan nilai yang terungkap.
Ikan oranye menawarkan pengali dasar 4×–200×. Rentangnya berada di antara biru dan merah. Ikan ditarik, hadiah diungkap, lalu peningkatan roda diterapkan jika tersedia.
Ikan merah menawarkan pengali dasar 10×–500×. Peningkatan roda 10× dapat menaikkan hasil tertinggi menjadi 5.000×. Ini maksimum yang mungkin, bukan hadiah awal atau janji pembayaran.
Suasana acara langsung di Arktik
Salju, danau es dan pondok memancing membentuk latarnya. Pembawa acara memandu putaran, sementara grafis 3D dan realitas tertambah menghidupkan bonus. Ilustrasi di halaman ini menggambarkan tema, bukan siaran langsung.
Pertanyaan umum
Bisa dimainkan lewat ponsel?
Permainan mendukung komputer dan perangkat seluler melalui kasino peserta. Diperlukan koneksi stabil untuk video langsung dan taruhan.
Di mana permainan tersedia?
Akses bergantung pada kasino, negara dan aturan setempat. Cari Ice Fishing dalam katalog permainan langsung dan periksa ketersediaan untuk akun Anda.
Ada promosi kasino?
Kasino menentukan penawaran deposit dan promosi khusus permainan. Periksa kelayakan, syarat taruhan dan apakah taruhan Ice Fishing diperhitungkan.
Apakah semua orang bisa mengikuti bonus?
Semua orang bisa menonton, tetapi hanya pemain yang bertaruh pada bonus terkait sebelum penutupan berhak atas hadiahnya. Taruhan tidak bisa ditambahkan setelah hasil diketahui.
`);
  add('ms',`
Ice Fishing Live ialah rancangan permainan langsung Evolution berlatarbelakangkan tasik Artik yang beku. Pengacara memandu setiap pusingan, manakala roda maya menentukan keputusan. Bertaruh pada daun atau bonus ikan: pilihan yang sepadan boleh membayar terus atau membuka pusingan memancing. Keputusan pantas, pengganda rawak dan kesan digital menghidupkan studio bersalji.
Pilih nilai cip dan bertaruh pada satu atau beberapa pilihan sebelum ditutup. Semak jumlah pertaruhan jika memilih beberapa petak.
Selepas pertaruhan ditutup, pengganda rawak boleh ditambah pada roda. Ikuti putaran dan tunggu penunjuk mengenal pasti segmen pemenang.
Jika keputusan sepadan dengan pilihan anda, pertaruhan itu dibayar mengikut jadual dan peningkatan yang berkenaan. Pertaruhan lain kalah.
Segmen ikan yang sepadan mencetuskan bonusnya. Pengacara menarik ikan dan mendedahkan pengganda; peningkatan yang diberikan pada roda menaikkan nilai tangkapan.
Roda maya mempunyai 53 segmen: 46 Leaf biasa dan 7 bonus ikan. Leaf 1 dan Leaf 2 ialah pilihan pertaruhan berasingan. Bonus ikan memerlukan pertaruhan pada jenis yang berkaitan.
Peningkatan Leaf boleh berupa 3×, 4×, 5×, 7× atau 10×. Untuk bonus: 2×, 3×, 4×, 5×, 6×, 7×, 8× atau 10×. Ia diberikan secara rawak sebelum putaran dan tidak dijamin setiap pusingan.
All Bonuses merangkumi Lil’ Blues, Big Oranges dan Huge Reds. Semak amaun setiap petak: meliputi lebih banyak keputusan meningkatkan jumlah berisiko dan tidak menjamin kemenangan.
RTP bergantung pada pertaruhan; peratus tepat dan had terdapat dalam bantuan permainan semasa. Ia pulangan teori jangka panjang, bukan keputusan satu sesi. Hadiah bonus berbeza-beza dan pengganda besar tidak dijamin.
Ikan biru mendedahkan pengganda asas 3×–100×, julat hadiah terendah antara tiga pusingan memancing. Peningkatan roda boleh menaikkan nilai yang didedahkan.
Ikan jingga menawarkan pengganda asas 4×–200×. Julatnya antara biru dengan merah. Ikan ditarik, hadiah didedahkan dan peningkatan roda digunakan jika ada.
Ikan merah menawarkan pengganda asas 10×–500×. Peningkatan roda 10× boleh menaikkan keputusan tertinggi kepada 5,000×. Ini maksimum yang mungkin, bukan hadiah permulaan atau pembayaran yang dijanjikan.
Suasana rancangan langsung di Artik
Salji, tasik berais dan pondok memancing membentuk latar. Pengacara memandu putaran, manakala grafik 3D dan realiti terimbuh menghidupkan bonus. Ilustrasi di halaman ini menggambarkan tema, bukan siaran langsung.
Soalan lazim
Bolehkah bermain melalui telefon?
Permainan menyokong komputer dan peranti mudah alih melalui kasino yang mengambil bahagian. Sambungan stabil diperlukan untuk video langsung dan pertaruhan.
Di manakah permainan tersedia?
Akses bergantung pada kasino, negara dan peraturan setempat. Cari Ice Fishing dalam katalog permainan langsung dan semak ketersediaan untuk akaun anda.
Adakah promosi kasino disertakan?
Kasino menetapkan tawaran deposit dan promosi permainan. Semak kelayakan, syarat pertaruhan dan sama ada taruhan Ice Fishing diambil kira.
Bolehkah semua orang menyertai bonus?
Semua orang boleh menonton, tetapi hanya pemain yang bertaruh pada bonus berkaitan sebelum penutupan layak menerima hadiah. Pertaruhan tidak boleh ditambah selepas keputusan diketahui.
`);
  add('fil',`
Ang Ice Fishing Live ay live game show ng Evolution sa isang nagyelong lawa sa Arctic. Ginagabayan ng host ang bawat round habang isang virtual na gulong ang pumipili ng resulta. Tumaya sa dahon o fish bonus: ang tamang pagpili ay maaaring magbayad agad o magbukas ng fishing round. Mabilis na desisyon, random na multiplier at digital effects ang nagbibigay-buhay sa snowy studio.
Piliin ang halaga ng chip at tumaya sa isa o higit pang opsyon bago magsara ang pustahan. Tingnan ang kabuuang taya kung maraming kahon ang pinili.
Pagkasara ng pustahan, maaaring magkaroon ng random na multiplier sa gulong. Panoorin ang ikot at hintaying ituro ang nanalong segment.
Kung tugma ang resulta sa pinili mo, magbabayad ang tayang iyon ayon sa paytable at naaangkop na boost. Talo ang ibang taya.
Ang katugmang fish segment ay nagbubukas ng bonus. Hihilahin ng host ang isda at ilalantad ang multiplier; pinapataas ng boost sa gulong ang halaga ng huli.
May 53 segment ang virtual na gulong: 46 karaniwang Leaf at 7 fish bonus. Magkahiwalay na taya ang Leaf 1 at Leaf 2. Kailangan ng taya sa kaukulang uri upang makasali sa fish bonus.
Ang Leaf boost ay 3×, 4×, 5×, 7× o 10×. Para sa bonus: 2×, 3×, 4×, 5×, 6×, 7×, 8× o 10×. Random ang pagtatalaga bago umikot at hindi ito garantisado sa bawat round.
Saklaw ng All Bonuses ang Lil’ Blues, Big Oranges at Huge Reds. Suriin ang taya sa bawat kahon: mas maraming saklaw na resulta, mas malaking kabuuang halagang nakataya, ngunit walang garantiyang panalo.
Nakadepende ang RTP sa taya; tingnan ang eksaktong porsiyento at limitasyon sa kasalukuyang tulong ng laro. Teoretikal itong balik sa mahabang panahon, hindi resulta ng isang sesyon. Iba-iba ang bonus prize at hindi sigurado ang malaking multiplier.
Ang asul na isda ay nagpapakita ng base multiplier na 3×–100×, ang pinakamababang saklaw sa tatlong fishing round. Maaaring palakihin ng wheel boost ang inilantad na halaga.
Ang kahel na isda ay may base multiplier na 4×–200×. Nasa pagitan ito ng asul at pula. Huhulihin ang isda, ipapakita ang premyo at ilalapat ang wheel boost kung mayroon.
Ang pulang isda ay may base multiplier na 10×–500×. Ang 10× wheel boost ay maaaring magtaas ng pinakamataas na resulta sa 5,000×. Posibleng maximum ito, hindi panimulang premyo o ipinangakong bayad.
Atmospera ng live show sa Arctic
Niyebe, nagyelong lawa at kubong pangisda ang bumubuo sa tagpuan. Ginagabayan ng host ang mga ikot, habang 3D graphics at augmented reality ang nagpapasigla sa bonus. Ang larawan dito ay ilustrasyon ng tema, hindi live broadcast.
Mga madalas itanong
Puwede bang maglaro sa telepono?
Gumagana ang laro sa computer at mobile sa mga kasaling casino. Kailangan ng matatag na koneksiyon para sa live video at pagtaya.
Saan available ang laro?
Depende ito sa casino, bansa at lokal na patakaran. Hanapin ang Ice Fishing sa live-game catalogue at tingnan kung available sa iyong account.
May casino promotions ba?
Ang casino ang nagtatakda ng deposit offer at promosyon sa laro. Suriin ang pagiging kuwalipikado, wagering terms at kung binibilang ang Ice Fishing bets.
Lahat ba ay puwedeng sumali sa bonus?
Lahat ay puwedeng manood, ngunit ang may taya lamang sa tamang bonus bago magsara ang pustahan ang kuwalipikado sa premyo. Hindi na puwedeng magdagdag ng taya kapag alam na ang resulta.
`);
  add('vi',`
Ice Fishing Live là trò chơi truyền hình trực tiếp của Evolution lấy bối cảnh hồ băng Bắc Cực. Người dẫn chương trình đồng hành mỗi vòng, còn bánh xe ảo quyết định kết quả. Đặt cược vào lá hoặc thưởng câu cá: lựa chọn trúng có thể trả thưởng ngay hoặc mở vòng câu cá. Quyết định nhanh, hệ số ngẫu nhiên và hiệu ứng số làm sống động trường quay phủ tuyết.
Chọn mệnh giá chip và cược vào một hay nhiều lựa chọn trước khi đóng cược. Kiểm tra tổng tiền khi chọn nhiều ô.
Sau khi đóng cược, bánh xe có thể được thêm hệ số ngẫu nhiên. Theo dõi vòng quay và chờ kim chỉ ô thắng.
Nếu kết quả khớp lựa chọn đã cược, khoản cược đó trả theo bảng thưởng và hệ số tăng áp dụng. Các khoản cược khác thua.
Ô cá tương ứng kích hoạt vòng thưởng. Người dẫn kéo cá lên và tiết lộ hệ số; mức tăng trên bánh xe sẽ nâng giá trị cá bắt được.
Bánh xe ảo có 53 ô: 46 ô Leaf thường và 7 ô thưởng cá. Leaf 1 và Leaf 2 là hai lựa chọn cược riêng. Muốn nhận thưởng cá phải cược vào đúng loại tương ứng.
Mức tăng Leaf có thể là 3×, 4×, 5×, 7× hoặc 10×. Với thưởng cá: 2×, 3×, 4×, 5×, 6×, 7×, 8× hoặc 10×. Chúng được gán ngẫu nhiên trước khi quay và không xuất hiện chắc chắn mỗi vòng.
All Bonuses bao gồm Lil’ Blues, Big Oranges và Huge Reds. Kiểm tra số tiền trên từng ô: bao phủ nhiều kết quả làm tăng tổng tiền chịu rủi ro, không bảo đảm chiến thắng.
RTP phụ thuộc lựa chọn cược; xem tỷ lệ chính xác và giới hạn trong phần trợ giúp hiện tại. Đây là mức hoàn trả lý thuyết dài hạn, không phải kết quả một phiên. Giải thưởng biến động và hệ số lớn không được bảo đảm.
Cá xanh tiết lộ hệ số cơ bản từ 3× đến 100×, khoảng thưởng thấp nhất trong ba vòng câu cá. Mức tăng trên bánh xe có thể nâng giá trị vừa tiết lộ.
Cá cam có hệ số cơ bản từ 4× đến 200×, nằm giữa cá xanh và cá đỏ. Cá được kéo lên, giải thưởng được tiết lộ rồi áp dụng mức tăng trên bánh xe nếu có.
Cá đỏ có hệ số cơ bản từ 10× đến 500×. Mức tăng 10× trên bánh xe có thể đưa kết quả cao nhất lên 5.000×. Đây là mức tối đa có thể, không phải giải khởi điểm hay khoản trả được hứa trước.
Không khí chương trình Bắc Cực
Tuyết, hồ băng và lều câu cá tạo nên bối cảnh. Người dẫn giải thích các vòng quay, còn đồ họa 3D và thực tế tăng cường làm sống động cảnh câu cá. Hình trên trang minh họa chủ đề, không phải phát trực tiếp.
Câu hỏi thường gặp
Có thể chơi trên điện thoại không?
Trò chơi hỗ trợ máy tính và thiết bị di động qua các casino tham gia. Video trực tiếp và đặt cược cần kết nối ổn định.
Trò chơi có ở đâu?
Quyền truy cập tùy casino, quốc gia và quy định địa phương. Tìm Ice Fishing trong danh mục trò chơi trực tiếp và kiểm tra khả dụng cho tài khoản.
Có khuyến mãi casino không?
Casino quy định ưu đãi nạp tiền và khuyến mãi riêng. Kiểm tra điều kiện tham gia, yêu cầu vòng cược và việc cược Ice Fishing có được tính hay không.
Mọi người đều được tham gia vòng thưởng?
Ai cũng có thể xem, nhưng chỉ người đã cược vào đúng loại thưởng trước khi đóng cược mới đủ điều kiện nhận giải. Không thể thêm cược sau khi biết kết quả.
`);
  add('th',`
Ice Fishing Live คือเกมโชว์สดจาก Evolution ในบรรยากาศทะเลสาบน้ำแข็งแถบอาร์กติก พิธีกรดำเนินแต่ละรอบ ส่วนวงล้อเสมือนเป็นตัวกำหนดผล เลือกเดิมพันใบไม้หรือโบนัสปลา หากตรงกับผลอาจได้รับเงินรางวัลทันทีหรือเข้าสู่รอบตกปลา การตัดสินใจที่รวดเร็ว ตัวคูณแบบสุ่ม และเอฟเฟกต์ดิจิทัลทำให้สตูดิโอหิมะมีชีวิตชีวา
เลือกมูลค่าชิปและเดิมพันหนึ่งตัวเลือกหรือหลายตัวเลือกก่อนปิดรับ ตรวจสอบยอดเดิมพันรวมเมื่อเลือกหลายช่อง
หลังปิดรับเดิมพัน อาจมีตัวคูณแบบสุ่มเพิ่มลงบนวงล้อ ติดตามการหมุนและรอให้ตัวชี้ระบุช่องที่ชนะ
หากผลตรงกับตัวเลือกที่เดิมพัน เงินรางวัลของเดิมพันนั้นจะคำนวณตามตารางจ่ายและตัวเพิ่มที่ใช้ได้ เดิมพันอื่นจะแพ้
ช่องปลาที่ตรงกันจะเปิดรอบโบนัส พิธีกรดึงปลาขึ้นมาเพื่อเผยตัวคูณ หากมีตัวเพิ่มบนวงล้อ ค่าของปลาจะเพิ่มตามนั้น
วงล้อเสมือนมี 53 ช่อง เป็น Leaf ปกติ 46 ช่อง และโบนัสปลา 7 ช่อง Leaf 1 และ Leaf 2 เป็นเดิมพันแยกกัน ต้องเดิมพันชนิดปลาที่ตรงกันจึงมีสิทธิ์รับโบนัส
ตัวเพิ่ม Leaf อาจเป็น 3×, 4×, 5×, 7× หรือ 10× ส่วนโบนัสมี 2×, 3×, 4×, 5×, 6×, 7×, 8× หรือ 10× ระบบสุ่มกำหนดก่อนหมุนและไม่ได้มีทุกครั้ง
All Bonuses ครอบคลุม Lil’ Blues, Big Oranges และ Huge Reds ตรวจสอบเงินในแต่ละช่อง การครอบคลุมผลมากขึ้นเพิ่มยอดเงินที่เสี่ยง แต่ไม่ได้รับประกันว่าจะชนะ
RTP ขึ้นอยู่กับเดิมพันที่เลือก ดูเปอร์เซ็นต์และวงเงินที่แน่นอนในคู่มือปัจจุบันของเกม ค่านี้เป็นผลตอบแทนทางทฤษฎีระยะยาว ไม่ใช่ผลของการเล่นครั้งเดียว รางวัลโบนัสแตกต่างกันและไม่รับประกันตัวคูณสูง
ปลาสีน้ำเงินเผยตัวคูณพื้นฐาน 3×–100× เป็นช่วงรางวัลต่ำสุดของโบนัสตกปลาทั้งสามแบบ ตัวเพิ่มบนวงล้อสามารถเพิ่มค่าที่เผยออกมาได้
ปลาสีส้มมีตัวคูณพื้นฐาน 4×–200× อยู่ระหว่างสีน้ำเงินและสีแดง เมื่อดึงปลาขึ้นมาและเผยรางวัลแล้ว จะใช้ตัวเพิ่มจากวงล้อหากมี
ปลาสีแดงมีตัวคูณพื้นฐาน 10×–500× ตัวเพิ่ม 10× บนวงล้ออาจทำให้ค่าสูงสุดเป็น 5,000× นี่คือผลสูงสุดที่เป็นไปได้ ไม่ใช่รางวัลเริ่มต้นหรือการรับประกันจ่าย
บรรยากาศโชว์สดในอาร์กติก
หิมะ ทะเลสาบน้ำแข็ง และกระท่อมตกปลาสร้างฉากของเกม พิธีกรอธิบายการหมุน ขณะที่กราฟิก 3D และความจริงเสริมทำให้โบนัสมีชีวิตชีวา ภาพประกอบหน้านี้สื่อถึงธีม ไม่ใช่การถ่ายทอดสด
คำถามที่พบบ่อย
เล่นบนโทรศัพท์ได้ไหม?
เกมรองรับคอมพิวเตอร์และมือถือผ่านคาสิโนที่เข้าร่วม ต้องมีการเชื่อมต่อที่เสถียรสำหรับวิดีโอสดและการเดิมพัน
เกมเปิดให้เล่นที่ไหน?
ขึ้นอยู่กับคาสิโน ประเทศ และกฎท้องถิ่น ค้นหา Ice Fishing ในหมวดเกมสดและตรวจสอบว่าบัญชีของคุณเข้าถึงได้หรือไม่
มีโปรโมชั่นจากคาสิโนไหม?
คาสิโนกำหนดข้อเสนอฝากเงินและโปรโมชั่นเฉพาะเกม ตรวจสอบสิทธิ์ เงื่อนไขยอดเดิมพัน และการเดิมพัน Ice Fishing ถูกนับหรือไม่
ทุกคนเข้าร่วมโบนัสได้ไหม?
ทุกคนรับชมได้ แต่ผู้มีสิทธิ์รับรางวัลต้องเดิมพันโบนัสที่ตรงกันก่อนปิดรับ ไม่สามารถเพิ่มเดิมพันหลังทราบผลแล้ว
`);
  add('km',`
Ice Fishing Live ជាកម្មវិធីហ្គេមផ្សាយផ្ទាល់របស់ Evolution ដែលមានឈុតបឹងទឹកកកនៅតំបន់អាក់ទិក។ ពិធីករណែនាំជុំនីមួយៗ ហើយកង់និម្មិតកំណត់លទ្ធផល។ ភ្នាល់លើស្លឹក ឬប្រាក់រង្វាន់ត្រី៖ បើត្រូវ អាចទទួលការទូទាត់ផ្ទាល់ ឬបើកជុំនេសាទ។ ការជ្រើសរើសរហ័ស មេគុណចៃដន្យ និងបែបផែនឌីជីថលធ្វើឱ្យស្ទូឌីយោព្រិលមានភាពរស់រវើក។
ជ្រើសតម្លៃឈីប ហើយភ្នាល់លើជម្រើសមួយ ឬច្រើនមុនបិទការភ្នាល់។ ពិនិត្យទឹកប្រាក់សរុបពេលជ្រើសច្រើនប្រអប់។
បន្ទាប់ពីបិទការភ្នាល់ កង់អាចទទួលមេគុណចៃដន្យ។ មើលការបង្វិល ហើយរង់ចាំទ្រនិចបង្ហាញផ្នែកឈ្នះ។
បើលទ្ធផលត្រូវនឹងជម្រើសរបស់អ្នក ការភ្នាល់នោះបង់តាមតារាងរង្វាន់ និងការបង្កើនដែលអនុវត្ត។ ការភ្នាល់ផ្សេងទៀតចាញ់។
ផ្នែកត្រីដែលត្រូវគ្នាបើកជុំប្រាក់រង្វាន់។ ពិធីករទាញត្រីឡើង ដើម្បីបង្ហាញមេគុណ ហើយការបង្កើនលើកង់បន្ថែមតម្លៃត្រី។
កង់និម្មិតមាន 53 ផ្នែក៖ Leaf ធម្មតា 46 និងប្រាក់រង្វាន់ត្រី 7។ Leaf 1 និង Leaf 2 ជាជម្រើសភ្នាល់ដាច់ដោយឡែក។ ដើម្បីចូលប្រាក់រង្វាន់ត្រី ត្រូវភ្នាល់លើប្រភេទត្រីដែលត្រូវគ្នា។
ការបង្កើន Leaf អាចជា 3×, 4×, 5×, 7× ឬ 10×។ សម្រាប់ប្រាក់រង្វាន់៖ 2×, 3×, 4×, 5×, 6×, 7×, 8× ឬ 10×។ វាត្រូវបានកំណត់ចៃដន្យមុនបង្វិល ហើយមិនធានាថាមានគ្រប់ជុំទេ។
All Bonuses គ្របដណ្តប់ Lil’ Blues, Big Oranges និង Huge Reds។ ពិនិត្យទឹកប្រាក់ក្នុងប្រអប់នីមួយៗ៖ ការគ្របដណ្តប់លទ្ធផលច្រើន បង្កើនទឹកប្រាក់ប្រឈមហានិភ័យ និងមិនធានាឈ្នះទេ។
RTP អាស្រ័យលើការភ្នាល់។ មើលភាគរយពិតប្រាកដ និងដែនកំណត់ក្នុងជំនួយបច្ចុប្បន្នរបស់ហ្គេម។ វាជាផលត្រឡប់តាមទ្រឹស្តីរយៈពេលវែង មិនមែនលទ្ធផលនៃវគ្គលេងមួយទេ។ រង្វាន់ខុសៗគ្នា ហើយមេគុណធំមិនត្រូវបានធានា។
ត្រីខៀវបង្ហាញមេគុណមូលដ្ឋានពី 3× ដល់ 100× ដែលជាជួររង្វាន់ទាបបំផុតក្នុងចំណោមការនេសាទទាំងបី។ ការបង្កើនលើកង់អាចបង្កើនតម្លៃដែលបានបង្ហាញ។
ត្រីពណ៌ទឹកក្រូចផ្តល់មេគុណមូលដ្ឋានពី 4× ដល់ 200×។ ជួររបស់វាស្ថិតនៅចន្លោះខៀវ និងក្រហម។ បន្ទាប់ពីទាញត្រី និងបង្ហាញរង្វាន់ ការបង្កើនដែលមាននឹងត្រូវបានអនុវត្ត។
ត្រីក្រហមផ្តល់មេគុណមូលដ្ឋានពី 10× ដល់ 500×។ ការបង្កើន 10× លើកង់អាចធ្វើឱ្យលទ្ធផលអតិបរមាដល់ 5,000×។ នេះជាអតិបរមាដែលអាចកើត មិនមែនរង្វាន់ដំបូង ឬការសន្យាទូទាត់ទេ។
បរិយាកាសកម្មវិធីផ្ទាល់នៅអាក់ទិក
ព្រិល បឹងទឹកកក និងខ្ទមនេសាទបង្កើតឈុតហ្គេម។ ពិធីករណែនាំការបង្វិល ខណៈក្រាហ្វិក 3D និងការពិតបន្ថែមធ្វើឱ្យប្រាក់រង្វាន់រស់រវើក។ រូបភាពនេះបង្ហាញប្រធានបទ មិនមែនការផ្សាយផ្ទាល់ទេ។
សំណួរដែលសួរញឹកញាប់
អាចលេងលើទូរស័ព្ទទេ?
ហ្គេមដំណើរការលើកុំព្យូទ័រ និងទូរស័ព្ទតាមកាស៊ីណូដែលចូលរួម។ ត្រូវការបណ្តាញមានស្ថិរភាពសម្រាប់វីដេអូផ្ទាល់ និងការភ្នាល់។
ហ្គេមមាននៅទីណា?
ការចូលអាស្រ័យលើកាស៊ីណូ ប្រទេស និងច្បាប់មូលដ្ឋាន។ ស្វែងរក Ice Fishing ក្នុងបញ្ជីហ្គេមផ្ទាល់ ហើយពិនិត្យសិទ្ធិគណនីរបស់អ្នក។
មានការផ្តល់ជូនកាស៊ីណូទេ?
កាស៊ីណូកំណត់ការផ្តល់ជូនដាក់ប្រាក់ និងកម្មវិធីហ្គេម។ ពិនិត្យសិទ្ធិ លក្ខខណ្ឌភ្នាល់ និងថាតើការភ្នាល់ Ice Fishing ត្រូវបានរាប់ឬអត់។
គ្រប់គ្នាអាចចូលជុំប្រាក់រង្វាន់ទេ?
គ្រប់គ្នាអាចមើល ប៉ុន្តែមានតែអ្នកដែលបានភ្នាល់លើប្រាក់រង្វាន់ត្រូវគ្នាមុនបិទប៉ុណ្ណោះ ដែលមានសិទ្ធិរង្វាន់។ មិនអាចបន្ថែមភ្នាល់ក្រោយដឹងលទ្ធផលទេ។
`);
  add('lo',`
Ice Fishing Live ແມ່ນລາຍການເກມສົດຂອງ Evolution ໃນສາກທະເລສາບນ້ຳແຂງແຖບອາກຕິກ. ພິທີກອນນຳພາແຕ່ລະຮອບ ແລະວົງລໍ້ສະເໝືອນກຳນົດຜົນ. ເດີມພັນໃສ່ໃບໄມ້ ຫຼືໂບນັດປາ: ຖ້າກົງກັນອາດຈ່າຍລາງວັນໂດຍກົງ ຫຼືເປີດຮອບຫາປາ. ການເລືອກທີ່ໄວ ຕົວຄູນສຸ່ມ ແລະພາບດິຈິຕອນເຮັດໃຫ້ສະຕູດິໂອຫິມະມີຊີວິດຊີວາ.
ເລືອກມູນຄ່າຊິບ ແລະວາງໃສ່ໜຶ່ງຫຼືຫຼາຍຕົວເລືອກກ່ອນປິດຮັບ. ກວດຍອດເດີມພັນລວມເມື່ອເລືອກຫຼາຍຊ່ອງ.
ຫຼັງປິດຮັບເດີມພັນ ອາດມີຕົວຄູນສຸ່ມເພີ່ມໃສ່ວົງລໍ້. ເບິ່ງການໝຸນ ແລະລໍຖ້າຕົວຊີ້ບອກຊ່ອງທີ່ຊະນະ.
ຖ້າຜົນກົງກັບຕົວເລືອກ ການເດີມພັນນັ້ນຈ່າຍຕາມຕາຕະລາງ ແລະຕົວເພີ່ມທີ່ນຳໃຊ້. ການເດີມພັນອື່ນແພ້.
ຊ່ອງປາທີ່ກົງກັນເປີດຮອບໂບນັດ. ພິທີກອນດຶງປາຂຶ້ນເພື່ອເປີດເຜີຍຕົວຄູນ; ຕົວເພີ່ມຂອງວົງລໍ້ຍົກມູນຄ່າປາ.
ວົງລໍ້ສະເໝືອນມີ 53 ຊ່ອງ: Leaf ປົກກະຕິ 46 ແລະໂບນັດປາ 7. Leaf 1 ແລະ Leaf 2 ເປັນຕົວເລືອກແຍກກັນ. ຕ້ອງເດີມພັນໃສ່ປາປະເພດທີ່ກົງກັນຈຶ່ງມີສິດຮັບໂບນັດ.
ຕົວເພີ່ມ Leaf ອາດເປັນ 3×, 4×, 5×, 7× ຫຼື 10×. ໂບນັດມີ 2×, 3×, 4×, 5×, 6×, 7×, 8× ຫຼື 10×. ມັນຖືກກຳນົດສຸ່ມກ່ອນໝຸນ ແລະບໍ່ຮັບປະກັນວ່າມີທຸກຮອບ.
All Bonuses ຄອບຄຸມ Lil’ Blues, Big Oranges ແລະ Huge Reds. ກວດຈຳນວນໃນແຕ່ລະຊ່ອງ: ເລືອກຫຼາຍຜົນເພີ່ມເງິນລວມທີ່ສ່ຽງ ແຕ່ບໍ່ຮັບປະກັນຊະນະ.
RTP ຂຶ້ນກັບຕົວເລືອກເດີມພັນ. ເບິ່ງອັດຕາແລະຂີດຈຳກັດໃນຄູ່ມືເກມປັດຈຸບັນ. ມັນແມ່ນຜົນຕອບແທນທາງທິດສະດີໄລຍະຍາວ ບໍ່ແມ່ນຜົນຂອງການຫຼິ້ນຄັ້ງດຽວ. ຕົວຄູນສູງບໍ່ໄດ້ຮັບປະກັນ.
ປາສີຟ້າເປີດເຜີຍຕົວຄູນພື້ນຖານ 3×–100× ເປັນຊ່ວງລາງວັນຕ່ຳສຸດຂອງສາມຮອບຫາປາ. ຕົວເພີ່ມວົງລໍ້ອາດຍົກຄ່າທີ່ເປີດເຜີຍ.
ປາສີສົ້ມມີຕົວຄູນພື້ນຖານ 4×–200×. ຊ່ວງຢູ່ລະຫວ່າງສີຟ້າແລະສີແດງ. ເມື່ອດຶງປາແລະເຜີຍລາງວັນແລ້ວ ຈະນຳຕົວເພີ່ມທີ່ມີມາໃຊ້.
ປາສີແດງມີຕົວຄູນພື້ນຖານ 10×–500×. ຕົວເພີ່ມ 10× ຂອງວົງລໍ້ອາດຍົກຄ່າສູງສຸດເຖິງ 5,000×. ນີ້ແມ່ນຄ່າສູງສຸດທີ່ເປັນໄປໄດ້ ບໍ່ແມ່ນລາງວັນເລີ່ມຕົ້ນ ຫຼືຄຳສັນຍາຈ່າຍ.
ບັນຍາກາດລາຍການສົດໃນອາກຕິກ
ຫິມະ ທະເລສາບນ້ຳແຂງ ແລະຕູບຫາປາສ້າງສາກຂອງເກມ. ພິທີກອນນຳພາການໝຸນ ສ່ວນພາບ 3D ແລະຄວາມເປັນຈິງເສີມເຮັດໃຫ້ໂບນັດມີຊີວິດ. ຮູບນີ້ສື່ເຖິງຫົວຂໍ້ ບໍ່ແມ່ນການຖ່າຍທອດສົດ.
ຄຳຖາມທີ່ພົບເລື້ອຍ
ຫຼິ້ນໃນໂທລະສັບໄດ້ບໍ?
ເກມໃຊ້ໄດ້ໃນຄອມພິວເຕີ ແລະມືຖືຜ່ານກາຊິໂນທີ່ເຂົ້າຮ່ວມ. ຕ້ອງມີການເຊື່ອມຕໍ່ທີ່ຄົງທີ່ສຳລັບວິດີໂອສົດແລະເດີມພັນ.
ເກມມີຢູ່ໃສ?
ການເຂົ້າເຖິງຂຶ້ນກັບກາຊິໂນ ປະເທດ ແລະກົດທ້ອງຖິ່ນ. ຊອກ Ice Fishing ໃນລາຍການເກມສົດ ແລະກວດສິດຂອງບັນຊີ.
ມີໂປຣໂມຊັນກາຊິໂນບໍ?
ກາຊິໂນກຳນົດຂໍ້ສະເໜີຝາກເງິນແລະໂປຣໂມຊັນເກມ. ກວດຄຸນສົມບັດ ເງື່ອນໄຂເດີມພັນ ແລະວ່າ Ice Fishing ຖືກນັບຫຼືບໍ່.
ທຸກຄົນເຂົ້າໂບນັດໄດ້ບໍ?
ທຸກຄົນເບິ່ງໄດ້ ແຕ່ມີແຕ່ຜູ້ທີ່ເດີມພັນໃສ່ໂບນັດທີ່ກົງກັນກ່ອນປິດຈຶ່ງມີສິດຮັບລາງວັນ. ເພີ່ມເດີມພັນຫຼັງຮູ້ຜົນບໍ່ໄດ້.
`);
  root.HubIceRules=locales;
})(window);
