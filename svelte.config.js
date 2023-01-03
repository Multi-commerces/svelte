import sveltePreprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // since <link rel="stylesheet"> isn't allowed, inline all styles
    inlineStyleThreshold: Infinity
  },
  preprocess: sveltePreprocess({
    preserve: ['ld+json']
  }),
//  compilerOptions: {
// 		customElement: true
// 	},
};
 
export default config;