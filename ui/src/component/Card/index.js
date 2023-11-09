const Index = ({ countdown }) => {
  return (
    <div className="text-sm md:text-lg  text-blue-400 font-bold bg-rose-500 px-4 py-3 rounded-md shadow-xl sm:w-1/6">
      <h1 className="  text-1xl  text-white border-b-4 py-3   border-gray-400  mb-3 fit-content">
        All Data
      </h1>

      <p className={`   text-white`}>
        Next Update in:
        <samp className="text-gray-800 font-semibold">{countdown} </samp>s
      </p>
    </div>
  );
};

export default Index;
