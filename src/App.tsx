import { lazy, Suspense } from "react";

const Desktop = lazy(() => import("./components/desktop/Desktop").then((module) => ({ default: module.Desktop })));
const QuickView = lazy(() => import("./components/quick/QuickView").then((module) => ({ default: module.QuickView })));

function App() {
  return <Suspense fallback={null}>{new URLSearchParams(window.location.search).get("view") === "quick"
    ? <QuickView />
    : <Desktop />}</Suspense>;
}

export default App;
