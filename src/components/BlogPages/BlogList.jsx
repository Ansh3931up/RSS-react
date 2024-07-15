import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getblog } from "../../Redux/Blog";
import BlogCard from "../BlogCard";
import updateImage from "./update.jpg"; // Import the background image

function BlogList() {
    const dispatch = useDispatch();
    const BlogData = useSelector((state) => state.blog.BlogData.data);

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
        </div>
    );
}

export default BlogList;
