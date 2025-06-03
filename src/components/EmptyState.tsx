import { PiSmileySadBold } from "react-icons/pi";
export default function EmptyState() {
  return (
    <div className="mt-20">
      <div className="flex justify-center gap-2 items-center">
      <PiSmileySadBold size={48} className="text-primaryBlue"/>
      <p className="text-center text-3xl font-bold text-primaryBlue">Sorry</p>
      </div>
      <p className="text-xl text-primaryBlue text-center">We could not find anything.</p>
    </div>
  );
}
