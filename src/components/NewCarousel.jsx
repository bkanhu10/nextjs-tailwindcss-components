"use client";

import { Check, Clock, Globe } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
const TestPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-red-50">
      <AutoScrollCarousel />
    </div>
  );
};

const carouselContent = [
  {
    id: 1,
    icon: <Clock />,
    title: "Launch Global Business within Minutes",
    description:
      "No need to set up your own entity and integrate payment gateways, billing engine, churn solution etc",
    image:
      "#",
  },
  {
    id: 2,
    icon: <Check />,
    title: "Eliminate Payment Friction for Customers",
    description:
      "99%+ Success rate for 300+ Local Payment Methods in 100+ Currencies across 190+ Countries across the globe",
    image:
      "#",
  },
  {
    id: 3,
    icon: <Globe />,
    title: "Automate Global Tax and Compliance ",
    description:
      "As Merchant of Record, we ensure all transactions meet legal & compliance requirements across the world",
    image:
      "#",
  },
];

const AutoScrollCarousel = () => {
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const carouselTime = 3000;

  const onNext = () => {
    if (currentCarousel < carouselContent.length - 1) {
      let i = currentCarousel + 1;
      console.log("Carousel moved to next", i);
      setCurrentCarousel(i);
    } else {
      setCurrentCarousel(0);
    }
  };
  const onBack = () => {
    if (currentCarousel === 0) {
      setCurrentCarousel(0);
    } else {
      let i = currentCarousel - 1;
      console.log("Carousel back to ", i);
      setCurrentCarousel(i);
    }
  };

  useEffect(() => {
    const timer = setTimeout(onNext, carouselTime);
    return () => clearTimeout(timer);
  }, [currentCarousel]);
  const handleActiveClick = (id) => {
    setCurrentCarousel(id);
  };
  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold">Auto Scroll Carousel</h1>
      <div className="flex flex-row gap-12">
        <div className="relative flex flex-row">
          <div className="flex flex-col items-center">
            <Image
              src={carouselContent[currentCarousel].image}
              alt={carouselContent[currentCarousel].description}
              height={250}
              width={450}
              className="h-[450px] w-[450px] rounded object-cover"
            />
          </div>
        </div>
        <div className="mt-4 flex max-w-lg flex-col justify-center gap-y-4">
          {carouselContent.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentCarousel(index)}
              className={`text-left transition duration-300 ease-in-out`}
            >
              <div
                className={`group flex flex-col items-start ${currentCarousel === index && "is-active transition duration-300 ease-in-out"}`}
              >
                <div className="flex items-center gap-2">
                  <div className="group-[.is-active]:text-green-500">
                    {item.icon}
                  </div>
                  <p className="text-2xl font-medium text-gray-600 group-[.is-active]:text-gray-950">
                    {item.title}
                  </p>
                </div>
                {currentCarousel === index && (
                  <p className="mt-2 text-base leading-normal transition duration-300 ease-in-out">
                    {carouselContent[currentCarousel].description}
                  </p>
                )}
                <div
                  className={`mt-4 border-b ${
                    currentCarousel === index
                      ? "animate-progress-line group-[.is-active]:border-green-500"
                      : "h-1 w-full translate-x-0 border-gray-500"
                  }`}
                />
              </div>
              {/* from:w-0 to:w-full h-1 translate-x-full border-green-500 */}
              {/* transition ease-linear */}
              {/* {currentCarousel === index && (
                <div className="animate-progress-line 4000 h-2 bg-red-500 transition ease-in"></div>
              )} */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;

// const page = () => {
//   return (
//     <div>
//       <div className="flex flex-row">
//         <div className="relative flex flex-row">
//           {/* <button
//         className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded bg-gray-200 p-2"
//         onClick={onBack}
//       >
//         &lt;
//       </button> */}
//           <div className="carousel-item flex flex-col items-center">
//             {/* <h2 className="text-lg font-semibold">
//           {carouselContent[currentCarousel].title}
//         </h2> */}
//             <Image
//               src={carouselContent[currentCarousel].image}
//               alt={carouselContent[currentCarousel].description}
//               height={250}
//               width={250}
//               className="rounded"
//             />
//             {carouselContent[currentCarousel].id}
//             {/* <p className="mt-2">
//           {carouselContent[currentCarousel].description}
//         </p> */}
//           </div>
//           {/* <button
//         className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded bg-gray-200 p-2"
//         onClick={onNext}
//       >
//         &gt;
//       </button> */}
//         </div>
//         <div className="mt-4 flex flex-col justify-center gap-2">
//           {carouselContent.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentCarousel(index)}
//               // className={`h-4 w-4 rounded-full ${
//               //   index === currentCarousel ? "bg-blue-500" : "bg-gray-300"
//               // }`}
//               className={``}
//             >
//               <div className="is-active group flex flex-col items-start">
//                 <p> {item.title}</p>
//                 {/* //TODO: Progress bar */}
//                 <p>
//                   {currentCarousel === index &&
//                     carouselContent[currentCarousel].description}
//                 </p>
//                 <div
//                   className={`border-b-2 ${
//                     currentCarousel === index
//                       ? "group-[.is-active]: from:w-0 to:w-full h-1 translate-x-full border-green-500 transition ease-linear"
//                       : "h-1 w-full translate-x-0 border-black"
//                   }`}
//                 />
//               </div>
//               {currentCarousel === index && (
//                 <div className="animate-progress-line 4000 h-2 bg-red-500 transition ease-in"></div>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
