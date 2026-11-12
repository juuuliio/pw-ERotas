// URL pública da aplicação utilizada nas aulas; pode ser versionada.
export const BASE_URL = process.env.BASE_URL || 'https://projeto-entra21.web.app/';


export const ACCOUNTS = [
  {
    email: 'qa.usuario@example.com',
    lastName: 'Usuário',
    role: 'Usuário',
    phone: '47900000001',
    passwordEnv: 'QA_USER_PASSWORD',
    password: "jYAkunratPqHCZQY!",
  },
  {
    email: 'qa.motorista@example.com',
    lastName: 'Motorista',
    role: 'Motorista',
    phone: '47900000002',
    passwordEnv: 'QA_DRIVER_PASSWORD',
    password: "hRKJzDZdR9nrNEGC!",
  },
  {
    email: 'qa.admin@example.com',
    lastName: 'Administrador',
    role: 'Administrador',
    phone: '47900000003',
    passwordEnv: 'QA_ADMIN_PASSWORD',
    password: "TH4p8vGyrCR2XJra!",
  },
];
