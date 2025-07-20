const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <h4 className="text-lg">The page you are looking for does not exist.</h4>
    </div>
  );
};

export default Error;