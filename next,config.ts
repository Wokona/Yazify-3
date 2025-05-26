import type {NextConfig} from 'next';
import type { Configuration as WebpackConfiguration } from 'webpack';

// Define the context type for the webpack function for better type safety
interface NextJsWebpackConfigContext {
  buildId: string;
  dev: boolean;
  isServer: boolean;
  defaultLoaders: object;
  nextRuntime?: 'nodejs' | 'edge';
  webpack: any;
}

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (
    config: WebpackConfiguration,
    { isServer }: NextJsWebpackConfigContext
  ) => {
    if (!isServer) {
      // Client-side specific configurations

      // Ensure config.resolve exists
      if (!config.resolve) {
        config.resolve = {};
      }

      // Comprehensive fallbacks for Node.js core modules
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}), // Preserve existing fallbacks
        async_hooks: false,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        dns: false,
        os: false,
        path: false,
        crypto: false,
        stream: false,
        util: false,
        url: false,
        querystring: false,
        http: false,
        https: false,
        zlib: false,
        events: false,
        buffer: false,
        assert: false,
        constants: false,
        punycode: false,
        timers: false,
        console: false,
        vm: false,
        cluster: false,
        module: false,
        perf_hooks: false,
        readline: false,
        repl: false,
        string_decoder: false,
        sys: false,
        tty: false,
        v8: false,
        worker_threads: false,
      };
      
      // Ensure config.externals is properly configured
      if (!Array.isArray(config.externals)) {
        config.externals = config.externals ? [config.externals] : [];
      }
      
      // Add externals for Node.js specific packages
      config.externals.push({
        '@opentelemetry/sdk-trace-node': 'commonjs @opentelemetry/sdk-trace-node',
        '@opentelemetry/context-async-hooks': 'commonjs @opentelemetry/context-async-hooks',
        '@opentelemetry/api': 'commonjs @opentelemetry/api',
        '@opentelemetry/core': 'commonjs @opentelemetry/core',
        '@opentelemetry/instrumentation': 'commonjs @opentelemetry/instrumentation',
        '@opentelemetry/resources': 'commonjs @opentelemetry/resources',
        '@opentelemetry/semantic-conventions': 'commonjs @opentelemetry/semantic-conventions',
        // Add other problematic Node.js packages here
        'ioredis': 'commonjs ioredis',
        'redis': 'commonjs redis',
        'mongoose': 'commonjs mongoose',
        'pg': 'commonjs pg',
        'mysql2': 'commonjs mysql2',
        'sqlite3': 'commonjs sqlite3',
        'bcrypt': 'commonjs bcrypt',
        'jsonwebtoken': 'commonjs jsonwebtoken',
      });

      // Additional resolve configurations
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // Add any specific aliases if needed
      };

      // Handle module resolution
      config.resolve.modules = [
        ...(config.resolve.modules || []),
        'node_modules',
      ];

      // Ignore specific plugins that might cause issues
      if (config.plugins) {
        config.plugins = config.plugins.filter((plugin: any) => {
          // Filter out problematic plugins if any
          return true; // Keep all plugins for now
        });
      }
    }

    // Server-side configurations
    if (isServer) {
      // You can add server-specific webpack configurations here
      // For example, externalize certain packages on the server side
    }

    return config;
  },
  
  // Additional Next.js configurations that might help
  experimental: {
    // Enable if you need these features
    // serverComponentsExternalPackages: ['some-package'],
  },
  
  // Configure which packages should be transpiled
  // transpilePackages: ['some-package'],
};

export default nextConfig;