export const isProduction = () => {
  return import.meta.env.VITE_ENV === 'production'
}
