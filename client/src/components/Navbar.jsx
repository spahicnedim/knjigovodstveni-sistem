import { IoIosNotifications } from "react-icons/io";


const Navbar = ({ aktivnaGodina }) => {


    return (
        <div className="flex items-center justify-between border-b bg-white border-gray-400 text-black pl-10 h-14 pr-4">
            {/*<h1 className="text-xl">{title}</h1>*/}
            <div>

                    <span className='text-green-600'>{aktivnaGodina ? <div>{aktivnaGodina?.naziv}</div> : <div>Nema aktivne godine</div>}</span>

            </div>
            <div className="flex items-center space-x-4">
                <IoIosNotifications className="w-7 h-7 fill-gray-600" />
                <div className="bg-gray-600 w-10 h-10 rounded-full"></div>
            </div>
        </div>
    );
}
export default Navbar;