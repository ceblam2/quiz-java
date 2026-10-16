/* =========================================================
   Banco de perguntas
   opts[0..3] = alternativas, ok = índice da correta.
   Trechos entre `crases` viram <code> no texto.
   ========================================================= */
const NIVEIS = {
  facil: {
    nome: "Fácil",
    forca: 1,
    pontos: 10,
    tempo: 600,   // segundos disponíveis na rodada
    rodada: 10,   // perguntas sorteadas por rodada
    codigo: 3,    // quantas delas pedem código
    temas: "Sintaxe, tipos primitivos, operadores, printf/Scanner, if/switch e laços",
    perguntas: [
      {
        q: "Qual destes é o tipo primitivo usado para guardar um único caractere?",
        opts: ["`String`", "`char`", "`Character`", "`byte`"],
        ok: 1,
        exp: "`char` é primitivo e guarda um caractere Unicode de 16 bits, escrito entre aspas simples: `'A'`. `String` e `Character` são classes, não tipos primitivos."
      },
      {
        q: "O que este código imprime?",
        code: 'int a = 7;\nint b = 2;\nSystem.out.println(a / b);',
        opts: ["`3.5`", "`4`", "`3`", "`3.0`"],
        ok: 2,
        exp: "Quando os dois operandos são `int`, a divisão é inteira e a parte decimal é descartada. Para obter `3.5`, um dos lados precisa ser `double`, como em `a / 2.0`."
      },
      {
        q: "Qual é o valor da expressão `17 % 5`?",
        opts: ["`3`", "`2`", "`3.4`", "`5`"],
        ok: 1,
        exp: "O operador `%` devolve o resto da divisão inteira. 17 dividido por 5 dá 3, com resto 2."
      },
      {
        q: "Qual especificador do `printf` mostra um `double` com exatamente duas casas decimais?",
        opts: ["`%d`", "`%2d`", "`%s`", "`%.2f`"],
        ok: 3,
        exp: "`%f` formata números de ponto flutuante e `.2` limita a duas casas: `printf(\"%.2f\", 3.14159)` mostra 3,14 ou 3.14, conforme o idioma do sistema. `%d` é para inteiros e `%s` para textos."
      },
      {
        q: "Com `Scanner sc = new Scanner(System.in);`, qual método lê um número inteiro digitado pelo usuário?",
        opts: ["`sc.nextLine()`", "`sc.readInt()`", "`sc.nextInt()`", "`sc.getInt()`"],
        ok: 2,
        exp: "`nextInt()` lê o próximo token como `int`. `nextLine()` lê a linha inteira como `String`. `readInt()` e `getInt()` não existem na classe `Scanner`."
      },
      {
        q: "O que este laço imprime?",
        code: 'int i = 0;\nwhile (i < 3) {\n  System.out.print(i);\n  i++;\n}',
        opts: ["`0123`", "`012`", "`123`", "`01`"],
        ok: 1,
        exp: "O laço roda enquanto `i < 3`, ou seja, para i = 0, 1 e 2. Quando `i` vira 3, a condição fica falsa e o laço termina."
      },
      {
        q: "O que este `switch` imprime?",
        code: 'int dia = 2;\nswitch (dia) {\n  case 1: System.out.print("A");\n  case 2: System.out.print("B");\n  case 3: System.out.print("C");\n  default: System.out.print("D");\n}',
        opts: ["`B`", "`BD`", "`BCD`", "`ABCD`"],
        ok: 2,
        exp: "Sem `break`, a execução \"cai\" para os casos seguintes (fall-through). Ela entra no `case 2` e continua por `case 3` e `default`, imprimindo BCD."
      },
      {
        q: "Qual operador representa o \"E\" lógico com curto-circuito?",
        opts: ["`&&`", "`&`", "`||`", "`and`"],
        ok: 0,
        exp: "Com `&&`, se o lado esquerdo for `false`, o direito nem é avaliado. `&` também faz o E lógico, mas avalia sempre os dois lados. `||` é o OU, e `and` não existe em Java."
      },
      {
        tipo: "codigo",
        q: "Declare uma variável `double` chamada `preco` com o valor `19.90` e imprima essa variável com `System.out.println`.",
        regras: [
          { teste: /\bdouble preco\b/, ok: "Variável `preco` declarada com o tipo `double`", falta: "Declare a variável com o tipo `double` e o nome `preco`." },
          { teste: /\bpreco=19\.90?;/, ok: "Valor `19.90` atribuído, com `;` no fim", falta: "Atribua `19.90` (com ponto) e termine a linha com `;`." },
          { teste: /System\.out\.println\(preco\);/, ok: "Impressão com `System.out.println(preco);`", falta: "Imprima a variável com `System.out.println(preco);`, sem aspas em volta de `preco`." }
        ],
        dicas: [
          { teste: /println\("preco"\)/, msg: "Com aspas, `\"preco\"` imprime a palavra preco, e não o valor da variável." }
        ],
        solucao: [
          'double preco = 19.90;',
          'System.out.println(preco);   // 19.9'
        ],
        exp: "A declaração segue o formato `tipo nome = valor;`. Decimais usam ponto, e toda instrução termina com `;`. O `println` mostra 19.9 porque o zero final não é guardado."
      },
      {
        tipo: "codigo",
        q: "Escreva um laço `for` que imprima os números de 1 a 5, um por linha.",
        regras: [
          { teste: /\bfor\(/, ok: "Usa um laço `for`", falta: "Use um laço `for (...) { ... }`." },
          { teste: /for\(int (\w+)=1;\1(?:<=5|<6);(?:\1\+\+|\+\+\1|\1\+=1)\)/, ok: "O contador vai de 1 a 5", falta: "Monte o cabeçalho para contar de 1 a 5: `for (int i = 1; i <= 5; i++)`." },
          {
            teste: (c) => {
              const m = c.match(/for\(int (\w+)=/);
              return !!m && new RegExp("System\\.out\\.println\\(" + m[1] + "\\);").test(c);
            },
            ok: "Imprime o contador com `println`",
            falta: "Dentro do laço, imprima o contador: `System.out.println(i);`."
          }
        ],
        dicas: [
          { teste: /for\(int \w+=0;/, msg: "Começando em 0, o laço também imprime o 0. Comece o contador em 1." },
          { teste: /for\(\w+=/, msg: "Declare o contador dentro do `for`: `int i = 1`." },
          { teste: /for\([^;)]*,[^)]*\)/, msg: "As três partes do `for` são separadas por `;`, não por vírgula." }
        ],
        solucao: [
          'for (int i = 1; i <= 5; i++) {',
          '  System.out.println(i);',
          '}'
        ],
        exp: "O `for` tem três partes separadas por `;`: início (`int i = 1`), condição (`i <= 5`) e incremento (`i++`). A condição `i < 6` também funciona."
      },
      {
        tipo: "codigo",
        q: "O código abaixo tem 2 erros e não compila. Corrija-o no editor.",
        inicial: 'int idade = 18\nif (idade >= 18) {\n  System.out.println("Maior de idade");\n',
        regras: [
          { teste: /\bint idade=18;/, ok: "`;` adicionado depois de `int idade = 18`", falta: "Falta `;` no fim da declaração `int idade = 18`." },
          { teste: /if\(idade>=18\)\{/, ok: "Condição do `if` mantida", falta: "Mantenha a condição `if (idade >= 18) {`." },
          { teste: /System\.out\.println\("[^"]*"\);/, ok: "Linha do `println` mantida", falta: "Mantenha a linha `System.out.println(\"Maior de idade\");`." }
        ],
        solucao: [
          'int idade = 18;',
          'if (idade >= 18) {',
          '  System.out.println("Maior de idade");',
          '}'
        ],
        exp: "Toda instrução termina com `;` e todo bloco aberto com `{` precisa de um `}`. O compilador acusaria `';' expected` e `reached end of file while parsing`."
      },
      {
        q: "Qual é o valor impresso?",
        code: 'int x = 5;\nx += 3;\nx++;\nSystem.out.println(x);',
        opts: ["`8`", "`9`", "`10`", "`53`"],
        ok: 1,
        exp: "`x += 3` deixa `x` com 8 e `x++` soma mais 1, resultando em 9."
      },
      {
        q: "Qual é a forma correta de comparar o conteúdo de duas `String`s, `s1` e `s2`?",
        opts: ["`s1 == s2`", "`s1.equals(s2)`", "`s1 = s2`", "`s1.compare(s2)`"],
        ok: 1,
        exp: "`equals` compara o texto. O `==` compara se as duas variáveis apontam para o mesmo objeto, e `=` é atribuição. `compare` não existe em `String`."
      },
      {
        q: "O que este código imprime?",
        code: 'String nome = "Java";\nSystem.out.println(nome.charAt(2));',
        opts: ["`J`", "`a`", "`v`", "`Java`"],
        ok: 2,
        exp: "As posições de uma `String` começam em 0: J(0), a(1), v(2), a(3). Por isso `charAt(2)` devolve `v`."
      },
      {
        q: "Qual destas linhas NÃO compila?",
        opts: ["`int a = 10;`", "`double b = 3.5;`", "`int c = 3.5;`", "`long d = 100;`"],
        ok: 2,
        exp: "Java não converte `double` em `int` sozinho, porque perderia os decimais. Já `int` cabe em `long` e em `double` sem problemas."
      },
      {
        q: "O que este laço imprime?",
        code: 'for (int i = 0; i < 10; i += 3) {\n  System.out.print(i + " ");\n}',
        opts: ["`0 3 6 9 `", "`3 6 9 `", "`0 3 6 `", "`0 3 6 9 12 `"],
        ok: 0,
        exp: "O contador anda de 3 em 3: 0, 3, 6 e 9. Quando chega a 12, a condição `i < 10` fica falsa e o laço termina."
      },
      {
        q: "O que este código imprime?",
        code: 'int n = 5;\ndo {\n  System.out.print(n);\n  n++;\n} while (n < 5);',
        opts: ["Nada é impresso", "`5`", "`56`", "Laço infinito"],
        ok: 1,
        exp: "O `do-while` testa a condição só no fim, então o corpo roda pelo menos uma vez: imprime 5, `n` vira 6 e a condição `6 < 5` encerra o laço."
      },
      {
        q: "Qual é o valor impresso?",
        code: 'int a = 10, b = 3;\nSystem.out.println(a > b && b > 5 || a == 10);',
        opts: ["`true`", "`false`", "Erro de compilação", "`10`"],
        ok: 0,
        exp: "`&&` é avaliado antes de `||`. Primeiro `true && false` dá `false`, depois `false || true` dá `true`."
      },
      {
        tipo: "codigo",
        q: "Usando o `Scanner sc` já criado, leia um número inteiro e guarde em `int numero`. Depois imprima o dobro desse número.",
        inicial: 'Scanner sc = new Scanner(System.in);\n',
        regras: [
          { teste: /\bint numero=sc\.nextInt\(\);/, ok: "Leitura com `int numero = sc.nextInt();`", falta: "Leia o inteiro com `int numero = sc.nextInt();`." },
          { teste: /System\.out\.println\((?:numero\*2|2\*numero|numero\+numero)\);/, ok: "Imprime o dobro de `numero`", falta: "Imprima o dobro com `System.out.println(numero * 2);`." }
        ],
        dicas: [
          { teste: /sc\.nextLine\(\)/, msg: "`nextLine()` devolve um texto (`String`). Para um `int`, use `nextInt()`." },
          { teste: /sc\.nextint\(\)/, msg: "O nome é `nextInt`, com o I maiúsculo." },
          { teste: /println\(numero\)/, msg: "Isso imprime o próprio número. Falta multiplicar por 2." }
        ],
        solucao: [
          'Scanner sc = new Scanner(System.in);',
          'int numero = sc.nextInt();',
          'System.out.println(numero * 2);'
        ],
        exp: "`nextInt()` lê o próximo token digitado como `int`. Depois é só usar a variável numa expressão, como `numero * 2`."
      },
      {
        tipo: "codigo",
        q: "Dada a variável `int n = 8;`, escreva um `if/else` que imprima \"Par\" se `n` for par e \"Ímpar\" caso contrário.",
        inicial: 'int n = 8;\n',
        regras: [
          { teste: /if\(n%2(?:==0|==1|!=0|!=1|>0)\)/, ok: "Testa a paridade com `n % 2`", falta: "Use o resto da divisão para testar a paridade: `if (n % 2 == 0)`." },
          { teste: /\belse\b/, ok: "Tem um ramo `else`", falta: "Inclua um `else` para o caso contrário." },
          {
            teste: (c) => {
              const m = c.match(/if\(n%2(==0|==1|!=0|!=1|>0)\)\{?System\.out\.println\("(\w+)"\);\}?else\{?System\.out\.println\("(\w+)"\);\}?/i);
              if (!m) return false;
              const parPrimeiro = m[1] === "==0" || m[1] === "!=1";
              return parPrimeiro ? /^par$/i.test(m[2]) && /^impar$/i.test(m[3]) : /^impar$/i.test(m[2]) && /^par$/i.test(m[3]);
            },
            ok: "Cada ramo imprime a mensagem certa",
            falta: "Imprima \"Par\" quando o resto for 0 e \"Ímpar\" no `else`, cada um com `System.out.println(...);`."
          }
        ],
        dicas: [
          { teste: /n\/2==0/, msg: "`/` é a divisão. Para saber se sobra resto, use `%`." },
          { teste: /if\(n%2=\d\)/, msg: "No `if`, compare com `==`. Um `=` sozinho é atribuição." }
        ],
        solucao: [
          'int n = 8;',
          'if (n % 2 == 0) {',
          '  System.out.println("Par");',
          '} else {',
          '  System.out.println("Ímpar");',
          '}'
        ],
        exp: "Um número é par quando o resto da divisão por 2 é 0. O `else` cobre todos os outros casos."
      }
    ]
  },

  medio: {
    nome: "Médio",
    forca: 2,
    pontos: 20,
    tempo: 600,
    rodada: 10,
    codigo: 3,
    temas: "Classes, construtores, encapsulamento, getters/setters, arrays e ArrayList",
    perguntas: [
      {
        q: "O que caracteriza um construtor em Java?",
        opts: [
          "Tem o mesmo nome da classe e não declara tipo de retorno",
          "É declarado com a palavra-chave `constructor`",
          "Precisa ter tipo de retorno `void`",
          "Cada classe pode ter apenas um construtor"
        ],
        ok: 0,
        exp: "O construtor tem o nome da classe e nenhum tipo de retorno, nem `void`. Uma classe pode ter vários construtores com parâmetros diferentes (sobrecarga)."
      },
      {
        q: "Para aplicar encapsulamento, como os atributos de uma classe costumam ser declarados?",
        opts: ["`public`", "`static`", "`private`", "`final`"],
        ok: 2,
        exp: "Atributos `private` só podem ser acessados dentro da própria classe. O acesso externo passa por getters e setters, que podem validar os valores."
      },
      {
        q: "No setter abaixo, para que serve o `this`?",
        code: 'public void setNome(String nome) {\n  this.nome = nome;\n}',
        opts: [
          "Cria um novo objeto da classe",
          "Diferencia o atributo do objeto do parâmetro com o mesmo nome",
          "Chama o construtor da superclasse",
          "Torna o atributo estático"
        ],
        ok: 1,
        exp: "`this.nome` é o atributo do objeto atual, e `nome` sozinho é o parâmetro. Sem o `this`, a linha atribuiria o parâmetro a ele mesmo e o atributo não mudaria."
      },
      {
        q: "O que acontece ao executar este código?",
        code: 'int[] nums = new int[5];\nSystem.out.println(nums[5]);',
        opts: [
          "Imprime `0`",
          "Imprime `null`",
          "Erro de compilação",
          "Lança `ArrayIndexOutOfBoundsException`"
        ],
        ok: 3,
        exp: "Um array de tamanho 5 tem índices de 0 a 4. O código compila, mas acessar `nums[5]` lança `ArrayIndexOutOfBoundsException` em tempo de execução."
      },
      {
        q: "Como se obtém o tamanho de um array `arr` e de um `ArrayList` chamado `lista`?",
        opts: [
          "`arr.size()` e `lista.length`",
          "`arr.length` e `lista.size()`",
          "`arr.length()` e `lista.length()`",
          "`arr.size` e `lista.count()`"
        ],
        ok: 1,
        exp: "Em arrays, `length` é um atributo, sem parênteses. Em `ArrayList`, o tamanho vem do método `size()`."
      },
      {
        q: "O que este código imprime?",
        code: 'ArrayList<String> l = new ArrayList<>();\nl.add("A");\nl.add("B");\nl.add(0, "C");\nSystem.out.println(l);',
        opts: ["`[A, B, C]`", "`[C, B]`", "`[C, A, B]`", "`[A, C, B]`"],
        ok: 2,
        exp: "`add(0, \"C\")` insere na posição 0 e desloca os elementos existentes para a direita. O `toString()` do `ArrayList` mostra `[C, A, B]`."
      },
      {
        q: "Por que `ArrayList<int> numeros = new ArrayList<>();` não compila?",
        opts: [
          "Porque `ArrayList` só aceita `String`",
          "Porque falta informar o tamanho inicial",
          "Porque genéricos não aceitam tipos primitivos; o certo é `ArrayList<Integer>`",
          "Porque o operador diamante `<>` não pode ser usado aqui"
        ],
        ok: 2,
        exp: "Genéricos só trabalham com objetos. Usa-se a classe wrapper `Integer`, e o autoboxing converte `int` ↔ `Integer` automaticamente em `add` e `get`."
      },
      {
        q: "Um atributo declarado como `static` em uma classe...",
        opts: [
          "é copiado para cada objeto criado",
          "é compartilhado por todos os objetos da classe",
          "não pode ter o valor alterado",
          "só pode ser acessado por getters"
        ],
        ok: 1,
        exp: "Um membro `static` pertence à classe, não a cada objeto: existe uma única cópia, compartilhada. O que impede a alteração é `final`, outro modificador."
      },
      {
        tipo: "codigo",
        q: "Crie a classe `Produto` com o atributo `private String nome` e um construtor que recebe o nome e o atribui usando `this`.",
        regras: [
          { teste: /\bclass Produto\{/, ok: "Classe `Produto` declarada", falta: "Declare a classe: `public class Produto { ... }`." },
          { teste: /private String nome;/, ok: "Atributo `private String nome`", falta: "Crie o atributo `private String nome;` dentro da classe." },
          { teste: (c) => /\bProduto\(String \w+\)\{/.test(c) && !/void Produto\(/.test(c), ok: "Construtor `Produto(String ...)` sem tipo de retorno", falta: "Crie o construtor com o nome da classe e sem tipo de retorno: `public Produto(String nome)`." },
          { teste: /this\.nome=\w+;/, ok: "Atribuição com `this.nome = ...`", falta: "No construtor, atribua o parâmetro ao atributo com `this.nome = nome;`." }
        ],
        dicas: [
          { teste: /void Produto\(/, msg: "Construtor não tem tipo de retorno. Com `void`, vira um método comum." },
          { teste: /(^|[^.\w])nome=nome;/, msg: "`nome = nome` atribui o parâmetro a ele mesmo. Use `this.nome = nome`." }
        ],
        solucao: [
          'public class Produto {',
          '  private String nome;',
          '',
          '  public Produto(String nome) {',
          '    this.nome = nome;',
          '  }',
          '}'
        ],
        exp: "O construtor tem o mesmo nome da classe e roda no `new`. O `this.nome` aponta para o atributo do objeto, e `nome` sozinho é o parâmetro."
      },
      {
        tipo: "codigo",
        q: "Para o atributo `private int estoque`, escreva o getter e o setter. O setter só deve aceitar valores maiores ou iguais a zero. Não é preciso escrever a classe.",
        inicial: "private int estoque;\n\n",
        regras: [
          { teste: /public int getEstoque\(\)\{/, ok: "Getter `public int getEstoque()`", falta: "Crie o getter `public int getEstoque() { ... }`." },
          { teste: /return (?:this\.)?estoque;/, ok: "O getter retorna `estoque`", falta: "O getter deve terminar com `return estoque;`." },
          { teste: /public void setEstoque\(int \w+\)\{/, ok: "Setter `public void setEstoque(int ...)`", falta: "Crie o setter `public void setEstoque(int estoque) { ... }`." },
          { teste: /if\(\w+(?:>=0|>-1)\)|if\(0<=\w+\)|if\(\w+<0\)/, ok: "Validação com `if` para valores negativos", falta: "Valide o valor no setter, por exemplo `if (estoque >= 0)`." },
          { teste: (c) => /this\.estoque=\w+;/.test(c) || /(^|[^.\w])estoque=(?!estoque;)\w+;/.test(c), ok: "O valor é gravado no atributo", falta: "Grave o valor no atributo com `this.estoque = estoque;`." }
        ],
        dicas: [
          { teste: /(^|[^.\w])estoque=estoque;/, msg: "Sem o `this`, `estoque = estoque` só atribui o parâmetro a ele mesmo." },
          { teste: /getestoque|setestoque/, msg: "O padrão é camelCase: `getEstoque` e `setEstoque`, com E maiúsculo." }
        ],
        solucao: [
          'private int estoque;',
          '',
          'public int getEstoque() {',
          '  return estoque;',
          '}',
          '',
          'public void setEstoque(int estoque) {',
          '  if (estoque >= 0) {',
          '    this.estoque = estoque;',
          '  }',
          '}'
        ],
        exp: "O getter só devolve o valor. O setter recebe o novo valor, valida com `if` e só então grava no atributo. É isso que o encapsulamento protege."
      },
      {
        tipo: "codigo",
        q: "Crie um `ArrayList` de `String` chamado `nomes`, adicione \"Ana\" e \"Leo\" e imprima o tamanho da lista.",
        regras: [
          { teste: /(?:Array)?List<String>nomes=new ArrayList<(?:String)?>\(\);/, ok: "Lista `nomes` criada com `new ArrayList<>()`", falta: "Crie a lista: `ArrayList<String> nomes = new ArrayList<>();`." },
          { teste: (c) => /nomes\.add\("Ana"\);/.test(c) && /nomes\.add\("Leo"\);/.test(c), ok: "\"Ana\" e \"Leo\" adicionados com `add`", falta: "Adicione os dois nomes com `nomes.add(\"Ana\");` e `nomes.add(\"Leo\");`." },
          { teste: /System\.out\.println\(nomes\.size\(\)\);/, ok: "Tamanho impresso com `nomes.size()`", falta: "Imprima o tamanho com `System.out.println(nomes.size());`." }
        ],
        dicas: [
          { teste: /nomes\.length/, msg: "`ArrayList` usa `size()`. O `length` é só de arrays." },
          { teste: /nomes\.size\b(?!\()/, msg: "`size` é um método: escreva `size()` com parênteses." },
          { teste: /ArrayList\(\)/, msg: "Faltou o operador diamante: `new ArrayList<>()`." }
        ],
        solucao: [
          'ArrayList<String> nomes = new ArrayList<>();',
          'nomes.add("Ana");',
          'nomes.add("Leo");',
          'System.out.println(nomes.size());   // 2'
        ],
        exp: "O tipo entre `< >` diz o que a lista guarda. `add` insere no fim e `size()` devolve quantos elementos existem."
      },
      {
        q: "A classe `Aluno` declara só o construtor `Aluno(String nome)`. O que acontece com `new Aluno()`?",
        opts: [
          "Usa o construtor padrão automaticamente",
          "Erro de compilação, porque o construtor padrão deixou de existir",
          "Cria o objeto com os atributos nulos",
          "Lança uma exceção em tempo de execução"
        ],
        ok: 1,
        exp: "O construtor padrão (sem parâmetros) só é criado quando a classe não declara nenhum construtor. Se você escreve um, precisa declarar o vazio também, caso queira usá-lo."
      },
      {
        q: "Qual é o valor impresso?",
        code: 'int[] a = {4, 8, 15};\nint soma = 0;\nfor (int v : a) {\n  soma += v;\n}\nSystem.out.println(soma);',
        opts: ["`27`", "`12`", "`15`", "`19`"],
        ok: 0,
        exp: "O for-each visita cada elemento do array: 4 + 8 + 15 = 27."
      },
      {
        q: "O que é sobrecarga (overload) de métodos?",
        opts: [
          "Vários métodos com o mesmo nome e parâmetros diferentes na mesma classe",
          "Reescrever na subclasse um método herdado",
          "Métodos com nomes diferentes e os mesmos parâmetros",
          "Declarar o mesmo método como `private` e `public`"
        ],
        ok: 0,
        exp: "Na sobrecarga, o nome se repete mas a lista de parâmetros muda (tipos ou quantidade). Reescrever um método herdado é sobrescrita (override)."
      },
      {
        q: "O que este código imprime?",
        code: 'ArrayList<Integer> l = new ArrayList<>(List.of(10, 20, 30));\nl.remove(1);\nSystem.out.println(l);',
        opts: ["`[10, 30]`", "`[20, 30]`", "`[10, 20, 30]`", "`[10, 20]`"],
        ok: 0,
        exp: "`remove(1)` com um `int` remove a posição 1, que guarda o 20. Para remover o valor 1 da lista seria preciso `remove(Integer.valueOf(1))`."
      },
      {
        q: "Qual é o valor impresso?",
        code: 'class Conta {\n  double saldo;\n}\n\nConta a = new Conta();\nConta b = a;\nb.saldo = 50;\nSystem.out.println(a.saldo);',
        opts: ["`0.0`", "`50.0`", "`50`", "Erro de compilação"],
        ok: 1,
        exp: "`Conta b = a;` copia a referência, não o objeto: `a` e `b` apontam para o mesmo `Conta`. Alterar por `b` muda o que `a` enxerga. E o `double` é impresso como 50.0."
      },
      {
        q: "Qual laço percorre um array `int[] v` do início ao fim sem sair dos índices válidos?",
        opts: [
          "`for (int i = 0; i <= v.length; i++)`",
          "`for (int i = 0; i < v.length; i++)`",
          "`for (int i = 1; i < v.length; i++)`",
          "`for (int i = 0; i < v.length(); i++)`"
        ],
        ok: 1,
        exp: "O último índice é `length - 1`. Com `<=` passa do fim, começando em 1 pula o primeiro elemento, e `length()` com parênteses não existe em arrays."
      },
      {
        q: "Qual é a principal vantagem de usar getters e setters em vez de atributos públicos?",
        opts: [
          "Executam mais rápido",
          "Permitem validar e controlar o acesso aos dados",
          "São obrigatórios para o código compilar",
          "Evitam o uso de `new`"
        ],
        ok: 1,
        exp: "Com acesso por métodos, a classe decide o que pode ser lido ou alterado e pode recusar valores inválidos, como um saldo negativo."
      },
      {
        tipo: "codigo",
        q: "Escreva o método `public double calcularMedia(int a, int b)`, que retorna a média dos dois números sem perder as casas decimais.",
        regras: [
          { teste: /public double calcularMedia\(int \w+,int \w+\)\{/, ok: "Assinatura `public double calcularMedia(int a, int b)`", falta: "Declare o método como `public double calcularMedia(int a, int b) { ... }`." },
          {
            teste: (c) => {
              const m = c.match(/return(.+?);/);
              if (!m) return false;
              const e = m[1];
              return /\(\w+\+\w+\)/.test(e) && (/\/2\.0|\/2d|\/\(double\)2|\*0\.5/.test(e) || (/\(double\)/.test(e) && /\/2/.test(e)));
            },
            ok: "Retorna a soma entre parênteses dividida por `2.0`",
            falta: "Retorne `(a + b) / 2.0`. Dividir por `2` (inteiro) descartaria os decimais."
          }
        ],
        dicas: [
          { teste: /return\(\w+\+\w+\)\/2;/, msg: "Com dois `int`, `/ 2` é divisão inteira: 7 e 8 daria 7, e não 7.5." },
          { teste: /return\w+\+\w+\/2/, msg: "Sem parênteses, a divisão acontece antes da soma. Use `(a + b) / 2.0`." }
        ],
        solucao: [
          'public double calcularMedia(int a, int b) {',
          '  return (a + b) / 2.0;',
          '}'
        ],
        exp: "Dividir um `int` por `2.0` (um `double`) faz o resultado ser `double`. Os parênteses garantem que a soma venha antes da divisão."
      },
      {
        tipo: "codigo",
        q: "Some todos os elementos do array `notas` na variável `soma` usando um laço, e depois imprima `soma`.",
        inicial: 'int[] notas = {7, 9, 5, 8};\nint soma = 0;\n',
        regras: [
          { teste: /for\(int \w+=0;\w+<notas\.length;\w+\+\+\)|for\(int \w+:notas\)/, ok: "Percorre o array inteiro", falta: "Percorra todo o array: `for (int i = 0; i < notas.length; i++)` ou `for (int n : notas)`." },
          { teste: /soma\+=(?:notas\[\w+\]|\w+);|soma=soma\+(?:notas\[\w+\]|\w+);/, ok: "Acumula cada elemento em `soma`", falta: "Dentro do laço, acumule: `soma += notas[i];`." },
          { teste: /System\.out\.println\(soma\);/, ok: "Imprime `soma`", falta: "No final, imprima com `System.out.println(soma);`." }
        ],
        dicas: [
          { teste: /<=notas\.length/, msg: "`<=` com `length` passa do último índice e lança `ArrayIndexOutOfBoundsException`." },
          { teste: /notas\.length\(\)/, msg: "Em arrays, `length` não tem parênteses." },
          { teste: /notas\.size/, msg: "`size()` é de `ArrayList`. Em arrays, use `length`." }
        ],
        solucao: [
          'int[] notas = {7, 9, 5, 8};',
          'int soma = 0;',
          '',
          'for (int i = 0; i < notas.length; i++) {',
          '  soma += notas[i];',
          '}',
          'System.out.println(soma);   // 29'
        ],
        exp: "O laço visita cada posição de 0 a `length - 1` e acumula o valor em `soma`. Só depois do laço a soma está completa, por isso o `println` vem no fim."
      }
    ]
  },

  dificil: {
    nome: "Difícil",
    forca: 3,
    pontos: 30,
    tempo: 600,
    rodada: 10,
    codigo: 3,
    temas: "Herança, polimorfismo, interfaces, exceções, HashMap e HashSet",
    perguntas: [
      {
        q: "O que este código imprime?",
        code: 'class Animal {\n  String som() { return "..."; }\n}\nclass Cachorro extends Animal {\n  @Override\n  String som() { return "Au"; }\n}\n\nAnimal a = new Cachorro();\nSystem.out.println(a.som());',
        opts: ["`...`", "`Au`", "Erro de compilação", "`Au...`"],
        ok: 1,
        exp: "Isso é polimorfismo: a variável é do tipo `Animal`, mas o objeto é um `Cachorro`. Em tempo de execução, Java chama a versão sobrescrita do objeto real."
      },
      {
        q: "Sobre herança em Java, qual afirmação é verdadeira?",
        opts: [
          "Uma classe pode estender várias classes ao mesmo tempo",
          "Uma classe estende no máximo uma classe, mas pode implementar várias interfaces",
          "Uma interface não pode estender outra interface",
          "Métodos `private` da superclasse são herdados e podem ser sobrescritos"
        ],
        ok: 1,
        exp: "Java não tem herança múltipla de classes (`extends` aceita uma só), mas `implements` aceita várias interfaces. Interfaces podem estender outras interfaces, e métodos `private` não são sobrescritos."
      },
      {
        q: "O que este código imprime?",
        code: 'try {\n  int x = 10 / 0;\n  System.out.print("A");\n} catch (ArithmeticException e) {\n  System.out.print("B");\n} finally {\n  System.out.print("C");\n}',
        opts: ["`AC`", "`B`", "`ABC`", "`BC`"],
        ok: 3,
        exp: "`10 / 0` com inteiros lança `ArithmeticException` antes de imprimir \"A\". O `catch` imprime \"B\" e o `finally` sempre executa, imprimindo \"C\"."
      },
      {
        q: "Qual destas exceções é checked, ou seja, o compilador obriga a tratar com `try-catch` ou declarar com `throws`?",
        opts: ["`NullPointerException`", "`ArithmeticException`", "`IOException`", "`ArrayIndexOutOfBoundsException`"],
        ok: 2,
        exp: "`IOException` herda de `Exception` sem passar por `RuntimeException`, então é checked. As outras três são subclasses de `RuntimeException` (unchecked)."
      },
      {
        q: "Qual é a saída?",
        code: 'Set<String> s = new HashSet<>();\ns.add("java");\ns.add("Java");\ns.add("java");\nSystem.out.println(s.size());',
        opts: ["`1`", "`2`", "`3`", "Lança exceção ao repetir um elemento"],
        ok: 1,
        exp: "`HashSet` não guarda duplicatas: o segundo `\"java\"` é ignorado e `add` só retorna `false`. Como a comparação diferencia maiúsculas, `\"Java\"` é outro elemento. Total: 2."
      },
      {
        q: "Qual é a saída?",
        code: 'Map<String, Integer> m = new HashMap<>();\nm.put("a", 1);\nm.put("b", 2);\nm.put("a", 3);\nSystem.out.println(m.get("a") + m.size());',
        opts: ["`32`", "`4`", "`5`", "`3`"],
        ok: 2,
        exp: "`put` com uma chave que já existe substitui o valor, então \"a\" passa a valer 3 e o mapa continua com 2 chaves. `Integer + int` é soma numérica (não concatenação): 3 + 2 = 5."
      },
      {
        q: "O que `m.get(\"x\")` retorna quando a chave \"x\" não existe no `HashMap<String, Integer> m`?",
        opts: ["`0`", "`null`", "Lança `NoSuchElementException`", "Uma `String` vazia"],
        ok: 1,
        exp: "`get` devolve `null` para chaves ausentes. Para ter um valor padrão, use `m.getOrDefault(\"x\", 0)`. Cuidado: atribuir esse `null` a um `int` lança `NullPointerException` no unboxing."
      },
      {
        q: "Qual afirmação sobre interfaces é verdadeira?",
        opts: [
          "Interfaces podem ter construtores",
          "Atributos de interface são `private` por padrão",
          "Desde o Java 8, interfaces podem ter métodos `default` com implementação",
          "Uma interface pode ser instanciada diretamente com `new`"
        ],
        ok: 2,
        exp: "Métodos `default` permitem adicionar comportamento a uma interface sem quebrar quem já a implementa. Interfaces não têm construtores, seus atributos são `public static final` e elas não podem ser instanciadas."
      },
      {
        tipo: "codigo",
        q: "Usando a classe `Veiculo` abaixo, crie a classe `Carro`, que herda de `Veiculo` e sobrescreve `tipo()` para retornar \"Carro\". Use `@Override`.",
        code: 'class Veiculo {\n  public String tipo() {\n    return "Veículo";\n  }\n}',
        regras: [
          { teste: /\bclass Carro extends Veiculo\{/, ok: "`Carro extends Veiculo`", falta: "Declare a herança: `class Carro extends Veiculo { ... }`." },
          { teste: /@Override/, ok: "Anotação `@Override` presente", falta: "Coloque `@Override` na linha acima do método." },
          { teste: /public String tipo\(\)\{/, ok: "Método `public String tipo()` com a mesma assinatura", falta: "Sobrescreva com a mesma assinatura: `public String tipo()`." },
          { teste: /return "Carro";/, ok: "Retorna \"Carro\"", falta: "O método deve ter `return \"Carro\";`." }
        ],
        dicas: [
          { teste: /implements Veiculo/, msg: "`Veiculo` é uma classe: herde com `extends`. O `implements` é para interfaces." },
          { teste: /@override/, msg: "A anotação é `@Override`, com O maiúsculo." },
          { teste: (c) => /String tipo\(\)\{/.test(c) && !/public String tipo\(\)\{/.test(c), msg: "Sem `public`, o método fica com acesso mais restrito que o original, e Java não permite isso na sobrescrita." }
        ],
        solucao: [
          'class Carro extends Veiculo {',
          '  @Override',
          '  public String tipo() {',
          '    return "Carro";',
          '  }',
          '}'
        ],
        exp: "`extends` cria a herança e `@Override` pede ao compilador que confirme que o método existe na superclasse. A visibilidade não pode diminuir: se o original é `public`, a sobrescrita também precisa ser."
      },
      {
        tipo: "codigo",
        q: "Escreva um `try-catch` que tente converter o texto \"abc\" com `Integer.parseInt`. Se ocorrer `NumberFormatException`, imprima \"Número inválido\".",
        regras: [
          { teste: /\btry\{/, ok: "Bloco `try` aberto", falta: "Envolva a conversão em um bloco `try { ... }`." },
          { teste: /Integer\.parseInt\("abc"\)/, ok: "Conversão com `Integer.parseInt(\"abc\")`", falta: "Dentro do `try`, chame `Integer.parseInt(\"abc\")`." },
          { teste: /catch\(NumberFormatException \w+\)\{/, ok: "`catch (NumberFormatException e)`", falta: "Capture o tipo específico: `catch (NumberFormatException e) { ... }`." },
          { teste: /System\.out\.println\("numero invalido"\);/i, ok: "Mensagem \"Número inválido\" impressa", falta: "No `catch`, imprima `System.out.println(\"Número inválido\");`." }
        ],
        dicas: [
          { teste: /catch\(Exception \w+\)/, msg: "`catch (Exception e)` também funciona, mas o enunciado pede o tipo específico `NumberFormatException`." },
          { teste: /catch\(NumberFormatException\)/, msg: "O `catch` precisa de um nome para a exceção: `catch (NumberFormatException e)`." },
          { teste: /Integer\.parseint|integer\.parseInt/, msg: "O nome certo é `Integer.parseInt`, com I e o segundo I maiúsculos." }
        ],
        solucao: [
          'try {',
          '  int n = Integer.parseInt("abc");',
          '} catch (NumberFormatException e) {',
          '  System.out.println("Número inválido");',
          '}'
        ],
        exp: "\"abc\" não é um número, então `parseInt` lança `NumberFormatException`. Como ela é unchecked, o compilador não obriga o `try-catch`, mas sem ele o programa encerraria com erro."
      },
      {
        tipo: "codigo",
        q: "Crie um `HashMap<String, Integer>` chamado `idades`, guarde \"Ana\" com o valor 20 e imprima a idade de \"Ana\" usando `get`.",
        regras: [
          { teste: /(?:Hash)?Map<String,Integer>idades=new HashMap<(?:String,Integer)?>\(\);/, ok: "Mapa `idades` criado com `new HashMap<>()`", falta: "Crie o mapa: `Map<String, Integer> idades = new HashMap<>();`." },
          { teste: /idades\.put\("Ana",20\);/, ok: "Par \"Ana\" → 20 guardado com `put`", falta: "Guarde o par com `idades.put(\"Ana\", 20);`." },
          { teste: /System\.out\.println\(idades\.get\("Ana"\)\);/, ok: "Valor lido com `idades.get(\"Ana\")`", falta: "Imprima com `System.out.println(idades.get(\"Ana\"));`." }
        ],
        dicas: [
          { teste: /idades\.add\(/, msg: "`Map` não tem `add`. Use `put(chave, valor)`." },
          { teste: /Map<String,int>/, msg: "Genéricos não aceitam primitivos: use `Integer` em vez de `int`." },
          { teste: /idades\.get\(Ana\)/, msg: "A chave é um texto: escreva `\"Ana\"` entre aspas." }
        ],
        solucao: [
          'Map<String, Integer> idades = new HashMap<>();',
          'idades.put("Ana", 20);',
          'System.out.println(idades.get("Ana"));   // 20'
        ],
        exp: "`put` associa uma chave a um valor e `get` busca pelo valor da chave. Se a chave não existisse, `get` devolveria `null`."
      },
      {
        q: "O que este código imprime?",
        code: 'class A {\n  A() { System.out.print("A"); }\n}\nclass B extends A {\n  B() { System.out.print("B"); }\n}\n\nnew B();',
        opts: ["`B`", "`AB`", "`BA`", "`A`"],
        ok: 1,
        exp: "Todo construtor de subclasse chama o da superclasse primeiro (um `super()` implícito, se você não escrever). Por isso `A` aparece antes de `B`."
      },
      {
        q: "Qual é a saída?",
        code: 'List<Integer> l = new ArrayList<>();\nl.add(3);\nl.add(1);\nl.add(3);\nSet<Integer> s = new HashSet<>(l);\nSystem.out.println(l.size() + " " + s.size());',
        opts: ["`3 3`", "`3 2`", "`2 2`", "`2 3`"],
        ok: 1,
        exp: "A `List` aceita repetidos e fica com 3 elementos. Ao copiar para o `HashSet`, o segundo 3 é descartado e sobram 2."
      },
      {
        q: "O que este código imprime?",
        code: 'try {\n  String s = null;\n  System.out.println(s.length());\n} catch (NullPointerException e) {\n  System.out.println("nulo");\n} finally {\n  System.out.println("fim");\n}',
        opts: ["`nulo` e depois `fim`", "Só `nulo`", "Só `fim`", "`0` e depois `fim`"],
        ok: 0,
        exp: "Chamar um método em `null` lança `NullPointerException`. O `catch` imprime \"nulo\" e o `finally` roda de qualquer jeito, imprimindo \"fim\"."
      },
      {
        q: "Qual é a saída?",
        code: 'interface Forma {\n  double area();\n}\nclass Quadrado implements Forma {\n  double l;\n  Quadrado(double l) { this.l = l; }\n  public double area() { return l * l; }\n}\n\nForma f = new Quadrado(3);\nSystem.out.println(f.area());',
        opts: ["`9`", "`9.0`", "`6.0`", "Erro de compilação"],
        ok: 1,
        exp: "A variável é do tipo da interface, mas o objeto é um `Quadrado`, então roda o `area()` dele: 3 × 3 = 9. Como o retorno é `double`, imprime 9.0."
      },
      {
        q: "Qual ordem de blocos `catch` compila?",
        opts: [
          "`catch (Exception e)` seguido de `catch (ArithmeticException e)`",
          "`catch (ArithmeticException e)` seguido de `catch (Exception e)`",
          "As duas ordens compilam",
          "Nenhuma das duas compila"
        ],
        ok: 1,
        exp: "Os `catch` são testados em ordem. Se o genérico `Exception` vier primeiro, o específico nunca seria alcançado, e o compilador acusa erro. Vá sempre do mais específico para o mais genérico."
      },
      {
        q: "Qual é a saída?",
        code: 'Map<String, Integer> m = new HashMap<>();\nm.put("x", 1);\nm.put("y", 2);\nm.put("x", m.get("x") + 10);\nSystem.out.println(m.get("x"));',
        opts: ["`1`", "`11`", "`10`", "`12`"],
        ok: 1,
        exp: "`m.get(\"x\")` vale 1, e 1 + 10 = 11. O segundo `put` com a chave \"x\" substitui o valor antigo."
      },
      {
        q: "Considere `class Pai {}` e `class Filho extends Pai {}`. Qual linha NÃO compila?",
        opts: [
          "`Pai p = new Filho();`",
          "`Filho f = new Filho();`",
          "`Filho f = new Pai();`",
          "`Object o = new Filho();`"
        ],
        ok: 2,
        exp: "Todo `Filho` é um `Pai` (e um `Object`), então a variável do tipo mais geral aceita o objeto. O contrário não vale: um `Pai` não é necessariamente um `Filho`."
      },
      {
        tipo: "codigo",
        q: "Crie a interface `Voador` com o método `void voar();` e a classe `Passaro`, que implementa `Voador` e imprime \"Voando\" em `voar()`.",
        regras: [
          { teste: /\binterface Voador\{/, ok: "Interface `Voador` declarada", falta: "Declare a interface: `interface Voador { ... }`." },
          { teste: /void voar\(\);/, ok: "Método `void voar();` sem corpo na interface", falta: "Dentro da interface, declare o método sem corpo: `void voar();`." },
          { teste: /\bclass Passaro implements Voador\{/, ok: "`Passaro implements Voador`", falta: "Declare `class Passaro implements Voador { ... }`." },
          { teste: /public void voar\(\)\{/, ok: "Método `public void voar()` implementado", falta: "Implemente o método na classe como `public void voar() { ... }`." },
          { teste: /System\.out\.println\("voando"\);/i, ok: "Imprime \"Voando\"", falta: "No método, imprima com `System.out.println(\"Voando\");`." }
        ],
        dicas: [
          { teste: /class Passaro extends Voador/, msg: "Interfaces se implementam com `implements`. O `extends` é para herdar de uma classe." },
          { teste: (c) => /void voar\(\)\{/.test(c) && !/public void voar\(\)\{/.test(c), msg: "Ao implementar o método de uma interface, ele precisa ser `public`." },
          { teste: /interface Voador\{(?:public )?void voar\(\)\{/, msg: "Métodos de interface não têm corpo (a menos que sejam `default`). Termine com `;`." }
        ],
        solucao: [
          'interface Voador {',
          '  void voar();',
          '}',
          '',
          'class Passaro implements Voador {',
          '  public void voar() {',
          '    System.out.println("Voando");',
          '  }',
          '}'
        ],
        exp: "A interface é o contrato (só a assinatura) e a classe cumpre o contrato com `implements`. Os métodos de interface são `public`, então a implementação também precisa ser."
      },
      {
        tipo: "codigo",
        q: "Escreva o método `public void lancarSeNegativo(int n)`, que lança uma `IllegalArgumentException` com a mensagem \"Negativo\" quando `n` for menor que zero.",
        regras: [
          { teste: /void lancarSeNegativo\(int \w+\)\{/, ok: "Assinatura de `lancarSeNegativo(int n)`", falta: "Declare `public void lancarSeNegativo(int n) { ... }`." },
          {
            teste: (c) => {
              const m = c.match(/void lancarSeNegativo\(int (\w+)\)/);
              return !!m && new RegExp("if\\(" + m[1] + "<0\\)").test(c);
            },
            ok: "Testa se o parâmetro é menor que zero com `if`",
            falta: "Use um `if` para testar o parâmetro: `if (n < 0)`."
          },
          { teste: /throw new IllegalArgumentException\("negativo"\);/i, ok: "Lança `IllegalArgumentException(\"Negativo\")` com `throw new`", falta: "Lance a exceção com `throw new IllegalArgumentException(\"Negativo\");`." }
        ],
        dicas: [
          { teste: /throws new/, msg: "`throw` (sem s) lança a exceção. `throws` só aparece na assinatura do método." },
          { teste: /throw IllegalArgumentException/, msg: "Falta o `new`: a exceção é um objeto, então `throw new IllegalArgumentException(...)`." },
          { teste: (c) => /new IllegalArgumentException\(/.test(c) && !/throw new IllegalArgumentException\(/.test(c), msg: "Criar a exceção não basta: é preciso lançá-la com `throw new ...`." }
        ],
        solucao: [
          'public void lancarSeNegativo(int n) {',
          '  if (n < 0) {',
          '    throw new IllegalArgumentException("Negativo");',
          '  }',
          '}'
        ],
        exp: "`throw` interrompe o método e entrega a exceção a quem o chamou. `IllegalArgumentException` é unchecked, então não exige `throws` na assinatura."
      }
    ]
  }
};

/* =========================================================
   Resumo teórico de cada nível
   Cada tópico: titulo, intro (opcional), itens, code (linhas), atencao (opcional).
   ========================================================= */
const TEORIA = {
  facil: [
    {
      titulo: "Tipos primitivos",
      intro: "Java é fortemente tipado: toda variável tem um tipo fixo, escrito antes do nome.",
      itens: [
        "`int` guarda inteiros (32 bits) e `long`, inteiros maiores. `byte` e `short` são inteiros menores.",
        "`double` guarda números com casas decimais. `float` também, com menos precisão.",
        "`char` guarda um único caractere entre aspas simples: `'A'`.",
        "`boolean` aceita apenas `true` ou `false`.",
        "`String` não é primitivo: é uma classe, e o texto vai entre aspas duplas.",
        "Atribuir um `double` a um `int` não compila, porque perderia os decimais. O contrário (`int` para `double`) é permitido.",
        "Métodos úteis de `String`: `length()`, `charAt(i)` (as posições começam em 0) e `equals(outra)`."
      ],
      code: [
        'int idade = 20;',
        'double preco = 9.90;',
        "char letra = 'J';",
        'boolean ativo = true;',
        'String nome = "Ana";   // classe, não primitivo'
      ]
    },
    {
      titulo: "Variáveis, entrada e saída",
      itens: [
        "Declaração: `tipo nome = valor;`. Nomes seguem o padrão camelCase, como `notaFinal`.",
        "`final` cria uma constante: depois de `final double PI = 3.14159;`, PI não aceita outro valor.",
        "`Scanner` lê o teclado: `nextInt()` para inteiros, `nextDouble()` para decimais, `nextLine()` para a linha inteira.",
        "`System.out.println` imprime e pula linha. `print` imprime sem pular.",
        "`printf` formata a saída: `%d` inteiro, `%.2f` decimal com 2 casas, `%s` texto, `%n` quebra de linha."
      ],
      code: [
        'import java.util.Scanner;',
        '',
        'Scanner sc = new Scanner(System.in);',
        'int qtd = sc.nextInt();',
        'double valor = sc.nextDouble();',
        'System.out.printf("Total: %.2f%n", qtd * valor);'
      ]
    },
    {
      titulo: "Operadores",
      itens: [
        "Aritméticos: `+`, `-`, `*`, `/` e `%` (resto da divisão).",
        "Entre dois `int`, `/` faz divisão inteira e descarta os decimais.",
        "Atribuição composta: `x += 2` é o mesmo que `x = x + 2`. `x++` soma 1.",
        "Relacionais devolvem `boolean`: `==`, `!=`, `<`, `>`, `<=`, `>=`.",
        "Lógicos: `&&` (E), `||` (OU) e `!` (NÃO). `&&` e `||` fazem curto-circuito: param assim que o resultado já está definido."
      ],
      code: [
        'int a = 7, b = 2;',
        'System.out.println(a / b);    // 3    divisão inteira',
        'System.out.println(a % b);    // 1    resto',
        'System.out.println(a / 2.0);  // 3.5  um dos lados é double',
        'boolean ok = a > 5 && b < 3;  // true'
      ],
      atencao: "para comparar textos use `s1.equals(s2)`. O `==` só verifica se as duas variáveis apontam para o mesmo objeto."
    },
    {
      titulo: "Condicionais: if e switch",
      itens: [
        "`if (condição) { ... } else if (...) { ... } else { ... }`: só um dos blocos executa.",
        "A condição precisa ser `boolean`. Por isso `if (x = 5)` não compila em Java.",
        "`switch` compara um valor com vários `case`, e `default` cobre o que sobrar.",
        "Cada `case` precisa de `break` para parar. Sem ele, a execução continua nos casos seguintes (fall-through)."
      ],
      code: [
        'int nota = 7;',
        'if (nota >= 7) {',
        '  System.out.println("Aprovado");',
        '} else if (nota >= 5) {',
        '  System.out.println("Recuperação");',
        '} else {',
        '  System.out.println("Reprovado");',
        '}',
        '',
        'switch (dia) {',
        '  case 1: System.out.println("Domingo"); break;',
        '  case 7: System.out.println("Sábado"); break;',
        '  default: System.out.println("Dia útil");',
        '}'
      ]
    },
    {
      titulo: "Laços de repetição",
      itens: [
        "`for`: quando você sabe quantas vezes repetir. Tem início, condição e incremento.",
        "`while`: repete enquanto a condição for verdadeira. Pode não executar nenhuma vez.",
        "`do-while`: testa a condição no fim, então executa pelo menos uma vez.",
        "`break` sai do laço e `continue` pula para a próxima volta."
      ],
      code: [
        'for (int i = 0; i < 3; i++) {',
        '  System.out.print(i);       // 012',
        '}',
        '',
        'int n = 10;',
        'while (n > 0) {',
        '  n -= 3;',
        '}',
        'System.out.println(n);      // -2'
      ],
      atencao: "conte as voltas com cuidado. `i < 3` começando em 0 executa 3 vezes (0, 1 e 2), não 4."
    }
  ],

  medio: [
    {
      titulo: "Classes e objetos",
      intro: "A classe é o molde. O objeto é uma instância concreta desse molde, criada com `new`.",
      itens: [
        "Atributos guardam o estado do objeto, ou seja, seus dados.",
        "Métodos definem o comportamento: o que o objeto sabe fazer.",
        "Cada objeto tem sua própria cópia dos atributos.",
        "Membros são acessados com ponto: `conta.depositar(50)`.",
        "Variáveis de objeto guardam uma referência: depois de `Conta b = a;`, `a` e `b` apontam para o mesmo objeto."
      ],
      code: [
        'public class Conta {',
        '  String titular;              // atributo',
        '  double saldo;                // atributo',
        '',
        '  void depositar(double v) {   // método',
        '    saldo += v;',
        '  }',
        '}',
        '',
        'Conta c = new Conta();         // objeto',
        'c.depositar(50);'
      ]
    },
    {
      titulo: "Construtores e this",
      itens: [
        "Têm o mesmo nome da classe e nenhum tipo de retorno, nem `void`.",
        "Rodam no momento do `new` e servem para inicializar os atributos.",
        "Uma classe pode ter vários construtores com parâmetros diferentes (sobrecarga). Métodos também podem ser sobrecarregados: mesmo nome, parâmetros diferentes.",
        "Se você não escreve nenhum, Java cria um construtor padrão vazio. Se escreve um, o padrão deixa de existir.",
        "`this.atributo` diferencia o atributo do objeto do parâmetro com o mesmo nome."
      ],
      code: [
        'public class Aluno {',
        '  private String nome;',
        '  private int idade;',
        '',
        '  public Aluno(String nome, int idade) {',
        '    this.nome = nome;',
        '    this.idade = idade;',
        '  }',
        '}',
        '',
        'Aluno a = new Aluno("Bia", 19);'
      ]
    },
    {
      titulo: "Encapsulamento, getters e setters",
      itens: [
        "Atributos ficam `private`: só a própria classe acessa diretamente.",
        "Getters (`getSaldo()`) leem o valor e setters (`setSaldo(...)`) alteram. Ambos são `public`.",
        "O setter pode validar o valor antes de aceitar.",
        "Modificadores: `public` (todos), `protected` (pacote e subclasses), sem modificador (só o pacote) e `private` (só a classe)."
      ],
      code: [
        'private double saldo;',
        '',
        'public double getSaldo() {',
        '  return saldo;',
        '}',
        '',
        'public void setSaldo(double saldo) {',
        '  if (saldo >= 0) {           // validação',
        '    this.saldo = saldo;',
        '  }',
        '}'
      ]
    },
    {
      titulo: "static e final",
      itens: [
        "`static`: o membro pertence à classe, não ao objeto. Existe uma única cópia, compartilhada por todos.",
        "Membros estáticos são acessados pelo nome da classe: `Math.sqrt(9)`, `Conta.total`.",
        "`final` impede uma nova atribuição. `static final` é o padrão para constantes, como `MAX_ALUNOS`."
      ],
      code: [
        'public class Conta {',
        '  static int total = 0;              // compartilhado',
        '  static final double TAXA = 0.05;   // constante',
        '',
        '  public Conta() {',
        '    total++;                         // conta os objetos criados',
        '  }',
        '}'
      ]
    },
    {
      titulo: "Arrays",
      itens: [
        "Têm tamanho fixo, definido na criação: `new int[5]`.",
        "Os índices vão de `0` até `length - 1`. Acessar fora disso lança `ArrayIndexOutOfBoundsException`.",
        "Valores padrão: `0` para números, `false` para boolean e `null` para objetos.",
        "`arr.length` é um atributo, sem parênteses."
      ],
      code: [
        'int[] notas = new int[3];          // {0, 0, 0}',
        'notas[0] = 8;',
        'String[] nomes = {"Ana", "Rui"};',
        '',
        'for (int i = 0; i < notas.length; i++) {',
        '  System.out.println(notas[i]);',
        '}',
        'for (String n : nomes) {           // for-each',
        '  System.out.println(n);',
        '}'
      ]
    },
    {
      titulo: "ArrayList",
      itens: [
        "Lista de tamanho dinâmico, do pacote `java.util`.",
        "`add(x)` adiciona no fim e `add(i, x)` insere na posição i, deslocando os demais.",
        "`get(i)` lê, `set(i, x)` troca, `remove(i)` remove e `size()` informa o tamanho.",
        "Só guarda objetos: use `Integer`, `Double` e `Character` no lugar de `int`, `double` e `char`. O autoboxing faz a conversão sozinho."
      ],
      code: [
        'ArrayList<Integer> nums = new ArrayList<>();',
        'nums.add(10);',
        'nums.add(20);',
        'nums.add(0, 5);                  // [5, 10, 20]',
        'nums.remove(1);                  // [5, 20]',
        'System.out.println(nums.size()); // 2'
      ],
      atencao: "`ArrayList<int>` não compila. O tipo entre `< >` precisa ser uma classe."
    }
  ],

  dificil: [
    {
      titulo: "Herança com extends",
      itens: [
        "Com `extends`, a subclasse herda atributos e métodos da superclasse.",
        "Uma classe estende apenas uma classe: Java não tem herança múltipla de classes.",
        "`super(...)` chama o construtor da superclasse. `super.metodo()` chama a versão do método na superclasse.",
        "Se a subclasse não chama `super(...)`, Java chama sozinho o construtor sem parâmetros da superclasse, sempre antes do corpo do construtor da subclasse.",
        "Upcasting: `Pai p = new Filho();` compila, porque todo `Filho` é um `Pai`. O contrário, `Filho f = new Pai();`, não compila.",
        "Membros `private` não são acessíveis na subclasse. Use `protected` ou getters."
      ],
      code: [
        'class Animal {',
        '  protected String nome;',
        '  Animal(String nome) { this.nome = nome; }',
        '  String som() { return "..."; }',
        '}',
        '',
        'class Gato extends Animal {',
        '  Gato(String nome) { super(nome); }',
        '}'
      ]
    },
    {
      titulo: "Polimorfismo",
      itens: [
        "Sobrescrita (`@Override`): a subclasse reescreve um método herdado, com a mesma assinatura.",
        "Uma variável do tipo da superclasse pode guardar um objeto da subclasse: `Animal a = new Cachorro(\"Rex\");`.",
        "O método executado é o do objeto real, decidido em tempo de execução.",
        "Sobrecarga é outra coisa: mesmo nome de método com parâmetros diferentes."
      ],
      code: [
        'class Cachorro extends Animal {',
        '  Cachorro(String nome) { super(nome); }',
        '',
        '  @Override',
        '  String som() { return "Au"; }',
        '}',
        '',
        'Animal[] bichos = { new Cachorro("Rex"), new Gato("Mia") };',
        'for (Animal b : bichos) {',
        '  System.out.println(b.som());   // Au, depois ...',
        '}'
      ]
    },
    {
      titulo: "Interfaces com implements",
      itens: [
        "Uma interface é um contrato: declara o que a classe precisa saber fazer.",
        "Uma classe pode implementar várias interfaces: `class Pato implements Voador, Nadador`.",
        "Métodos sem corpo são `public abstract` por padrão, e a classe é obrigada a implementá-los. Na classe, o método implementado também precisa ser `public`.",
        "Desde o Java 8, métodos `default` podem trazer uma implementação pronta.",
        "Atributos de interface são `public static final`. Interfaces não têm construtor e não podem ser instanciadas com `new`."
      ],
      code: [
        'interface Pagavel {',
        '  double valor();',
        '',
        '  default String recibo() {',
        '    return "Total: " + valor();',
        '  }',
        '}',
        '',
        'class Boleto implements Pagavel {',
        '  public double valor() { return 99.9; }',
        '}'
      ]
    },
    {
      titulo: "Exceções com try-catch",
      itens: [
        "`try` envolve o código que pode falhar e `catch` trata um tipo específico de erro.",
        "`finally` executa sempre, com ou sem exceção. É usado para liberar recursos.",
        "Ordene os `catch` do mais específico para o mais genérico, com `Exception` por último.",
        "Checked (`IOException`, `Exception`): o compilador exige `try-catch` ou `throws` na assinatura do método.",
        "Unchecked (filhas de `RuntimeException`): `NullPointerException`, `ArithmeticException`, `ArrayIndexOutOfBoundsException`.",
        "`throw new IllegalArgumentException(\"msg\")` lança uma exceção manualmente."
      ],
      code: [
        'try {',
        '  int r = 10 / 0;                 // lança ArithmeticException',
        '  System.out.println("não chega aqui");',
        '} catch (ArithmeticException e) {',
        '  System.out.println("Erro: " + e.getMessage());',
        '} finally {',
        '  System.out.println("sempre executa");',
        '}'
      ]
    },
    {
      titulo: "Coleções: List, Set e Map",
      itens: [
        "`List` (ex.: `ArrayList`): mantém a ordem de inserção e aceita repetidos.",
        "`Set` (ex.: `HashSet`): não aceita repetidos e não garante ordem. Adicionar um repetido devolve `false`.",
        "`Map` (ex.: `HashMap`): pares chave → valor. As chaves são únicas, então `put` com uma chave existente substitui o valor.",
        "`get(chave)` devolve `null` se a chave não existe. `getOrDefault(chave, padrão)` evita isso.",
        "Declare pela interface e crie pela implementação: `List<String> l = new ArrayList<>();`."
      ],
      code: [
        'List<String> lista = new ArrayList<>(List.of("a", "b", "a"));  // [a, b, a]',
        'Set<String> conjunto = new HashSet<>(lista);                   // [a, b]',
        '',
        'Map<String, Integer> estoque = new HashMap<>();',
        'estoque.put("caneta", 10);',
        'estoque.put("caneta", 15);            // substitui o 10',
        'estoque.get("caneta");                // 15',
        'estoque.get("lápis");                 // null',
        'estoque.getOrDefault("lápis", 0);     // 0',
        'estoque.containsKey("caneta");        // true'
      ],
      atencao: "`String` diferencia maiúsculas de minúsculas: `\"java\"` e `\"Java\"` são elementos diferentes em um `Set`."
    }
  ]
};

const ORDEM_NIVEIS = ["facil", "medio", "dificil"];
const LETRAS = ["A", "B", "C", "D"];
const STORAGE_KEY = "javaEmNiveis.v1";

/* ---------- Estado da aplicação ---------- */
const state = {
  nome: "",
  nivel: null,       // chave em NIVEIS
  perguntas: [],     // perguntas embaralhadas da rodada
  indice: 0,
  pontos: 0,
  acertos: 0,
  erros: 0,
  respondida: false,
  alternativas: [],  // alternativas embaralhadas da pergunta atual
  respostas: [],     // histórico da rodada: { idx, p, ok, pontos, usuario, checks }
  revisao: [],       // histórico completo (com as não respondidas), montado ao fim
  motivo: "fim",     // "fim" (terminou) ou "tempo" (cronômetro zerou)
  usado: 0,          // segundos gastos na rodada
  teoria: { nivel: null, modo: "antes" } // "antes" do quiz ou "revisao" no meio dele
};

/* ---------- Armazenamento local (opcional) ---------- */
function carregarSalvo() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function salvar(dados) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...carregarSalvo(), ...dados })); }
  catch { /* sem armazenamento: o app funciona do mesmo jeito */ }
}

/* ---------- Utilitários ---------- */
const $ = (sel) => document.querySelector(sel);

function embaralhar(lista) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapar(texto) {
  return texto.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// Texto com `trechos de código` → HTML seguro
function formatar(texto) {
  return escapar(texto).replace(/`([^`]+)`/g, "<code>$1</code>");
}

// Realce de sintaxe Java simples
const PALAVRAS_CHAVE = "abstract|boolean|break|case|catch|char|class|default|do|double|else|extends|final|finally|for|if|implements|import|int|interface|new|package|private|protected|public|return|static|super|switch|this|throw|throws|try|void|while|null|true|false";
const REGEX_JAVA = new RegExp(
  '("(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)\')|(\\/\\/[^\\n]*)|(@\\w+)|\\b(' + PALAVRAS_CHAVE + ')\\b|\\b([A-Z]\\w*)\\b|\\b(\\d+(?:\\.\\d+)?)\\b',
  "g"
);
function realcar(codigo) {
  const seguro = codigo.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  return seguro.replace(REGEX_JAVA, (m, str, com, ann, kw, ty, num) => {
    const cls = str ? "str" : com ? "com" : ann ? "ann" : kw ? "kw" : ty ? "ty" : "num";
    return `<span class="tk-${cls}">${m}</span>`;
  });
}

// Questões de código valem 1,5× os pontos do nível
const valorDa = (p, nivel = NIVEIS[state.nivel]) => (p.tipo === "codigo" ? Math.round(nivel.pontos * 1.5) : nivel.pontos);
const pontuacaoMaxima = (perguntas, nivel) => perguntas.reduce((soma, p) => soma + valorDa(p, nivel), 0);
const contarCodigo = (perguntas) => perguntas.filter((p) => p.tipo === "codigo").length;

/* ---------- Sorteio sem repetição ---------- */
// Cada pergunta ganha um id estável (nível + hash do enunciado) para lembrar quais já saíram
const hashTexto = (s) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
};
Object.entries(NIVEIS).forEach(([chave, n]) => n.perguntas.forEach((p) => { p.id = `${chave}:${hashTexto(p.q + (p.code || ""))}`; }));

// Quantas perguntas de cada tipo entram na rodada
function composicao(n) {
  const codigo = Math.min(n.codigo, contarCodigo(n.perguntas));
  const teoricas = Math.min(n.rodada - codigo, n.perguntas.length - contarCodigo(n.perguntas));
  return { codigo, teoricas };
}
const maxRodada = (n) => {
  const c = composicao(n);
  return c.teoricas * n.pontos + c.codigo * valorDa({ tipo: "codigo" }, n);
};

// Prefere perguntas que ainda não saíram; se faltarem, completa com as vistas há mais tempo.
// `vistas` guarda os ids da mais antiga para a mais recente.
function escolher(pool, quantidade, vistas) {
  const escolhidas = embaralhar(pool.filter((p) => !vistas.includes(p.id))).slice(0, quantidade);
  if (escolhidas.length < quantidade) {
    const antigas = vistas.map((id) => pool.find((p) => p.id === id)).filter((p) => p && !escolhidas.includes(p));
    escolhidas.push(...antigas.slice(0, quantidade - escolhidas.length));
  }
  return escolhidas;
}

function sortearPerguntas(chave) {
  const n = NIVEIS[chave];
  const salvo = carregarSalvo().vistas || {};
  const vistas = salvo[chave] || [];
  const c = composicao(n);
  const escolhidas = [
    ...escolher(n.perguntas.filter((p) => p.tipo !== "codigo"), c.teoricas, vistas),
    ...escolher(n.perguntas.filter((p) => p.tipo === "codigo"), c.codigo, vistas)
  ];
  const ids = escolhidas.map((p) => p.id);
  const existentes = new Set(n.perguntas.map((p) => p.id));
  salvar({ vistas: { ...salvo, [chave]: [...vistas.filter((id) => existentes.has(id) && !ids.includes(id)), ...ids] } });
  return embaralhar(escolhidas);
}

/* ---------- Cronômetro ---------- */
const timer = { id: null, fim: 0, restante: 0, total: 0, ultimoSeg: -1 };
const formatarTempo = (seg) => `${String(Math.floor(seg / 60)).padStart(2, "0")}:${String(seg % 60).padStart(2, "0")}`;

function desenharTimer(restMs) {
  const seg = Math.ceil(restMs / 1000);
  if (seg !== timer.ultimoSeg) {
    timer.ultimoSeg = seg;
    $("#clock").textContent = formatarTempo(seg);
    $("#timer").classList.toggle("warn", seg <= 60 && seg > 20);
    $("#timer").classList.toggle("danger", seg <= 20);
  }
  $("#timer-bar").firstElementChild.style.width = `${(restMs / timer.total) * 100}%`;
}

function tickTimer() {
  const resta = Math.max(0, timer.fim - Date.now());
  desenharTimer(resta);
  if (resta <= 0) {
    pausarTimer();
    mostrarResultado("tempo");
  }
}

function iniciarTimer(segundos) {
  timer.total = segundos * 1000;
  timer.restante = timer.total;
  timer.ultimoSeg = -1;
  retomarTimer();
}

function retomarTimer() {
  clearInterval(timer.id);
  timer.fim = Date.now() + timer.restante;
  timer.id = setInterval(tickTimer, 250);
  $("#timer").classList.remove("paused");
  tickTimer();
}

// Guarda o tempo que sobrou; usado ao revisar a teoria e ao terminar
function pausarTimer() {
  if (timer.id) timer.restante = Math.max(0, timer.fim - Date.now());
  clearInterval(timer.id);
  timer.id = null;
  $("#timer").classList.add("paused");
}

function sinal(forca) {
  return `<span class="signal" aria-hidden="true">${[1, 2, 3].map((n) => `<i class="${n <= forca ? "on" : ""}"></i>`).join("")}</span>`;
}

const reduzirMovimento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const NOMES_ABA = {
  "screen-home": "Quiz.java",
  "screen-study": "Teoria.java",
  "screen-quiz": "Quiz.java",
  "screen-result": "Resultado.java"
};
let trocaPendente = null;

// Troca de tela: a atual sai com fade rápido e a nova entra com fade + slide
function mostrarTela(id) {
  const nova = document.getElementById(id);
  const atual = [...document.querySelectorAll(".screen")].find((s) => !s.hidden);

  const trocar = () => {
    document.querySelectorAll(".screen").forEach((s) => {
      s.hidden = s !== nova;
      s.classList.remove("enter", "leave");
    });
    void nova.offsetWidth; // reinicia a animação
    nova.classList.add("enter");
    $("#tabName").textContent = NOMES_ABA[id];
    if (id === "screen-quiz" && !$("#code-answer").hidden) atualizarEditor(); // recalcula a altura do editor já visível
    if (window.scrollY > 0) window.scrollTo({ top: 0 });
  };

  clearTimeout(trocaPendente);
  if (!atual || atual === nova || reduzirMovimento()) return trocar();
  atual.classList.add("leave");
  trocaPendente = setTimeout(trocar, 160);
}

function atualizarPlacarAba() {
  $("#tabScore").textContent = state.pontos;
}

/* ---------- Tela inicial ---------- */
function renderHome() {
  pausarTimer();
  const salvo = carregarSalvo();
  const recordes = salvo.recordes2 || {};
  const melhores = salvo.melhores || {};
  const nomeSalvo = state.nome || salvo.nome || "";
  $("#player-name").value = nomeSalvo;

  const partes = ORDEM_NIVEIS.filter((k) => melhores[k]).map((k) => `${NIVEIS[k].nome} ${melhores[k].pct}%`);
  $("#home-records").hidden = partes.length === 0;
  $("#home-records").textContent = partes.length ? `${nomeSalvo ? `${nomeSalvo}, seu` : "Seu"} melhor placar: ${partes.join(" · ")}` : "";

  $("#levels").innerHTML = ORDEM_NIVEIS.map((chave) => {
    const n = NIVEIS[chave];
    const max = maxRodada(n);
    const rec = recordes[chave];
    return `
      <button class="level" type="button" data-nivel="${chave}">
        <span class="level-name">${sinal(n.forca)} ${n.nome}</span>
        <span class="level-topics">${escapar(n.temas)}</span>
        <span class="level-side">
          <b>+${n.pontos} pts · código +${valorDa({ tipo: "codigo" }, n)}</b>
          <span>${n.rodada} de ${n.perguntas.length} perguntas · ${Math.round(n.tempo / 60)} min</span>
          <span>${rec != null ? `recorde ${rec}/${max} · ${melhores[chave] ? melhores[chave].pct : 0}%` : "sem recorde"}</span>
        </span>
      </button>`;
  }).join("");

  state.pontos = 0;
  atualizarPlacarAba();
  atualizarCompartilhar();
  mostrarTela("screen-home");
}

/* ---------- Teoria ---------- */
function tempoLeitura(topicos) {
  const texto = topicos.map((t) => [t.intro, ...t.itens, t.atencao, ...(t.code || [])].join(" ")).join(" ");
  return Math.max(1, Math.round(texto.split(/\s+/).length / 180));
}

function abrirTeoria(nivel, modo) {
  state.teoria = { nivel, modo };
  const n = NIVEIS[nivel];
  const topicos = TEORIA[nivel];
  const revisao = modo === "revisao";
  if (revisao) pausarTimer();

  $("#study-level").innerHTML = `${sinal(n.forca)} ${n.nome}`;
  $("#study-time").textContent = `leitura de ~${tempoLeitura(topicos)} min`;
  $("#study-eyebrow").textContent = revisao
    ? `// revisão: pergunta ${state.indice + 1} de ${state.perguntas.length} em pausa`
    : "// etapa 1 de 2: resumo teórico";
  $("#study-title").textContent = `Resumo do nível ${n.nome}`;
  $("#study-lead").textContent = revisao
    ? "Consulte o que precisar. Seu progresso no quiz continua salvo."
    : "Leia com calma: tudo o que cai nas perguntas está aqui. Toque em um tópico para ir direto a ele.";

  $("#study-index").innerHTML = topicos.map((t, i) =>
    `<button class="topic-link" type="button" data-alvo="topico-${i}">${escapar(t.titulo)}</button>`).join("");

  $("#study-body").innerHTML = topicos.map((t, i) => `
    <article class="topic" id="topico-${i}">
      <h3><span class="n">${String(i + 1).padStart(2, "0")}</span>${escapar(t.titulo)}</h3>
      ${t.intro ? `<p>${formatar(t.intro)}</p>` : ""}
      <ul>${t.itens.map((item) => `<li>${formatar(item)}</li>`).join("")}</ul>
      ${t.code ? `<pre class="code">${realcar(t.code.join("\n"))}</pre>` : ""}
      ${t.atencao ? `<p class="tip"><strong>Atenção:</strong> ${formatar(t.atencao)}</p>` : ""}
    </article>`).join("");

  const comp = composicao(n);
  $("#study-cta-text").textContent = revisao
    ? `Cronômetro pausado (restam ${formatarTempo(Math.ceil(timer.restante / 1000))}). Até aqui: ${state.acertos} acerto(s) e ${state.pontos} pontos. A pergunta continua do mesmo jeito.`
    : `Pronto? São ${n.rodada} perguntas sorteadas de um banco de ${n.perguntas.length}: ${comp.teoricas} de múltipla escolha (+${n.pontos} pts) e ${comp.codigo} em que você escreve código no editor (+${valorDa({ tipo: "codigo" }, n)} pts). Você terá ${Math.round(n.tempo / 60)} minutos. Se o tempo acabar, o quiz termina e vale o que você já fez. O cronômetro pausa enquanto você revisa a teoria.`;
  $("#btn-start").textContent = revisao
    ? `Voltar à pergunta ${state.indice + 1} →`
    : "Estou pronto · Começar quiz →";
  $("#btn-study-back").hidden = revisao;

  mostrarTela("screen-study");
}

function sairDaTeoria() {
  if (state.teoria.modo === "revisao") {
    mostrarTela("screen-quiz"); // volta para a mesma pergunta, sem perder o estado
    retomarTimer();
  } else {
    iniciarQuiz(state.teoria.nivel);
  }
}

/* ---------- Quiz ---------- */
function iniciarQuiz(nivel) {
  Object.assign(state, {
    nivel,
    perguntas: sortearPerguntas(nivel),
    indice: 0,
    pontos: 0,
    acertos: 0,
    erros: 0,
    respostas: [],
    revisao: [],
    motivo: "fim",
    usado: 0
  });
  atualizarPlacarAba();

  const n = NIVEIS[nivel];
  $("#quiz-level").innerHTML = `${sinal(n.forca)} ${n.nome}`;
  renderPergunta();
  mostrarTela("screen-quiz");
  iniciarTimer(n.tempo);
}

function renderPergunta() {
  const p = state.perguntas[state.indice];
  const total = state.perguntas.length;
  state.respondida = false;

  $("#quiz-counter").textContent = `Pergunta ${state.indice + 1} de ${total}`;
  const bar = $("#quiz-bar");
  bar.setAttribute("aria-valuemax", total);
  bar.setAttribute("aria-valuenow", state.indice);
  bar.firstElementChild.style.width = `${(state.indice / total) * 100}%`;

  $("#quiz-question").innerHTML = formatar(p.q);
  const code = $("#quiz-code");
  code.hidden = !p.code;
  code.innerHTML = p.code ? realcar(p.code) : "";

  const codigo = p.tipo === "codigo";
  $("#quiz-type").textContent = `// ${codigo ? "escreva o código" : "múltipla escolha"} · +${valorDa(p)} pts`;
  $("#quiz-options").hidden = codigo;
  $("#code-answer").hidden = !codigo;

  if (codigo) {
    state.alternativas = [];
    $("#quiz-options").innerHTML = "";
    prepararEditor(p.inicial || "");
    $("#quiz-hint").innerHTML = "<kbd>Tab</kbd> indenta · <kbd>Ctrl</kbd> + <kbd>Enter</kbd> envia";
  } else {
    // Embaralha as alternativas, lembrando qual é a correta
    state.alternativas = embaralhar(p.opts.map((texto, i) => ({ texto, correta: i === p.ok })));
    $("#quiz-options").innerHTML = state.alternativas.map((alt, i) => `
      <button class="opt" type="button" data-i="${i}">
        <span class="key">${LETRAS[i]}</span>
        <span class="txt">${formatar(alt.texto)}</span>
      </button>`).join("");
    $("#quiz-hint").innerHTML = "Atalho: teclas <kbd>1</kbd> a <kbd>4</kbd>";
  }

  $("#quiz-feedback").hidden = true;
  $("#btn-next").hidden = true;
  $("#quiz-hint").hidden = false;
}

// Resposta de múltipla escolha
function responder(i) {
  if (state.respondida || !state.alternativas[i]) return;

  const p = state.perguntas[state.indice];
  const indiceCorreto = state.alternativas.findIndex((a) => a.correta);
  const acertou = state.alternativas[i].correta;

  // Feedback visual e bloqueio das opções
  document.querySelectorAll("#quiz-options .opt").forEach((btn, j) => {
    btn.disabled = true;
    const key = btn.querySelector(".key");
    if (j === indiceCorreto) { btn.classList.add("correct"); key.textContent = "✓"; }
    else if (j === i) { btn.classList.add("wrong"); key.textContent = "✗"; }
    else btn.classList.add("dim");
  });

  registrarResultado(p, acertou, {
    titulo: acertou
      ? `✓ Correto! +${valorDa(p)} pontos`
      : `✗ Incorreto. A resposta certa é ${LETRAS[indiceCorreto]}.`,
    corpo: `<p>${formatar(p.exp)}</p>`,
    usuario: { texto: state.alternativas[i].texto }
  });
}

/* ---------- Editor e validação de código ---------- */
const editor = $("#editor-input");
const gutter = $("#editor-gutter");

function atualizarEditor() {
  const linhas = editor.value.split("\n").length;
  gutter.textContent = Array.from({ length: linhas }, (_, i) => i + 1).join("\n");
  // O editor cresce com o conteúdo, sem rolagem interna vertical
  editor.style.height = "auto";
  editor.style.height = `${editor.scrollHeight + (editor.offsetHeight - editor.clientHeight)}px`;
  atualizarCursor();
}

function atualizarCursor() {
  const antes = editor.value.slice(0, editor.selectionStart).split("\n");
  $("#editor-pos").textContent = `Ln ${antes.length}, Col ${antes[antes.length - 1].length + 1}`;
}

function prepararEditor(texto) {
  editor.value = texto;
  editor.readOnly = false;
  $("#editor").classList.remove("locked");
  $("#btn-submit-code").hidden = false;
  $("#editor-msg").hidden = true;
  atualizarEditor();
}

// Insere texto mantendo o desfazer (Ctrl+Z) quando o navegador permite
function inserir(texto) {
  if (!document.execCommand("insertText", false, texto)) {
    editor.setRangeText(texto, editor.selectionStart, editor.selectionEnd, "end");
  }
  atualizarEditor();
}

// iPhone troca aspas retas por “curvas” automaticamente; o Java não aceita
function normalizarAspas(src) {
  return src.replace(/[“”„″]/g, '"').replace(/[‘’′]/g, "'").replace(/ /g, " ");
}

// Remove comentários e confere se parênteses, chaves, colchetes e aspas fecham
function analisarEstrutura(src) {
  const pares = { ")": "(", "}": "{", "]": "[" };
  const pilha = [];
  let limpo = "", desbalanceado = false, aspasAbertas = false, i = 0;

  while (i < src.length) {
    const c = src[i], d = src[i + 1];
    if (c === "/" && d === "/") { while (i < src.length && src[i] !== "\n") i++; continue; }
    if (c === "/" && d === "*") {
      const fim = src.indexOf("*/", i + 2);
      i = fim < 0 ? src.length : fim + 2;
      limpo += " ";
      continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < src.length && src[j] !== c && src[j] !== "\n") j += src[j] === "\\" ? 2 : 1;
      if (src[j] !== c) aspasAbertas = true;
      limpo += src.slice(i, j + 1);
      i = j + 1;
      continue;
    }
    if ("({[".includes(c)) pilha.push(c);
    else if (")}]".includes(c) && pilha.pop() !== pares[c]) desbalanceado = true;
    limpo += c;
    i++;
  }
  if (pilha.length) desbalanceado = true;
  return { limpo, desbalanceado, aspasAbertas };
}

// Forma compacta para comparar: sem acentos, sem espaços extras nem espaços em volta de símbolos
function compactar(src) {
  return src
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([(){}\[\];,=<>+\-*\/%!&|.:?])\s*/g, "$1")
    .trim();
}

const REGRA_ESTRUTURA = {
  teste: (c, info) => !info.desbalanceado && !info.aspasAbertas,
  ok: "Parênteses, chaves e aspas fechados corretamente",
  falta: "Há `(`, `{` ou aspas sem fechar. Confira se cada bloco aberto tem o seu `}`."
};

const DICAS_GERAIS = [
  { teste: /(^|[^\w.])system\.out/, msg: "`System` começa com S maiúsculo: `System.out.println`." },
  { teste: /(^|[^\w."])string [a-zA-Z_]/, msg: "`String` é uma classe e começa com S maiúsculo." },
  { teste: /System\.out\.(?!println\(|print\(|printf\()\w+/, msg: "Confira o método de impressão: `println`, `print` ou `printf`, tudo em minúsculas." },
  { teste: /\bif\(\w+=[^=]/, msg: "Dentro do `if`, compare com `==`. Um `=` sozinho é atribuição." },
  { teste: /=\d+,\d+;/, msg: "Números decimais usam ponto: `19.90`, não `19,90`." }
];

const testar = (teste, c, info) => (typeof teste === "function" ? teste(c, info) : teste.test(c));

function validarCodigo(src, p) {
  const info = analisarEstrutura(normalizarAspas(src));
  const c = compactar(info.limpo);
  if (!c) return { vazio: true };

  const checks = [...p.regras, REGRA_ESTRUTURA].map((r) => {
    const ok = testar(r.teste, c, info);
    return { ok, texto: ok ? r.ok : r.falta };
  });
  const dicas = [...DICAS_GERAIS, ...(p.dicas || [])].filter((d) => testar(d.teste, c, info)).map((d) => d.msg);
  return { checks, dicas, correto: checks.every((x) => x.ok) };
}

function enviarCodigo() {
  if (state.respondida) return;
  const p = state.perguntas[state.indice];
  const r = validarCodigo(editor.value, p);

  if (r.vazio) {
    $("#editor-msg").hidden = false;
    editor.focus();
    return;
  }

  editor.readOnly = true;
  $("#editor").classList.add("locked");
  $("#btn-submit-code").hidden = true;
  $("#editor-msg").hidden = true;

  const passou = r.checks.filter((x) => x.ok).length;
  const solucao = `<pre class="code">${realcar(p.solucao.join("\n"))}</pre>`;
  const lista = (itens) => itens.map((x) =>
    `<li class="${x.ok ? "is-ok" : "is-bad"}"><span class="ic">${x.ok ? "✓" : "✗"}</span><span>${formatar(x.texto)}</span></li>`).join("");

  registrarResultado(p, r.correto, {
    titulo: r.correto
      ? `✓ Código correto! +${valorDa(p)} pontos`
      : `✗ Ainda não: ${passou} de ${r.checks.length} verificações passaram.`,
    corpo: `
      <ul class="checks">${lista(r.checks)}</ul>
      ${!r.correto && r.dicas.length ? `<div class="stack-sm"><span class="label">Dicas</span><ul class="hints">${r.dicas.map((d) => `<li>${formatar(d)}</li>`).join("")}</ul></div>` : ""}
      <p>${formatar(p.exp)}</p>
      <div class="stack-sm"><span class="label">${r.correto ? "Uma solução de referência" : "Solução correta"}</span>${solucao}</div>`,
    usuario: { codigo: editor.value },
    checks: r.checks
  });
}

editor.addEventListener("input", atualizarEditor);
["click", "keyup", "select"].forEach((ev) => editor.addEventListener(ev, atualizarCursor));
editor.addEventListener("keydown", (e) => {
  if (editor.readOnly) return;
  const pos = editor.selectionStart;
  const inicioLinha = editor.value.lastIndexOf("\n", pos - 1) + 1;
  const linha = editor.value.slice(inicioLinha, pos);

  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); enviarCodigo(); return; }
  if (e.key === "Escape") { editor.blur(); return; } // sai do editor sem prender o Tab
  if (e.key === "Tab" && !e.shiftKey) { e.preventDefault(); inserir("  "); return; }
  if (e.key === "Enter" && !e.isComposing) {
    // Mantém o recuo da linha e aumenta depois de "{"
    e.preventDefault();
    let recuo = linha.match(/^\s*/)[0];
    if (/\{\s*$/.test(linha)) recuo += "  ";
    inserir("\n" + recuo);
    return;
  }
  if (e.key === "}" && /^ {2,}$/.test(linha) && pos === editor.selectionEnd) {
    // Ao fechar um bloco, recua a chave
    e.preventDefault();
    editor.setSelectionRange(inicioLinha, pos);
    inserir(linha.slice(2) + "}");
  }
});

/* ---------- Registro de cada resposta ---------- */
function registrarResultado(p, acertou, { titulo, corpo, usuario, checks }) {
  state.respondida = true;
  state.respostas.push({ idx: state.indice, p, status: acertou ? "ok" : "bad", usuario, checks });
  if (acertou) {
    state.acertos++;
    state.pontos += valorDa(p);
  } else {
    state.erros++;
  }
  atualizarPlacarAba();

  const fb = $("#quiz-feedback");
  fb.classList.toggle("is-ok", acertou);
  fb.classList.toggle("is-bad", !acertou);
  $("#feedback-title").innerHTML = titulo;
  $("#feedback-text").innerHTML = corpo;
  fb.hidden = false;

  const ultima = state.indice === state.perguntas.length - 1;
  const next = $("#btn-next");
  next.textContent = ultima ? "Ver resultado →" : "Próxima pergunta →";
  next.hidden = false;
  $("#quiz-hint").hidden = true;
  next.focus({ preventScroll: true });
  fb.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
}

function proximaPergunta() {
  if (!state.respondida) return;
  state.indice++;
  if (state.indice >= state.perguntas.length) {
    mostrarResultado("fim");
  } else {
    renderPergunta();
    mostrarTela("screen-quiz");
  }
}

/* ---------- Resultados ---------- */
function mensagemFinal(pct, nome) {
  const quem = nome ? `, ${nome}` : "";
  if (pct >= 90) return ["Excelente" + quem + "!", "Você domina este nível. Que tal encarar o próximo desafio?", "var(--ok)"];
  if (pct >= 70) return ["Muito bom" + quem + "!", "Base sólida. Revise as explicações das questões que errou e você chega aos 100%.", "var(--ok)"];
  if (pct >= 50) return ["Bom começo" + quem + ".", "Você já acerta metade. Abra a revisão dos erros e tente de novo para fixar os conceitos.", "var(--accent)"];
  return ["Continue praticando" + quem + ".", "Este nível ainda tem pontos a reforçar. Revise os temas com calma e jogue novamente, as perguntas mudam de ordem.", "var(--bad)"];
}

function mostrarResultado(motivo = "fim") {
  pausarTimer();
  state.motivo = motivo;
  state.usado = Math.round((timer.total - timer.restante) / 1000);

  const nivel = NIVEIS[state.nivel];
  const total = state.perguntas.length;
  const max = pontuacaoMaxima(state.perguntas, nivel);
  const pct = Math.round((state.acertos / total) * 100);
  const [titulo0, texto0, cor] = mensagemFinal(pct, state.nome);
  const acabouTempo = motivo === "tempo";
  const respondidas = state.respostas.length;
  const titulo = acabouTempo ? `Tempo esgotado${state.nome ? `, ${state.nome}` : ""}!` : titulo0;
  const texto = acabouTempo
    ? `Você respondeu ${respondidas} de ${total} perguntas antes de o cronômetro zerar. ${texto0}`
    : texto0;

  // Histórico completo, na ordem em que as perguntas apareceram (as não respondidas entram como "skip")
  state.revisao = state.perguntas.map((p, idx) => state.respostas.find((r) => r.idx === idx) || { idx, p, status: "skip" });
  const semResposta = total - respondidas;

  $("#result-eyebrow").textContent = acabouTempo
    ? `// tempo esgotado no nível ${nivel.nome.toLowerCase()}`
    : `// nível ${nivel.nome.toLowerCase()} concluído`;
  $("#result-title").textContent = titulo;
  $("#result-text").textContent = texto;
  $("#result-pct").textContent = `${pct}%`;
  const ring = $("#result-ring");
  ring.style.setProperty("--ring-color", cor);
  ring.style.setProperty("--p", pct);

  $("#stat-points").innerHTML = `${state.pontos}<small>/${max}</small>`;
  $("#stat-time").textContent = `tempo ${formatarTempo(state.usado)} de ${formatarTempo(nivel.tempo)}`;
  $("#stat-ok").textContent = state.acertos;
  $("#stat-bad").textContent = state.erros;
  $("#stat-skip-n").textContent = semResposta;
  $("#stat-skip").hidden = semResposta === 0;
  $("#stats").classList.toggle("four", semResposta > 0);
  document.querySelectorAll("button.stat").forEach((b) => {
    b.disabled = b.dataset.rev !== "skip" && (b.dataset.rev === "ok" ? state.acertos : state.erros) === 0;
  });

  // Recorde por nível
  const salvo = carregarSalvo();
  const recordes = salvo.recordes2 || {};
  const anterior = recordes[state.nivel];
  const rec = $("#result-record");
  if (anterior == null || state.pontos > anterior) {
    recordes[state.nivel] = state.pontos;
    salvar({
      recordes2: recordes,
      melhores: { ...(salvo.melhores || {}), [state.nivel]: { pct, data: new Date().toISOString().slice(0, 10) } }
    });
    rec.textContent = anterior == null ? "primeiro recorde registrado neste nível" : `novo recorde! antes: ${anterior} pts`;
    rec.hidden = state.pontos === 0;
  } else {
    rec.hidden = true;
  }

  // Sugere o próximo nível quando o desempenho é bom
  const posicao = ORDEM_NIVEIS.indexOf(state.nivel);
  const proximo = ORDEM_NIVEIS[posicao + 1];
  const btnProx = $("#btn-next-level");
  btnProx.hidden = !(proximo && pct >= 70);
  if (proximo) {
    btnProx.textContent = `Nível ${NIVEIS[proximo].nome} →`;
    btnProx.dataset.nivel = proximo;
  }

  $("#quiz-bar").firstElementChild.style.width = "100%";
  atualizarCompartilhar();
  mostrarTela("screen-result");
}

/* ---------- Revisão detalhada (modal) ---------- */
const ROTULOS_REVISAO = { ok: "Acertos", bad: "Erros", skip: "Sem resposta" };
const overlay = $("#review-overlay");
let focoAnterior = null;

const respostaCerta = (p) => (p.tipo === "codigo" ? { codigo: p.solucao.join("\n") } : { texto: p.opts[p.ok] });
const mostrarValor = (v) => (v.codigo != null ? `<pre class="code">${realcar(v.codigo)}</pre>` : `<p>${formatar(v.texto)}</p>`);

function entradaRevisao(r) {
  const p = r.p;
  const codigo = p.tipo === "codigo";
  const tag = { ok: `Acerto · +${valorDa(p)} pts`, bad: "Erro", skip: "Sem resposta" }[r.status];
  const bloco = (rotulo, classe, conteudo) => `<div class="rv-block ${classe}"><span class="label">${rotulo}</span>${conteudo}</div>`;

  let usuario;
  if (r.status === "skip") {
    usuario = `<p class="none">Sem resposta: o tempo acabou antes de você responder.</p>`;
  } else {
    const lista = r.checks
      ? `<ul class="checks">${r.checks.map((x) => `<li class="${x.ok ? "is-ok" : "is-bad"}"><span class="ic">${x.ok ? "✓" : "✗"}</span><span>${formatar(x.texto)}</span></li>`).join("")}</ul>`
      : "";
    usuario = mostrarValor(r.usuario) + lista;
  }

  return `
    <article class="rv">
      <div class="rv-head"><span>Pergunta ${r.idx + 1} · ${codigo ? "código" : "múltipla escolha"}</span><span class="tag ${r.status}">${tag}</span></div>
      <h4>${formatar(p.q)}</h4>
      ${p.code ? `<pre class="code">${realcar(p.code)}</pre>` : ""}
      ${bloco(codigo ? "Seu código" : "Sua resposta", r.status === "ok" ? "is-ok" : r.status === "bad" ? "is-bad" : "", usuario)}
      ${bloco(codigo ? "Solução de referência" : "Resposta correta", r.status === "ok" ? "" : "is-ok", mostrarValor(respostaCerta(p)))}
      ${bloco("Explicação", "", `<p>${formatar(p.exp)}</p>`)}
    </article>`;
}

function renderRevisao(filtro) {
  const contagens = { ok: 0, bad: 0, skip: 0 };
  state.revisao.forEach((r) => contagens[r.status]++);

  $("#review-tabs").innerHTML = Object.keys(ROTULOS_REVISAO)
    .filter((k) => k !== "skip" || contagens.skip > 0)
    .map((k) => `<button type="button" role="tab" data-filtro="${k}" aria-selected="${k === filtro}">${ROTULOS_REVISAO[k]} (${contagens[k]})</button>`).join("");

  const itens = state.revisao.filter((r) => r.status === filtro);
  $("#review-body").innerHTML = itens.length
    ? itens.map(entradaRevisao).join("")
    : `<p class="empty">Nenhuma pergunta nesta categoria.</p>`;
  $("#review-body").scrollTop = 0;
}

function abrirRevisao(filtro) {
  focoAnterior = document.activeElement;
  renderRevisao(filtro);
  overlay.hidden = false;
  $("main").inert = true;
  document.documentElement.style.overflow = "hidden";
  $("#review-close").focus();
}

function fecharRevisao() {
  overlay.hidden = true;
  $("main").inert = false;
  document.documentElement.style.overflow = "";
  if (focoAnterior && focoAnterior.focus) focoAnterior.focus({ preventScroll: true });
}

$("#stats").addEventListener("click", (e) => {
  const btn = e.target.closest("button.stat");
  if (btn && !btn.disabled) abrirRevisao(btn.dataset.rev);
});
$("#review-tabs").addEventListener("click", (e) => {
  const tab = e.target.closest("[data-filtro]");
  if (tab) renderRevisao(tab.dataset.filtro);
});
$("#review-close").addEventListener("click", fecharRevisao);
overlay.addEventListener("click", (e) => { if (e.target === overlay) fecharRevisao(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlay.hidden) fecharRevisao(); });

/* ---------- Compartilhar ---------- */
// Se o quiz for publicado num endereço próprio, escreva-o aqui. Vazio = usa o endereço da página atual.
const LINK_PUBLICO = "";

const linkDoQuiz = () => LINK_PUBLICO || (location.origin + location.pathname).replace(/index\.html$/, "");

function mensagemCompartilhar(contexto, comLink = true) {
  const link = comLink ? ` ${linkDoQuiz()}` : "";
  if (contexto === "resultado" && state.perguntas.length) {
    const pct = Math.round((state.acertos / state.perguntas.length) * 100);
    return `Fiz o Quiz de Java (nível ${NIVEIS[state.nivel].nome}) e acertei ${pct}%! Tente superar meu placar:${link}`;
  }
  return `Estou treinando Java neste quiz com resumo de teoria, exercícios de código e cronômetro. Tente você também:${link}`;
}

// Atualiza os endereços dos botões de cada bloco de compartilhamento
function atualizarCompartilhar() {
  const link = linkDoQuiz();
  document.querySelectorAll(".share").forEach((g) => {
    g.querySelector("[data-acao=whatsapp]").href = `https://wa.me/?text=${encodeURIComponent(mensagemCompartilhar(g.dataset.contexto))}`;
    g.querySelector("[data-acao=linkedin]").href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
    g.querySelector(".share-url").textContent = link;
    g.querySelector("[data-acao=nativo]").hidden = !(typeof navigator !== "undefined" && navigator.share);
  });
}

let toastTimer = null;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 3400);
}

async function copiarTexto(texto) {
  try { await navigator.clipboard.writeText(texto); return true; } catch { /* tenta o método antigo */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = texto;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, texto.length);
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch { return false; }
}

function selecionar(el) {
  const r = document.createRange();
  r.selectNodeContents(el);
  const s = getSelection();
  s.removeAllRanges();
  s.addRange(r);
}

document.addEventListener("click", async (e) => {
  const el = e.target.closest(".share [data-acao]");
  if (!el) return;
  const grupo = el.closest(".share");
  const contexto = grupo.dataset.contexto;
  const acao = el.dataset.acao;
  const aviso = location.protocol === "file:" ? " Este endereço só funciona neste computador: publique o quiz para compartilhar." : "";

  if (acao === "copiar") {
    const ok = await copiarTexto(linkDoQuiz());
    if (ok) toast(`Link copiado! Cole onde quiser.${aviso}`);
    else { selecionar(grupo.querySelector(".share-url")); toast("Não consegui copiar. O link está selecionado, copie manualmente."); }
  } else if (acao === "linkedin") {
    // O LinkedIn só aceita o endereço; a mensagem vai para a área de transferência para colar no post
    const ok = await copiarTexto(mensagemCompartilhar(contexto));
    toast(ok ? "Mensagem copiada. Cole no seu post do LinkedIn." : "Abra o LinkedIn e cole o link do quiz no post.");
  } else if (acao === "nativo") {
    try {
      await navigator.share({ title: "Java em Níveis", text: mensagemCompartilhar(contexto, false), url: linkDoQuiz() });
    } catch { /* o usuário fechou a janela de compartilhar */ }
  }
});

// Apagar dados salvos: pede um segundo toque, sem usar confirm()
let resetArmado = null;
$("#btn-reset").addEventListener("click", (e) => {
  const btn = e.currentTarget;
  const padrao = "Apagar meus dados salvos";
  if (!resetArmado) {
    btn.textContent = "Tem certeza? Toque de novo para apagar";
    resetArmado = setTimeout(() => { resetArmado = null; btn.textContent = padrao; }, 4000);
    return;
  }
  clearTimeout(resetArmado);
  resetArmado = null;
  btn.textContent = padrao;
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* sem armazenamento */ }
  state.nome = "";
  renderHome();
  toast("Dados apagados deste navegador.");
});

/* ---------- Eventos ---------- */
$("#levels").addEventListener("click", (e) => {
  const btn = e.target.closest(".level");
  if (!btn) return;
  state.nome = $("#player-name").value.trim();
  salvar({ nome: state.nome });
  abrirTeoria(btn.dataset.nivel, "antes");
});
$("#study-index").addEventListener("click", (e) => {
  const link = e.target.closest(".topic-link");
  if (link) document.getElementById(link.dataset.alvo).scrollIntoView({ behavior: reduzirMovimento() ? "auto" : "smooth" });
});
$("#btn-start").addEventListener("click", sairDaTeoria);
$("#btn-study-back").addEventListener("click", renderHome);
$("#btn-theory").addEventListener("click", () => abrirTeoria(state.nivel, "revisao"));
$("#quiz-options").addEventListener("click", (e) => {
  const btn = e.target.closest(".opt");
  if (btn) responder(Number(btn.dataset.i));
});
$("#btn-next").addEventListener("click", proximaPergunta);
$("#btn-submit-code").addEventListener("click", enviarCodigo);
$("#btn-quit").addEventListener("click", renderHome);
$("#btn-menu").addEventListener("click", renderHome);
$("#btn-again").addEventListener("click", () => iniciarQuiz(state.nivel));
$("#btn-next-level").addEventListener("click", (e) => abrirTeoria(e.currentTarget.dataset.nivel, "antes"));
$("#player-name").addEventListener("change", (e) => salvar({ nome: e.target.value.trim() }));

// Atalhos: 1–4 ou A–D para responder
document.addEventListener("keydown", (e) => {
  if ($("#screen-quiz").hidden || state.respondida) return;
  if (e.target.matches("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key.toUpperCase();
  const i = "1234".includes(k) && k !== "" ? Number(k) - 1 : LETRAS.indexOf(k);
  if (i >= 0 && i < state.alternativas.length) responder(i);
});

renderHome();
