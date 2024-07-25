"use client";
import Link from "next/link";
import ErrorCaracterImage from "@/public/svg/error-caracter.svg";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex h-full items-center justify-center">
          <div className="items-center flex flex-col">
            <div className="flex flex-col">
              <div className="flex flex-row gap-5 items-center justify-center">
                <h1 className="text-5xl font-normal">500</h1>
                <p className="font-normal">
                  Ой, возникла техническая ошибка! Обратитесь к <br />
                  администратору или напрямую в техническую
                  <br /> поддержку.
                </p>
              </div>
            </div>
            <Link href="/">
              <button className="bg-blue-highlight py-2 px-3 rounded-xl text-white text-sm font-semibold tracking-wider my-6">
                Вернуться на платформу
              </button>
            </Link>
            <ErrorCaracterImage />
          </div>
        </div>
      </body>
    </html>
  );
}
