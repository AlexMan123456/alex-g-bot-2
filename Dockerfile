FROM node:24.5.0

WORKDIR /opt/bot

# Copy package.json and pnpm-lock.yaml
COPY package.json .
COPY pnpm-lock.yaml .

# Install pnpm
RUN ["npm", "install", "--global", "pnpm@latest"]

RUN ["pnpm", "install"]

COPY tsconfig.json .
COPY .env .
COPY src/ src/
COPY prisma/ prisma/

# Generate Prisma Client
RUN ["pnpm", "run", "migrate-deploy"]
RUN ["pnpm", "run", "generate"]

ENTRYPOINT ["pnpm", "run", "start"]
