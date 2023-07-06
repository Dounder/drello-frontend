const useConfig = () => {
  return {
    //* Props
    SECRET_KEY: import.meta.env.VITE_SECRET_KEY,
    API_URL: import.meta.env.VITE_API_URL,

    //! Getters

    //? Methods
  };
};

export default useConfig;
