import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { isButtonElement } from "react-router-dom/dist/dom";
import { getblog } from "../../Redux/Blog";
import BlogCard from "../BlogCard";
import updateImage from "./update.jpg"; // Import the background image

function BlogList() {
    const dispatch = useDispatch();
    const BlogData = useSelector((state) => state.blog.BlogData.data);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
    const role = useSelector((state) => state.auth.role); 

    useEffect(() => {
        dispatch(getblog());
    }, [dispatch]);

    return (
        <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white"
             style={{ backgroundImage: `url(${updateImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className="text-4xl font-bold">Latest Updates</h1>
            <span className="font-bold text-2xl">By RSS</span>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {BlogData?.map((element) => (
                    <BlogCard key={element._id} data={element} />
                ))}
            </div>
            {/* consol */}
            {isLoggedIn && role === "admin" &&  ( <button type="button" className="text-white bg-orange-500 hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">Create More</button>
                
        )   }
        </div>
    );
}

export default BlogList;
