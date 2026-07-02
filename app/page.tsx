import Background from "./components/Background";
import BentoGrid from "./components/bento/BentoGrid";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Background />
      <main className="flex min-h-screen w-full flex-col px-3 py-3 tab:px-4 tab:py-4">
        <BentoGrid />
        <footer className="mt-3 text-center font-mono text-[0.78rem] text-muted-2">
          © {profile.name} · {profile.role} · Built with Next.js
        </footer>
      </main>
    </>
  );
}
