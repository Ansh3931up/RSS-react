import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import updateImage from "./update.jpg";

function formatDate(createdAt) {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
//   const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} `;
}

function BlogDescriptionPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { thumbnail, title, description, createdAt } = state;

  const formattedDate = formatDate(createdAt);

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${updateImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h2" color="white" className="mb-8">
        Latest Update
      </Typography>
      <Card className="w-4/5 md:w-2/3 h-96  flex flex-col md:flex-row shadow-lg bg-white">
        <CardHeader className="w-full md:w-1/2 h-48 md:h-full">
          <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
        </CardHeader>
        <CardBody className="w-full md:w-1/2 h-full flex flex-col justify-between p-4">
          <div>
            <Typography variant="h5" color="blue-gray" className="font-medium mb-4">
              {title}
            </Typography>
            <Typography color="gray" className="mb-4">
              {description}
            </Typography>
            <Typography color="gray" className="mb-4">
              Published on: {formattedDate}
            </Typography>
          </div>
          <CardFooter className="pt-3">
            <Button size="lg" fullWidth={true}>
              Reserve
            </Button>
          </CardFooter>
        </CardBody>
      </Card>
      <button
        type="button"
        className="text-white bg-orange-500 hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2 mt-8"
        onClick={() => navigate('/updates')}
      >
        GET BACK
      </button>
    </div>
  );
}

export default BlogDescriptionPage;
