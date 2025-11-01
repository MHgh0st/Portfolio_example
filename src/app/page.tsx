import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden min-h-[400vh]">
        <Header />
        <div id="content" className="h-screen"></div>
      </div>
    </>
  );
}
