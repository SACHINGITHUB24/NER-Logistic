// import { definePrismaConfig } from "prisma/config";
import { defineConfig } from 'prisma/config'

export default definePrismaConfig({
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});
