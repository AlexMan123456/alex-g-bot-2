FROM guergeiro/pnpm:22-10

WORKDIR /opt/bot

# Copy package.json and pnpm-lock.yaml
COPY package.json .
COPY pnpm-lock.yaml .

RUN ["pnpm", "install"]
RUN ["nvm", "install", "22.10.0"]

COPY tsconfig.json .
COPY .env .
COPY src/ src/
COPY prisma/ prisma/

# Generate Prisma Client
RUN ["pnpm", "run", "migrate-deploy"]
RUN ["pnpm", "run", "generate"]

ENTRYPOINT ["pnpm", "run", "start"]
