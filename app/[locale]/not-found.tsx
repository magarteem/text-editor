import React from "react";
import Link from "next/link";
import NotFoundCharacterImage from "@/public/svg/not-found-character.svg";

const notFound = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="items-center flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-row gap-5 items-center justify-center">
            <h1 className="text-5xl font-normal">404</h1>
            <p className="font-normal">
              Запрашиваемая страница не найдена! Проверьте <br /> корректность
              ссылки и в случае повторения ошибки <br /> обратитесь к
              администратору.
            </p>
          </div>
        </div>
        <Link href="/">
          <button className="bg-blue-highlight py-2 px-3 rounded-xl text-white text-sm font-semibold tracking-wider my-6">
            Вернуться на платформу
          </button>
        </Link>
        <NotFoundCharacterImage />
      </div>
    </div>
  );
};

export default notFound;