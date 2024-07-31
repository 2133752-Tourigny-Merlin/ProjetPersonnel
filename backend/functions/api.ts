import  app  from "../src/server";

import dotenv from 'dotenv';

import serverless from 'serverless-http';

// * Variables d'environnement 

dotenv.config();

//  Le handler requis par Netlify **
export const handler = serverless(app);