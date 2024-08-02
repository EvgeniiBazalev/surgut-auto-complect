import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        СургутАвтоКомплект {new Date().getFullYear()} <br />
        <a
          href="/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          © Все права защищены
        </a>
      </p>
    </footer>
  );
}
