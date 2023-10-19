import React from "react";
import Container from "./ui/container";

export default function Footer() {
  return (
    <footer className="h-[50px]  sm:flex sm:justify-between py-3 border-t relative px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
      <Container>
        {/* <div className="relative px-4 sm:px-6 lg:px-8 flex h-[4vh] items-center justify-between w-full"> */}
        <div className="flex items-center justify-center text-center w-full">
          <p>© 2021 Daily Post</p>
        </div>
        {/* </div> */}
      </Container>
    </footer>
  );
}
