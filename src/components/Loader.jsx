

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-default backdrop-blur-sm">
      
      {/* 2. The Spinner */}
      <div 
        className="w-32 h-32 border-8 border-gray-200 border-t-primary rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      
    </div>
  );
};

export default Loader;