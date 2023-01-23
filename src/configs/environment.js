const environment = {
    url:
        import.meta.env.VITE_ENV === "local"
            ? "http://localhost:3000"
            : "https://comiconics-server.onrender.com",
};

export default environment;
