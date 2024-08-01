import AuthButton from "../components/AuthButton";

export default async function Header() {
  return (
    <>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-base">
          <h3 className="font-bold text-lg">СургутАвтоКомлект</h3>
          <p>+7 (999) 999-99-99</p>
          <AuthButton />
        </div>
      </nav>
    </>
  );
}
