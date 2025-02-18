import jmxplugin from 'jmx-plugin'
import checker from 'vite-plugin-checker'

let mini = {
    minify: 'terser',
    terserOptions: {
        compress: {
            drop_console: true, // Remove console logs
            passes: 2, // Increase the number of optimization passes
        },
        mangle: {
            properties: {
                regex: /.*/, // Mangle properties starting with _
            },
        },
    }
}

export default {
    esbuild: {
        ignoreAnnotations: true,
        target: 'esnext',
    },
    plugins: [
        jmxplugin({ debug: false }),
        checker({ typescript: true })
    ],
    build: {
        target: 'esnext',

        //minify: 0,
        ...mini,

        sourcemap: true,
        rollupOptions: {
            output: {
                entryFileNames: `app.js`,
                assetFileNames: `[name].[ext]`,
            },
        },
        css: {
            devSourcemap: true,
        },
        modulePreload: {
            polyfill: false,
        },
    },
}
