# EventDev Communities

Frontend da plataforma EventDev construído com React, Vite, Material-UI e TypeScript.

## Setup Rápido

### Desenvolvimento Local

```bash
pnpm install       # ou pnpm run setup
pnpm run dev
```

### Desenvolvimento com Docker

```bash
make setup-dev     # Criar .env
make dev-up        # Iniciar containers
make dev-logs      # Ver logs
```

## Comandos Disponíveis

### Docker

| Comando                | Descrição                    |
| ---------------------- | ---------------------------- |
| `make dev-up`          | Ambiente desenvolvimento     |
| `make prod-up`         | Ambiente produção            |
| `make health`          | Verificar saúde da aplicação |
| `make create-networks` | Criar redes Docker           |
| `make status`          | Status dos containers        |
| `make clean`           | Limpar containers e volumes  |

### Scripts pnpm

| Comando        | Descrição                |
| -------------- | ------------------------ |
| `pnpm dev`     | Servidor desenvolvimento |
| `pnpm build`   | Build para produção      |
| `pnpm lint`    | Verificar código         |
| `pnpm format`  | Formatar código          |
| `pnpm preview` | Preview do build         |

### URLs de Desenvolvimento

- Frontend: <http://localhost:5173>
- Health Check: <http://localhost:5173> (verificação de funcionamento)

## Padrões de Nomenclatura

- Branches: `type(scope)/description`
- Commits: `type(scope): description`

## Procedimento Inicias

1. Se atribua a uma ISSUE.
2. Crie uma branch seguindo os padrões de nomenclatura (nomeie de acordo com a demanda).
3. Abra um PR a partir da sua branch apontando para a MAIN.

## Procedimentos Finais

1. Junte todos os commits (somente os seus) antes de "mandar para revisão":

   Ex: `git rebase -i HEAD~5`

   - Dica: HEAD~(número de commits que precisam ser mesclados)

2. Após concluir o rebase iterativo, atualize SUA BRANCH com base na MAIN:

   Ex: `git rebase main`

3. Solicite a revisão do PR vinculado a sua branch.
