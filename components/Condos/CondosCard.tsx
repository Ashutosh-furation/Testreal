export default function CondosCard({ condoList }: any) {
  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="text-xs sm:text-sm">
            <th className="text-left py-2 px-1 sm:px-3">S.No</th>
            <th className="text-left py-2 px-1 sm:px-3">Posted Date</th>
            <th className="text-left py-2 px-1 sm:px-3">Posted Name</th>
            <th className="text-left py-2 px-1 sm:px-3">Location</th>
            <th className="text-center py-2 px-1 sm:px-3">Developer Name</th>
            <th className="text-center py-2 px-1 sm:px-3"> </th>
            <th className="text-center py-2 px-1 sm:px-3"> </th>
          </tr>
        </thead>
        <tbody className="text-xs sm:text-sm border-green-800">
          {condoList.length > 0 &&
            condoList.map((user: any, index: any) => (
              <tr key={index} className="hover:bg-[#EBEBEB] cursor-pointer">
                <td className="text-left py-2  px-1 sm:px-3">{index + 1}</td>
                <td className="text-left py-2  px-1 sm:px-3">
                  {user.occupancyDate}
                </td>
                <td className="text-left py-2  px-1 sm:px-3">{user.name}</td>
                <td className="text-left py-2  px-1 sm:px-3">{user.city}</td>
                <td className="text-center py-2  px-1 sm:px-3">
                  {user.developerName}
                </td>
                <td className="text-center font-semibold cursor-pointer py-2  px-1 sm:px-3">
                  Edit
                </td>
                <td className="text-center  font-semibold  cursor-pointer py-2  px-1 sm:px-3">
                  Delete
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
