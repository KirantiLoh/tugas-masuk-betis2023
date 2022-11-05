import { useToast } from "context/ToastContext";
import { useEffect } from "react";
import {AiFillCheckCircle, AiFillExclamationCircle, AiOutlineCloseCircle} from "react-icons/ai"

const Toast = () => {

  const { type, showToast, setShowToast , message } = useToast();

    useEffect(() => {
      setTimeout(() => {
        if (showToast) {
          setShowToast(prev => prev = false);
        }
      }, 3000)
    }, [showToast])

    return(   
        <div className={`fixed flex items-center justify-between m-auto top-0 left-[50%] translate-x-[-50%] mt-20 rounded-lg z-40 md:w-5/12 w-10/12 ${type === "success" ? "bg-green-500" : "bg-yellow-500"} py-2 px-6 transition-all duration-500  ${showToast ? "opacity-100 translate-y-5" : "opacity-0 -translate-y-5 pointer-events-none"} gap-1`} >
            <div className="flex items-center justify-center"> 
                {type === "success" ?
                  <AiFillCheckCircle size={20} className="text-white text-md hidden md:block" />
                :
                  <AiFillExclamationCircle size={20} className="text-white text-md hidden md:block" />
                }
                <p className="text-white font-overpass text-md ml-3">
                    {message}
                </p>
            </div>
            <div className="flex items-center justify-between">
                <div className="border-l border-[rgba(255,255,255,0.5)] ml-4 h-[30px] hidden md:block"> </div>
                <AiOutlineCloseCircle onClick={() => setShowToast(false)} size={20} className="text-white ml-4 cursor-pointer hidden md:block" />
            </div>
        </div>
    );
}

export default Toast;
