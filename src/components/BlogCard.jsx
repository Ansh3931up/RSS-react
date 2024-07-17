import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

function BlogCard({ data }) {
    const navigate=useNavigate();
    // Function to truncate description text if it exceeds a certain length
    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...'; // Truncate and add ellipsis
        } else {
            return text;
        }
    };

    return (
        <div className="max-w-sm bg-orange-100 border border-orange-500 rounded-lg shadow-lg overflow-hidden text-orange-500" onClick={()=>navigate('/updates/description',{state:{...data}})}>
            
                <div className="relative overflow-hidden h-40">
                    <img className="object-cover w-full h-full" src={data?.thumbnail} alt="" />
                </div>
            
            <div className="p-5">
                <Link to={`/blog/description/${data._id}`} className="block mb-2 text-xl font-bold text-orange-500 ">
                    {data?.title}
                </Link>
                <p className="mb-3 text-sm ">
                    {truncateDescription(data?.description, 30)} {/* Limit description to 150 characters */}
                </p>
                
                <button type="button" className="text-white bg-orange-500 hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">Read More</button>
                
            </div>
        </div>
    );
}

export default BlogCard;
