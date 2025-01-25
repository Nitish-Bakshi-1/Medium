export const BlogComp = ({ title, description, timeStamp }) => {
  return (
    <div className="">
      <h1 className="text-4xl font-extrabold mb-4 capitalize">{title}</h1>
      <p className="py-2 text-[#18191B]">{timeStamp}</p>
      <h2 className="text-xl  ">{description}</h2>
    </div>
  );
};
