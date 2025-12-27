const config = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || 'sutech_sys_db',
        port: process.env.DB_PORT || 3306
    },
    
    jwt: {
        secret: process.env.JWT_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '14d'
    },
    
    frontend: {
        url: process.env.FRONTEND_URL || 'http://localhost:5173'
    },
    
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials: true
    },
};

const validateConfig = () => {
    const required = [
        'JWT_SECRET',
        'JWT_REFRESH_SECRET'
    ];
    
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        console.error('Missing required environment variables:');
        missing.forEach(key => {
            console.error(`   - ${key}`);
        });
        console.error('\nPlease add them to your .env file');
        process.exit(1); 
    }

    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
        console.warn('Warning: JWT_SECRET is less than 32 characters. Consider using a stronger secret.');
    }
    
    console.log('Configuration validated successfully');
};

export { config, validateConfig };