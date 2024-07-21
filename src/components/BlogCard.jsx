import { useSelector } from 'react-redux'; 
import { Link, useNavigate } from 'react-router-dom';

function BlogCard({ data }) {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
    const role = useSelector((state) => state.auth.role); 

    // Function to truncate description text if it exceeds a certain length
    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...'; // Truncate and add ellipsis
        } else {
            return text;
        }
    };
    // console.log(data.page);
    // Determine the background color based on data.page
    const backgroundColor = data.page === 'home' ? 'bg-white' : 'bg-orange-100';
    const borderColor = data.page === 'home' ? 'border-gray-300' : 'border-orange-500';

    return (
        <div className={`max-w-sm ${backgroundColor} ${borderColor} border rounded-lg shadow-lg overflow-hidden text-orange-500`}>
            <div className="relative overflow-hidden h-40">
                <img className="object-cover w-full h-full" src={data?.thumbnail} alt="" />
            </div>
            <div className="p-5">
                <Link to={`/blog/description/${data._id}`} className="block mb-2 text-xl font-bold text-orange-500">
                    {data?.title}
                </Link>
                <div className="mb-3 text-sm h-24 overflow-y-auto">
                    <p>{truncateDescription(data?.description, 150)}</p> {/* Adjust character limit if needed */}
                </div>
                <div className="flex flex-row justify-between">
                    <button 
                        type="button" 
                        className="text-white bg-orange-500 hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                        onClick={() => navigate('/updates/description', { state: { ...data } })}
                    >
                        Read More
                    </button>
                    {isLoggedIn && role === "ADMIN" && (
                        <button 
                            type="button" 
                            className="text-white bg-orange-500 hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
