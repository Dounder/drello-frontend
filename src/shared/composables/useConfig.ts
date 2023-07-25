const useConfig = () => {
  return {
    //* Props
    SECRET_KEY: import.meta.env.VITE_SECRET_KEY,
    API_URL: import.meta.env.VITE_API_URL,
  };
};

export default useConfig;
