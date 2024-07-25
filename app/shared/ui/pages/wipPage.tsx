import React from "react";
import WipCaracImage from "@/public/svg/wip-page-caracter.svg";
import Link from "next/link";

export function WipPage() {
  return (
    <div className={"h-full flex items-center justify-center"}>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h1 className="text-lg font-semibold text-gray">
            Раздел в разработке
          </h1>
          <p className="mt-2 font-normal">
            Для получения дополнительной информации обратитесь к администратору
            <br /> или менеджеру проекта
          </p>
          <Link href="/">
            <button className="bg-blue-highlight py-2 px-3 rounded-xl text-white text-sm font-semibold tracking-wider mt-6">
              Вернуться на платформу
            </button>
          </Link>
        </div>
        <WipCaracImage />
      </div>
    </div>
  );
}
