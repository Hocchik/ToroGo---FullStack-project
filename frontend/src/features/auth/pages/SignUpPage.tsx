import React from "react";
import { Button } from "../components/button.tsx";
import { Input } from "../components/input.tsx";
import { Separator } from "../components/Separator.tsx";

export const SignUpPage = () => {
  return (
    <div className="relative w-full min-h-screen bg-white flex flex-col">
      <header className="w-full h-[130px] bg-main-buttons flex items-center justify-start px-8">
        <img className="h-12" alt="Frame" src="/frame-2.svg" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-start pt-[111px] px-4">
        <div className="w-full max-w-[522px] flex flex-col items-center space-y-8">
          <h1 className="w-full text-center [font-family:'Roboto',Helvetica] font-medium text-black text-[32px] tracking-[0] leading-[normal]">
            ¿Cúal es tu número de celular o correo electrónico?
          </h1>

          <div className="w-full space-y-6">
            <Input
              className="w-full h-[77px] bg-[#d9d9d9] rounded-[20px] border-0 text-lg px-6"
              placeholder=""
            />

            <Button className="w-full h-[77px] bg-main-buttons hover:bg-main-buttons/90 rounded-[50px] text-white text-[32px] [font-family:'Roboto',Helvetica] font-normal">
              Siguiente
            </Button>
          </div>

          <div className="w-full flex items-center justify-center space-x-4 my-8">
            <Separator className="flex-1 bg-black h-px" />
            <span className="[font-family:'Roboto',Helvetica] font-normal text-black text-[32px] tracking-[0] leading-[normal] whitespace-nowrap">
              o
            </span>
            <Separator className="flex-1 bg-black h-px" />
          </div>

          <Button
            variant="secondary"
            className="w-full h-[77px] bg-[#d9d9d9] hover:bg-[#d9d9d9]/90 rounded-[20px] text-black text-[32px] [font-family:'Roboto',Helvetica] font-normal flex items-center justify-center space-x-4"
          >
            <img
              className="w-[58px] h-[58px]"
              alt="Devicon google"
              src="/devicon-google.svg"
            />
            <span>Continúa con Google</span>
          </Button>
        </div>
      </main>
    </div>
  );
};
