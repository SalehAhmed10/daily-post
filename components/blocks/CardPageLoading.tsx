import React from "react";

export default function CardPageLoading() {
  const length = 6;

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-5 gap-y-16 md:gap-y-10 ">
        {/* array map lenth times with index as a key */}
        {Array.from(Array(length).keys()).map((_, index) => (
          <div
            className=" shadow rounded-md p-4 max-w-sm w-full mx-auto "
            key={index}
          >
            <div className="animate-pulse flex flex-col space-x-4">
              {/*card image pulse */}
              <div className="rounded-md bg-primary h-48 w-full"></div>
              {/*card content pulse */}

              <div className="flex-1 space-y-4 py-5">
                <div className="h-4 bg-primary rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-primary rounded"></div>
                  <div className="h-4 bg-primary rounded w-5/6"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-4 bg-primary rounded w-1/4"></div>
                  <div className="h-4 bg-primary rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
