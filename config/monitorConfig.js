module.exports = {
  title: 'Express Status', // Default title
  theme: 'default.css', // Default styles
  path: '/status',
  socketPath: '/socket.io', // In case you use a custom path
  spans: [
    {
      interval: 1, // Every second
      retention: 60, // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60,
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60,
    },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    eventLoop: true,
    heap: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  healthChecks: [
    {
      protocol: 'http',
      host: 'localhost',
      path: '/',
      port: '3020',
    },
    {
      protocol: 'http',
      host: 'localhost',
      path: '/register',
      port: '3020',
    },
    {
      protocol: 'http',
      host: 'localhost',
      path: '/rabbit',
      port: '3020',
    },
    {
      protocol: 'http',
      host: 'localhost',
      path: '/user',
      port: '3020',
    },
  ],
  ignoreStartsWith: '/admin',
};
