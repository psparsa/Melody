![Banner](https://user-images.githubusercontent.com/57572461/233194046-3db160ca-de1c-4b29-ba17-879205613165.png)

### System requirments:

- RAM: < 1gb
- Node.js: <= 16.20

### Starting the dev sever:

```bash
# initialize the .env before doing anything else!
cp .env.example .env

npm install
npm run dev
```

### Inspecting UI components:

```bash
npm run storybook
```

### Running linter:

```bash
npm run lint
```

### Formatting the project codes:

```bash
# to check which files need formatting
npm run prettier:check
npm run prettier
```

### Deployment with docker:

```bash
docker-compose up
```
