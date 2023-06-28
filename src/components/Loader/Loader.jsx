import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="hsl(198, 100%, 60%)

"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    ></ThreeDots>
  );
}

export default Loader;
