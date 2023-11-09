const Index = ({ data, countdown }) => {
  console.log(countdown, "countdown");
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-rose-500 text-gray-300">
            <th className="px-6 py-4">S. No.</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">From</th>
            <th className="px-6 py-4">To</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((user, i) => (
            <tr
              key={i}
              className={`${i % 2 === 0 ? "bg-gray-600" : "bg-gray-700"} ${
                countdown === 2 && i === 0 && "border-b-4 border-green-600  "
              }`}
            >
              <td className="px-6 py-4">{i + 1}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.origin}</td>
              <td className="px-6 py-4">{user.destination}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
