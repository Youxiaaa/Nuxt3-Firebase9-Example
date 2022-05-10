// Nuxt3 添加 tailwindCss 方法 參考以下
// https://www.netlify.com/blog/2021/10/29/pairing-nuxt-3-with-tailwindcss-and-supabase/

module.exports = {
  mode: "jit",
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
