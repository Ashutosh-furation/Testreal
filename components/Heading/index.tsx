



export default function Heading({ SetShowbutton, greet, welcome, button }: any) {
   
  return (
    <>
      <div className="Top-Heading flex justify-between px-2  border-green-900">
        <div className="admin">
          <h2 className="text-lg sm:text-2xl py-2 font-semibold">{greet}</h2>
          <p className="text-[#707070] py-1 font-semibold text-sm sm:text-lg">
            {welcome}
          </p>
        </div>
        <div
          onClick={() => SetShowbutton(false)}
          className="Adduser cursor-pointer flex items-center border-red-900"
        >
          <p className="border rounded-lg bg-black py-1 px-4 sm:py-2 sm:px-6 text-white">
            {button}
          </p>
        </div>
      </div>
    </>
  );
}