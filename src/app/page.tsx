"use client"

import "./page.css";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="mainContainer">
          <div className="mainText">
            <h1 className="mainTextLarge">Poliklinika Kinetis</h1>
            <h2 className="mainTextLarge colorPrimary">Web stranica uskoro dolazi</h2>
            <p>
              U izradi je nova web stranica. Uskoro s vama.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
