export default function LeadCard({ leadList }: any) {
  return (
    <>
      <thead>
        <tr className="text-xs sm:text-sm">
          <th className="text-left py-2 px-1 sm:px-3">S.No</th>
          <th className="text-left py-2 px-1 sm:px-3">Email </th>
          <th className="text-left py-2 px-1 sm:px-3">Message</th>
          <th className="text-left py-2 px-1 sm:px-3">Date</th>
        </tr>
      </thead>
      <tbody className="text-xs sm:text-sm border-green-800">
        {leadList.length > 0 &&
          leadList.map((user: any, index: any) => (
            <tr key={index} className="hover:bg-[#EBEBEB] cursor-pointer">
              <td className="text-left py-2 px-1 sm:px-3">
                <p>{index + 1} </p>
              </td>
              <td className="text-left py-2  px-1 sm:px-3">
                {user.developerEmail}
              </td>
              <td className="text-left w-[50%]  border-black py-4  px-1 sm:px-3">
                <div className="text-start  m-auto py-2">
                  {user.messageFromDeveloper}{" "}
                </div>
              </td>
              <td className="text-left py-2  px-1 sm:px-3">
                {user.postedDate}
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
}
