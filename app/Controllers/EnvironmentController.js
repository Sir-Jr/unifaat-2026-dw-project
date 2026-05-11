function parseBooleanEnv(value) {
    if (value === undefined || value === null || value === '') {
        return false;
    }
    const normalized = String(value).trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'yes';
}

function intEnv(name, fallback) {
    const raw = process.env[name];
    if (raw === undefined || raw === null || raw === '') {
        return fallback;
    }
    const n = Number.parseInt(String(raw), 10);
    return Number.isFinite(n) ? n : fallback;
}

export default async function EnvironmentController(request, response) {
    const isDocker = parseBooleanEnv(process.env.IS_DOCKER);

    const environment = isDocker ? 'docker' : 'local';

    const database = {
        host:
            process.env.POSTGRES_HOST ??
            (isDocker ? 'postgres_host' : 'localhost'),
        port: intEnv(
            'POSTGRES_PORT',
            isDocker ? 5432 : 6789,
        ),
    };

    const web = isDocker
        ? {
              host:
                  process.env.WEB_PUBLIC_HOST ??
                  process.env.NODE_WEB_PUBLIC_HOST ??
                  'nodeweb_host',
              port: intEnv(
                  'WEB_PUBLIC_PORT',
                  intEnv('NODE_WEB_PUBLIC_PORT', 8080),
              ),
          }
        : {
              host:
                  process.env.WEB_PUBLIC_HOST ??
                  process.env.NODE_WEB_HOST ??
                  'localhost',
              port: intEnv('NODE_WEB_PORT', 3000),
          };

    return response.json({ environment, database, web });
}
