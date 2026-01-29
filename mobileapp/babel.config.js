module.exports = function(api) {
  api.cache(true); 
  
  return { 
    // FIX 1: ADD THIS LINE. This preset handles React, JSX, and ES features.
    presets: ['babel-preset-expo'], 
    
    // FIX 2: Your existing plugins array
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      // If you are using module-resolver, add it here too:
      // [
      //   'module-resolver',
      //   {
      //     root: ['./'],
      //     alias: {
      //       '@/': './',
      //     },
      //   },
      // ],
    ],
  };
};